import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_ITEMS = [
  { href: "/", key: "nav_accueil" },
  { href: "/parcours", key: "nav_parcours" },
  { href: "/competences", key: "nav_competences" },
  { href: "/projets", key: "nav_projets" },
  { href: "/contact", key: "nav_contact" },
] as const;

// BRIEF §3 <Footer />. Icons are hand-drawn inline SVG (no icon library —
// none is pre-approved, and these two are the brief's one explicit ask for
// real iconography on an otherwise icon-free site).
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.06 0 4.81 2.67 4.81 6.14V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.97 3.16 9.19 7.55 10.68.55.1.75-.24.75-.53v-2.02c-3.07.67-3.72-1.3-3.72-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.7.08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.45-.28-5.02-1.22-5.02-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 5.55 0c2.12-1.43 3.05-1.13 3.05-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.16-5.04 5.43.39.34.74 1.02.74 2.05v3.04c0 .29.2.64.76.53A11.5 11.5 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Header");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-4 text-steel">
            <a
              href="https://www.linkedin.com/in/badr-eddine-elbouamri/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("linkedin_label")}
              className="transition-colors hover:text-accent"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/badrbouamri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("github_label")}
              className="transition-colors hover:text-accent"
            >
              <GitHubIcon />
            </a>
            <a
              href="mailto:badrbouamri4@gmail.com"
              aria-label={t("email_label")}
              className="transition-colors hover:text-accent"
            >
              <MailIcon />
            </a>
          </div>

          <Link
            href="/"
            className="font-display justify-self-center rounded-hairline border border-rule px-3 py-1 text-lg text-ink transition-colors hover:border-accent"
          >
            BE·
          </Link>

          <span aria-hidden />
        </div>

        <nav className="font-display flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-graphite">
          {NAV_ITEMS.map((item, index) => (
            <span key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden className="text-rule">/</span> : null}
              <Link href={item.href} className="transition-colors hover:text-accent">
                {tNav(item.key)}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/mentions-legales" className="text-xs text-steel transition-colors hover:text-accent">
            {t("legal_link")}
          </Link>
          <p className="font-data text-[10px] uppercase tracking-[0.15em] text-steel">
            {t("copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
