import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

const PHOTO_PATH = "/images/hero-cutout.png";

// Owner-supplied transparent cutout, not yet on disk at redesign time — this
// checks for it at build time (server component, no client fetch) so the
// hero renders a deliberate placeholder instead of a broken <img> until the
// real photo lands at public/images/hero-cutout.png. Same "ship an honest
// gap, don't fake completeness" pattern as SkillsToolbox's icon fallback.
function hasHeroPhoto(): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "images", "hero-cutout.png"));
}

// Video-reference clone, 2026-09-05: giant background surname + portrait
// cutout + foreground name/role/CTA stack, replacing the centered stacked
// name treatment. The site's one authored entrance sequence — structure
// (giant name) resolves first, then the portrait settles on top of it, then
// the foreground content stamps in, per the timings in globals.css.
export function Hero() {
  const t = useTranslations("Home");
  const nameWords = t("hero_name").split(" ");
  const lastName = nameWords[nameWords.length - 1];
  const firstNames = nameWords.slice(0, -1).join(" ");
  const hasPhoto = hasHeroPhoto();

  return (
    <section className="hero relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-paper px-4 pb-10 sm:px-6 sm:pb-14">
      {/* Giant background surname — the reference's signature device. Sized
          in vw so it always spans near-full-bleed regardless of name length. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="hero-giant-name text-giant font-display block w-full text-center tracking-tight uppercase">
          {lastName}
        </span>
      </div>

      {/* Portrait cutout — sits on top of the giant name, bottom-anchored so
          it reads as standing in front of the wordmark like the reference. */}
      <div
        aria-hidden={!hasPhoto}
        className="hero-photo-mount pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto h-[78svh] w-full max-w-[520px] sm:h-[86svh]"
      >
        {hasPhoto ? (
          <Image
            src={PHOTO_PATH}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 640px) 520px, 100vw"
            className="object-contain object-bottom"
          />
        ) : (
          <div className="hero-grid-bg absolute inset-x-6 bottom-0 h-[70%] border-x border-t border-rule" />
        )}
      </div>

      {/* Foreground content — eyebrow, name/role, tagline, CTAs. */}
      <div className="relative z-20 flex flex-col gap-4">
        <SectionLabel className="hero-eyebrow">{t("hero_eyebrow")}</SectionLabel>

        <h1 className="hero-role-line text-2xl leading-[1.05] font-medium text-ink sm:text-3xl">
          {firstNames}
          <br />
          {lastName}
        </h1>

        <p className="hero-subtitle font-data max-w-[46ch] text-sm text-graphite sm:text-base">
          {t("hero_positioning")}
        </p>

        <div className="hero-cta-row flex flex-wrap gap-3 pt-2">
          <Button href="/projets" variant="ghost">
            {t("hero_cta_projects")}
          </Button>
          <Button href="/contact" variant="solid">
            {t("contact_cta")}
          </Button>
        </div>
      </div>

      {/* Social rail — right edge, desktop only, echoing the reference's
          floating icon column. Reuses the same inline SVGs as Footer.tsx. */}
      <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 sm:right-6 md:flex">
        <a
          href="https://www.linkedin.com/in/badr-eddine-elbouamri/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-9 w-9 items-center justify-center border border-rule text-steel transition-colors hover:border-accent hover:text-accent"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.06 0 4.81 2.67 4.81 6.14V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
          </svg>
        </a>
        <a
          href="mailto:badrbouamri4@gmail.com"
          aria-label="Email"
          className="flex h-9 w-9 items-center justify-center border border-rule text-steel transition-colors hover:border-accent hover:text-accent"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="m3 6 9 7 9-7" />
          </svg>
        </a>
      </div>

      <div aria-hidden className="hero-scroll absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
        <span className="hero-scroll-track relative block h-10 w-px overflow-hidden bg-rule">
          <span className="hero-scroll-seg absolute left-0 top-0 h-3 w-px bg-accent" />
        </span>
      </div>
    </section>
  );
}
