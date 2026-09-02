"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";

// Dark mode toggle (2026-09-02, PRD §7.8 — held pending explicit go-ahead).
// Mirrors LocaleSwitcher's two-option text-button pattern rather than an
// icon, staying inside the sitewide "no decorative iconography" convention.
// Defaults to the OS preference (no localStorage entry, handled purely by
// the prefers-color-scheme media query in globals.css); picking either
// option here makes the choice explicit and sticky, applied instantly and
// persisted, matching the bootstrap script in layout.tsx that re-applies it
// before paint on the next visit.
export function ThemeToggle() {
  const t = useTranslations("Header");
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  function choose(next: Theme) {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  }

  return (
    <div className="flex items-center gap-1 font-data text-xs">
      <button
        type="button"
        aria-current={theme === "light"}
        onClick={() => choose("light")}
        className={`uppercase transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          theme === "light" ? "text-ink" : "text-steel"
        }`}
      >
        {t("theme_light")}
      </button>
      <span className="text-rule">|</span>
      <button
        type="button"
        aria-current={theme === "dark"}
        onClick={() => choose("dark")}
        className={`uppercase transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          theme === "dark" ? "text-ink" : "text-steel"
        }`}
      >
        {t("theme_dark")}
      </button>
    </div>
  );
}
