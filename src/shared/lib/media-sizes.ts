/**
 * `sizes` strings shared by the desktop and mobile trees. Both trees are in the server HTML;
 * identical srcset + sizes make the browser download one file for the same photo, not two.
 */
export const HERO_SIZES = "(min-width: 1024px) 600px, 92vw";
export const ABOUT_SIZES = "(min-width: 1024px) 480px, 92vw";

/** True for a landscape photo (or a video whose cover is landscape) — frames widen a little for it. */
export function isLandscape(media: { kind: "image"; width: number; height: number } | { kind: "video"; poster: { width: number; height: number } | null; size: { width: number; height: number } | null } | null) {
  if (!media) return false;
  const box = media.kind === "image" ? media : (media.poster ?? media.size);
  return box ? box.width > box.height * 1.1 : false;
}
