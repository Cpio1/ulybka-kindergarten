"use client";

import { groups } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { GroupMotif } from "@/shared/ui/Decor";
import { Reveal } from "@/shared/ui/Reveal";
import { Container, Heading, Section } from "../ui";

const tint = {
  stars: "bg-sky-soft",
  rays: "bg-sun-soft",
  why: "bg-coral-soft/70",
  umka: "bg-paper",
} as const;

/** A vertical "ladder" of small cards, joined by a dotted line: one step per year. */
export function MobileGroups() {
  const { t } = useLang();
  const g = t.groups;
  return (
    <Section id="groups">
      <Container>
        <Heading eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
        <ol className="relative mt-5 space-y-2.5">
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-[calc(0.625rem+1.75rem)] border-l-2 border-dashed border-sky" />
          {groups.map((group, i) => (
            <Reveal as="li" y={8} key={group.id} delay={i * 0.05} className={`relative flex items-center gap-3 rounded-2xl border border-line p-2.5 pr-3 shadow-card ${tint[group.id]}`}>
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-paper shadow-card">
                <GroupMotif motif={group.motif} className="h-10 w-10" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[1.12rem] leading-tight font-black text-ink">«{group.name}»</h3>
                <p className="mt-0.5 text-[0.8rem] leading-snug text-ink-soft">{g.levels[group.id]}</p>
              </div>
              <span className="shrink-0 rounded-full bg-paper px-2.5 py-1 text-[0.8rem] font-bold text-ink tabular-nums shadow-card">{g.age(group.age)}</span>
            </Reveal>
          ))}
        </ol>
        <Reveal y={8}>
          <p className="mt-4 text-[0.88rem] leading-snug text-ink-soft">{g.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
