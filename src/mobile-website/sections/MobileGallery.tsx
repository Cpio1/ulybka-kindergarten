"use client";

import { ChevronDown } from "lucide-react";
import { toRows, useGallery } from "@/shared/hooks/useGallery";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { ImageMedia, VideoMedia } from "@/shared/lib/media";
import { GalleryEmpty } from "@/shared/ui/GalleryEmpty";
import { GalleryTile } from "@/shared/ui/GalleryTile";
import { Lightbox } from "@/shared/ui/Lightbox";
import { Reveal } from "@/shared/ui/Reveal";
import { VideoBlock } from "@/shared/ui/VideoBlock";
import { Container, Heading, Section } from "../ui";

/** Two photos per row at their own proportions; 4 at first, the rest behind "show more". */
export function MobileGallery({ items, videos }: { items: ImageMedia[]; videos: VideoMedia[] }) {
  const { t } = useLang();
  const g = useGallery(items, 4);
  const rows = toRows(g.visible, 2, 1.4);
  return (
    <Section id="gallery">
      <Container>
        <Heading eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
        <div className="mt-5">
          {items.length === 0 ? (
            <GalleryEmpty compact />
          ) : (
            <div className="flex flex-col gap-2">
              {rows.map((row, r) => (
                <Reveal key={r} y={8} className="flex gap-2">
                  {row.cells.map(({ item, index, ratio }) => (
                    <div key={item.src} className="min-w-0 overflow-hidden rounded-2xl" style={{ flex: `${ratio} 1 0`, aspectRatio: ratio }}>
                      <GalleryTile item={item} index={index} onOpen={g.show} sizes="(min-width: 544px) 270px, 50vw" />
                    </div>
                  ))}
                  {row.spacer > 0 && <span style={{ flex: `${row.spacer} 1 0` }} aria-hidden="true" />}
                </Reveal>
              ))}
            </div>
          )}
          {g.canExpand && (
            <button
              type="button"
              onClick={g.toggle}
              aria-expanded={g.expanded}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-ink/10 bg-paper text-[0.95rem] font-semibold text-ink active:scale-[0.98]"
            >
              {g.expanded ? t.gallery.less : `${t.gallery.more} · ${g.hiddenCount}`}
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
