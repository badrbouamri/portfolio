import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CvButton({ className = "" }: { className?: string }) {
  const t = useTranslations("Header");

  return (
    <Link
      href="/cv"
      prefetch={false}
      className={`sweep-fill inline-flex items-center gap-1 rounded-[2px] bg-accent px-3 py-1.5 text-sm font-medium text-surface ${className}`}
    >
      {t("cv_download")} <span className="cta-arrow-down">↓</span>
    </Link>
  );
}
