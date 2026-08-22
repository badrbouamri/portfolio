import { type ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[2px] border border-rule px-2 py-0.5 text-xs font-data text-graphite">
      {children}
    </span>
  );
}
