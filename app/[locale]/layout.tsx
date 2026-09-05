import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { interTight, plexMono } from "../fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Backdrop } from "@/components/layout/Backdrop";
import { PageTransition } from "@/components/layout/PageTransition";
import "../globals.css";

// Declared here rather than in app/fonts.ts (alongside interTight/plexMono):
// Next's automatic font preload is keyed off the file that calls localFont(),
// and only fires for calls that live in a rendered layout/page file — never
// for one re-exported from a shared module like fonts.ts (see the comment
// there). Display is the one face worth preloading (it's the LCP element on
// the homepage — the giant hero surname), so it moved here.
//
// Redesign (video-reference clone, 2026-09-05): Archivo Black replaces
// Bodoni Moda as --font-display. The reference's headings and giant hero
// name are a heavy grotesque, not a serif — Bodoni Moda doesn't fit the new
// world at all, so this is a full substitution, not a weight/style tweak.
// Archivo Black ships one weight only (400, which *is* the black weight),
// self-hosted via next/font/local per this project's Morocco-reliability
// convention (see Typography in DESIGN.md). Bodoni Moda's files stay on
// disk under public/fonts/ pending cleanup, in case of rollback.
const archivoBlack = localFont({
  src: [
    {
      path: "../../public/fonts/archivo-black/archivo-black-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// No production domain is configured yet (PRD M0 deferred the custom domain to a
// *.vercel.app subdomain). Set NEXT_PUBLIC_SITE_URL once a real deploy URL exists —
// until then this falls back to localhost so metadataBase is always a valid URL.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const SITE_METADATA: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: "Badr Eddine ELBOUAMRI — Ingénieur Méthodes & Industrialisation",
    description:
      "J'optimise les process de production industrielle — de la définition des gammes et des postes au pilotage par la donnée.",
  },
  en: {
    title: "Badr Eddine ELBOUAMRI — Manufacturing Engineer",
    description:
      "I optimise industrial production processes — from defining routings and workstations to data-driven performance management.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const { title, description } = SITE_METADATA[activeLocale];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    // No sitewide `alternates` fallback here on purpose: canonical/hreflang
    // are only correct when computed against a page's own full path (see
    // lib/seo.ts's pageAlternates), which this shared layout can't know —
    // it only ever receives {locale}, never the matched child path. Every
    // real page below sets its own via pageAlternates(); a page that
    // doesn't is missing hreflang/canonical (harmless — Lighthouse only
    // flags a *wrong* canonical, not a missing one) rather than inheriting
    // a canonical that silently points at the homepage instead of itself.
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations("Header");

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} ${interTight.variable} ${plexMono.variable} antialiased`}
      >
        {/* Synchronous (render-blocking) bootstrap script, not next/script: it must
            run before first paint so scroll-reveal CSS (gated on .js-reveal) never
            causes a flash, and so content stays fully visible with JS disabled.
            No theme branch needed — the site is dark-only (video-reference clone,
            2026-09-05; ThemeToggle.tsx deleted), so there's no saved choice to
            re-apply before paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-reveal')",
          }}
        />
        <a href="#main-content" className="skip-link">
          {t("skip_to_content")}
        </a>
        <Backdrop />
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
