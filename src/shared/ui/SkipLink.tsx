"use client";

import { useLang } from "@/shared/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
    >
      {t.skip}
    </a>
  );
}
