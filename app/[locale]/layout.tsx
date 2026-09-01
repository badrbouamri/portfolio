import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { bodoniModa, interTight, plexMono } from "../fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Backdrop } from "@/components/layout/Backdrop";
import "../globals.css";

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
    alternates: {
      canonical: `/${activeLocale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": "/fr",
      },
    },
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${bodoniModa.variable} ${interTight.variable} ${plexMono.variable} antialiased`}
      >
        {/* Synchronous (render-blocking) bootstrap script, not next/script: it must
            run before first paint so scroll-reveal CSS (gated on .js-reveal) never
            causes a flash, and so content stays fully visible with JS disabled.
            Also applies a saved dark/light choice (ThemeToggle.tsx) before paint,
            so a returning visitor never sees a light-mode flash before dark mode
            kicks in. No explicit choice → the prefers-color-scheme media query in
            globals.css handles it with zero JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}document.documentElement.classList.add('js-reveal')",
          }}
        />
        <Backdrop />
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
