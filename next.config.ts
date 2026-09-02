import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // Next.js 15 streams <title>/<meta>/<link rel="canonical"> tags into <body>
  // (not <head>) for any visitor whose UA isn't on its built-in crawler
  // allowlist, to shave TTFB for humans. This site's metadata is a static
  // lookup (no real async work), so blocking costs nothing — matching
  // everything here means every visitor and crawler gets tags correctly
  // placed in <head>, fixing Lighthouse's "Document does not have a meta
  // description" SEO audit (its mobile UA emulation isn't on the allowlist)
  // and any real bot/link-unfurler not covered by Next's default list.
  htmlLimitedBots: /.*/,
};

export default withNextIntl(nextConfig);
