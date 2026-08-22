import { Tag } from "@/components/ui/Tag";

export function ToolChips({ tools }: { tools: string[] }) {
  if (tools.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <Tag key={tool}>{tool}</Tag>
      ))}
    </div>
  );
}
