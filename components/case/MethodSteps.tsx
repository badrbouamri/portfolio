import { type ReactNode } from "react";

type Step = {
  title: string;
  description: ReactNode;
};

// Numbering here is deliberate structural information (§8.5) — only use this
// component for genuinely sequential content (DMAIC/8D phases, process routing,
// roadmap). Never for skills, contact, or other non-sequential sections.
export function MethodSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span className="font-data text-sm text-steel">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-medium text-ink">{step.title}</p>
            <div className="text-graphite">{step.description}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
