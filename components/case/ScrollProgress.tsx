"use client";

import { useEffect, useRef } from "react";

// BRIEF §5.9 — a 1px --accent filet at the top of the viewport tracking
// scroll progress, /projets/[slug] only (long articles). rAF-throttled
// scroll listener driving a CSS custom property, same pattern as
// Parallax.tsx, consumed via transform: scaleX() so the browser never
// re-renders React on scroll. Disabled under prefers-reduced-motion (still
// rendered, just static at 0 — a progress bar isn't really "motion" in the
// decorative sense, but a scroll-linked transform update on every frame is
// exactly what the brief's reduced-motion rule targets).
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    function update() {
      ticking = false;
      if (!el) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      el.style.setProperty("--scroll-progress", progress.toFixed(4));
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} aria-hidden className="scroll-progress fixed left-0 top-0 z-40 h-px w-full bg-accent" />;
}
