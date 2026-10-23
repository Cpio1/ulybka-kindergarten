"use client";

import { useLang } from "@/shared/i18n/LanguageProvider";
import { Reveal } from "@/shared/ui/Reveal";
import { iconFor } from "@/shared/ui/icons";
import { Container, Heading, Section } from "../ui";

const tints = ["bg-sky text-ink", "bg-sun text-ink", "bg-coral text-ink", "bg-ink text-white"];

/** One compact row per advantage — long Russian/Kazakh words never get squeezed into narrow tiles. */
export function MobileAdvantages() {
  const { t } = useLang();
  const a = t.advantages;
  return (
    <Section id="advantages" className="!pt-4">
      <Container>
        <div className="rounded-[1.75rem] bg-sun-soft/70 p-4 min-[400px]:p-5">
          <Heading eyebrow={a.eyebrow} title={a.title} tone="sun" />
          <ul className="mt-4 grid gap-2">
            {a.items.map((item, i) => {
              const Icon = iconFor(item.key);
              return (
                <Reveal as="li" y={8} key={item.key} delay={i * 0.04} className="flex items-center gap-3 rounded-2xl bg-paper p-3 shadow-card">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tints[i]}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[0.96rem] leading-tight font-extrabold text-ink">{item.title}</h3>
                    <p className="mt-0.5 text-[0.82rem] leading-snug text-ink-soft">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
