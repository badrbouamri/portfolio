import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Rule } from "@/components/ui/Rule";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { SkillsMatrix } from "@/components/skills/SkillsMatrix";

type GroupKey =
  | "methodes"
  | "amelioration"
  | "maintenance"
  | "conception"
  | "donnees"
  | "sciences";

// Tool/method taxonomy, PRD §5.3. Bilingual tag labels are authored directly
// (not machine-translated CV prose) — acronyms (DMAIC, CATIA V5, Power BI...)
// are kept as-is; descriptive French terms get a standard engineering EN gloss.
const TAGS: Record<GroupKey, { fr: string[]; en: string[] }> = {
  methodes: {
    fr: [
      "Gammes et standards de travail",
      "Implantation de poste",
      "Maîtrise des procédés",
      "Validation des gammes",
      "Suivi par KPIs",
      "Lecture de plans 2D/3D",
      "Dessin industriel",
    ],
    en: [
      "Routing sheets & work standards",
      "Workstation layout",
      "Process control",
      "Routing sheet validation",
      "KPI monitoring",
      "2D/3D drawing reading",
      "Technical drawing",
    ],
  },
  amelioration: {
    fr: ["DMAIC", "AMDEC", "Pareto", "Ishikawa", "5 Pourquoi", "QQOQCCP", "SIPOC", "8D", "Kaizen", "5S"],
    en: ["DMAIC", "FMEA", "Pareto", "Ishikawa", "5 Whys", "QQOQCCP", "SIPOC", "8D", "Kaizen", "5S"],
  },
  maintenance: {
    fr: [
      "Diagnostic mécanique",
      "Maintenance préventive et corrective",
      "Analyse de pannes récurrentes",
      "Calcul d'efforts (pliage, roulage)",
    ],
    en: [
      "Mechanical diagnostics",
      "Preventive & corrective maintenance",
      "Recurring failure analysis",
      "Force calculations (bending, rolling)",
    ],
  },
  conception: {
    fr: ["CATIA V5", "SOLIDWORKS", "AutoCAD", "ANSYS", "ABAQUS", "DIGIMAT", "CES EduPack"],
    en: ["CATIA V5", "SOLIDWORKS", "AutoCAD", "ANSYS", "ABAQUS", "DIGIMAT", "CES EduPack"],
  },
  donnees: {
    fr: ["Power BI", "Excel avancé / VBA", "Python", "MATLAB", "C/C++", "Développement web", "IoT (ESP32, MQTT)"],
    en: ["Power BI", "Advanced Excel / VBA", "Python", "MATLAB", "C/C++", "Web development", "IoT (ESP32, MQTT)"],
  },
  sciences: {
    fr: ["Machines thermiques", "Transfert de chaleur", "Mécanique des fluides", "Énergies renouvelables"],
    en: ["Thermal machines", "Heat transfer", "Fluid mechanics", "Renewable energy"],
  },
};

type Evidence = { text: string; href?: string };

export default async function CompetencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Competences");
  const tSkills = await getTranslations("Skills");
  const lang = locale === "en" ? "en" : "fr";

  const groups: { key: GroupKey; heading: string; evidence: Evidence[] }[] = [
    {
      key: "methodes",
      heading: t("group_methodes"),
      evidence: [
        { text: t("evidence_methodes"), href: "/projets/stellantis-maitrise-cout-transformation" },
      ],
    },
    {
      key: "amelioration",
      heading: t("group_amelioration"),
      evidence: [
        {
          text: t("evidence_amelioration"),
          href: "/projets/stellantis-maitrise-cout-transformation",
        },
        {
          text: t("evidence_amelioration_2"),
          href: "/projets/diagnostic-amdec-injection-plastique",
        },
      ],
    },
    {
      key: "maintenance",
      heading: t("group_maintenance"),
      evidence: [
        { text: t("evidence_maintenance"), href: "/projets/aic-diagnostic-pliage-cintrage" },
        { text: t("evidence_maintenance_2"), href: "/projets/diagnostic-amdec-injection-plastique" },
      ],
    },
    {
      key: "conception",
      heading: t("group_conception"),
      evidence: [
        { text: t("evidence_conception_1"), href: "/projets/conception-mecanique-catia-v5" },
        { text: t("evidence_conception_2"), href: "/projets/etude-thermodynamique-turbine-vapeur" },
      ],
    },
    {
      key: "donnees",
      heading: t("group_donnees"),
      evidence: [
        {
          text: t("evidence_donnees_1"),
          href: "/projets/stellantis-maitrise-cout-transformation",
        },
        { text: t("evidence_donnees_2"), href: "/projets/irrigation-intelligente-iot" },
      ],
    },
    {
      key: "sciences",
      heading: t("group_sciences"),
      evidence: [
        { text: t("evidence_sciences"), href: "/projets/etude-thermodynamique-turbine-vapeur" },
      ],
    },
  ];

  return (
    <>
      <Section eyebrow={tSkills("eyebrow")} title={tSkills("title")}>
        <SkillsMatrix />
      </Section>

      <Rule />

      <Section eyebrow={t("evidence_eyebrow")} title={t("evidence_title")}>
        <Reveal stagger className="flex flex-col gap-8">
          {groups.map((group, index) => (
            <div key={group.key}>
              {index > 0 ? <Rule className="mb-8" /> : null}
              <h2 className="mb-3 text-lg text-ink">{group.heading}</h2>
              <div className="mb-3 flex flex-wrap gap-2">
                {TAGS[group.key][lang].map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <ul className="flex flex-col gap-1">
                {group.evidence.map((item) =>
                  item.href ? (
                    <li key={item.text}>
                      <Link
                        href={item.href}
                        className="text-sm text-accent hover:underline"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ) : (
                    <li key={item.text} className="text-sm italic text-steel">
                      {item.text}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
