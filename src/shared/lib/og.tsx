import "server-only";
import fs from "node:fs";
import path from "node:path";

/** The favicon SVG as a data URI — Satori renders <img> SVGs with full transform support. */
export function logoDataUri() {
  const svg = fs.readFileSync(path.join(process.cwd(), "src/app/icon.svg"), "utf8");
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** Google Fonts serves TTF to clients without a modern UA — the format Satori reads. */
export async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}
