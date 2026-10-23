"use client";

import { useId } from "react";

/**
 * Soft, "3D-ish" decorative figures drawn in SVG: an off-centre radial gradient gives volume,
 * a small white glint gives gloss, and a CSS drop-shadow (the `lift` prop) sits them on the page.
 * Gradient ids come from useId, so the desktop and mobile trees (both in the server HTML) never clash.
 * All figures are decorative: aria-hidden, no focus, no pointer events.
 */

type Props = { className?: string; face?: boolean; lift?: boolean };

const shadow = "drop-shadow-[0_10px_14px_rgb(41_56_76/0.14)]";
const base = (className = "", lift = true) => `pointer-events-none select-none ${lift ? shadow : ""} ${className}`;

function Face({ cx, cy, scale = 1, cheeks = true }: { cx: number; cy: number; scale?: number; cheeks?: boolean }) {
  const s = scale;
  return (
    <g>
      <circle cx={cx - 8 * s} cy={cy - 3 * s} r={2.6 * s} fill="#29384C" />
      <circle cx={cx + 8 * s} cy={cy - 3 * s} r={2.6 * s} fill="#29384C" />
      <path
        d={`M${cx - 6 * s} ${cy + 4 * s} q${6 * s} ${6 * s} ${12 * s} 0`}
        fill="none"
        stroke="#29384C"
        strokeWidth={2.6 * s}
        strokeLinecap="round"
      />
      {cheeks && (
        <>
          <ellipse cx={cx - 14 * s} cy={cy + 3 * s} rx={3.4 * s} ry={2.2 * s} fill="#FFAF9E" opacity=".9" />
          <ellipse cx={cx + 14 * s} cy={cy + 3 * s} rx={3.4 * s} ry={2.2 * s} fill="#FFAF9E" opacity=".9" />
        </>
      )}
    </g>
  );
}

const STAR = "50,12 61.2,36.6 88,39.6 68.1,57.9 73.5,84.4 50,71 26.5,84.4 31.9,57.9 12,39.6 38.8,36.6";

export function Star({ className, face = false, lift = true, tone = "sun" }: Props & { tone?: "sun" | "sky" | "coral" }) {
  const id = useId();
  const [hi, mid, lo] = {
    sun: ["#FFF0B0", "#FFD65A", "#F2B02C"],
    sky: ["#E6F6FD", "#A9DDF3", "#6FB7DA"],
    coral: ["#FFE1D9", "#FFAF9E", "#F08B74"],
  }[tone];
  return (
    <svg viewBox="0 0 100 100" className={base(className, lift)} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor={hi} />
          <stop offset=".5" stopColor={mid} />
          <stop offset="1" stopColor={lo} />
        </radialGradient>
      </defs>
      <polygon points={STAR} fill={`url(#${id})`} stroke={`url(#${id})`} strokeWidth="9" strokeLinejoin="round" />
      <ellipse cx="40" cy="33" rx="7" ry="4" fill="#fff" opacity=".55" transform="rotate(-30 40 33)" />
      {face && <Face cx={50} cy={55} scale={0.62} />}
    </svg>
  );
}

export function Sun({ className, face = false, lift = true }: Props) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className={base(className, lift)} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id} cx="38%" cy="34%" r="70%">
          <stop offset="0" stopColor="#FFF2B8" />
          <stop offset=".55" stopColor="#FFD65A" />
          <stop offset="1" stopColor="#F4B32E" />
        </radialGradient>
      </defs>
      <g stroke="#FFD65A" strokeWidth="6" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="50" y1="6" x2="50" y2="15" transform={`rotate(${i * 45} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="27" fill={`url(#${id})`} />
      <ellipse cx="40" cy="38" rx="7" ry="4.5" fill="#fff" opacity=".5" transform="rotate(-30 40 38)" />
      {face && <Face cx={50} cy={52} scale={0.7} />}
    </svg>
  );
}

export function Cloud({ className, face = false, lift = true }: Props) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 80" className={base(className, lift)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".65" stopColor="#F4FAFE" />
          <stop offset="1" stopColor="#D3ECF8" />
        </linearGradient>
      </defs>
      <path
        d="M30 70h62a19 19 0 0 0 3.5-37.7A27 27 0 0 0 44.6 24 20 20 0 0 0 30 70Z"
        fill={`url(#${id})`}
      />
      <ellipse cx="54" cy="30" rx="10" ry="4.5" fill="#fff" opacity=".9" transform="rotate(-12 54 30)" />
      {face && <Face cx={62} cy={52} scale={0.6} />}
    </svg>
  );
}

/** Isometric toy cube; three faces in three shades of one colour. */
export function Cube({ className, lift = true, tone = "sky" }: Omit<Props, "face"> & { tone?: "sun" | "sky" | "coral" }) {
  const [top, left, right] = {
    sun: ["#FFE68F", "#FFD65A", "#EDB534"],
    sky: ["#D2EEFA", "#A9DDF3", "#7EC3E2"],
    coral: ["#FFD3C8", "#FFAF9E", "#EE917B"],
  }[tone];
  return (
    <svg viewBox="0 0 100 100" className={base(className, lift)} aria-hidden="true" focusable="false">
      <g strokeLinejoin="round" strokeWidth="5">
        <polygon points="50,12 86,31 50,50 14,31" fill={top} stroke={top} />
        <polygon points="14,31 50,50 50,90 14,71" fill={left} stroke={left} />
        <polygon points="50,50 86,31 86,71 50,90" fill={right} stroke={right} />
      </g>
      <path d="M22 31 50 16" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

/** Small smiling geometric character: a round pebble, a soft triangle or a squircle. */
export function Buddy({ className, lift = true, shape = "circle", tone = "sky" }: Props & { shape?: "circle" | "triangle" | "square"; tone?: "sun" | "sky" | "coral" }) {
  const id = useId();
  const [hi, mid, lo] = {
    sun: ["#FFF0B0", "#FFD65A", "#F2B02C"],
    sky: ["#EAF7FD", "#A9DDF3", "#72B8D9"],
    coral: ["#FFE4DC", "#FFAF9E", "#EF8C76"],
  }[tone];
  const body = {
    circle: <circle cx="50" cy="52" r="36" fill={`url(#${id})`} />,
    triangle: (
      <path d="M50 14c4 0 7 2 9 6l29 52c4 8-1 16-10 16H22c-9 0-14-8-10-16l29-52c2-4 5-6 9-6Z" fill={`url(#${id})`} />
    ),
    square: <rect x="14" y="16" width="72" height="72" rx="24" fill={`url(#${id})`} />,
  }[shape];
  return (
    <svg viewBox="0 0 100 100" className={base(className, lift)} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id} cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor={hi} />
          <stop offset=".5" stopColor={mid} />
          <stop offset="1" stopColor={lo} />
        </radialGradient>
      </defs>
      {body}
      <ellipse cx="36" cy="32" rx="8" ry="4.5" fill="#fff" opacity=".55" transform="rotate(-28 36 32)" />
      <Face cx={50} cy={shape === "triangle" ? 64 : 56} scale={0.75} />
    </svg>
  );
}

/** Four-point sparkle for quiet accents. */
export function Sparkle({ className, color = "#FFD65A" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`pointer-events-none ${className ?? ""}`} aria-hidden="true" focusable="false">
      <path d="M12 1.5c.7 5.4 2.9 8.2 10.5 10.5-7.6 2.3-9.8 5.1-10.5 10.5C11.3 17.1 9.1 14.3 1.5 12 9.1 9.7 11.3 6.9 12 1.5Z" fill={color} />
    </svg>
  );
}

/** «Умка» — a friendly polar bear cub (the group's own character). */
export function Bear({ className, lift = true }: Omit<Props, "face">) {
  const id = useId();
  const head = `${id}h`;
  const ear = `${id}e`;
  return (
    <svg viewBox="0 0 100 100" className={base(className, lift)} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={head} cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".6" stopColor="#F3F9FD" />
          <stop offset="1" stopColor="#BFE3F4" />
        </radialGradient>
        <radialGradient id={ear} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#C9E8F6" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="26" r="13" fill={`url(#${ear})`} />
      <circle cx="76" cy="26" r="13" fill={`url(#${ear})`} />
      <circle cx="24" cy="26" r="6.5" fill="#FFCFC3" />
      <circle cx="76" cy="26" r="6.5" fill="#FFCFC3" />
      <ellipse cx="50" cy="55" rx="38" ry="35" fill={`url(#${head})`} />
      <ellipse cx="50" cy="66" rx="16" ry="12" fill="#FFFDF5" />
      <ellipse cx="50" cy="60.5" rx="6" ry="4.2" fill="#29384C" />
      <ellipse cx="48.5" cy="59.4" rx="2" ry="1.1" fill="#fff" opacity=".7" />
      <path d="M50 64.5v3.5M44.5 70q5.5 4.5 11 0" fill="none" stroke="#29384C" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="36" cy="48" r="3.4" fill="#29384C" />
      <circle cx="64" cy="48" r="3.4" fill="#29384C" />
      <circle cx="37" cy="46.8" r="1" fill="#fff" />
      <circle cx="65" cy="46.8" r="1" fill="#fff" />
      <ellipse cx="27" cy="62" rx="5" ry="3" fill="#FFAF9E" opacity=".75" />
      <ellipse cx="73" cy="62" rx="5" ry="3" fill="#FFAF9E" opacity=".75" />
      <ellipse cx="36" cy="32" rx="9" ry="4.5" fill="#fff" opacity=".8" transform="rotate(-24 36 32)" />
    </svg>
  );
}

/** «Почемучки» — a question bubble and a magnifier: curiosity and discovery. */
export function Curious({ className, lift = true }: Omit<Props, "face">) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className={base(className, lift)} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id} cx="36%" cy="30%" r="80%">
          <stop offset="0" stopColor="#EAF7FD" />
          <stop offset=".55" stopColor="#A9DDF3" />
          <stop offset="1" stopColor="#6FB6D8" />
        </radialGradient>
      </defs>
      <path d="M18 12h46a14 14 0 0 1 14 14v26a14 14 0 0 1-14 14H38l-14 12v-12h-6A14 14 0 0 1 4 52V26a14 14 0 0 1 14-14Z" fill={`url(#${id})`} />
      <path d="M33 31a8 8 0 1 1 11.5 7.2c-2.4 1.2-3.5 2.6-3.5 5.3v1.5" fill="none" stroke="#29384C" strokeWidth="5" strokeLinecap="round" />
      <circle cx="41" cy="54" r="3.2" fill="#29384C" />
      <circle cx="73" cy="70" r="13" fill="#FFFDF5" stroke="#FFD65A" strokeWidth="6" />
      <path d="M83 80l9 9" stroke="#F2B02C" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="69" cy="66" rx="4" ry="2.4" fill="#A9DDF3" opacity=".8" transform="rotate(-30 69 66)" />
    </svg>
  );
}

/** Group motifs, keyed by `groups[].motif` in the data file. */
export function GroupMotif({ motif, className = "" }: { motif: "stars" | "sun" | "questions" | "bear"; className?: string }) {
  switch (motif) {
    case "stars":
      return (
        <span className={`relative block ${className}`} aria-hidden="true">
          <Star face className="absolute inset-[6%_14%_14%_6%] h-auto w-[80%]" />
          <Star tone="sky" className="absolute top-0 right-0 w-[34%]" />
          <Sparkle className="absolute bottom-[6%] right-[10%] w-[16%]" color="#FFAF9E" />
        </span>
      );
    case "sun":
      return (
        <span className={`relative block ${className}`} aria-hidden="true">
          <Sun face className="absolute inset-0 m-auto w-[90%]" />
        </span>
      );
    case "questions":
      return (
        <span className={`relative block ${className}`} aria-hidden="true">
          <Curious className="absolute inset-0 m-auto w-[92%]" />
        </span>
      );
    case "bear":
      return (
        <span className={`relative block ${className}`} aria-hidden="true">
          <Bear className="absolute inset-0 m-auto w-[92%]" />
        </span>
      );
  }
}
