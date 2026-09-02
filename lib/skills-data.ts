// Skills matrix data (redesign brief §3). Every skill listed here already
// appears in the Compétences page's TAGS taxonomy (app/[locale]/competences/page.tsx)
// or in a published case study — nothing here is a bare claim with no evidence
// elsewhere on the site. Categories were regrouped from the brief's original
// proposal because the brief dropped "Maintenance & fiabilité" and "Sciences de
// l'ingénieur" (both evidenced by real case studies) and added tools with no
// evidence anywhere (MSP/SPC, GD&T, plans d'expérience, VSM, SMED, Kanban, TPM).
//
// `level` and `confirmed` reflect the profile owner's own self-assessment,
// collected skill-by-skill (2026-08-28). Not a placeholder — update in place
// if the owner's assessment changes.
import { z } from "zod";

export const skillLevelSchema = z.enum(["notions", "maitrise", "expert"]);
export type SkillLevel = z.infer<typeof skillLevelSchema>;

export type Skill = {
  nameKey: string;
  level: SkillLevel;
  // false until the profile owner confirms the level themselves — decoupled
  // from `level` so a genuinely-confirmed "notions" skill doesn't keep
  // showing the "placeholder" hint forever. Flip to true per skill as you
  // confirm it (see SkillsToolbox's title tooltip on unconfirmed rows).
  confirmed: boolean;
  // Filename in /public/icons/skills/ (owner-supplied vendor logos, mixed
  // raster formats — not actually SVG despite the toolbox brief asking for
  // it; each was cropped/downscaled to a 128px square before being added
  // here). Omit for skills with no real-world logo, or where the owner's
  // source asset was a wordmark with no isolable square mark (ANSYS,
  // ABAQUS) — SkillsToolbox falls back to a 2-letter monogram either way.
  icon?: string;
  // false hides the skill from SkillsToolbox's pill grid while keeping it
  // defined here as the single source of truth. Used for the 4 engineering-
  // science topics (machines thermiques, transfert de chaleur, mécanique des
  // fluides, énergies renouvelables) that don't fit the toolbox's tool/method
  // taxonomy — they remain evidenced separately in the Compétences page's
  // "Preuves par domaine" section. Defaults to true when omitted.
  toolbox?: boolean;
};

export type SkillCategory = {
  id: string;
  labelKey: string;
  skills: Skill[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "cao",
    labelKey: "category_cao",
    skills: [
      { nameKey: "skill_catia", level: "expert", confirmed: true, icon: "catia.png" },
      { nameKey: "skill_solidworks", level: "expert", confirmed: true, icon: "solidworks.png" },
      { nameKey: "skill_autocad", level: "maitrise", confirmed: true, icon: "autocad.png" },
    ],
  },
  {
    id: "methodes",
    labelKey: "category_methodes",
    skills: [
      { nameKey: "skill_gammes_standards", level: "maitrise", confirmed: true },
      { nameKey: "skill_implantation_poste", level: "maitrise", confirmed: true },
      { nameKey: "skill_maitrise_procedes", level: "expert", confirmed: true },
      { nameKey: "skill_validation_gammes", level: "maitrise", confirmed: true },
      { nameKey: "skill_suivi_kpis", level: "expert", confirmed: true },
      { nameKey: "skill_lecture_plans", level: "expert", confirmed: true },
      { nameKey: "skill_dessin_industriel", level: "expert", confirmed: true },
    ],
  },
  {
    id: "amelioration",
    labelKey: "category_amelioration",
    skills: [
      { nameKey: "skill_dmaic", level: "expert", confirmed: true },
      { nameKey: "skill_amdec", level: "expert", confirmed: true },
      { nameKey: "skill_pareto", level: "expert", confirmed: true },
      { nameKey: "skill_ishikawa", level: "expert", confirmed: true },
      { nameKey: "skill_cinq_pourquoi", level: "expert", confirmed: true },
      { nameKey: "skill_qqoqccp", level: "expert", confirmed: true },
      { nameKey: "skill_sipoc", level: "expert", confirmed: true },
      { nameKey: "skill_huit_d", level: "expert", confirmed: true },
      { nameKey: "skill_kaizen", level: "expert", confirmed: true },
      { nameKey: "skill_cinq_s", level: "expert", confirmed: true },
    ],
  },
  {
    id: "maintenance",
    labelKey: "category_maintenance",
    skills: [
      { nameKey: "skill_diagnostic_mecanique", level: "maitrise", confirmed: true },
      { nameKey: "skill_maintenance_preventive_corrective", level: "maitrise", confirmed: true },
      { nameKey: "skill_analyse_pannes", level: "maitrise", confirmed: true },
      { nameKey: "skill_calcul_efforts", level: "maitrise", confirmed: true },
    ],
  },
  {
    id: "simulation",
    labelKey: "category_simulation",
    skills: [
      { nameKey: "skill_ansys", level: "maitrise", confirmed: true },
      { nameKey: "skill_abaqus", level: "maitrise", confirmed: true },
      { nameKey: "skill_digimat", level: "maitrise", confirmed: true },
      { nameKey: "skill_ces_edupack", level: "maitrise", confirmed: true },
      { nameKey: "skill_machines_thermiques", level: "maitrise", confirmed: true, toolbox: false },
      { nameKey: "skill_transfert_chaleur", level: "expert", confirmed: true, toolbox: false },
      { nameKey: "skill_mecanique_fluides", level: "maitrise", confirmed: true, toolbox: false },
      { nameKey: "skill_energies_renouvelables", level: "expert", confirmed: true, toolbox: false },
    ],
  },
  {
    id: "data",
    labelKey: "category_data",
    skills: [
      { nameKey: "skill_power_bi", level: "expert", confirmed: true, icon: "power-bi.png" },
      { nameKey: "skill_excel_vba", level: "expert", confirmed: true, icon: "excel.png" },
      { nameKey: "skill_python", level: "notions", confirmed: true, icon: "python.png" },
      { nameKey: "skill_matlab", level: "maitrise", confirmed: true, icon: "matlab.png" },
      { nameKey: "skill_c_cpp", level: "notions", confirmed: true },
      { nameKey: "skill_dev_web", level: "maitrise", confirmed: true },
      { nameKey: "skill_iot", level: "maitrise", confirmed: true },
    ],
  },
];

export const SKILL_LEVELS: SkillLevel[] = ["notions", "maitrise", "expert"];
