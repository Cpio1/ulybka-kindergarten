"use client";

import { ArrowUp } from "lucide-react";
import { kindergarten, links, navSections } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { scrollToSection } from "@/shared/lib/scroll";
import { InstagramIcon, WhatsAppIcon } from "@/shared/ui/BrandIcons";
import { Logo } from "@/shared/ui/Logo";
import { Container } from "../ui";

export function Footer() {
  const { t } = useLang();
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };
  return (
    <footer className="mt-6 border-t border-line bg-milk-deep/70">
      <Container className="flex items-center justify-between gap-8 py-8">
        <div>
          <Logo />
          <p className="mt-2 text-[0.88rem] text-ink-soft">{t.footer.tagline}</p>
          <p className="mt-1 text-[0.8rem] text-ink-soft">{t.contacts.org}</p>
        </div>
        <nav aria-label={t.header.navLabel}>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.9rem]">
            {navSections.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={go(id)} className="text-ink-soft transition-colors hover:text-ink">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${kindergarten.instagram.handle}`} className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink shadow-card transition hover:text-sky-deep">
            <InstagramIcon className="h-4.5 w-4.5" />
          </a>
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={t.contacts.whatsapp} className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink shadow-card transition hover:text-whatsapp-deep">
            <WhatsAppIcon className="h-4.5 w-4.5" />
          </a>
          <a href="#home" onClick={go("home")} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-[0.88rem] font-semibold text-white transition hover:bg-sky-deep">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            {t.footer.up}
          </a>
        </div>
      </Container>
    </footer>
  );
}
