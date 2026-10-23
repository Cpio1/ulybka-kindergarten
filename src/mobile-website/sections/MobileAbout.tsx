"use client";

import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { ABOUT_SIZES } from "@/shared/lib/media-sizes";
import { Cube, Star } from "@/shared/ui/Decor";
import { MediaView } from "@/shared/ui/MediaView";
import { Reveal } from "@/shared/ui/Reveal";
import { iconFor } from "@/shared/ui/icons";
import { Container, Heading, Section } from "../ui";

export function MobileAbout({ media }: { media: Media | null }) {
  const { t } = useLang();
  const a = t.about;
  return (
    <Section id="about">
      <Container>
        <Heading eyebrow={a.eyebrow} title={a.title} />
        <Reveal y={10} className="relative mt-5">
          <div className="relative aspect-[16/11] overflow-hidden pebble border-4 border-paper bg-sky-soft shadow-card">
            <MediaView media={media} alt={a.photoAlt} sizes={ABOUT_SIZES} placeholder={a.placeholder} />
          </div>
          <Star face className="absolute -top-4 right-3 w-11 animate-float-slow" />
          <Cube tone="coral" className="absolute -bottom-3 left-3 w-9" />
        </Reveal>
        <Reveal y={10} className="mt-5 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
          {a.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <ul className="mt-5 space-y-2">
          {a.points.map((p, i) => {
            const Icon = iconFor(p.key);
            const tint = ["bg-coral-soft", "bg-sky-soft", "bg-sun-soft"][i];
            return (
              <Reveal as="li" y={8} key={p.key} delay={i * 0.04} className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-3 shadow-card">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-ink ${tint}`}>
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.98rem] leading-tight font-extrabold text-ink">{p.title}</h3>
                  <p className="mt-0.5 text-[0.85rem] leading-snug text-ink-soft">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
