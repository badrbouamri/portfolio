"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { trackEvent } from "@/lib/analytics";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 font-data text-xs">
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1">
          {index > 0 ? <span className="text-rule">|</span> : null}
          <button
            type="button"
            aria-current={locale === loc}
            onClick={() => {
              trackEvent("locale_switched", { to: loc });
              router.replace(pathname, { locale: loc });
            }}
            className={`uppercase transition-colors hover:text-accent ${
              locale === loc ? "text-ink" : "text-steel"
            }`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
