"use client";

import { Clock3, MapPin, Phone } from "lucide-react";
import { kindergarten, links } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";
import { InstagramIcon, WhatsAppIcon } from "@/shared/ui/BrandIcons";
import { MapCard } from "@/shared/ui/MapCard";
import { Reveal } from "@/shared/ui/Reveal";
import { Container, Heading, Section } from "../ui";

export function MobileContacts() {
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
        <Reveal y={10} className="mt-5 rounded-[1.75rem] border border-line bg-paper p-4 shadow-card">
          <p className="font-display text-[1.08rem] font-extrabold text-ink">{c.org}</p>
          <ul className="mt-2 divide-y divide-line">
            {rows.map(({ icon: Icon, label, value, href, external }) => {
              const body = (
                <>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-soft text-sky-deep">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.75rem] text-ink-soft">{label}</span>
                    <span className="block text-[0.92rem] font-semibold break-words text-ink tabular-nums">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex min-h-12 items-center gap-3 py-2.5">
                      {body}
                    </a>
                  ) : (
                    <div className="flex min-h-12 items-center gap-3 py-2.5">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-3 grid gap-2">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp-deep px-4 text-[0.95rem] font-semibold text-white shadow-card active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              {c.whatsapp}
            </a>
            <a href={links.tel} className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-ink/10 px-4 text-[0.95rem] font-semibold text-ink active:scale-[0.98]">
              <Phone className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
              {t.header.call}
            </a>
          </div>
        </Reveal>
        <Reveal y={10} className="mt-3">
          <MapCard width={480} height={360} className="aspect-[4/3] w-full rounded-[1.75rem] border border-line shadow-card" />
        </Reveal>
      </Container>
    </Section>
  );
}
