"use client";

import { m } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { links } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";
import { HERO_SIZES } from "@/shared/lib/media-sizes";
import { scrollToSection } from "@/shared/lib/scroll";
import { WhatsAppIcon } from "@/shared/ui/BrandIcons";
import { Buddy, Cloud, Star, Sun } from "@/shared/ui/Decor";
import { MediaView } from "@/shared/ui/MediaView";
import { iconFor } from "@/shared/ui/icons";
import { Container } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
});

/** Phone first screen: headline, two full-width actions, photo, then the three key facts. */
export function MobileHero({ media }: { media: Media | null }) {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section id="home" data-section className="relative overflow-hidden pt-20 pb-8">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-28 h-72 w-72 blob-b bg-sky-soft" />
      <Container className="relative">
        <m.p {...rise(0)} className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-[0.78rem] font-semibold text-ink-soft shadow-card">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-sky-deep" aria-hidden="true" />
          <span className="truncate">{h.badge}</span>
        </m.p>

        <m.h1 {...rise(0.05)} className="mt-4 text-[clamp(1.6rem,7.6vw,2.15rem)] leading-[1.1] font-black tracking-tight text-ink">
          {h.titleLead}{" "}
          <span className="rounded-md bg-[linear-gradient(transparent_60%,rgb(255_214_90/0.75)_60%,rgb(255_214_90/0.75)_92%,transparent_92%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">{h.titleAccent}</span>
        </m.h1>

        <m.p {...rise(0.1)} className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
          {h.subtitle}
        </m.p>

        <m.div {...rise(0.15)} className="mt-5 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-sun px-3 text-[0.95rem] font-bold text-ink shadow-sun active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-4.5 w-4.5 shrink-0" />
            <span className="truncate">{h.enroll}</span>
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            className="flex h-12 min-w-0 items-center justify-center gap-1.5 rounded-full border-2 border-ink/10 bg-paper px-3 text-[0.95rem] font-semibold text-ink active:scale-[0.98]"
          >
            <span className="truncate">{h.more}</span>
            <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="relative mx-auto mt-8 w-[80%] max-w-[20rem]"
        >
          <div aria-hidden="true" className="absolute inset-0 translate-x-2.5 translate-y-3 blob-a bg-sky" />
          <div className="relative aspect-[1/0.92] overflow-hidden blob-a border-4 border-paper bg-sky-soft shadow-lift">
            <MediaView media={media} alt={h.photoAlt} sizes={HERO_SIZES} priority placeholder={h.placeholder} />
          </div>
          <Sun face className="absolute -top-4 right-[4%] w-[20%] animate-float-slow" />
          <Cloud className="absolute top-[18%] -left-[10%] w-[26%] animate-float" />
          <Star tone="coral" className="absolute bottom-[8%] -left-[6%] w-[12%]" />
          <Buddy shape="square" tone="sun" className="absolute -right-[6%] bottom-[16%] w-[14%] animate-float-slow" />
        </m.div>

        <m.ul {...rise(0.2)} className="mt-7 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-paper py-3 shadow-card">
          {h.facts.map((f) => {
            const Icon = iconFor(f.key);
            return (
              <li key={f.key} className="flex min-w-0 flex-col items-center px-1.5 text-center">
                <Icon className="h-4.5 w-4.5 text-sky-deep" aria-hidden="true" />
                <p className="mt-1 font-display text-[0.84rem] leading-tight font-extrabold text-ink tabular-nums min-[400px]:text-[0.92rem]">{f.value}</p>
                <p className="mt-0.5 text-[0.7rem] leading-tight text-ink-soft min-[400px]:text-[0.75rem]">{f.label}</p>
              </li>
            );
          })}
        </m.ul>
      </Container>
    </section>
  );
}
