// /projets hero band — video-reference clone, 2026-09-05. Reference's own
// section header is a plain centered heading with a short accent rule
// beneath it, no photo band — replaces the 2026-09-01 stock-photo band
// (public/images/projets-hero-gears.webp) and its font-editorial exception,
// neither of which fit the new all-grotesque, no-serif type system.
export function ProjectsHeroBand({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-16 pb-4 text-center sm:px-6 sm:pt-24">
      <h1 className="font-display text-3xl text-ink sm:text-5xl">{title}</h1>
      <div aria-hidden className="mx-auto mt-4 h-[3px] w-16 bg-accent" />
      <p className="measure mx-auto mt-6 text-graphite">{intro}</p>
    </div>
  );
}
