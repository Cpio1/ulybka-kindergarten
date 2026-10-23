"use client";

import { ChevronDown } from "lucide-react";
import { useGallery } from "@/shared/hooks/useGallery";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { ImageMedia, VideoMedia } from "@/shared/lib/media";
import { GalleryEmpty } from "@/shared/ui/GalleryEmpty";
import { GalleryTile } from "@/shared/ui/GalleryTile";
import { Lightbox } from "@/shared/ui/Lightbox";
import { Reveal } from "@/shared/ui/Reveal";
import { VideoBlock } from "@/shared/ui/VideoBlock";
import { Container, Heading, Section } from "../ui";

/**
 * Phone layout: an even 2-column grid of small 4:3 thumbnails — 4 at first (one screen-friendly block),
 * the rest behind "show more". Tapping opens the photo full screen.
 */
export function MobileGallery({ items, videos }: { items: ImageMedia[]; videos: VideoMedia[] }) {
  const { t } = useLang();
  const g = useGallery(items, 4);
  return (
    <Section id="gallery">
      <Container>
        <Heading eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
        <div className="mt-5">
          {items.length === 0 ? (
            <GalleryEmpty compact />
          ) : (
            <ul id="gallery-grid" className="grid grid-cols-2 gap-2">
              {g.visible.map((item, i) => (
                <Reveal as="li" y={8} key={item.src} delay={Math.min(i, 3) * 0.04} className="aspect-[4/3]">
                  <GalleryTile
                    item={item}
                    index={i}
                    onOpen={g.show}
                    cellRatio={4 / 3}
                    sizes="(min-width: 544px) 272px, 50vw"
                    className="rounded-xl shadow-card"
                  />
                </Reveal>
              ))}
            </ul>
          )}
          {g.canExpand && (
            <button
              type="button"
              onClick={g.toggle}
              aria-expanded={g.expanded}
              aria-controls="gallery-grid"
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-ink/10 bg-paper text-[0.92rem] font-semibold text-ink active:scale-[0.98]"
            >
              {g.expanded ? t.gallery.less : t.gallery.more}
              {!g.expanded && (
                <span className="rounded-full bg-sky-soft px-2 py-0.5 text-[0.75rem] font-bold text-sky-deep tabular-nums">+{g.hiddenCount}</span>
              )}
              <ChevronDown className={`h-4.5 w-4.5 transition-transform ${g.expanded ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          )}
          <VideoBlock videos={videos} compact />
        </div>
      </Container>
      <Lightbox items={items} index={g.open} onClose={g.close} onStep={g.step} />
    </Section>
  );
}
