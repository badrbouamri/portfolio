import { useTranslations } from "next-intl";

export function ConfidentialNotice({ confidential }: { confidential: boolean }) {
  const t = useTranslations("CaseStudy");
  if (!confidential) return null;

  return (
    <p className="border-l-2 border-signal bg-surface px-4 py-2 text-sm italic text-steel">
      {t("confidentiality_notice")}
    </p>
  );
}
