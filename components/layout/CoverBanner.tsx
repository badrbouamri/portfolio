import Image from "next/image";
import { useTranslations } from "next-intl";

// Homepage cover — a desk photo treated as an accent-color duotone (grayscale
// base + a mix-blend-color layer in --accent) so it reads as part of the
// site's monochrome blueprint system instead of a full-color photo dropped
// onto it. See docs/redesign-brief.md and the 2026-08-28/2026-08-29 cover
// discussions.
//
// As of the 2026-08-29 hero merge, this banner also carries the page's H1:
// name + short credential + positioning tag on the left, portrait on the
// right, both centered on the banner's vertical axis — so it is no longer
// purely decorative and is not aria-hidden. The positioning tag moved here
// from the plain section below (live-mode steer, same day) to sit directly
// under the credential line; the value sentence stays in
// app/[locale]/page.tsx.
const CORNER_MARKS: [string, string][] = [
  ["left", "top"],
  ["right", "top"],
  ["left", "bottom"],
  ["right", "bottom"],
];

export function CoverBanner() {
  const t = useTranslations("Home");

  return (
    <div className="relative w-full overflow-hidden border-b border-rule">
      <Image
        src="/images/cover.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="cover-photo object-cover grayscale"
      />
      <div className="pointer-events-none absolute inset-0 bg-accent/70 mix-blend-color" />
      {/* Darker toward the left/bottom, where the name and credential sit, so
          text keeps 4.5:1+ contrast without flattening the photo on the right
          where the portrait already carries its own border/background. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 md:py-16">
        <div className="hero-reveal min-w-0">
          <h1 className="text-xl text-surface sm:text-3xl md:text-4xl">{t("hero_name")}</h1>
          <p className="hero-reveal hero-reveal-2 mt-2 text-sm text-surface/80 sm:text-base">
            {t("hero_credential")}
          </p>
          <p className="hero-reveal hero-reveal-3 mt-2 font-data text-xs uppercase tracking-wide text-surface/70 sm:text-sm">
            {t("hero_positioning")}
          </p>
        </div>

        <div className="hero-reveal hero-reveal-2 relative aspect-[4/5] w-20 flex-shrink-0 overflow-hidden border border-surface/50 bg-surface shadow-[0_12px_28px_-12px_rgba(20,24,27,0.6)] sm:w-32 md:w-40 lg:w-48">
          <Image
            src="/images/profile.jpg"
            alt={t("hero_photo_alt")}
            fill
            sizes="(min-width: 1024px) 192px, (min-width: 768px) 160px, (min-width: 640px) 128px, 80px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {CORNER_MARKS.map(([h, v], i) => (
        <span
          key={`${h}-${v}`}
          aria-hidden="true"
          className="corner-mark-draw absolute h-4 w-4 border-surface/70"
          style={{
            [h]: "16px",
            [v]: "16px",
            borderLeftWidth: h === "left" ? "1.5px" : undefined,
            borderRightWidth: h === "right" ? "1.5px" : undefined,
            borderTopWidth: v === "top" ? "1.5px" : undefined,
            borderBottomWidth: v === "bottom" ? "1.5px" : undefined,
            // Each bracket grows outward from its own corner, like a
            // registration mark being ruled onto the sheet, before the
            // name/portrait stamp in on top (see .hero-reveal delays).
            transformOrigin: `${h === "left" ? "0%" : "100%"} ${v === "top" ? "0%" : "100%"}`,
            animationDelay: `${i * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}
