import { useTranslations } from "next-intl";
import { SKILL_CATEGORIES, SKILL_LEVELS, type SkillLevel } from "@/lib/skills-data";

const LEVEL_RANK: Record<SkillLevel, number> = {
  notions: 1,
  maitrise: 2,
  expert: 3,
};

function Pips({ level }: { level: SkillLevel }) {
  const filled = LEVEL_RANK[level];
  return (
    <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`h-2.5 w-2.5 rounded-[2px] border ${
            n <= filled ? "border-accent bg-accent" : "border-rule bg-transparent"
          }`}
        />
      ))}
    </span>
  );
}

export function SkillsMatrix() {
  const t = useTranslations("Skills");

  return (
    <div>
      <div className="mb-2 inline-flex flex-wrap items-center gap-x-6 gap-y-2 border border-rule bg-surface px-4 py-3">
        {SKILL_LEVELS.map((level) => (
          <span key={level} className="flex items-center gap-2">
            <Pips level={level} />
            <span className="font-data text-xs uppercase tracking-wide text-steel">
              {t(`level_${level}`)}
            </span>
          </span>
        ))}
      </div>

      {SKILL_CATEGORIES.some((c) => c.skills.some((s) => !s.confirmed)) ? (
        <p className="mb-6 text-xs text-signal">
          <span aria-hidden="true">* </span>
          {t("level_placeholder_hint")}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.id}>
            <h3 className="mb-2 text-md text-ink">{t(category.labelKey)}</h3>
            <ul className="flex flex-col">
              {category.skills.map((skill) => (
                <li
                  key={skill.nameKey}
                  className="flex items-center justify-between gap-4 border-b border-rule py-2 last:border-b-0"
                >
                  <span
                    className="text-sm text-graphite"
                    title={skill.confirmed ? undefined : t("level_placeholder_hint")}
                  >
                    {t(skill.nameKey)}
                    {skill.confirmed ? null : (
                      <span aria-hidden="true" className="ml-1 text-signal">
                        *
                      </span>
                    )}
                  </span>
                  <Pips level={skill.level} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
