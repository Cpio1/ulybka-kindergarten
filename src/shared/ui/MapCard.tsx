"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { links } from "@/shared/data/kindergarten";
import { useLang } from "@/shared/i18n/LanguageProvider";

/**
 * 2GIS map with the marker on the kindergarten's own 2GIS card (see `twoGis` in the data file).
 * It's 2GIS's static map, loaded lazily; the whole card opens the place in 2GIS, where the
 * route button lives. A static image never traps page scroll on phones.
 */
export function MapCard({ width, height, className = "" }: { width: number; height: number; className?: string }) {
  const { t } = useLang();
  const [ready, setReady] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // the image may finish loading before hydration attaches onLoad
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth) setReady(true);
  }, []);
  return (
    <a
      href={links.twoGisCard}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.contacts.map} — ${t.contacts.mapAlt}`}
      className={`group relative block overflow-hidden bg-sky-soft ${className}`}
    >
      {!ready && (
        <span className="absolute inset-0 grid place-items-center text-sky-deep" aria-hidden="true">
          <MapPin className="h-8 w-8" />
        </span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element -- external 2GIS static map, already sized */}
      <img
        ref={img}
        src={links.twoGisStatic(width, height)}
        alt={t.contacts.mapAlt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover saturate-[0.9] transition-[opacity,transform] duration-700 group-hover:scale-[1.03] ${ready ? "opacity-100" : "opacity-0"}`}
      />
      <span className="glass absolute top-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink shadow-card">
        <MapPin className="h-3.5 w-3.5 text-sky-deep" aria-hidden="true" />
        {t.contacts.addressValue}
      </span>
      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[0.82rem] font-semibold text-white shadow-card transition group-hover:bg-sky-deep">
        {t.contacts.map}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </a>
  );
}
