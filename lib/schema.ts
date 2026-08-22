import { z } from "zod";

export const caseStudyFrontmatterSchema = z.object({
  slug: z.string(),
  locale: z.enum(["fr", "en"]),
  title: z.string(),
  subtitle: z.string().max(90),
  category: z.enum(["methodes", "lean", "maintenance", "conception", "digital"]),
  organisation: z.string(),
  organisationPublic: z.boolean(),
  location: z.string(),
  period: z.object({
    start: z.string(),
    end: z.string(),
  }),
  durationLabel: z.string(),
  role: z.string(),
  summary: z.string().max(240),
  featured: z.boolean(),
  order: z.number(),
  confidential: z.boolean(),
  tools: z.array(z.string()),
  methods: z.array(z.string()),
  kpis: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        note: z.string().optional(),
      }),
    )
    .max(3),
  hero: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .nullable(),
  gallery: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string(),
      confidential: z.boolean().optional(),
    }),
  ),
  links: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
      type: z.enum(["demo", "github", "doc"]),
    }),
  ),
  related: z.array(z.string()),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;

export type CaseStudy = CaseStudyFrontmatter & {
  content: string;
};
