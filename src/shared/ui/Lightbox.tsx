"use client";

import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useBodyLock } from "@/shared/hooks/useBodyLock";
import { useLang } from "@/shared/i18n/LanguageProvider";
import type { Media } from "@/shared/lib/media";

type Props = {
  items: Media[];
  index: number | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
};

/** Full-screen viewer: Esc / ← → on keyboard, swipe on touch, the whole photo always visible. */
export function Lightbox({ items, index, onClose, onStep }: Props) {
  const { t } = useLang();
  const g = t.gallery;
  const isOpen = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  useBodyLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const returnTo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      returnTo?.focus({ preventScroll: true });
    };
  }, [isOpen, onClose, onStep]);

  if (typeof document === "undefined") return null;
  const item = index !== null ? items[index] : null;
  const many = items.length > 1;

  return createPortal(
    <AnimatePresence>
      {item && index !== null && (
        <m.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={g.viewer}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
          style={{ touchAction: "pan-y pinch-zoom" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onPointerDown={(e) => (swipe.current = { x: e.clientX, y: e.clientY })}
          onPointerUp={(e) => {
            const s = swipe.current;
            swipe.current = null;
            if (!s || !many) return;
            const dx = e.clientX - s.x;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) onStep(dx < 0 ? 1 : -1);
          }}
        >
          <m.div
            key={index}
            className="pointer-events-none relative h-[min(82svh,100%)] w-[min(92vw,1200px)]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            {item.kind === "image" ? (
              <Image src={item.src} alt={g.photoAlt(index + 1)} fill sizes="92vw" className="object-contain" />
            ) : (
              <video
                className="pointer-events-auto absolute inset-0 h-full w-full object-contain"
                src={item.src}
                poster={item.poster?.src}
                controls
                autoPlay
                playsInline
                aria-label={g.videoLabel(index + 1)}
              />
            )}
          </m.div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={g.close}
            className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/25"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          {many && (
            <>
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label={g.prev}
                className="absolute top-1/2 left-2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/25 lg:left-6 lg:h-12 lg:w-12"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label={g.next}
                className="absolute top-1/2 right-2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/25 lg:right-6 lg:h-12 lg:w-12"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
              <p className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 rounded-full bg-white/12 px-3 py-1 text-sm font-semibold text-white tabular-nums" aria-live="polite">
                {index + 1} / {items.length}
              </p>
            </>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
