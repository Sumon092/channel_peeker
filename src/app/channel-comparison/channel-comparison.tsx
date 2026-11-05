"use client";

import { ArrowRight, LoaderCircle, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { ErrorBox, FetchedAt } from "@/components/ui/status";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatCompact, formatNumber, formatSubscribers } from "@/lib/format";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Channel {
  id: string;
  title: string;
  handle: string | null;
  avatarUrl: string | null;
  publishedAt: string;
  country: string | null;
  subscribers: number | null;
  subscribersHidden: boolean;
  views: number;
  videoCount: number;
}

interface Result {
  channels: Channel[];
  fetchedAt: string;
}

export function ChannelComparison() {
  const { state, run } = useToolRequest<Result>("/api/tools/channel-comparison");
  const [inputs, setInputs] = useState<string[]>(["", ""]);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const filled = inputs.map((s) => s.trim()).filter(Boolean);
    if (filled.length < 2) {
      setError("Enter at least 2 channels.");
      return;
    }
    for (const value of filled) {
      const r = parseYouTubeInput(value, "channel");
      if (!r.ok) {
        setError(`"${value.slice(0, 40)}": ${r.message}`);
        return;
      }
    }
    setError(null);
    run({ inputs: filled });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
        <p className="text-sm font-medium">Channels to compare (2–4)</p>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          {inputs.map((value, i) => (
            <input
              key={i}
              type="text"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              value={value}
              placeholder={`@handle or channel link ${i + 1}`}
              aria-label={`Channel ${i + 1}`}
              onChange={(e) => {
                const next = [...inputs];
                next[i] = e.target.value;
                setInputs(next);
                if (error) setError(null);
              }}
              className="min-w-0 field-pill px-5 py-3"
            />
          ))}
        </div>
        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-bad">
            {error}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="submit"
            disabled={state.status === "loading"}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-medium text-white transition hover:bg-accent-strong disabled:opacity-70"
          >
            {state.status === "loading" ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Comparing…
              </>
            ) : (
              <>
                Compare <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
          {inputs.length < 4 && (
            <button
              type="button"
              onClick={() => setInputs([...inputs, ""])}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-4 py-3 text-sm font-medium transition hover:bg-surface-3"
            >
              <Plus className="h-4 w-4" aria-hidden="true" /> Add channel
            </button>
          )}
          {inputs.length > 2 && (
            <button
              type="button"
              onClick={() => setInputs(inputs.slice(0, -1))}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-4 py-3 text-sm font-medium transition hover:bg-surface-3"
            >
              <Minus className="h-4 w-4" aria-hidden="true" /> Remove
            </button>
          )}
        </div>
      </form>

      <div aria-live="polite">
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ComparisonTable {...state.data} />}
      </div>
    </div>
  );
}

function best(values: (number | null)[], value: number | null) {
  const max = Math.max(...values.filter((v): v is number => v !== null));
  return value !== null && value === max;
}

function ComparisonTable({ channels, fetchedAt }: Result) {
  const rows: { label: string; render: (c: Channel) => string; highlight?: (c: Channel) => boolean }[] = [
    {
      label: "Subscribers",
      render: (c) => formatSubscribers(c.subscribers, c.subscribersHidden),
      highlight: (c) => best(channels.map((x) => x.subscribers), c.subscribers),
    },
    {
      label: "Total views",
      render: (c) => formatCompact(c.views),
      highlight: (c) => best(channels.map((x) => x.views), c.views),
    },
    {
      label: "Videos",
      render: (c) => formatNumber(c.videoCount),
    },
    {
      label: "Created",
      render: (c) => new Date(c.publishedAt).toLocaleDateString("en", { year: "numeric", month: "short" }),
    },
    {
      label: "Country",
      render: (c) => c.country ?? "—",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-32 pb-4 text-left align-bottom text-xs font-medium text-muted">Channel</th>
            {channels.map((c) => (
              <th key={c.id} className="pb-4 text-left align-bottom">
                <div className="flex items-center gap-2.5">
                  {c.avatarUrl ? (
                    <Image src={c.avatarUrl} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full" />
                  ) : (
                    <span className="h-10 w-10 shrink-0 rounded-full bg-surface-2" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{c.title}</p>
                    <p className="truncate text-xs font-normal text-muted">{c.handle ?? ""}</p>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-border">
              <td className="py-3 pr-4 text-xs text-muted">{row.label}</td>
              {channels.map((c) => (
                <td key={c.id} className={`py-3 pr-4 ${row.highlight?.(c) ? "font-bold text-accent" : "font-medium"}`}>
                  {row.render(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
