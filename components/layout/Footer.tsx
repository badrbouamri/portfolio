import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-6 text-sm text-steel sm:px-6">
        <p className="font-data">{t("location")}</p>
        <a href="mailto:badrbouamri4@gmail.com" className="hover:text-accent">
          badrbouamri4@gmail.com
        </a>
        <Link href="/mentions-legales" className="hover:text-accent">
          {t("legal_link")}
        </Link>
      </div>
    </footer>
  );
}
