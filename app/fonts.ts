import localFont from "next/font/local";

export const plexSansCondensed = localFont({
  src: "../public/fonts/ibm-plex-sans-condensed/ibm-plex-sans-condensed-latin-600-normal.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});

export const plexSans = localFont({
  src: [
    {
      path: "../public/fonts/ibm-plex-sans/ibm-plex-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-sans/ibm-plex-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const plexMono = localFont({
  src: [
    {
      path: "../public/fonts/ibm-plex-mono/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-mono/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-data",
  display: "swap",
});
