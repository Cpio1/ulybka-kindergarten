"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import type { Media } from "@/shared/lib/media";
import { Buddy, Sparkle } from "./Decor";

const noop = () => () => {};
/** false during SSR and hydration, true afterwards. */
export const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

type Props = {
  media: Media | null;
  alt: string;
  /** `sizes` for next/image — keep it identical in both layouts for the same photo, so the browser fetches one file */
  sizes: string;
  priority?: boolean;
  /** shown when there is no file yet */
  placeholder?: string;
  className?: string;
  objectPosition?: string;
};

/**
 * Fills its (relatively positioned) parent with a photo, a muted looping video, or an illustrated
 * placeholder until the real file is added to /public.
 */
export function MediaView({ media, alt, sizes, priority = false, placeholder, className = "", objectPosition = "center" }: Props) {
  if (!media) return <MediaPlaceholder label={placeholder} className={className} />;
  if (media.kind === "image") {
    return (
      <Image
        src={media.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
        style={{ objectPosition }}
      />
    );
  }
  return <AutoVideo media={media} label={alt} sizes={sizes} className={className} />;
}

/**
 * Background video: always muted, inline and looping, with the poster as the static cover.
 * The <video> element exists only after hydration — so the server HTML of the hidden layout
 * never downloads a second copy — and it plays only while on screen. With reduced motion or
 * data saver on, it stays on the poster.
 */
function AutoVideo({ media, label, sizes, className }: { media: Extract<Media, { kind: "video" }>; label: string; sizes: string; className: string }) {
  const mounted = useMounted();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const still = reduce || saveData;
    if (still) video.pause();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !still) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <>
      {media.poster && <Image src={media.poster.src} alt="" fill sizes={sizes} className={`object-cover ${className}`} />}
      {mounted && (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover ${className}`}
          poster={media.poster?.src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          disablePictureInPicture
          aria-label={label}
        >
          <source src={media.src} type={media.type} />
        </video>
      )}
    </>
  );
}

/**
 * Calm, on-brand illustration shown until a real photo is added to /public — never a stock photo
 * pretending to be the kindergarten. Soft sky, gentle hills and three smiling figures.
 */
export function MediaPlaceholder({ label, className = "", compact = false, tone = 0 }: { label?: string; className?: string; compact?: boolean; tone?: number }) {
  const sky = ["from-sky-soft to-milk", "from-sun-soft to-milk", "from-coral-soft/70 to-milk"][tone % 3];
  return (
    <div className={`absolute inset-0 overflow-hidden bg-gradient-to-b ${sky} ${className}`}>
      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[38%] w-full" aria-hidden="true">
        <path d="M0 70C70 30 140 40 210 66s130 30 190-6v60H0Z" fill="var(--color-sky)" opacity=".5" />
        <path d="M0 92c80-34 170-38 250-10 60 21 110 18 150 2v36H0Z" fill="var(--color-sun)" opacity=".5" />
      </svg>
      {compact ? (
        <Buddy shape="circle" tone={(["sky", "sun", "coral"] as const)[tone % 3]} className="absolute bottom-[14%] left-1/2 w-[26%] -translate-x-1/2" />
      ) : (
        <div className="absolute inset-x-0 bottom-[17%] flex items-end justify-center gap-[3%]" aria-hidden="true">
          <Buddy shape="square" tone="sun" className="w-[17%] animate-float [animation-delay:-2s]" />
          <Buddy shape="circle" tone="sky" className="mb-[4%] w-[21%] animate-float-slow" />
          <Buddy shape="triangle" tone="coral" className="w-[16%] animate-float [animation-delay:-4s]" />
        </div>
      )}
      <Sparkle className="absolute top-[16%] left-[20%] w-[5%] max-w-6" color="#FFD65A" />
      <Sparkle className="absolute top-[26%] right-[22%] w-[3.5%] max-w-4" color="#FFAF9E" />
      {label && (
        <span className="absolute inset-x-0 top-[13%] flex justify-center px-6">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-center text-[0.8rem] font-medium text-ink-soft shadow-card">
            <ImageIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {label}
          </span>
        </span>
      )}
    </div>
  );
}
