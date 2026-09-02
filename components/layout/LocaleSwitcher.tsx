"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { trackEvent } from "@/lib/analytics";

// BRIEF §7: the language switcher needs hreflang + aria-current — only a
// real <a> can carry hreflang meaningfully, so this renders next-intl's
// Link (locale override, same pathname) rather than a <button onClick>
// that pushes a client-side route change. Works with JS disabled too.
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 font-data text-xs">
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1">
          {index > 0 ? <span className="text-rule">|</span> : null}
          <Link
            href={pathname}
            locale={loc}
            hrefLang={loc}
            aria-current={locale === loc ? "true" : undefined}
            onClick={() => trackEvent("locale_switched", { to: loc })}
            className={`uppercase transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              locale === loc ? "text-ink" : "text-steel"
            }`}
          >
            {loc}
          </Link>
        </span>
      ))}
    </div>
  );
}
