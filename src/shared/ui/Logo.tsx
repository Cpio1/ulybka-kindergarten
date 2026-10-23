"use client";

import { useLang } from "@/shared/i18n/LanguageProvider";

/** Sun-yellow circle over a sky circle with a single smile — the same mark as the favicon (src/app/icon.svg). */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <circle cx="38" cy="37" r="24" fill="var(--color-sky)" />
      <circle cx="29" cy="30" r="25" fill="var(--color-sun)" />
      <ellipse cx="20" cy="17" rx="6" ry="3.4" fill="#fff" opacity=".45" transform="rotate(-30 20 17)" />
      <path d="M15.5 31.5Q29 49 42.5 31.5" fill="none" stroke="var(--color-ink)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="47" cy="13" r="4" fill="var(--color-coral)" />
    </svg>
  );
}

/** Mark + wordmark. «Улыбка» is a proper name: never translated or upper-cased. */
export function Logo({ size = "md", className = "" }: { size?: "sm" | "md"; className?: string }) {
  const mark = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const { t } = useLang();
  const text = size === "sm" ? "text-[1.3rem]" : "text-[1.45rem]";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className={`${mark} shrink-0`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display ${text} font-black tracking-tight text-ink`}>Улыбка</span>
        <span className="mt-0.5 text-[0.62rem] font-semibold tracking-[0.08em] text-ink-soft">{t.logoCaption}</span>
      </span>
    </span>
  );
}
