"use client";

import { Clock3, MapPin, Phone } from "lucide-react";
import { kindergarten, links } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { InstagramIcon, WhatsAppIcon } from "@/shared/ui/BrandIcons";
import { Star } from "@/shared/ui/Decor";
import { MapCard } from "@/shared/ui/MapCard";
import { Reveal } from "@/shared/ui/Reveal";
import { Container, Heading, Section } from "../ui";

export function Contacts() {
  const { t } = useLang();
  const c = t.contacts;
  const rows = [
    { icon: MapPin, label: c.address, value: c.addressValue, href: links.twoGisCard, external: true },
    { icon: Phone, label: c.phone, value: kindergarten.phone.display, href: links.tel, external: false },
    { icon: InstagramIcon, label: c.instagram, value: kindergarten.instagram.handle, href: links.instagram, external: true },
    { icon: Clock3, label: c.hours, value: `${kindergarten.hours.opens}–${kindergarten.hours.closes}`, href: null, external: false },
  ];
  return (
    <Section id="contacts">
      <Container>
        <Heading eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
        <div className="mt-8 grid grid-cols-[0.95fr_1.05fr] gap-5 short:mt-6">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-paper p-7 shadow-card">
            <Star className="absolute -top-3 -right-3 w-14 animate-float-slow" />
            <p className="font-display text-[1.25rem] font-extrabold text-ink">{c.org}</p>
            <ul className="mt-4 divide-y divide-line">
              {rows.map(({ icon: Icon, label, value, href, external }) => {
                const body = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-sky-deep">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.8rem] text-ink-soft">{label}</span>
                      <span className="block font-semibold break-words text-ink tabular-nums">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center gap-3.5 rounded-xl py-3 transition-colors hover:text-sky-deep"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3.5 py-3">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp-deep px-5 text-[0.95rem] font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-[#0b6534]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {c.whatsapp}
              </a>
              <a
                href={links.tel}
                className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-5 text-[0.95rem] font-semibold text-ink transition hover:-translate-y-0.5 hover:border-sky"
              >
                <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                {t.header.call}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="min-h-[22rem]">
            <MapCard width={640} height={480} className="h-full min-h-[22rem] rounded-[2rem] border border-line shadow-card" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
