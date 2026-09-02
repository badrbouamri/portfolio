// Redesign (BRIEF-REFONTE-PORTFOLIO.md §2.4): three stacked background layers,
// mounted once here rather than per-page. Base paint comes from `body` in
// globals.css; this component only adds the two layers above it (halo, grain)
// so pages that don't need them pay nothing extra. Fixed + inset + negative
// z-index + pointer-events:none, per the brief: it never intercepts input and
// never affects layout.
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="backdrop-halo absolute inset-0" />
      <div className="backdrop-grain absolute inset-0" />
    </div>
  );
}
