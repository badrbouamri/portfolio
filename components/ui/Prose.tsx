import { type ReactNode } from "react";

// BRIEF §4.2 /projets/[slug]: "colonne de 68ch centrée" — mx-auto added here
// (Prose's only consumer is the case-study page) rather than on a wrapping
// element, since .measure's max-width lives on this div itself.
export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-article measure mx-auto text-graphite">{children}</div>;
}
