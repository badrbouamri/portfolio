"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SKILL_CATEGORIES, SKILL_LEVELS, type Skill, type SkillLevel } from "@/lib/skills-data";
import { Reveal } from "@/components/ui/Reveal";

const LEVEL_RANK: Record<SkillLevel, number> = {
  notions: 1,
  maitrise: 2,
  expert: 3,
};

// Category id -> Compétences page "Preuves par domaine" anchor id. Two
// toolbox categories (design tools and simulation tools) are evidenced under
// the same "conception" block there, so both point at it.
const EVIDENCE_ANCHORS: Record<string, string> = {
  cao: "preuve-conception",
  simulation: "preuve-conception",
  methodes: "preuve-methodes",
  amelioration: "preuve-amelioration",
  maintenance: "preuve-maintenance",
  data: "preuve-donnees",
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function monogram(label: string) {
  return label.slice(0, 2).toUpperCase();
}

function SkillIcon({ icon, label }: { icon?: string; label: string }) {
  const [failed, setFailed] = useState(false);

  if (!icon || failed) {
    return (
      <span
        aria-hidden="true"
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs leading-none tracking-tighter font-data font-medium text-surface"
      >
        {monogram(label)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image optimization needed for a 20px icon
    <img
      src={`/icons/skills/${icon}`}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      className="h-5 w-5 shrink-0 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

function LevelPips({ level, label }: { level: SkillLevel; label: string }) {
  const filled = LEVEL_RANK[level];
  return (
    <span className="flex shrink-0 items-center gap-0.5" role="img" aria-label={label}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full border ${
            n <= filled ? "pip-filled border-accent bg-accent" : "border-rule bg-transparent"
          }`}
        />
      ))}
    </span>
  );
}

export function SkillsToolbox() {
  const t = useTranslations("Skills");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = useMemo(
    () => SKILL_CATEGORIES.map((c) => ({ ...c, skills: c.skills.filter((s) => s.toolbox !== false) })),
    [],
  );

  const skills = useMemo<(Skill & { categoryId: string })[]>(
    () => categories.flatMap((c) => c.skills.map((s) => ({ ...s, categoryId: c.id }))),
    [categories],
  );

  const visibleSkills =
    activeCategory === "all" ? skills : skills.filter((s) => s.categoryId === activeCategory);

  const evidenceAnchor = activeCategory !== "all" ? EVIDENCE_ANCHORS[activeCategory] : undefined;

  function handleEvidenceClick(anchorId: string) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.getElementById(anchorId)?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    };
  }

  return (
    <div>
      <Reveal stagger className="mb-4 inline-flex flex-wrap items-center gap-x-6 gap-y-2 border border-rule bg-surface px-4 py-3">
        {SKILL_LEVELS.map((level) => (
          <span key={level} className="flex items-center gap-2">
            <LevelPips level={level} label={t(`level_${level}`)} />
            <span className="font-data text-xs uppercase tracking-wide text-steel">{t(`level_${level}`)}</span>
          </span>
        ))}
      </Reveal>

      <div
        className="mb-4 flex gap-2 overflow-x-auto pb-1 min-[640px]:flex-wrap min-[640px]:overflow-visible"
        role="group"
        aria-label={t("title")}
      >
        <button
          type="button"
          aria-pressed={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 whitespace-nowrap rounded-pill border px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            activeCategory === "all"
              ? "border-ink bg-ink text-paper"
              : "border-rule bg-transparent text-graphite hover:border-ink"
          }`}
        >
          {t("filter_all")}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`shrink-0 whitespace-nowrap rounded-pill border px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              activeCategory === category.id
                ? "border-ink bg-ink text-paper"
                : "border-rule bg-transparent text-graphite hover:border-ink"
            }`}
          >
            {t(category.labelKey)}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {t("results_count", { count: visibleSkills.length })}
      </p>

      {evidenceAnchor ? (
        <a
          href={`#${evidenceAnchor}`}
          onClick={handleEvidenceClick(evidenceAnchor)}
          className="mb-3 inline-block text-xs text-accent hover:underline"
        >
          {t("view_evidence")}
        </a>
      ) : null}

      <ul className="skills-toolbox-grid flex flex-wrap gap-2">
        {visibleSkills.map((skill, index) => {
          const label = t(skill.nameKey);
          const levelLabel = t("skill_level_sr", { skill: label, level: t(`level_${skill.level}`) });
          return (
            <li
              key={skill.nameKey}
              className="skill-pill flex items-center gap-2 rounded-pill border border-rule bg-surface px-3 py-1.5"
              style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
            >
              <SkillIcon icon={skill.icon} label={label} />
              <span className="text-sm text-ink">{label}</span>
              <LevelPips level={skill.level} label={levelLabel} />
            </li>
          );
        })}
      </ul>

      {SKILL_CATEGORIES.some((c) => c.skills.some((s) => !s.confirmed)) ? (
        <p className="mt-4 text-xs text-signal">
          <span aria-hidden="true">* </span>
          {t("level_placeholder_hint")}
        </p>
      ) : null}
    </div>
  );
}
