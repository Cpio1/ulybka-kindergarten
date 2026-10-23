"use client";

import { Phone } from "lucide-react";
import { kindergarten, links, navSections } from "@/shared/data/kindergarten";
import { useActiveSection } from "@/shared/hooks/useActiveSection";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { scrollToSection } from "@/shared/lib/scroll";
import { WhatsAppIcon } from "@/shared/ui/BrandIcons";
import { LangSwitch } from "@/shared/ui/LangSwitch";
import { Logo } from "@/shared/ui/Logo";

/** Floating header: transparent over the hero, a frosted pill once the page scrolls. */
export function Header() {
  const { t } = useLang();
  const scrolled = useScrolled(24);
  const active = useActiveSection(navSections);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-2.5">
      <div
        className={`mx-auto flex h-15 max-w-[74rem] items-center justify-between gap-3 rounded-full pr-2 pl-3.5 transition-[background-color,box-shadow,border-color] duration-300 2xl:max-w-[82rem] ${
          scrolled ? "glass border border-line shadow-soft" : "border border-transparent"
        }`}
      >
        <a href="#home" onClick={go("home")} aria-label={t.header.home} className="shrink-0 rounded-full">
          <Logo />
        </a>

        <nav aria-label={t.header.navLabel} className="min-w-0">
          <ul className="flex items-center gap-0.5">
            {navSections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={active === id ? "location" : undefined}
                  className={`block rounded-full px-2.5 py-2 text-[0.88rem] font-medium whitespace-nowrap transition-colors xl:px-3.5 xl:text-[0.92rem] ${
                    active === id ? "bg-sky-soft text-sky-deep" : "text-ink-soft hover:bg-paper hover:text-ink"
                  }`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LangSwitch />
          <a
            href={links.tel}
            aria-label={`${t.header.call}: ${kindergarten.phone.display}`}
            title={kindergarten.phone.display}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-ink transition hover:-translate-y-0.5 hover:border-sky hover:text-sky-deep"
          >
            <Phone className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-sun px-4.5 text-[0.92rem] font-bold whitespace-nowrap text-ink shadow-sun transition hover:-translate-y-0.5 hover:bg-[#ffcd38]"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
            {t.header.enroll}
          </a>
        </div>
      </div>
    </header>
  );
}
