import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY: Record<string, { credential: string; positioning: string }> = {
  fr: {
    credential: "Ingénieur d'État en Génie Mécanique des Systèmes Industriels",
    positioning: "Méthodes & Industrialisation · Lean Manufacturing · Industrie 4.0",
  },
  en: {
    credential: "Mechanical & Industrial Systems Engineer",
    positioning: "Manufacturing Engineering · Lean Manufacturing · Industry 4.0",
  },
};

export default async function Image({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const copy = COPY[locale] ?? COPY.fr;

  const [displayFont, bodyFont, dataFont] = await Promise.all([
    fs.readFile(
      path.join(process.cwd(), "lib/og-fonts/ibm-plex-sans-condensed-latin-600-normal.woff"),
    ),
    fs.readFile(path.join(process.cwd(), "lib/og-fonts/ibm-plex-sans-latin-400-normal.woff")),
    fs.readFile(path.join(process.cwd(), "lib/og-fonts/ibm-plex-mono-latin-500-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#F4F5F6",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 24,
            letterSpacing: 2,
            color: "#0B5563",
            display: "flex",
          }}
        >
          BE·
        </div>
        <div
          style={{
            fontFamily: "IBM Plex Sans Condensed",
            fontSize: 64,
            color: "#14181B",
            marginTop: 28,
            display: "flex",
          }}
        >
          Badr Eddine ELBOUAMRI
        </div>
        <div
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: 30,
            color: "#3A4249",
            marginTop: 20,
            maxWidth: 980,
            display: "flex",
          }}
        >
          {copy.credential}
        </div>
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            color: "#78838C",
            marginTop: 24,
            display: "flex",
          }}
        >
          {copy.positioning}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "IBM Plex Sans Condensed", data: displayFont, weight: 600, style: "normal" },
        { name: "IBM Plex Sans", data: bodyFont, weight: 400, style: "normal" },
        { name: "IBM Plex Mono", data: dataFont, weight: 500, style: "normal" },
      ],
    },
  );
}
