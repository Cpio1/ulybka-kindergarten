"use client";

import { links } from "@/shared/data/kindergarten";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { WhatsAppIcon } from "./BrandIcons";

/** Floating WhatsApp button; slides in once the hero's own buttons have scrolled away. */
export function WhatsAppFab({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  const shown = useScrolled(compact ? 420 : 520);
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappFab}
      tabIndex={shown ? undefined : -1}
      aria-hidden={shown ? undefined : true}
      className={`group fixed z-40 grid place-items-center rounded-full bg-whatsapp text-white shadow-[0_14px_28px_-10px_rgb(18_140_75/0.7)] ring-4 ring-white/70 transition-[transform,opacity] duration-300 hover:scale-105 ${
        compact
          ? "right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] h-13 w-13"
          : "right-6 bottom-6 h-14 w-14"
      } ${shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <WhatsAppIcon className={compact ? "h-6.5 w-6.5" : "h-7 w-7"} />
      {!compact && (
        <span className="pointer-events-none absolute right-full mr-3 rounded-full bg-ink px-3 py-1.5 text-[0.82rem] font-semibold whitespace-nowrap text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          {t.whatsappFab}
        </span>
      )}
    </a>
  );
}
