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

// A "worked with" credibility badge, linking out to the organisation's own
// site — not the case study, which is already linked from Parcours/Preuves.
// Video-reference clone (2026-09-05): logos render in full original color,
// no grayscale-until-hover treatment, directly on the page background —
// except the two whose own brand color needs a light plate to stay legible
// on black (see OrganisationInfo.needsLightPlate, lib/organisations.ts).
export function OrgLogo({
  organisation,
  officialSiteLabel,
  compact = false,
  inert = false,
}: {
  organisation: OrganisationInfo;
  officialSiteLabel: string;
  // Mobile-context variant (adapt pass, 2026-08-29): shrinks the card and
  // hides the caption visually (kept for screen readers via sr-only) so all
  // four logos fit one nowrap row on narrow viewports. Default is unchanged.
  compact?: boolean;
  // LogoRail's visual-only duplicate track (BRIEF §7: aria-hidden on marquee
  // duplicates) sits inside an aria-hidden wrapper, but aria-hidden alone
  // doesn't stop Tab from reaching descendants — an aria-hidden container
  // must have no focusable content, or keyboard users land on an
  // invisible-to-AT link. tabIndex={-1} pulls this copy out of tab order.
  inert?: boolean;
}) {
  const plate = organisation.needsLightPlate;

  return (
    <a
      href={organisation.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${organisation.name} — ${officialSiteLabel}`}
      tabIndex={inert ? -1 : undefined}
      className={`group flex flex-col items-center transition-colors ${
        plate
          ? // Small, tight light plate — literal light values, not theme
            // tokens: this is a fixed light chip regardless of theme, sized
            // to the logo, not a full-bleed white card.
            "rounded-hairline border border-[#dce0e3] bg-white hover:border-accent focus-visible:border-accent"
          : "border border-transparent hover:border-rule"
      } ${compact ? "gap-1 px-2 py-2" : "gap-2 px-4 py-3"}`}
    >
      <Image
        src={organisation.logo.src}
        alt=""
        width={organisation.logo.width}
        height={organisation.logo.height}
        className={`w-auto object-contain ${compact ? "h-5" : "h-8"}`}
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
