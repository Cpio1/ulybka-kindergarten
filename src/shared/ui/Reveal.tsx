"use client";

import { m } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** travel distance in px; the mobile website uses less */
  y?: number;
  as?: "div" | "li" | "article";
};

/** Fades a block in once when it scrolls into view. Transform + opacity only — cheap on phones. */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: Props) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
