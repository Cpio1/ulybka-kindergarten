"use client";

import { FolderOpen } from "lucide-react";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { Sparkle } from "@/shared/ui/Decor";
import { DriveButton } from "@/shared/ui/DriveButton";
import { Reveal } from "@/shared/ui/Reveal";
import { Container, Eyebrow, Section } from "../ui";

export function Documents() {
  const { t } = useLang();
  const d = t.documents;
  return (
    <Section id="documents" className="!py-8 short:!py-6">
      <Container>
        <Reveal className="relative flex items-center gap-8 overflow-hidden rounded-[2rem] border border-line bg-paper px-9 py-8 shadow-card">
          <div aria-hidden="true" className="absolute -right-10 -bottom-16 h-48 w-48 rounded-full bg-sun-soft" />
          <span className="relative grid h-20 w-20 shrink-0 place-items-center rounded-[1.6rem] bg-sun text-ink shadow-sun">
            <FolderOpen className="h-9 w-9" aria-hidden="true" />
            <Sparkle className="absolute -top-2 -right-2 w-5" color="#A9DDF3" />
          </span>
          <div className="relative min-w-0 flex-1">
            <Eyebrow>{d.eyebrow}</Eyebrow>
            <h2 className="mt-2.5 text-[1.6rem] leading-tight font-extrabold text-ink">{d.title}</h2>
            <p className="mt-1.5 text-[0.98rem] text-ink-soft">{d.text}</p>
          </div>
          <DriveButton className="relative max-w-[17rem] shrink-0" />
        </Reveal>
      </Container>
    </Section>
  );
}
