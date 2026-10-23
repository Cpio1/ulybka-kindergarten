"use client";

import { Expand, Play } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { mediaRatio } from "@/shared/lib/media-sizes";
import { MediaPlaceholder, useMounted } from "./MediaView";

type Props = {
  item: Media;
  index: number;
  sizes: string;
  onOpen: (index: number) => void;
  className?: string;
  /** width ÷ height of the cell; a photo of a clearly different shape is fitted whole instead of cropped */
  cellRatio?: number;
};

/**
 * A gallery cell: lazy photo (or video poster) that opens the lightbox. Never taller than its grid cell.
 * A photo close to the cell's shape fills it (a few percent trimmed at most); one of a clearly different
 * shape (e.g. portrait in a landscape cell) is shown whole over a soft blurred copy of itself.
 */
export function GalleryTile({ item, index, sizes, onOpen, className = "", cellRatio }: Props) {
  const { t } = useLang();
  const cover = item.kind === "image" ? item : item.poster;
  const mounted = useMounted();
  const fill = !cellRatio || Math.abs(Math.log(mediaRatio(item) / cellRatio)) < 0.18;
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={item.kind === "image" ? t.gallery.open(index + 1) : t.gallery.videoLabel(index + 1)}
      className={`group relative block h-full w-full overflow-hidden bg-milk-deep ${className}`}
    >
      {cover ? (
        <>
          {!fill && (
            // same src + sizes as the photo itself, so the backdrop costs no extra download
            <Image src={cover.src} alt="" aria-hidden="true" fill sizes={sizes} loading="lazy" className="scale-110 object-cover opacity-70 blur-xl" />
          )}
          <Image
            src={cover.src}
            alt={t.gallery.photoAlt(index + 1)}
            fill
            sizes={sizes}
            loading="lazy"
            className={`${fill ? "object-cover" : "object-contain"} transition-transform duration-700 ease-out group-hover:scale-[1.05]`}
          />
        </>
      ) : (
        <>
          <MediaPlaceholder compact />
          {/* a video without a poster shows its first frame; only after hydration, so the hidden layout never fetches it */}
          {mounted && item.kind === "video" && (
            <video
              src={`${item.src}#t=0.1`}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          )}
        </>
      )}
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span
        aria-hidden="true"
        className={`absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-card transition-[opacity,transform] duration-300 ${
          item.kind === "video" ? "opacity-100" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        }`}
      >
        {item.kind === "video" ? <Play className="h-4 w-4 fill-current" /> : <Expand className="h-4 w-4" />}
      </span>
    </button>
  );
}
