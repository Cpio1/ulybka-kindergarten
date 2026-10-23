"use client";

import { useLang } from "@/shared/i18n/LanguageProvider";
import { Buddy, Cloud } from "@/shared/ui/Decor";
import { Reveal } from "@/shared/ui/Reveal";
import { iconFor } from "@/shared/ui/icons";
import { Container, Heading, Section } from "../ui";

const tints = [
  { card: "bg-sky-soft", icon: "bg-sky text-ink" },
  { card: "bg-sun-soft", icon: "bg-sun text-ink" },
  { card: "bg-coral-soft", icon: "bg-coral text-ink" },
  { card: "bg-paper", icon: "bg-ink text-white" },
];

export function Advantages() {
  const { t } = useLang();
  const a = t.advantages;
  return (
    <Section id="advantages">
      <Container>
        <div className="relative flex items-end justify-between gap-8">
          <Heading eyebrow={a.eyebrow} title={a.title} tone="sun" />
          <div aria-hidden="true" className="relative mr-4 hidden h-20 w-40 shrink-0 xl:block">
            <Cloud className="absolute top-0 left-0 w-28 animate-float-slow" />
            <Buddy shape="square" tone="coral" className="absolute right-0 bottom-0 w-14 animate-float" />
          </div>
        </div>
        <ul className="mt-9 grid grid-cols-4 gap-4 short:mt-7">
          {a.items.map((item, i) => {
            const Icon = iconFor(item.key);
            const tint = tints[i % tints.length];
            return (
              <Reveal
                as="li"
                key={item.key}
                delay={i * 0.06} className="h-full">
<div className={`h-full group relative overflow-hidden rounded-[1.75rem] border border-line p-5 shadow-card transition-transform duration-300 hover:-translate-y-1 ${tint.card}`}>
                <span aria-hidden="true" className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/50 transition-transform duration-500 group-hover:scale-125" />
                <span className={`relative grid h-12 w-12 place-items-center rounded-2xl shadow-card ${tint.icon}`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="relative mt-4 text-[1.1rem] leading-tight font-extrabold text-ink">{item.title}</h3>
                <p className="relative mt-1.5 text-[0.9rem] leading-snug text-ink-soft">{item.text}</p>
              </div>
</Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
