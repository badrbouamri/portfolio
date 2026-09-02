import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CvButton({ className = "" }: { className?: string }) {
  const t = useTranslations("Header");

  return (
    <Link
      href="/cv"
      prefetch={false}
      className={`sweep-fill btn-tap text-label inline-flex items-center gap-1 rounded-hairline bg-accent px-3 py-2 uppercase text-on-accent ${className}`}
    >
      {t("cv_download")} <span className="cta-arrow-down">↓</span>
    </Link>
  );
}
