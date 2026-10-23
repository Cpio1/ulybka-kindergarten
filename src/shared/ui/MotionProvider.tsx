"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/** Small motion bundle (`m` components only) and OS-level reduced motion respected everywhere. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
