"use client";

import { ArrowUpRight } from "lucide-react";
import { kindergarten, links } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { InstagramIcon } from "./BrandIcons";
import { Buddy, Cloud, Star, Sun } from "./Decor";

/** Shown while public/images has no photos yet: honest, friendly, and points to Instagram. */
export function GalleryEmpty({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <div className={`relative overflow-hidden border border-line bg-paper text-center shadow-card ${compact ? "rounded-3xl px-5 pt-16 pb-8" : "rounded-[2rem] px-10 py-12"}`}>
      <div className="dots absolute inset-0 text-sky/40" aria-hidden="true" />
      <Sun className={`absolute ${compact ? "top-2 right-3 w-12" : "top-6 right-10 w-20"} animate-float-slow`} />
      <Cloud className={`absolute ${compact ? "top-4 left-3 w-16" : "top-10 left-10 w-28"} animate-float`} />
      {!compact && <Star tone="coral" className="absolute bottom-8 left-24 w-10 animate-float" />}
      {!compact && <Buddy shape="square" tone="sky" className="absolute right-24 bottom-8 w-14 animate-float-slow" />}
      <div className="relative mx-auto max-w-md">
        <p className={`font-display font-extrabold text-ink ${compact ? "text-[1.2rem]" : "text-[1.45rem]"}`}>{t.gallery.empty}</p>
        <p className={`mt-2 text-ink-soft ${compact ? "text-[0.92rem]" : "text-[1rem]"}`}>{t.gallery.emptyHint}</p>
        <a
          href={links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.92rem] font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-sky-deep"
        >
          <InstagramIcon className="h-4.5 w-4.5" />
          {kindergarten.instagram.handle}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
