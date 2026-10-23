"use client";

import { ArrowUp } from "lucide-react";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { scrollToSection } from "@/shared/lib/scroll";
import { Logo } from "@/shared/ui/Logo";
import { Container } from "../ui";

export function MobileFooter() {
  const { t } = useLang();
  return (
    <footer className="mt-4 border-t border-line bg-milk-deep/70 pb-24">
      <Container className="flex items-center justify-between gap-3 pt-6">
        <div className="min-w-0">
          <Logo size="sm" />
          <p className="mt-2 text-[0.8rem] leading-snug text-ink-soft">{t.contacts.org}</p>
        </div>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          aria-label={t.footer.up}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </a>
      </Container>
    </footer>
  );
}
