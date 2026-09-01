"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Animate children one-by-one (nth-child stagger) instead of as a single block. */
  stagger?: boolean;
  /** A single line (eyebrow, heading) reveals via a left-to-right clip-path
   *  sweep instead of a fade/rise — the ruler-tick gesture, not a stagger. */
  sweep?: boolean;
  className?: string;
  as?: "div" | "ul" | "ol";
  "data-print-avoid-break"?: boolean;
};

// Scroll-triggered reveal, the same motion family as the hero-reveal keyframe
// in globals.css but fired by IntersectionObserver instead of on mount, for
// content below the fold. Gated behind the `.js-reveal` class the inline
// bootstrap script in layout.tsx adds to <html> — without it (no JS) the
// underlying CSS never hides anything, so content is always visible.
export function Reveal({
  children,
  stagger = false,
  sweep = false,
  className = "",
  as = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variant = sweep ? "reveal-sweep" : stagger ? "reveal-stagger" : "reveal";
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={`${variant} ${visible ? "is-visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
