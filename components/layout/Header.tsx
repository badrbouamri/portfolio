"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { CvButton } from "./CvButton";

// BRIEF §3 <Header />. Monogram centered via a 3-column grid so it stays
// exactly centered regardless of how wide either nav cluster is — simpler
// than measuring, and correct at any viewport.
const LEFT_NAV = [
  { href: "/", key: "nav_accueil" },
  { href: "/parcours", key: "nav_parcours" },
  { href: "/competences", key: "nav_competences" },
] as const;

const RIGHT_NAV = [
  { href: "/projets", key: "nav_projets" },
  { href: "/contact", key: "nav_contact" },
] as const;

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full-screen mobile drawer: focus trap, Escape to close, body scroll
  // lock while open, focus returns to the toggle button on close — BRIEF
  // §3 <Header /> mobile spec and §7 accessibility rules.
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function navLinkClass(href: string) {
    return `nav-link text-sm transition-colors ${
      isActive(href) ? "nav-link-active text-accent" : "text-graphite hover:text-accent"
    }`;
  }

  // BRIEF §5.2: the hero's entrance sequence includes the header nav links,
  // opacity-fading in at t=1100ms with a 40ms stagger — homepage only, per
  // "un seul grand moment de mouvement par page." Combined left+right index
  // keeps the stagger reading left-to-right across both clusters.
  const isHome = pathname === "/";
  const ALL_NAV = [...LEFT_NAV, ...RIGHT_NAV];
  function heroNavStyle(href: string): React.CSSProperties | undefined {
    if (!isHome) return undefined;
    const index = ALL_NAV.findIndex((item) => item.href === href);
    return { animationDelay: `${1100 + index * 40}ms` };
  }

  return (
    <header
      data-scrolled={scrolled}
      className="site-header sticky top-0 z-30 border-b border-transparent transition-[background-color,border-color] duration-300"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Three flex children, `justify-between` — not an absolutely-
            centered monogram over equal grid columns, which collided with
            "Contact" here: the right cluster (nav + toggle + locale + CV
            button) is unavoidably wider than the left nav, so a
            mathematically-dead-center logo sits on top of it. Flex keeps
            the monogram visually between both clusters with zero overlap
            risk, at the cost of not being pixel-exact container-center. */}
        <nav className="hidden shrink-0 items-center gap-6 md:flex">
          {LEFT_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`whitespace-nowrap ${navLinkClass(item.href)} ${isHome ? "hero-nav-enter" : ""}`}
              style={heroNavStyle(item.href)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <Link href="/" className="font-display hidden shrink-0 text-lg font-medium text-ink md:block">
          BE·
        </Link>

        <div className="hidden shrink-0 items-center gap-6 md:flex">
          <nav className="flex items-center gap-6">
            {RIGHT_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`whitespace-nowrap ${navLinkClass(item.href)} ${isHome ? "hero-nav-enter" : ""}`}
                style={heroNavStyle(item.href)}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <LocaleSwitcher />
          <CvButton />
        </div>

        <Link href="/" className="font-display text-lg font-medium text-ink md:hidden">
          BE·
        </Link>

        <div className="flex items-center gap-3 md:hidden">
          <CvButton />
          <button
            ref={triggerRef}
            type="button"
            aria-label={open ? t("menu_close") : t("menu_open")}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-hairline border border-rule text-ink transition-colors hover:border-accent"
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-200"
              style={{ transform: open ? "rotate(90deg)" : "none" }}
            >
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("menu_open")}
          className="mobile-nav-panel fixed inset-0 z-40 flex flex-col bg-paper px-4 py-3 md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-medium text-ink">BE·</span>
            <button
              type="button"
              aria-label={t("menu_close")}
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-hairline border border-rule text-ink transition-colors hover:border-accent"
            >
              <span aria-hidden>✕</span>
            </button>
          </div>

          <nav className="mt-10 flex flex-col">
            {[...LEFT_NAV, ...RIGHT_NAV].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`border-b border-rule py-3 text-lg ${
                  isActive(item.href) ? "text-accent" : "text-ink"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-4 pt-6">
            <LocaleSwitcher />
          </div>
        </div>
      ) : null}
    </header>
  );
}
