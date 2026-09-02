import { type ElementType, type ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

// BRIEF §3 <SectionLabel />. Chevron is decorative (aria-hidden) so screen
// readers get the label text alone, not "chevron INGÉNIERIE INDUSTRIELLE".
export function SectionLabel({ children, as: Tag = "p", className = "" }: SectionLabelProps) {
  return (
    <Tag className={`font-data text-label inline-flex items-center gap-1.5 uppercase text-accent ${className}`}>
      <span aria-hidden className="text-[6px]">
        ▸
      </span>
      {children}
    </Tag>
  );
}
