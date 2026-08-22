import { type ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, children, className = "" }: SectionProps) {
  return (
    <section className={`mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 ${className}`}>
      {eyebrow ? (
        <p className="mb-2 font-data text-xs uppercase tracking-wide text-steel">{eyebrow}</p>
      ) : null}
      {title ? <h2 className="mb-4 text-xl text-ink">{title}</h2> : null}
      {children}
    </section>
  );
}
