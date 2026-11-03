import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { ToolIcon } from "./tool-icon";

export function ToolCard({ tool }: { tool: Tool }) {
  const live = tool.status === "live";

  // Unbuilt tools are not linked, so we never ship thin placeholder pages.
  if (!live) {
    return (
      <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="grayscale opacity-60">
            <ToolIcon path={tool.path} />
          </span>
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">Coming soon</span>
        </div>
        <h3 className="mt-5 text-[1.05rem] font-bold text-muted">{tool.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{tool.summary}</p>
      </div>
    );
  }

  return (
    <Link
      href={tool.path}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/40 hover:shadow-[0_8px_30px_rgb(0_0_0/0.08)] focus-visible:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <ToolIcon path={tool.path} solid />
        <span className="rounded-full bg-good-soft px-2.5 py-1 text-xs font-medium text-good">Free</span>
      </div>
      <h3 className="mt-5 text-[1.05rem] font-bold">{tool.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        Use tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function ToolGrid({ tools }: { tools: Tool[] }) {
  // Live tools first so the grid leads with what works today.
  const sorted = [...tools].sort((a, b) => Number(b.status === "live") - Number(a.status === "live"));
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {sorted.map((t) => (
        <ToolCard key={t.path} tool={t} />
      ))}
    </div>
  );
}
