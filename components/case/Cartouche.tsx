import { useTranslations } from "next-intl";
import type { CaseStudyFrontmatter } from "@/lib/schema";

type CartoucheProps = {
  frontmatter: CaseStudyFrontmatter;
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-rule px-3 py-2 first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0">
      <p className="font-data text-xs uppercase tracking-wide text-steel">{label}</p>
      <p className="font-data text-sm text-ink">{value}</p>
    </div>
  );
}

export function Cartouche({ frontmatter }: CartoucheProps) {
  const t = useTranslations("CaseStudy");

  const organisationLabel = frontmatter.organisationPublic
    ? frontmatter.organisation
    : t("organisation_generic");

  const periode = `${frontmatter.period.start} → ${frontmatter.period.end}`;
  const confidentialite = frontmatter.confidential ? "Indexée / anonymisée" : "Publique";

  return (
    <div className="grid grid-cols-1 border border-rule bg-surface sm:grid-cols-3 lg:grid-cols-6">
      <Field label={t("cartouche_projet")} value={frontmatter.title} />
      <Field label={t("cartouche_organisation")} value={organisationLabel} />
      <Field label={t("cartouche_periode")} value={periode} />
      <Field label={t("cartouche_role")} value={frontmatter.role} />
      <Field label={t("cartouche_methodes")} value={frontmatter.methods.join(" · ") || "—"} />
      <Field label={t("cartouche_confidentialite")} value={confidentialite} />
    </div>
  );
}
