"use client";

import { useCallback, useState } from "react";
import type { Media } from "@/shared/lib/media";
import { mediaRatio } from "@/shared/lib/media-sizes";

/** Collapsed/expanded grid + which item is open in the lightbox. */
export function useGallery(items: Media[], initial: number) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const canExpand = items.length > initial;
  const visible = expanded || !canExpand ? items : items.slice(0, initial);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );
  const close = useCallback(() => setOpen(null), []);
  return {
    visible,
    expanded,
    canExpand,
    hiddenCount: items.length - initial,
    toggle: () => setExpanded((v) => !v),
    open,
    show: (i: number) => setOpen(i),
    close,
    step,
  };
}

export type GalleryRow = { cells: { item: Media; index: number; ratio: number }[]; spacer: number };

/**
 * Justified rows: items in a row get `flex-grow` equal to their aspect ratio, so the whole row
 * shares one height and every photo keeps its proportions — no cropping, reading order kept.
 * A short last row is padded (`spacer`) so it doesn't blow up in height.
 */
export function toRows(items: Media[], perRow: number, minRowRatio: number): GalleryRow[] {
  const rows: GalleryRow[] = [];
  for (let start = 0; start < items.length; start += perRow) {
    const cells = items.slice(start, start + perRow).map((item, k) => ({ item, index: start + k, ratio: mediaRatio(item) }));
    const sum = cells.reduce((acc, c) => acc + c.ratio, 0);
    rows.push({ cells, spacer: Math.max(0, minRowRatio - sum) });
  }
  return rows;
}
