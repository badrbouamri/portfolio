import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { caseStudyFrontmatterSchema, type CaseStudy } from "./schema";
import type { Locale } from "@/i18n/routing";

const CONTENT_ROOT = path.join(process.cwd(), "content");

// Some case study files carry a leading `<!-- ... -->` publication warning
// (e.g. a pending-confidentiality-check notice) before the frontmatter block.
// gray-matter only recognises `---` as a delimiter at byte 0, so strip any
// leading HTML comments first rather than requiring content authors to move
// the warning after the frontmatter.
function stripLeadingHtmlComments(raw: string): string {
  return raw.replace(/^(\s*<!--[\s\S]*?-->\s*)+/, "");
}

function readCaseStudyFile(filePath: string, fileLabel: string): CaseStudy {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(stripLeadingHtmlComments(raw));

  const result = caseStudyFrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid case study frontmatter in "${fileLabel}":\n${result.error.issues
        .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  return { ...result.data, content };
}

export function getAllCaseStudies(locale: Locale): CaseStudy[] {
  const dir = path.join(CONTENT_ROOT, locale, "projets");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const caseStudies = files.map((file) =>
    readCaseStudyFile(path.join(dir, file), `content/${locale}/projets/${file}`),
  );

  return caseStudies.sort((a, b) => a.order - b.order);
}

export function getCaseStudy(locale: Locale, slug: string): CaseStudy | null {
  return getAllCaseStudies(locale).find((cs) => cs.slug === slug) ?? null;
}

export function getAllCaseStudySlugs(locale: Locale): string[] {
  return getAllCaseStudies(locale).map((cs) => cs.slug);
}
