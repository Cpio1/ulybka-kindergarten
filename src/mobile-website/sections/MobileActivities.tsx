"use client";

import { useLang } from "@/shared/i18n/LanguageProvider";
import { Cube, Star } from "@/shared/ui/Decor";
import { Reveal } from "@/shared/ui/Reveal";
import { iconFor } from "@/shared/ui/icons";
import { Container, Heading, Section } from "../ui";

const tones = ["bg-sun text-ink", "bg-coral text-ink", "bg-sky text-ink", "bg-ink text-white"];

export function MobileActivities() {
  const { t } = useLang();
  const a = t.activities;
  return (
    <Section id="activities">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-sky-soft p-4 min-[400px]:p-5">
          <div aria-hidden="true" className="dots absolute inset-0 text-sky/50 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" />
          <Star tone="sun" className="absolute top-4 right-4 w-8 animate-float-slow" />
          <div className="relative">
            <Heading eyebrow={a.eyebrow} title={a.title} lead={a.lead} tone="sun" />
            <ul className="mt-4 grid grid-cols-1 gap-2 min-[440px]:grid-cols-2">
              {a.items.map((item, i) => {
                const Icon = iconFor(item.key);
                return (
                  <Reveal as="li" y={8} key={item.key} delay={i * 0.04} className="flex items-start gap-3 rounded-2xl bg-paper p-3 shadow-card min-[440px]:block">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center blob-a ${tones[i]}`}>
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[0.95rem] leading-tight font-extrabold text-ink min-[440px]:mt-2">{item.title}</h3>
                      <p className="mt-1 text-[0.82rem] leading-snug text-ink-soft">{item.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
            <p className="mt-3 text-[0.82rem] leading-snug text-ink-soft">{a.note}</p>
          </div>
          <Cube tone="coral" className="absolute -right-2 -bottom-2 w-10 opacity-90" />
        </div>
      </Container>
    </Section>
  );
}
