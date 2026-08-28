"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { CvButton } from "./CvButton";

export function Header() {
  const t = useTranslations("Header");
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("nav_accueil") },
    { href: "/parcours", label: t("nav_parcours") },
    { href: "/competences", label: t("nav_competences") },
    { href: "/projets", label: t("nav_projets") },
    { href: "/contact", label: t("nav_contact") },
  ];

  return (
    <header className="border-b border-rule bg-surface">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-lg font-semibold text-ink">
          BE·
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-sm text-graphite transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher />
          <CvButton />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <CvButton />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center border border-rule text-ink transition-colors hover:border-accent"
          >
            <span aria-hidden className="inline-block transition-transform duration-200" style={{ transform: open ? "rotate(90deg)" : "none" }}>
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="mobile-nav-panel flex flex-col border-t border-rule px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-rule py-2 text-sm text-graphite last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3">
            <LocaleSwitcher />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
