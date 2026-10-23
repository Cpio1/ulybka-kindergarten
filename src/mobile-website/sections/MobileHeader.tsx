"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { kindergarten, links, navSections } from "@/shared/data/kindergarten";
import { useBodyLock } from "@/shared/hooks/useBodyLock";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { scrollToSection } from "@/shared/lib/scroll";
import { InstagramIcon, WhatsAppIcon } from "@/shared/ui/BrandIcons";
import { Cloud } from "@/shared/ui/Decor";
import { LangSwitch } from "@/shared/ui/LangSwitch";
import { Logo } from "@/shared/ui/Logo";

/** Compact bar + full-screen menu (Esc closes, focus stays inside, page scroll is locked). */
export function MobileHeader() {
  const { t } = useLang();
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const root = panel.current;
    root?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key !== "Tab" || !root) return;
      const items = [...root.querySelectorAll<HTMLElement>("a,button"), toggle.current].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // after the scroll lock is released
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`relative z-20 transition-[background-color,box-shadow] duration-300 ${scrolled || open ? "glass shadow-soft" : ""}`}>
        <div className="mx-auto flex h-15 max-w-[34rem] items-center justify-between gap-2 px-4 min-[400px]:px-5">
          <a href="#home" onClick={go("home")} aria-label={t.header.home} className="min-w-0 shrink rounded-full">
            <Logo size="sm" />
          </a>
          <div className="flex shrink-0 items-center gap-1.5">
            <LangSwitch compact />
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.header.closeMenu : t.header.openMenu}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition active:scale-95"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.header.menu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-10 overflow-y-auto bg-milk pt-15"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 blob-b bg-sky-soft" />
            <Cloud className="absolute top-24 right-6 w-20 animate-float-slow" />
            <nav aria-label={t.header.navLabel} className="relative mx-auto max-w-[34rem] px-4 pt-4 pb-8 min-[400px]:px-5">
              <ul className="space-y-1">
                {navSections.map((id, i) => (
                  <m.li key={id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i, duration: 0.25 }}>
                    <a
                      href={`#${id}`}
                      onClick={go(id)}
                      className="flex min-h-12 items-center rounded-2xl px-3 font-display text-[1.35rem] font-extrabold text-ink transition-colors active:bg-sky-soft"
                    >
                      {t.nav[id]}
                    </a>
                  </m.li>
                ))}
              </ul>
              <div className="mt-6 grid gap-2.5">
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-13 items-center justify-center gap-2 rounded-full bg-sun px-5 font-bold text-ink shadow-sun"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.header.enroll}
                </a>
                <a href={links.tel} className="flex h-13 items-center justify-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-5 font-semibold text-ink tabular-nums">
                  <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                  {kindergarten.phone.display}
                </a>
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold text-ink-soft"
                >
                  <InstagramIcon className="h-4.5 w-4.5" />
                  {kindergarten.instagram.handle}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
