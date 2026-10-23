import "server-only";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

/**
 * Photos and videos are picked up from /public at build time:
 *  - main-page.*   — Hero photo (image or video)
 *  - main-page2.*  — a photo is shown in the «Біз туралы» section; a video becomes the small
 *                    muted background video on the hero (the about section then takes the first gallery photo)
 *  - other photos in public/images — gallery, sorted by file name
 *  - other videos in public/images or public/videos — the gallery's video block
 * Named files may sit in /public or in /public/images.
 * A video may have a poster next to it: `<name>-poster.jpg`.
 * Byte-identical copies (e.g. the same photo saved twice under two names) are shown once.
 * Drop files in and redeploy — no code changes needed.
 */

export type ImageMedia = { kind: "image"; src: string; width: number; height: number };
export type VideoMedia = {
  kind: "video";
  src: string;
  type: string;
  poster: ImageMedia | null;
  /** display size read from the MP4/MOV header (rotation applied); null if unreadable */
  size: { width: number; height: number } | null;
};
export type Media = ImageMedia | VideoMedia;

export type SiteMedia = {
  hero: Media | null;
  /** main-page2 when it is a video: muted, looping accent on the hero */
  heroVideo: VideoMedia | null;
  /** main-page2 when it is a photo (otherwise the first gallery photo) */
  about: Media | null;
  /** photos only */
  gallery: ImageMedia[];
  /** played on demand, with sound, from the video block */
  videos: VideoMedia[];
};

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const VIDEOS_DIR = path.join(PUBLIC_DIR, "videos");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const VIDEO_TYPES: Record<string, string> = { ".mp4": "video/mp4", ".webm": "video/webm", ".mov": "video/mp4", ".m4v": "video/mp4" };
const SKIP = /^(logo|favicon|icon|og|opengraph)/i;

/** Pixel size read from the file header (JPEG / PNG / WebP / GIF / AVIF). */
function readSize(buf: Buffer): { width: number; height: number } | null {
  if (buf.length < 32) return null;
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf.toString("ascii", 0, 3) === "GIF") return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    return null;
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) return readJpegSize(buf);
  const ispe = buf.indexOf("ispe");
  if (buf.toString("ascii", 4, 8) === "ftyp" && ispe > 0) {
    return { width: buf.readUInt32BE(ispe + 8), height: buf.readUInt32BE(ispe + 12) };
  }
  return null;
}

function readJpegSize(buf: Buffer) {
  let size: { width: number; height: number } | null = null;
  let orientation = 1;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    const length = buf.readUInt16BE(i + 2);
    if (marker === 0xe1 && buf.toString("ascii", i + 4, i + 8) === "Exif") orientation = readExifOrientation(buf, i + 10);
    const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSOF) {
      size = { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      break;
    }
    i += 2 + length;
  }
  // Phone photos are often stored sideways with an EXIF rotation flag (5–8 = rotated 90°).
  if (size && orientation >= 5) return { width: size.height, height: size.width };
  return size;
}

function readExifOrientation(buf: Buffer, tiff: number) {
  try {
    const le = buf.toString("ascii", tiff, tiff + 2) === "II";
    const u16 = (o: number) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
    const u32 = (o: number) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
    const ifd = tiff + u32(tiff + 4);
    const count = u16(ifd);
    for (let n = 0; n < count; n++) {
      const entry = ifd + 2 + n * 12;
      if (u16(entry) === 0x0112) return u16(entry + 8);
    }
  } catch {
    /* malformed EXIF — keep the stored orientation */
  }
  return 1;
}

/**
 * Display size of an MP4/MOV video from its track header ("tkhd"). The header may sit at the
 * start or at the end of the file, so both ends are searched. Phone videos are often stored
 * landscape with a 90° rotation matrix — then width and height are swapped.
 */
function readVideoSize(file: string): { width: number; height: number } | null {
  const fd = fs.openSync(file, "r");
  try {
    const { size } = fs.fstatSync(fd);
    const chunk = Math.min(size, 4 * 1024 * 1024);
    const head = Buffer.alloc(chunk);
    fs.readSync(fd, head, 0, chunk, 0);
    const tail = Buffer.alloc(chunk);
    fs.readSync(fd, tail, 0, chunk, size - chunk);
    for (const buf of [head, tail]) {
      for (let p = buf.indexOf("tkhd"); p > 0; p = buf.indexOf("tkhd", p + 4)) {
        let q = p + 4;
        if (q + 84 > buf.length) break;
        const v1 = buf[q] === 1;
        q += 4 + (v1 ? 32 : 20) + 16; // version/flags, times + track id + duration, reserved/layer/group/volume
        const a = buf.readInt32BE(q);
        const b = buf.readInt32BE(q + 4);
        const width = buf.readUInt32BE(q + 36) >>> 16;
        const height = buf.readUInt32BE(q + 40) >>> 16;
        if (width > 0 && height > 0) return a === 0 && Math.abs(b) === 0x10000 ? { width: height, height: width } : { width, height };
      }
    }
  } catch {
    /* unreadable header — the layout falls back to a default proportion */
  } finally {
    fs.closeSync(fd);
  }
  return null;
}

function list(dir: string) {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile() && !d.name.startsWith("."))
      .map((d) => d.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

const stem = (file: string) => path.parse(file).name.toLowerCase();
const url = (prefix: string, file: string) => `${prefix}/${encodeURIComponent(file)}`;

function loadImage(dir: string, prefix: string, file: string): ImageMedia | null {
  const size = readSize(fs.readFileSync(path.join(dir, file)).subarray(0, 256 * 1024));
  return size && size.width > 0 && size.height > 0 ? { kind: "image", src: url(prefix, file), ...size } : null;
}

/** Content fingerprint: size + hash of the first 4 MB (whole file for any photo). */
function fingerprint(file: string) {
  const fd = fs.openSync(file, "r");
  try {
    const { size } = fs.fstatSync(fd);
    const head = Buffer.alloc(Math.min(size, 4 * 1024 * 1024));
    fs.readSync(fd, head, 0, head.length, 0);
    return `${size}:${crypto.createHash("sha1").update(head).digest("hex")}`;
  } finally {
    fs.closeSync(fd);
  }
}

type Item = { name: string; media: Media; hash: string };

function loadFolder(dir: string, prefix: string) {
  const files = list(dir);
  const posters = new Set(files.filter((f) => stem(f).endsWith("-poster") && IMAGE_EXT.test(f)));
  const items: Item[] = [];
  for (const file of files) {
    if (posters.has(file)) continue;
    const ext = path.extname(file).toLowerCase();
    if (IMAGE_EXT.test(file)) {
      const media = loadImage(dir, prefix, file);
      if (media) items.push({ name: stem(file), media, hash: fingerprint(path.join(dir, file)) });
    } else if (VIDEO_TYPES[ext]) {
      const posterFile = [...posters].find((p) => stem(p) === `${stem(file)}-poster`);
      const poster = posterFile ? loadImage(dir, prefix, posterFile) : null;
      items.push({
        name: stem(file),
        media: { kind: "video", src: url(prefix, file), type: VIDEO_TYPES[ext], poster, size: readVideoSize(path.join(dir, file)) },
        hash: fingerprint(path.join(dir, file)),
      });
    }
  }
  return items;
}

export function getSiteMedia(): SiteMedia {
  const inImages = loadFolder(IMAGES_DIR, "/images");
  const inVideos = loadFolder(VIDEOS_DIR, "/videos");
  // Named files may also sit directly in /public.
  const named = [...inImages, ...loadFolder(PUBLIC_DIR, "")];
  const find = (name: string) => named.find((m) => m.name === name) ?? null;

  const hero = find("main-page");
  const second = find("main-page2");
  // A file already used on the page, or seen earlier in the folders, is not repeated.
  const seen = new Set([hero?.hash, second?.hash].filter(Boolean));
  const gallery: ImageMedia[] = [];
  const videos: VideoMedia[] = [];
  for (const item of [...inImages, ...inVideos]) {
    if (item === hero || item === second || SKIP.test(item.name) || seen.has(item.hash)) continue;
    seen.add(item.hash);
    if (item.media.kind === "image") gallery.push(item.media);
    else videos.push(item.media);
  }

  const heroVideo = second?.media.kind === "video" ? second.media : null;
  const about = second && !heroVideo ? second.media : (gallery.shift() ?? null);
  return { hero: hero?.media ?? null, heroVideo, about, gallery, videos };
}
