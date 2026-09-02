"use client";

import { useEffect, useRef, useState } from "react";
import { OrgLogo } from "@/components/ui/OrgLogo";
import type { OrganisationInfo } from "@/lib/organisations";

// BRIEF §3 <LogoRail /> + §5.7. The brief's own filter recipe (grayscale +
// brightness(2) directly on the page background) assumes raw logos on a
// dark ground; this project already established — the hard way, see
// OrgLogo.tsx — that these particular raster logos have dark artwork drawn
// for a white background and go illegible without one. Kept OrgLogo's white
// plate for that reason and layered the brief's separator/marquee behavior
// on top of it instead of the literal filter. The brief's own ".45 opacity
// at rest" dimming is NOT applied at the wrapper level here (Phase 8
// Lighthouse fix): opacity on an ancestor dims the whole subtree uniformly,
// including OrgLogo's caption text, which dropped its contrast to 1.85:1
// against the 4.5:1 minimum — a real WCAG failure, not a style nicety.
// OrgLogo's own internal image dimming (opacity-80 → 100 on hover) already
// gives the same "dim at rest, full on hover" read, just less extreme.
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
          <div className="logo-rail-item">
            <OrgLogo organisation={org} officialSiteLabel={officialSiteLabel} inert={ariaHidden} />
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
  const viewportRef = useRef<HTMLDivElement>(null);
  // BRIEF §5.11: "le marquee se met en pause via IntersectionObserver quand
  // il sort du champ" — on top of the existing CSS hover-pause, so it never
  // animates offscreen wastefully.
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`logo-rail-viewport overflow-hidden ${offscreen ? "logo-rail-offscreen" : ""}`}
    >
      <div className="logo-rail-marquee flex w-max">
        <LogoRailTrack organisations={organisations} officialSiteLabel={officialSiteLabel} />
        <span aria-hidden className="mx-6 h-6 w-px bg-rule" />
        <LogoRailTrack organisations={organisations} officialSiteLabel={officialSiteLabel} ariaHidden />
      </div>
    </div>
  );
}
