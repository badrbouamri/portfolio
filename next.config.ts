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
  // Tried experimental.inlineCss to remove the global stylesheet's ~700ms
  // render-blocking cost (Lighthouse render-blocking-insight). Reverted:
  // it inlines the CSS text verbatim, but that text's @font-face src
  // URLs are relative (`../media/...`), correct only when resolved against
  // the external stylesheet's own path — inlined into the document, they
  // resolve against the page URL instead and 404 for every self-hosted
  // font sitewide (confirmed: errors-in-console best-practices audit
  // caught it, silently falling back to system fonts). The performance
  // gain measured with this on was an artifact of a broken page loading
  // faster by skipping every font fetch, not a real optimization. Do not
  // re-enable without also rewriting the font URLs to absolute paths.
};

export default withNextIntl(nextConfig);
