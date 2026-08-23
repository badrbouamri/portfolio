import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { getCaseStudy, getAllCaseStudies } from "@/lib/content";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const cs of getAllCaseStudies(locale)) {
      params.push({ locale, slug: cs.slug });
    }
  }
  return params;
}

const CARTOUCHE_LABEL: Record<string, string> = {
  fr: "ÉTUDE DE CAS",
  en: "CASE STUDY",
};

export default async function Image({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const caseStudy = getCaseStudy(locale as "fr" | "en", slug);

  const [displayFont, dataFont] = await Promise.all([
    fs.readFile(
      path.join(process.cwd(), "lib/og-fonts/ibm-plex-sans-condensed-latin-600-normal.woff"),
    ),
    fs.readFile(path.join(process.cwd(), "lib/og-fonts/ibm-plex-mono-latin-500-normal.woff")),
  ]);

  const title = caseStudy?.title ?? slug;
  const organisation = caseStudy?.organisationPublic
    ? caseStudy.organisation
    : locale === "fr"
      ? "Équipementier industriel"
      : "Industrial equipment supplier";
  const kpi = caseStudy?.kpis?.[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F5F6",
          padding: "64px",
          fontFamily: "IBM Plex Sans Condensed",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 22,
              letterSpacing: 2,
              color: "#78838C",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {CARTOUCHE_LABEL[locale] ?? CARTOUCHE_LABEL.fr}
          </div>
          <div
            style={{
              fontSize: 56,
              color: "#14181B",
              marginTop: 24,
              lineHeight: 1.15,
              maxWidth: 980,
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "2px solid #DCE0E3",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "IBM Plex Mono", fontSize: 20, color: "#3A4249" }}>
              {organisation}
            </div>
            <div
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: 20,
                color: "#78838C",
                marginTop: 6,
              }}
            >
              Badr Eddine ELBOUAMRI
            </div>
          </div>
          {kpi ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 44, color: "#9c5e00" }}>
                {kpi.value}
              </div>
              <div
                style={{
                  fontFamily: "IBM Plex Mono",
                  fontSize: 18,
                  color: "#78838C",
                  marginTop: 4,
                }}
              >
                {kpi.label}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "IBM Plex Sans Condensed", data: displayFont, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: dataFont, weight: 500, style: "normal" },
      ],
    },
  );
}
