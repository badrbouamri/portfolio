import { OrgLogo } from "@/components/ui/OrgLogo";
import type { OrganisationInfo } from "@/lib/organisations";

// BRIEF §3 <LogoRail /> + §5.7. The brief's own filter recipe (grayscale +
// brightness(2) directly on the page background) assumes raw logos on a
// dark ground; this project already established — the hard way, see
// OrgLogo.tsx — that these particular raster logos have dark artwork drawn
// for a white background and go illegible without one. Kept OrgLogo's white
// plate for that reason and layered the brief's opacity/hover/separator/
// marquee behavior on top of it instead of the literal filter.
function LogoRailTrack({
  organisations,
  officialSiteLabel,
  ariaHidden,
}: {
  organisations: OrganisationInfo[];
  officialSiteLabel: string;
  ariaHidden?: boolean;
}) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {organisations.map((org, i) => (
        <div key={org.name} className="flex items-center">
          {i > 0 ? <span aria-hidden className="mx-6 h-6 w-px bg-rule" /> : null}
          <div className="logo-rail-item opacity-45 transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100">
            <OrgLogo organisation={org} officialSiteLabel={officialSiteLabel} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LogoRail({
  organisations,
  officialSiteLabel,
}: {
  organisations: OrganisationInfo[];
  officialSiteLabel: string;
}) {
  return (
    <div className="logo-rail-viewport overflow-hidden">
      <div className="logo-rail-marquee flex w-max">
        <LogoRailTrack organisations={organisations} officialSiteLabel={officialSiteLabel} />
        <span aria-hidden className="mx-6 h-6 w-px bg-rule" />
        <LogoRailTrack organisations={organisations} officialSiteLabel={officialSiteLabel} ariaHidden />
      </div>
    </div>
  );
}
