"use client";

import { useEffect, useRef, useState } from "react";

type StatProps = {
  /** A raw number counts up (BRIEF §5.6) and gets French formatting +
   *  suffix; case-study KPIs already arrive as pre-formatted strings from
   *  MDX frontmatter (e.g. "−33,8 %", "ST40") and render as-is — nothing to
   *  count up in a station code or a methodology name. */
  value: number | string;
  suffix?: string;
  label: string;
  /** Count-up on scroll-into-view, once. Ignored for string values. */
  animate?: boolean;
  className?: string;
};

// Approximates --ease-plot's cubic-bezier(.16,1,.3,1) closely enough for a
// numeric tween (a "soft" deceleration, never linear) without solving the
// bezier by hand for every animation frame.
function easeSoft(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function Stat({ value, suffix = "", label, animate = true, className = "" }: StatProps) {
  const isNumber = typeof value === "number";
  const target = isNumber ? Math.abs(value) : 0;
  const sign = isNumber && value < 0 ? "−" : "";
  const suffixText = suffix.startsWith("%") ? ` ${suffix}` : suffix;

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!isNumber) return;

    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1200;
        const start = performance.now();
        function tick(now: number) {
          const t = Math.min(1, (now - start) / duration);
          setCount(target * easeSoft(t));
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isNumber, target, animate]);

  return (
    <div className={className}>
      <p ref={ref} className="font-data text-data-lg text-accent">
        {isNumber ? (
          <>
            {sign}
            {count.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}
            {suffixText}
          </>
        ) : (
          value
        )}
      </p>
      <p className="font-data text-label mt-1 uppercase text-steel">{label}</p>
    </div>
  );
}
