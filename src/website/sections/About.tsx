"use client";

import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { ABOUT_SIZES } from "@/shared/lib/media-sizes";
import { Buddy, Cube, Star } from "@/shared/ui/Decor";
import { MediaView } from "@/shared/ui/MediaView";
import { Reveal } from "@/shared/ui/Reveal";
import { iconFor } from "@/shared/ui/icons";
import { Container, Heading, Section } from "../ui";

export function About({ media }: { media: Media | null }) {
  const { t } = useLang();
  const a = t.about;
  return (
    <Section id="about">
      <Container className="grid grid-cols-[0.9fr_1.1fr] items-center gap-14 xl:gap-20">
        <Reveal className="relative mx-auto w-full max-w-[28rem] short:max-w-[25rem]">
          <div aria-hidden="true" className="absolute -inset-3 -rotate-3 pebble bg-sun-soft" />
          <div className="relative aspect-[4/3.6] overflow-hidden pebble border-[6px] border-paper bg-sky-soft shadow-lift">
            <MediaView media={media} alt={a.photoAlt} sizes={ABOUT_SIZES} placeholder={a.placeholder} />
          </div>
          <Star face className="absolute -top-6 -right-5 w-16 animate-float-slow" />
          <Cube tone="coral" className="absolute -bottom-5 -left-5 w-14 animate-float" />
          <Buddy shape="circle" tone="sun" className="absolute -right-4 bottom-10 w-12 animate-float" />
        </Reveal>

        <div>
          <Heading eyebrow={a.eyebrow} title={a.title} />
          <Reveal delay={0.05} className="mt-4 space-y-3 text-[1.02rem] leading-relaxed text-ink-soft 2xl:text-[1.08rem]">
            {a.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <ul className="mt-7 grid grid-cols-3 gap-3 short:mt-6">
            {a.points.map((p, i) => {
              const Icon = iconFor(p.key);
              const tint = ["bg-coral-soft", "bg-sky-soft", "bg-sun-soft"][i];
              return (
                <Reveal as="li" key={p.key} delay={0.08 + i * 0.06} className="rounded-2xl border border-line bg-paper p-4 shadow-card">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl text-ink ${tint}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-[1rem] leading-tight font-extrabold text-ink">{p.title}</h3>
                  <p className="mt-1 text-[0.86rem] leading-snug text-ink-soft">{p.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
