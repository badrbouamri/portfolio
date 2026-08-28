export type OrganisationInfo = {
  name: string;
  website: string;
  logo: { src: string; width: number; height: number };
};

export const STELLANTIS: OrganisationInfo = {
  name: "Stellantis",
  website: "https://www.stellantis.com",
  logo: { src: "/images/logos/stellantis.png", width: 749, height: 160 },
};

export const AIC_METALLURGIE: OrganisationInfo = {
  name: "AIC Métallurgie",
  website: "https://www.aicmetallurgie.ma/index.html",
  logo: { src: "/images/logos/aic-metallurgie.png", width: 185, height: 160 },
};

export const NEXTEER: OrganisationInfo = {
  name: "Nexteer Automotive",
  website: "https://www.nexteer.com",
  logo: { src: "/images/logos/nexteer.png", width: 661, height: 131 },
};

export const ENSET: OrganisationInfo = {
  name: "ENSET Mohammedia",
  website: "https://www.enset-media.ac.ma/",
  logo: { src: "/images/logos/enset.png", width: 396, height: 160 },
};

export const ORGANISATIONS: OrganisationInfo[] = [STELLANTIS, AIC_METALLURGIE, NEXTEER, ENSET];

// Case-study frontmatter stores free-text organisation strings, e.g.
// "AIC Métallurgie (Delta Holding)" or "Projet académique — ENSET Mohammedia" —
// match by substring against the known names above rather than requiring an
// exact string.
export function findOrganisation(raw: string): OrganisationInfo | undefined {
  return ORGANISATIONS.find((org) => raw.includes(org.name));
}
