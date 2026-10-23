"use client";

import { Reveal } from "@/shared/ui/Reveal";

/** Shared building blocks of the phone composition (320–480px, centred on small tablets). */

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[34rem] px-4 min-[400px]:px-5 ${className}`}>{children}</div>;
}

export function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} data-section className={`relative py-10 ${className}`}>
      {children}
    </section>
  );
}

export function Heading({ eyebrow, title, lead, tone = "sky" }: { eyebrow: string; title: string; lead?: string; tone?: "sky" | "sun" }) {
  return (
    <Reveal y={10}>
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.78rem] font-semibold ${tone === "sun" ? "bg-sun-soft text-ink" : "bg-sky-soft text-sky-deep"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${tone === "sun" ? "bg-sun-deep" : "bg-sky-deep"}`} aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-3 text-[1.55rem] leading-[1.15] font-extrabold tracking-tight text-ink min-[400px]:text-[1.7rem]">{title}</h2>
      {lead && <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{lead}</p>}
    </Reveal>
  );
}
