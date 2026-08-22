import { NextResponse, type NextRequest } from "next/server";
import { trackEvent } from "@/lib/analytics";

export async function GET(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  trackEvent("cv_download", { locale });

  // TODO: swap for a real EN CV once available (docs/tasks.md M1) — serving the
  // FR file for /en/cv for now rather than a broken link.
  const filename =
    locale === "en" ? "CV_ELBOUAMRI_BadrEddine_FR.pdf" : "CV_ELBOUAMRI_BadrEddine_FR.pdf";

  return NextResponse.redirect(new URL(`/cv/${filename}`, request.url));
}
