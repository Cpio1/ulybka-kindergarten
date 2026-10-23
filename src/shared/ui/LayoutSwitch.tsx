"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";

/** Below 1024px the mobile website is shown (phones and portrait tablets). */
export const DESKTOP_QUERY = "(min-width: 64rem)";

type Snapshot = "desktop" | "mobile" | "both";

/** Section the reader is on, measured while scrolling at a settled window width. */
let lastSection: string | null = null;
/** Section to restore after the window crossed the breakpoint. */
let anchor: string | null = null;

function sectionOnScreen() {
  let id: string | null = null;
  for (const el of document.querySelectorAll<HTMLElement>("main [data-section]")) {
    if (el.getClientRects().length && el.getBoundingClientRect().top <= window.innerHeight * 0.35) id = el.id;
  }
  return id;
}

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  const handler = () => {
    // Not measured now: by the time this fires the old layout has already reflowed at the new width.
    anchor = lastSection;
    onChange();
  };
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}

const getSnapshot = (): Snapshot => (window.matchMedia(DESKTOP_QUERY).matches ? "desktop" : "mobile");
// The server can't know the screen: it renders both compositions and CSS shows the right one.
const getServerSnapshot = (): Snapshot => "both";

/**
 * Picks the website or the mobile website by viewport width — never by user agent.
 * Server HTML contains both trees and a media query hides the wrong one, so there is no hydration
 * mismatch and no layout jump. Right after hydration the hidden tree is unmounted, leaving one set
 * of section ids, observers and media. Resizing across the breakpoint swaps the trees in place.
 */
/** Keeps `lastSection` current; measuring pauses while the window is being resized. */
function useSectionTracking() {
  useEffect(() => {
    let width = window.innerWidth;
    let frame = 0;
    let settle = 0;
    const measure = () => {
      if (window.innerWidth === width) lastSection = sectionOnScreen();
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const onResize = () => {
      clearTimeout(settle);
      settle = window.setTimeout(() => {
        width = window.innerWidth;
        measure();
      }, 250);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}

export function LayoutSwitch({ website, mobile }: { website: React.ReactNode; mobile: React.ReactNode }) {
  const layout = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const first = useRef(true);
  useSectionTracking();

  useLayoutEffect(() => {
    if (layout === "both") return;
    document.documentElement.dataset.layout = layout;
    let target = anchor;
    anchor = null;
    // On first load the browser may have tried to jump to an id inside the hidden tree.
    if (first.current && window.location.hash.length > 1) target = decodeURIComponent(window.location.hash.slice(1));
    first.current = false;
    if (target) document.getElementById(target)?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [layout]);

  return (
    <>
      {layout !== "mobile" && <div className="website-root">{website}</div>}
      {layout !== "desktop" && <div className="mobile-root">{mobile}</div>}
    </>
  );
}
