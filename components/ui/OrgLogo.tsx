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
}: {
  organisation: OrganisationInfo;
  officialSiteLabel: string;
}) {
  return (
    <a
      href={organisation.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${organisation.name} — ${officialSiteLabel}`}
      className="group flex flex-col items-center gap-2 border border-rule bg-surface px-4 py-3 transition-colors hover:border-accent focus-visible:border-accent"
    >
      <Image
        src={organisation.logo.src}
        alt=""
        width={organisation.logo.width}
        height={organisation.logo.height}
        className="h-8 w-auto object-contain grayscale opacity-80 transition-[filter,opacity] duration-200 group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
      />
      <span className="inline-flex items-center gap-1 font-data text-[11px] uppercase tracking-wide text-steel group-hover:text-accent">
        {organisation.name}
        <ExternalLinkGlyph />
      </span>
    </a>
  );
}
