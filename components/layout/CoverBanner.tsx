// Homepage cover — a production-line schematic (nodes = workstations, the
// accent node = the DMAIC win) drawn in the site's own blueprint language
// instead of stock photography (see docs/redesign-brief.md discussion).
// Purely decorative: aria-hidden, no interactive elements.
const NODES = [
  { x: 60, y: 104 },
  { x: 260, y: 56 },
  { x: 460, y: 112 },
  { x: 700, y: 48 },
  { x: 940, y: 104 },
  { x: 1140, y: 64 },
];

const CORNER_MARKS: [number, number][] = [
  [16, 16],
  [1184, 16],
  [16, 144],
  [1184, 144],
];

export function CoverBanner() {
  const pathD = NODES.map((n, i) => `${i === 0 ? "M" : "L"}${n.x} ${n.y}`).join(" ");
  const accentIndex = NODES.length - 2;

  return (
    <div
      aria-hidden="true"
      className="hero-grid-bg relative h-24 w-full overflow-hidden border-b border-rule sm:h-32"
    >
      <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="h-full w-full">
        <path
          d={pathD}
          fill="none"
          stroke="var(--color-steel)"
          strokeWidth="1.5"
          className="cover-line"
        />
        {NODES.map((n, i) => (
          <rect
            key={`${n.x}-${n.y}`}
            x={n.x - 6}
            y={n.y - 6}
            width="12"
            height="12"
            fill="var(--color-surface)"
            stroke={i === accentIndex ? "var(--color-accent)" : "var(--color-steel)"}
            strokeWidth="1.5"
            className="cover-node"
            style={{ animationDelay: `${500 + i * 90}ms` }}
          />
        ))}
        {CORNER_MARKS.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`} stroke="var(--color-rule)" strokeWidth="1">
            <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} />
            <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} />
          </g>
        ))}
      </svg>
    </div>
  );
}
