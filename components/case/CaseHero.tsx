import Image from "next/image";
import type { CaseStudyFrontmatter } from "@/lib/schema";

// Case-study header — replaces the field-grid Cartouche with a full-width
// image (2026-09-01 design change, see CLAUDE.md). Case studies with a real
// project photo (frontmatter.hero) show it; the rest — mostly the
// confidentiality-restricted internship case studies, which can never carry
// a real photo per the PRD's confidentiality rules — get the same
// technical-grid pattern the homepage hero uses, so an empty header still
// reads as a deliberate part of the design system rather than a broken image.
const CORNER_MARKS: [string, string][] = [
  ["left", "top"],
  ["right", "top"],
  ["left", "bottom"],
  ["right", "bottom"],
];

export function CaseHero({ hero }: { hero: CaseStudyFrontmatter["hero"] }) {
  return (
    <div
      data-print-avoid-break
      className="relative aspect-[21/9] w-full overflow-hidden border border-rule bg-surface"
    >
      {hero ? (
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="cover-photo object-cover"
          priority
        />
      ) : (
        <div className="hero-grid-bg absolute inset-0" aria-hidden="true" />
      )}

      {CORNER_MARKS.map(([h, v]) => (
        <span
          key={`${h}-${v}`}
          aria-hidden="true"
          className="corner-mark-draw absolute h-4 w-4 border-ink/40"
          style={{
            [h]: "12px",
            [v]: "12px",
            borderLeftWidth: h === "left" ? "1.5px" : undefined,
            borderRightWidth: h === "right" ? "1.5px" : undefined,
            borderTopWidth: v === "top" ? "1.5px" : undefined,
            borderBottomWidth: v === "bottom" ? "1.5px" : undefined,
            transformOrigin: `${h === "left" ? "0%" : "100%"} ${v === "top" ? "0%" : "100%"}`,
          }}
        />
      ))}
    </div>
  );
}
