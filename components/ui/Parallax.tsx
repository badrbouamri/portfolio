"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

type ParallaxProps = ComponentPropsWithoutRef<"div"> & {
  /** translateY at the start/end of the element's scroll-through of the
   *  viewport (px). BRIEF §5.4 gives these per-element, e.g. hero photo
   *  0→60, case-study FramedImage -24→24. */
  from: number;
  to: number;
};

// BRIEF §5.4/§6 — disabled below 1024px and under prefers-reduced-motion by
// never attaching the scroll listener at all, not just zeroing the CSS
// output. rAF-throttled, passive scroll listener driving a CSS custom
// property consumed via transform: translateY(var(--parallax-y)) — avoids
// a React re-render on every scroll tick (BRIEF §5.11 performance rules).
export function Parallax({ children, from, to, className = "", style, ...rest }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    let ticking = false;

    function update() {
      ticking = false;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + rect.height;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / total));
      const y = from + progress * (to - from);
      el.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [from, to]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: "translateY(var(--parallax-y, 0px))", ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
