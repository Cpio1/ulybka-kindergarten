"use client";

import { useLang } from "@/shared/i18n/LanguageProvider";
import { Cube, Sparkle, Star } from "@/shared/ui/Decor";
import { Reveal } from "@/shared/ui/Reveal";
import { iconFor } from "@/shared/ui/icons";
import { Container, Heading, Section } from "../ui";

const tones = ["bg-sun text-ink", "bg-coral text-ink", "bg-sky text-ink", "bg-ink text-white"];

/** Play, creativity, communication, growth — a calm panel, no claims about specific classes. */
export function Activities() {
  const { t } = useLang();
  const a = t.activities;
  return (
    <Section id="activities">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sky-soft px-10 py-11 short:py-9 xl:px-14">
          <div aria-hidden="true" className="dots absolute inset-0 text-sky/50 [mask-image:linear-gradient(to_right,black,transparent_55%)]" />
          <Cube tone="sun" className="absolute -bottom-4 left-[30%] w-14 animate-float" />
          <Star tone="sky" className="absolute top-7 right-8 w-9 animate-float-slow" />
          <Sparkle className="absolute bottom-10 left-10 w-5" color="#FFAF9E" />

          <div className="relative grid grid-cols-[0.8fr_1.2fr] items-center gap-10 xl:gap-14">
            <div>
              <Heading eyebrow={a.eyebrow} title={a.title} lead={a.lead} tone="sun" />
              <Reveal delay={0.1}>
                <p className="mt-5 inline-flex rounded-2xl bg-paper/80 px-4 py-2.5 text-[0.88rem] leading-snug text-ink-soft">{a.note}</p>
              </Reveal>
            </div>
            <ul className="grid grid-cols-2 gap-4">
              {a.items.map((item, i) => {
                const Icon = iconFor(item.key);
                return (
                  <Reveal
                    as="li"
                    key={item.key}
                    delay={i * 0.06} className={i % 2 ? "h-full pt-5" : "h-full"}>
<div className={`h-full group rounded-[1.6rem] bg-paper p-5 shadow-card transition-transform duration-300 hover:-translate-y-1`}>
                    <span className={`grid h-11 w-11 place-items-center blob-a transition-transform duration-500 group-hover:rotate-12 ${tones[i]}`}>
                      <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-3.5 text-[1.08rem] leading-tight font-extrabold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-[0.88rem] leading-snug text-ink-soft">{item.text}</p>
                  </div>
</Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
