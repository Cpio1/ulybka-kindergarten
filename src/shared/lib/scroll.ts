/** Smoothly brings a section to the top, below the fixed header (CSS scroll-padding-top). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
}
