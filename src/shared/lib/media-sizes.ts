import type { Media } from "./media";

/**
 * `sizes` strings shared by the desktop and mobile trees. Both trees are in the server HTML;
 * identical srcset + sizes make the browser download one file for the same photo, not two.
 */
export const HERO_SIZES = "(min-width: 1024px) 560px, 96vw";
export const ABOUT_SIZES = "(min-width: 1024px) 480px, 96vw";

/** Width ÷ height of a photo or video (a video with neither poster nor readable size gets a portrait default). */
export function mediaRatio(item: Media) {
  if (item.kind === "image") return item.width / item.height;
  if (item.poster) return item.poster.width / item.poster.height;
  return item.size ? item.size.width / item.size.height : 4 / 5;
}

/**
 * Proportion for a framed photo: the photo's own, so group shots are never cropped at the edges
 * (where faces often are). Only extreme shapes are clamped. Without a photo, `fallback`.
 */
export function frameRatio(media: Media | null, fallback: number, min = 0.8, max = 1.6) {
  return media ? Math.min(max, Math.max(min, mediaRatio(media))) : fallback;
}
