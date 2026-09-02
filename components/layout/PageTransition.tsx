"use client";

import { type ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

// BRIEF §5.8. Entrance half only (opacity 0→1, y 8→0, 420ms soft) — a true
// exit-then-enter cross-fade needs either the View Transitions API or
// framer-motion's AnimatePresence, both deliberately deferred to Phase 7's
// motion-engine decision (see DESIGN.md). Keying by pathname remounts this
// wrapper on every navigation, replaying the CSS keyframe; Header/Footer
// live outside it so nav chrome never re-animates. `prefers-reduced-motion`
// is already handled by the sitewide animation-duration override.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
