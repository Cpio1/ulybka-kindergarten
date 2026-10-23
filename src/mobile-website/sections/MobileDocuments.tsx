"use client";

import { FolderOpen } from "lucide-react";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { DriveButton } from "@/shared/ui/DriveButton";
import { Reveal } from "@/shared/ui/Reveal";
import { Container, Section } from "../ui";

export function MobileDocuments() {
  const { t } = useLang();
  const d = t.documents;
  return (
    <Section id="documents" className="!py-6">
      <Container>
        <Reveal y={10} className="relative overflow-hidden rounded-[1.75rem] border border-line bg-paper p-5 shadow-card">
          <div aria-hidden="true" className="absolute -right-10 -bottom-12 h-32 w-32 rounded-full bg-sun-soft" />
          <div className="relative flex items-center gap-3">
            <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-sun text-ink shadow-sun">
              <FolderOpen className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.78rem] font-semibold text-sky-deep">{d.eyebrow}</p>
              <h2 className="text-[1.2rem] leading-tight font-extrabold text-ink">{d.title}</h2>
            </div>
          </div>
          <p className="relative mt-3 text-[0.9rem] leading-snug text-ink-soft">{d.text}</p>
          <DriveButton className="relative mt-4 w-full" />
        </Reveal>
      </Container>
    </Section>
  );
}
