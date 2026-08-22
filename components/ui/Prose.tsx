import { type ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="measure text-graphite [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:text-lg [&>h2]:text-ink [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-signal [&_blockquote]:pl-4 [&_blockquote]:text-steel [&_blockquote]:italic">
      {children}
    </div>
  );
}
