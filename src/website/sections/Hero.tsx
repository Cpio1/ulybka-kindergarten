"use client";

import { m } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { groups, links } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media, VideoMedia } from "@/shared/lib/media";
import { HERO_SIZES, frameRatio } from "@/shared/lib/media-sizes";
import { scrollToSection } from "@/shared/lib/scroll";
import { WhatsAppIcon } from "@/shared/ui/BrandIcons";
import { Buddy, Cloud, Cube, GroupMotif, Sparkle, Star, Sun } from "@/shared/ui/Decor";
import { MediaView } from "@/shared/ui/MediaView";
import { iconFor } from "@/shared/ui/icons";
import { Container } from "../ui";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

/** First screen: headline and actions on the left, photo in an organic frame with a few figures on the right. */
export function Hero({ media, video }: { media: Media | null; video: VideoMedia | null }) {
  const { t } = useLang();
  const h = t.hero;
  // a real photo keeps its own proportions in a gently rounded frame; the illustration keeps the blob
  const shape = media ? "frame-soft" : "blob-a";

  return (
    <section id="home" data-section className="relative overflow-hidden pt-28 pb-14 short:pt-24 short:pb-10 2xl:pt-32 2xl:pb-20">
      {/* soft background shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] blob-b bg-sky-soft" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 -left-48 h-80 w-80 rounded-full bg-sun-soft/70 blur-2xl" />

      <Container className="relative grid grid-cols-[1.08fr_0.92fr] items-center gap-12 xl:gap-16">
        <div>
          <m.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[0.85rem] font-semibold text-ink-soft shadow-card">
            <MapPin className="h-4 w-4 text-sky-deep" aria-hidden="true" />
            {h.badge}
          </m.p>

          <m.h1 {...rise(0.06)} className="mt-5 text-[2.7rem] leading-[1.06] font-black tracking-tight text-ink short:text-[2.45rem] xl:text-[3.05rem] 2xl:text-[3.5rem]">
            {h.titleLead}{" "}
            <span className="rounded-md bg-[linear-gradient(transparent_60%,rgb(255_214_90/0.75)_60%,rgb(255_214_90/0.75)_92%,transparent_92%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">{h.titleAccent}</span>
          </m.h1>

          <m.p {...rise(0.12)} className="mt-5 max-w-[33rem] text-[1.1rem] [text-wrap:balance] leading-relaxed text-ink-soft short:mt-4 2xl:text-[1.18rem]">
            {h.subtitle}
          </m.p>

          <m.div {...rise(0.18)} className="mt-7 flex flex-wrap items-center gap-3 short:mt-6">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center gap-2.5 rounded-full bg-sun px-7 text-[1rem] font-bold text-ink shadow-sun transition hover:-translate-y-0.5 hover:bg-[#ffcd38]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {h.enroll}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="group inline-flex h-13 items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-6 text-[1rem] font-semibold text-ink transition hover:-translate-y-0.5 hover:border-sky"
            >
              {h.more}
              <ArrowDown className="h-4.5 w-4.5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </m.div>

          <m.ul {...rise(0.24)} className="mt-9 grid max-w-[34rem] grid-cols-3 gap-3 short:mt-7">
            {h.facts.map((f, i) => {
              const Icon = iconFor(f.key);
              const tint = ["bg-sky-soft text-sky-deep", "bg-sun-soft text-ink", "bg-coral-soft text-ink"][i];
              return (
                <li key={f.key} className="rounded-2xl border border-line bg-paper/90 p-3.5 shadow-card">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl ${tint}`}>
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <p className="mt-2.5 font-display text-[1.02rem] leading-tight font-extrabold text-ink tabular-nums">{f.value}</p>
                  <p className="mt-0.5 text-[0.8rem] leading-snug text-ink-soft">{f.label}</p>
                </li>
              );
            })}
          </m.ul>
        </div>

        <m.div
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-[31rem] short:max-w-[27rem] 2xl:max-w-[35rem]"
        >
          <div aria-hidden="true" className={`absolute inset-0 translate-x-4 translate-y-5 ${shape} bg-sky`} />
          <div className={`relative overflow-hidden ${shape} border-[6px] border-paper bg-sky-soft shadow-lift`} style={{ aspectRatio: frameRatio(media, 1 / 0.94) }}>
            <MediaView media={media} alt={h.photoAlt} sizes={HERO_SIZES} priority placeholder={h.placeholder} />
          </div>

          {video && (
            <div className="absolute -right-3 bottom-[18%] w-[30%] overflow-hidden rounded-3xl border-4 border-paper bg-sky-soft shadow-lift" style={{ aspectRatio: "3 / 4" }}>
              <MediaView media={video} alt={h.photoAlt} sizes="180px" />
            </div>
          )}

          {/* figures: few, small, and sitting on the frame's edges — never over faces in the photo */}
          <Sun face className="absolute -top-10 right-[3%] w-[16%] animate-float-slow" />
          <Cloud className="absolute -top-8 -left-[8%] w-[24%] animate-float" />
          <Star tone="coral" className="absolute bottom-[14%] -left-[7%] w-[9%] animate-float-slow" />
          <Cube tone="sun" className="absolute -bottom-6 right-[14%] w-[11%] animate-float" />
          <Buddy shape="triangle" tone="sky" className="absolute top-[42%] -right-[7%] w-[11%] animate-float-slow" />
          <Sparkle className="absolute -top-4 left-[36%] w-5" color="#A9DDF3" />

          {/* the four groups, as a little badge */}
          <div className="glass absolute -bottom-6 left-[3%] flex items-center gap-2.5 rounded-2xl border border-line py-2 pr-4 pl-2 shadow-card">
            <span className="flex -space-x-2" aria-hidden="true">
              {groups.map((g) => (
                <span key={g.id} className="grid h-8 w-8 place-items-center rounded-full border-2 border-paper bg-milk">
                  <GroupMotif motif={g.motif} className="h-6 w-6" />
                </span>
              ))}
            </span>
            <span className="font-display text-[0.98rem] font-extrabold text-ink">{h.groupsBadge}</span>
          </div>
        </m.div>
      </Container>
    </section>
  );
}
