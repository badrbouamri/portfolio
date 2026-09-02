import { type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  // Owner request, 2026-09-02: reduced vertical padding for short,
  // transitional blocks (e.g. the homepage's one-paragraph positioning
  // note) that don't need the same breathing room as a full section.
  tight?: boolean;
};

// Redesign Phase 6: eyebrow now goes through <SectionLabel /> (brass
// chevron + tracked caps, BRIEF §3) and the title picks up the new
// text-h2/font-display type-scale token instead of the pre-redesign
// text-xl (31px sans) — this one change cascades the new heading scale to
// every page that uses Section (Parcours, Compétences, Contact, Mentions
// légales) plus the homepage sections that already relied on this default.
export function Section({ eyebrow, title, children, className = "", tight = false }: SectionProps) {
  return (
    <section
      className={`section mx-auto w-full max-w-[1200px] px-4 sm:px-6 ${tight ? "section-tight" : ""} ${className}`}
    >
      {eyebrow ? (
        <Reveal sweep>
          <SectionLabel className="mb-2">{eyebrow}</SectionLabel>
        </Reveal>
      ) : null}
      {title ? (
        <Reveal sweep>
          <h2 className="text-h2 font-display mb-4 text-ink">{title}</h2>
        </Reveal>
      ) : null}
      {children}
    </section>
  );
}
