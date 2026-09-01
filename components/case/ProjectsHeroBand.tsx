// Engineering Projects hero band (2026-09-01) — the /projets page header,
// cloned from a reference screenshot's dark-image + serif-title pattern. No
// stock photo is sourced for the dark band (unlicensed); it reuses the
// site's own grid-line motif (.projects-hero-dark, app/globals.css) inverted
// for a dark ground instead. See CLAUDE.md.
export function ProjectsHeroBand({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="relative" data-print-avoid-break>
      <div className="projects-hero-dark h-[220px] w-full sm:h-[280px]" aria-hidden="true" />
      <div className="relative z-10 mx-auto -mt-16 max-w-[1200px] px-4 sm:-mt-20 sm:px-6">
        <div className="max-w-[640px] border border-rule bg-surface p-6 sm:p-10">
          <h1 className="font-editorial text-3xl text-ink sm:text-4xl">{title}</h1>
          <p className="measure mt-4 text-sm text-graphite sm:text-base">{intro}</p>
        </div>
      </div>
    </div>
  );
}
