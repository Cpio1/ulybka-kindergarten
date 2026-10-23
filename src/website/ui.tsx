"use client";

import { Reveal } from "@/shared/ui/Reveal";

/** Shared building blocks of the desktop composition. */

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[72rem] px-8 xl:px-10 2xl:max-w-[80rem] ${className}`}>{children}</div>;
}

/** Natural-height section (never a forced min-height); vertical padding shrinks on short laptop screens. */
export function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} data-section className={`relative py-16 short:py-12 2xl:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, tone = "sky" }: { children: React.ReactNode; tone?: "sky" | "sun" }) {
  const styles = tone === "sun" ? "bg-sun-soft text-ink" : "bg-sky-soft text-sky-deep";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold ${styles}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "sun" ? "bg-sun-deep" : "bg-sky-deep"}`} aria-hidden="true" />
      {children}
    </span>
  );
}

export function Heading({ eyebrow, title, lead, tone, className = "", center = false }: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "sky" | "sun";
  className?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className="mt-3.5 text-[2.1rem] leading-[1.1] font-extrabold tracking-tight text-ink short:text-[1.95rem] 2xl:text-[2.5rem]">{title}</h2>
      {lead && <p className={`mt-3 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft 2xl:text-[1.08rem] ${center ? "mx-auto" : ""}`}>{lead}</p>}
    </Reveal>
  );
}
