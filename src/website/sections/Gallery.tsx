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
 * Compact mosaic: one larger photo (2×2) beside four small ones in a 4-column grid, all 4:3 —
 * the block stays well under a laptop screen's height. More photos continue in the same grid;
 * the full-size view is the lightbox.
 */
export function Gallery({ items, videos }: { items: ImageMedia[]; videos: VideoMedia[] }) {
  const { t } = useLang();
  const g = useGallery(items, 5);

  return (
    <Section id="gallery">
      <Container>
        <div className="mx-auto max-w-[60rem]">
          <div className="flex items-end justify-between gap-6">
            <Heading eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
            {g.canExpand && (
              <Reveal delay={0.05} className="shrink-0">
                <button
                  type="button"
                  onClick={g.toggle}
                  aria-expanded={g.expanded}
                  aria-controls="gallery-grid"
                  className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-5 text-[0.92rem] font-semibold text-ink transition hover:-translate-y-0.5 hover:border-sky"
                >
                  {g.expanded ? t.gallery.less : t.gallery.more}
                  {!g.expanded && (
                    <span className="rounded-full bg-sky-soft px-2 py-0.5 text-[0.78rem] font-bold text-sky-deep tabular-nums">+{g.hiddenCount}</span>
                  )}
                  <ChevronDown className={`h-4.5 w-4.5 transition-transform ${g.expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
              </Reveal>
            )}
          </div>

          <div className="mt-7 short:mt-6">
            {items.length === 0 ? (
              <GalleryEmpty />
            ) : (
              <ul id="gallery-grid" className="grid grid-cols-4 gap-3">
                {g.visible.map((item, i) => {
                  const big = i === 0;
                  return (
                    <Reveal
                      as="li"
                      key={item.src}
                      delay={Math.min(i, 5) * 0.04}
                      className={big ? "col-span-2 row-span-2" : "aspect-[4/3]"}
                    >
                      <GalleryTile
                        item={item}
                        index={i}
                        onOpen={g.show}
                        cellRatio={4 / 3}
                        sizes={big ? "(min-width: 1024px) 480px, 50vw" : "(min-width: 1024px) 240px, 25vw"}
                        className="rounded-2xl shadow-card"
                      />
                    </Reveal>
                  );
                })}
              </ul>
            )}
            <VideoBlock videos={videos} />
          </div>
        </div>
      </Container>
      <Lightbox items={items} index={g.open} onClose={g.close} onStep={g.step} />
    </Section>
  );
}
