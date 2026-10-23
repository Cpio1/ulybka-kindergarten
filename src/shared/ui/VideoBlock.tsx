"use client";

import { Clapperboard, Play } from "lucide-react";
import Image from "next/image";
import { toRows, useGallery } from "@/shared/hooks/useGallery";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { VideoMedia } from "@/shared/lib/media";
import { Lightbox } from "./Lightbox";
import { MediaPlaceholder, useMounted } from "./MediaView";
import { Reveal } from "./Reveal";

/**
 * The gallery's video block. Cards show the poster (or the first frame) at the clip's own
 * proportions; nothing downloads until a card is tapped, and only then — by the visitor's own
 * action — the viewer plays it with controls and sound.
 */
export function VideoBlock({ videos, compact = false }: { videos: VideoMedia[]; compact?: boolean }) {
  const { t } = useLang();
  const g = useGallery(videos, videos.length);
  if (videos.length === 0) return null;
  // phones: two per row; laptops: three; a short row never blows up in height
  const rows = toRows(videos, compact ? 2 : 3, compact ? 1.5 : 3.6);

  return (
    <div className={compact ? "mt-9" : "mt-10 short:mt-8"}>
      <Reveal y={compact ? 10 : 18} className="flex items-center gap-2.5">
        <span className={`grid place-items-center rounded-xl bg-sun-soft text-ink ${compact ? "h-9 w-9" : "h-10 w-10"}`}>
          <Clapperboard className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className={`font-extrabold text-ink ${compact ? "text-[1.2rem]" : "text-[1.4rem]"}`}>{t.gallery.videos}</h3>
        <span className="rounded-full bg-sky-soft px-2.5 py-0.5 text-[0.8rem] font-semibold text-sky-deep tabular-nums">{videos.length}</span>
      </Reveal>

      <div className={`mt-4 flex flex-col ${compact ? "gap-2" : "gap-3 2xl:gap-4"}`}>
        {rows.map((row, r) => (
          <Reveal key={r} y={compact ? 10 : 18} className={`flex ${compact ? "gap-2" : "gap-3 2xl:gap-4"}`}>
            {row.cells.map(({ item, index, ratio }) => (
              <div
                key={item.src}
                className={`min-w-0 overflow-hidden ${compact ? "rounded-2xl" : "rounded-[1.25rem]"}`}
                style={{ flex: `${ratio} 1 0`, aspectRatio: ratio }}
              >
                <VideoCard video={item as VideoMedia} index={index} onOpen={g.show} sizes={compact ? "50vw" : "(min-width: 1536px) 480px, 30vw"} compact={compact} wide={ratio >= 1.2} />
              </div>
            ))}
            {/* a short row stays left-aligned under the block's heading */}
            {row.spacer > 0 && <span style={{ flex: `${row.spacer} 1 0` }} aria-hidden="true" />}
          </Reveal>
        ))}
      </div>

      <Lightbox items={videos} index={g.open} onClose={g.close} onStep={g.step} />
    </div>
  );
}

function VideoCard({ video, index, onOpen, sizes, compact, wide }: { video: VideoMedia; index: number; onOpen: (i: number) => void; sizes: string; compact: boolean; wide: boolean }) {
  const { t } = useLang();
  const mounted = useMounted();
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={t.gallery.play(index + 1)}
      className="group relative block h-full w-full overflow-hidden bg-ink"
    >
      {video.poster ? (
        <Image src={video.poster.src} alt="" fill sizes={sizes} loading="lazy" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      ) : (
        <>
          <MediaPlaceholder compact tone={index} />
          {/* no poster: the first frame, fetched (metadata only) after hydration so the hidden layout never loads it */}
          {mounted && (
            <video
              src={`${video.src}#t=0.1`}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          )}
        </>
      )}
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
      <span
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sun text-ink shadow-sun ring-4 ring-white/60 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 ${
          compact ? "h-12 w-12" : "h-16 w-16"
        }`}
      >
        <Play className={`${compact ? "h-5 w-5" : "h-6 w-6"} translate-x-[1px] fill-current`} />
      </span>
      {!compact && wide && (
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 p-3 text-left text-[0.82rem] font-medium text-white/90">
          {t.gallery.soundHint}
        </span>
      )}
    </button>
  );
}
