"use client";

import { groups, links } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { WhatsAppIcon } from "@/shared/ui/BrandIcons";
import { GroupMotif } from "@/shared/ui/Decor";
import { Reveal } from "@/shared/ui/Reveal";
import { Container, Heading, Section } from "../ui";

/** Per-group colour, matched to its motif. */
export const groupTint = {
  stars: { card: "bg-sky-soft", disc: "bg-paper", chip: "bg-paper text-sky-deep" },
  rays: { card: "bg-sun-soft", disc: "bg-paper", chip: "bg-paper text-ink" },
  why: { card: "bg-coral-soft/70", disc: "bg-paper", chip: "bg-paper text-ink" },
  umka: { card: "bg-paper", disc: "bg-sky-soft", chip: "bg-sky-soft text-sky-deep" },
} as const;

export function Groups() {
  const { t } = useLang();
  const g = t.groups;
  return (
    <Section id="groups" className="bg-milk-deep/60">
      <Container>
        <Heading eyebrow={g.eyebrow} title={g.title} lead={g.lead} center className="max-w-2xl" />
        <ul className="mx-auto mt-9 grid max-w-[60rem] grid-cols-2 gap-4 short:mt-7">
          {groups.map((group, i) => {
            const tint = groupTint[group.id];
            return (
              <Reveal
                as="li"
                key={group.id}
                delay={i * 0.06} className="h-full">
<div className={`h-full group relative flex items-center gap-5 overflow-hidden rounded-[1.75rem] border border-line p-5 shadow-card transition-transform duration-300 hover:-translate-y-1 ${tint.card}`}>
                <span className={`grid h-24 w-24 shrink-0 place-items-center rounded-full shadow-card ${tint.disc} 2xl:h-28 2xl:w-28`}>
                  <GroupMotif motif={group.motif} className="h-[72%] w-[72%] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.85rem] font-semibold text-ink-soft">{g.levels[group.id]}</p>
                  <h3 className="mt-0.5 text-[1.6rem] leading-tight font-black text-ink">«{group.name}»</h3>
                  <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-[0.85rem] font-bold tabular-nums shadow-card ${tint.chip}`}>{g.age(group.age)}</span>
                </div>
                <span aria-hidden="true" className="absolute top-4 right-5 font-display text-[1.6rem] font-black text-ink/10">
                  0{i + 1}
                </span>
              </div>
</Reveal>
            );
          })}
        </ul>
        <Reveal className="mt-7 flex items-center justify-center gap-4 text-center">
          <p className="text-[0.95rem] text-ink-soft">{g.note}</p>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 text-[0.92rem] font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-sky-deep"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
            {g.cta}
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
