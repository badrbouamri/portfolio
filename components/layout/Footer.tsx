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
