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

/** Justified rows of three: every photo keeps its own proportions, nothing is cropped into a square. */
export function Gallery({ items, videos }: { items: ImageMedia[]; videos: VideoMedia[] }) {
  const { t } = useLang();
  const g = useGallery(items, 6);
  const rows = toRows(g.visible, 3, 3.4);

  return (
    <Section id="gallery">
      <Container>
        <Heading eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
        <div className="mt-8 short:mt-6">
          {items.length === 0 ? (
            <GalleryEmpty />
          ) : (
            <div className="flex flex-col gap-3">
              {rows.map((row, r) => (
                <Reveal key={r} className="flex gap-3">
                  {row.spacer > 0 && <span style={{ flex: `${row.spacer / 2} 1 0` }} aria-hidden="true" />}
                  {row.cells.map(({ item, index, ratio }) => (
                    <div key={item.src} className="min-w-0 overflow-hidden rounded-[1.25rem] shadow-card" style={{ flex: `${ratio} 1 0`, aspectRatio: ratio }}>
                      <GalleryTile item={item} index={index} onOpen={g.show} sizes="(min-width: 1536px) 480px, 33vw" />
                    </div>
                  ))}
                  {row.spacer > 0 && <span style={{ flex: `${row.spacer / 2} 1 0` }} aria-hidden="true" />}
                </Reveal>
              ))}
            </div>
          )}
          {g.canExpand && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={g.toggle}
                aria-expanded={g.expanded}
                className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-6 text-[0.95rem] font-semibold text-ink transition hover:-translate-y-0.5 hover:border-sky"
              >
                {g.expanded ? t.gallery.less : `${t.gallery.more} · ${g.hiddenCount}`}
                <ChevronDown className={`h-4.5 w-4.5 transition-transform ${g.expanded ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </div>
          )}
          <VideoBlock videos={videos} />
        </div>
      </Container>
      <Lightbox items={items} index={g.open} onClose={g.close} onStep={g.step} />
    </Section>
  );
}
