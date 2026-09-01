import Image from "next/image";
import type { OrganisationInfo } from "@/lib/organisations";

function ExternalLinkGlyph() {
  return (
    <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" className="shrink-0">
      <path
        d="M4 2h6v6M10 2 2 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// A "worked with" credibility badge: grayscale at rest, colour on hover/focus
// (redesign-brief.md §2.2), linking out to the organisation's own site — not
// the case study, which is already linked from Parcours/Preuves.
export function OrgLogo({
  organisation,
  officialSiteLabel,
  compact = false,
}: {
  organisation: OrganisationInfo;
  officialSiteLabel: string;
  // Mobile-context variant (adapt pass, 2026-08-29): shrinks the card and
  // hides the caption visually (kept for screen readers via sr-only) so all
  // four logos fit one nowrap row on narrow viewports. Default is unchanged.
  compact?: boolean;
}) {
  return (
    <a
      href={organisation.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${organisation.name} — ${officialSiteLabel}`}
      className={`group flex flex-col items-center border border-rule bg-surface transition-colors hover:border-accent focus-visible:border-accent ${
        compact ? "gap-1 px-2 py-2" : "gap-2 px-4 py-3"
      }`}
    >
      <Image
        src={organisation.logo.src}
        alt=""
        width={organisation.logo.width}
        height={organisation.logo.height}
        className={`w-auto object-contain grayscale opacity-80 transition-[filter,opacity] duration-200 group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100 ${
          compact ? "h-5" : "h-8"
        }`}
      />
      <span
        className={`inline-flex items-center gap-1 font-data uppercase tracking-wide text-steel group-hover:text-accent ${
          compact ? "sr-only" : "text-[11px]"
        }`}
      >
        {organisation.name}
        <ExternalLinkGlyph />
      </span>
    </a>
  );
}
