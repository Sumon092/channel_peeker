import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { toolHref, toolName, toolSummary } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import type { Tool } from "@/lib/tools";
import { chromeFor } from "@/locales/widgets";
import { ToolIcon } from "./tool-icon";

/** locale: render names/labels in that language and link to the localized page when one exists. */
export function ToolCard({ tool, locale }: { tool: Tool; locale?: Locale }) {
  const live = tool.status === "live";
  const c = chromeFor(locale);
  const name = toolName(tool, locale);
  const summary = toolSummary(tool, locale);

  // Unbuilt tools are not linked, so we never ship thin placeholder pages.
  if (!live) {
    return (
      <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="grayscale opacity-60">
            <ToolIcon path={tool.path} />
          </span>
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">{c.soonLabel}</span>
        </div>
        <h3 className="mt-5 text-card-title font-bold text-muted">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>
      </div>
    );
  }

  return (
    <Link
      href={toolHref(tool.path, locale)}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/40 hover:shadow-panel focus-visible:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <ToolIcon path={tool.path} solid />
        <span className="rounded-full bg-good-soft px-2.5 py-1 text-xs font-medium text-good">{c.freeLabel}</span>
      </div>
      <h3 className="mt-5 text-card-title font-bold">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
        {c.useTool} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function ToolGrid({ tools, locale }: { tools: Tool[]; locale?: Locale }) {
  // Live tools first so the grid leads with what works today.
  const sorted = [...tools].sort((a, b) => Number(b.status === "live") - Number(a.status === "live"));
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {sorted.map((t) => (
        <ToolCard key={t.path} tool={t} locale={locale} />
      ))}
    </div>
  );
}
