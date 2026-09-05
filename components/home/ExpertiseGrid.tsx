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

function ExpertiseCard({
  item,
  index,
  highlight = false,
}: {
  item: ExpertiseItem;
  index: number;
  highlight?: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`flex min-h-[220px] flex-col justify-between rounded-hairline border p-5 transition-colors duration-200 ease-[var(--ease-plot)] hover:border-accent ${
        highlight ? "glow-card bg-surface" : "border-rule bg-surface"
      }`}
    >
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

// One highlighted card per grid — the reference's single glowing skill card,
// rationed the same way the old amber/brass "data emphasis" rule was: at
// most one glow per visible group. The digital/data item is the deliberate
// scarcity value in the positioning (PRODUCT.md), so it's the one that glows.
const HIGHLIGHT_INDEX = 3;

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
          <ExpertiseCard key={item.title} item={item} index={i} highlight={i === HIGHLIGHT_INDEX} />
        ))}
      </Reveal>

      <div className="hidden lg:grid lg:grid-cols-[1fr_360px_1fr] lg:items-end lg:gap-6">
        <Reveal stagger className="flex flex-col gap-4">
          {left.map((item, i) => (
            <ExpertiseCard key={item.title} item={item} index={i} highlight={i === HIGHLIGHT_INDEX} />
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
            <ExpertiseCard key={item.title} item={item} index={i + 2} highlight={i + 2 === HIGHLIGHT_INDEX} />
          ))}
        </Reveal>
      </div>
    </div>
  );
}
