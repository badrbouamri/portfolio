import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Parallax } from "@/components/ui/Parallax";

// BRIEF §4.1 Bloc 1 + §5.2. The site's one authored entrance sequence —
// homepage only. Every step below is pure CSS (opacity/transform, timed via
// animation-delay), no JS orchestration: the sitewide prefers-reduced-motion
// override (globals.css) already collapses every duration to ~0, satisfying
// §5.10 with no extra code. The matching nav-link stagger at t=1100ms lives
// in Header.tsx (`.hero-nav-enter`, gated on pathname === "/").
export function Hero() {
  const t = useTranslations("Home");
  const nameWords = t("hero_name").split(" ");
  const lastName = nameWords[nameWords.length - 1];
  const firstNames = nameWords.slice(0, -1).join(" ");

  return (
    <section className="hero relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6">
      <Parallax from={0} to={60} className="hero-photo-mask absolute inset-0" aria-hidden>
        <Image
          src="/images/cover.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hero-photo object-cover"
        />
      </Parallax>
      <div aria-hidden className="hero-halo absolute inset-0" />

      <span aria-hidden className="hero-mark hero-mark-left font-data">
        01
      </span>
      <span aria-hidden className="hero-mark hero-mark-right">
        ›
      </span>

      <div className="relative z-10 flex flex-col items-center gap-5">
        <SectionLabel className="hero-eyebrow">{t("hero_eyebrow")}</SectionLabel>

        <h1 className="text-hero font-display leading-none text-ink">
          <span className="block overflow-hidden">
            <span className="hero-name-line hero-name-line-1 block">{firstNames}</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-name-line hero-name-line-2 block">{lastName}</span>
          </span>
        </h1>

        <div className="hero-rule h-px w-[120px] bg-rule" />

        <p className="hero-subtitle font-data text-[13px] text-graphite">{t("hero_positioning")}</p>
      </div>

      <div aria-hidden className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="hero-scroll-track relative block h-12 w-px overflow-hidden bg-rule">
          <span className="hero-scroll-seg absolute left-0 top-0 h-3 w-px bg-accent" />
        </span>
      </div>
    </section>
  );
}
