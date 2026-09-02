import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

// "Mon expertise" / "What I Do" (homepage, owner request 2026-09-02) —
// replaces the Stellantis case-study feature block. Numbered 01–04 dark
// cards with a center portrait on desktop, adapted from the same layout
// pattern as the retired HomeSkillsGrid (grid, numbering, center photo) —
// these items are service domains, not links to a specific case study, so
// cards are static (no href) rather than reusing that component's Link.
export type ExpertiseItem = {
  title: string;
  desc: string;
};

function ExpertiseCard({ item, index }: { item: ExpertiseItem; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="flex min-h-[220px] flex-col justify-between rounded-hairline border border-rule bg-surface p-5 transition-colors duration-200 ease-[var(--ease-plot)] hover:border-accent">
      <span aria-hidden="true" className="font-data text-xs text-steel">
        {number}
      </span>
      <div className="mt-6 flex flex-col gap-2">
        <h3 className="text-md text-ink">{item.title}</h3>
        <p className="text-sm text-graphite">{item.desc}</p>
      </div>
    </div>
  );
}

export function ExpertiseGrid({
  items,
  photoSrc,
  photoAlt,
}: {
  items: ExpertiseItem[];
  photoSrc: string;
  photoAlt: string;
}) {
  const left = items.slice(0, 2);
  const right = items.slice(2, 4);

  return (
    <div className="overflow-x-clip overflow-y-visible">
      <Reveal stagger className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:hidden">
        {items.map((item, i) => (
          <ExpertiseCard key={item.title} item={item} index={i} />
        ))}
      </Reveal>

      <div className="hidden lg:grid lg:grid-cols-[1fr_360px_1fr] lg:items-end lg:gap-6">
        <Reveal stagger className="flex flex-col gap-4">
          {left.map((item, i) => (
            <ExpertiseCard key={item.title} item={item} index={i} />
          ))}
        </Reveal>

        <Reveal className="relative flex h-full min-h-[480px] items-end justify-center">
          <div
            aria-hidden="true"
            className="skills-photo-halo absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
          />
          <div className="relative h-[540px] w-[360px]">
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              sizes="360px"
              priority={false}
              className="object-contain object-bottom"
            />
          </div>
        </Reveal>

        <Reveal stagger className="flex flex-col gap-4">
          {right.map((item, i) => (
            <ExpertiseCard key={item.title} item={item} index={i + 2} />
          ))}
        </Reveal>
      </div>
    </div>
  );
}
