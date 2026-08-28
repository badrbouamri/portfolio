import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Tag } from "@/components/ui/Tag";
import { ToolChips } from "@/components/case/ToolChips";
import type { CaseStudy } from "@/lib/schema";

type ProjectCardProps = {
  caseStudy: CaseStudy;
};

export function ProjectCard({ caseStudy }: ProjectCardProps) {
  const t = useTranslations("Projets");
  const tCase = useTranslations("CaseStudy");

  const organisationLabel = caseStudy.organisationPublic
    ? caseStudy.organisation
    : tCase("organisation_generic");

  const headlineKpi = caseStudy.kpis[0];
  const tools = caseStudy.tools.slice(0, 3);

  return (
    <Link
      href={`/projets/${caseStudy.slug}`}
      className="group flex flex-col gap-3 border border-rule bg-surface p-4 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_4px_0_0_var(--color-rule)]"
    >
      <Tag>{t(`category_${caseStudy.category}`)}</Tag>

      <h3 className="text-md text-ink">{caseStudy.title}</h3>

      <p className="font-data text-xs text-steel">
        {organisationLabel} · {caseStudy.period.start} → {caseStudy.period.end}
      </p>

      <p className="line-clamp-3 text-sm text-graphite">{caseStudy.summary}</p>

      {headlineKpi ? (
        <p className="font-data text-lg text-signal">
          {headlineKpi.value}
          <span className="ml-2 font-sans text-xs font-normal text-steel">
            {headlineKpi.label}
          </span>
        </p>
      ) : null}

      {tools.length > 0 ? <ToolChips tools={tools} /> : null}

      <span className="mt-auto font-data text-xs uppercase tracking-wide text-accent">
        {t("card_cta")} <span className="cta-arrow">→</span>
      </span>
    </Link>
  );
}
