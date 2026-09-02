import { type ReactNode } from "react";

type CardVariant = "default" | "feature" | "flat";

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
};

// BRIEF §3 <Card />. `feature` is taller (image-topped project cards);
// `flat` opts out of the hover treatment entirely (e.g. a card that's
// already the active/selected state). Hover only fires on hover-capable
// pointers — `card-hover` below is gated on `@media (hover: hover)` in CSS,
// so tapping on mobile never leaves a stuck hover state.
const variants: Record<CardVariant, string> = {
  default: "card-hover",
  feature: "card-hover min-h-[420px]",
  flat: "",
};

export function Card({ children, variant = "default", className = "" }: CardProps) {
  return (
    <div
      className={`rounded-hairline border border-rule bg-surface p-[28px] transition-[transform,border-color,box-shadow] duration-[240ms] ${variants[variant]} ${className}`}
      style={{ transitionTimingFunction: "var(--ease-interact)" }}
    >
      {children}
    </div>
  );
}
