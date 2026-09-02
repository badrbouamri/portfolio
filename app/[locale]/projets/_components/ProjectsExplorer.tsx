"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/case/ProjectCard";
import type { CaseStudy } from "@/lib/schema";

const CATEGORIES = ["methodes", "lean", "maintenance", "conception", "digital"] as const;
type Category = (typeof CATEGORIES)[number];

function isCategory(value: string | null): value is Category {
  return value !== null && (CATEGORIES as readonly string[]).includes(value);
}

const QUERY_KEY = "categorie";

export function ProjectsExplorer({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const t = useTranslations("Projets");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get(QUERY_KEY);
  const activeCategory = isCategory(rawCategory) ? rawCategory : null;

  const filtered = activeCategory
    ? caseStudies.filter((cs) => cs.category === activeCategory)
    : caseStudies;

  function selectCategory(next: Category | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set(QUERY_KEY, next);
    } else {
      params.delete(QUERY_KEY);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div role="group" aria-label={t("filter_label")} className="mb-6 flex flex-wrap gap-2">
        <Button
          type="button"
          variant={activeCategory === null ? "solid" : "ghost"}
          aria-pressed={activeCategory === null}
          onClick={() => selectCategory(null)}
        >
          {t("filter_all")}
        </Button>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            type="button"
            variant={activeCategory === cat ? "solid" : "ghost"}
            aria-pressed={activeCategory === cat}
            onClick={() => selectCategory(cat)}
          >
            {t(`category_${cat}`)}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-rule bg-surface p-6 text-center">
          <p className="mb-4 text-sm text-graphite">{t("empty_message")}</p>
          <Button type="button" variant="ghost" onClick={() => selectCategory(null)}>
            {t("empty_cta")} →
          </Button>
        </div>
      ) : (
        <div
          key={activeCategory ?? "all"}
          className="filter-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((cs) => (
            <ProjectCard
              key={cs.slug}
              caseStudy={cs}
              categoryLabel={t(`category_${cs.category}`)}
              ctaLabel={t("card_cta")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
