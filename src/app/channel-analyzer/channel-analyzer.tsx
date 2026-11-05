"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import type { AnalyzerReport, GradeComponent } from "@/lib/analyzer";
import { formatCompact, formatDuration, formatNumber, formatSubscribers } from "@/lib/format";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  channel: {
    id: string;
    title: string;
    handle: string | null;
    avatarUrl: string | null;
    subscribers: number | null;
    subscribersHidden: boolean;
    videoCount: number;
    views: number;
    publishedAt: string;
    country: string | null;
  };
  report: AnalyzerReport;
  fetchedAt: string;
}

export function ChannelAnalyzer() {
  const { state, run } = useToolRequest<Result>("/api/tools/channel-analyzer");
  const [lastInput, setLastInput] = useState<string | null>(null);

  // Make every successful result shareable: put the query in the URL without a navigation.
  useEffect(() => {
    if (state.status === "done" && lastInput) {
      history.replaceState(null, "", `?q=${encodeURIComponent(lastInput)}`);
    }
  }, [state.status, lastInput]);

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/@name"
        submitLabel="Analyze"
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
          { label: "A video link", value: "https://youtu.be/dQw4w9WgXcQ" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
          return r.ok ? null : r.message;
        }}
        onSubmit={(input) => {
          setLastInput(input);
          run({ input });
        }}
      />

      <div aria-live="polite">
        {state.status === "loading" && <ResultSkeleton />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard result={state.data} shareInput={lastInput} />}
      </div>
    </div>
  );
}

function ResultCard({ result, shareInput }: { result: Result; shareInput: string | null }) {
  const { channel: c, report: r, fetchedAt } = result;
  const shareUrl = shareInput ? `${location.origin}/channel-analyzer?q=${encodeURIComponent(shareInput)}` : null;
  const grade = r.derived?.grade ?? null;

  const stats: { label: string; value: string; estimate?: boolean }[] = [
    { label: "Subscribers", value: formatSubscribers(c.subscribers, c.subscribersHidden) },
    { label: "Total views", value: formatCompact(c.views) },
    { label: "Videos", value: formatNumber(c.videoCount) },
    { label: "Uploads (90 days)", value: formatNumber(r.uploads90d) },
  ];
  if (r.derived) {
    if (r.derived.medianViewsLong !== null) stats.push({ label: "Median views (long-form)", value: formatCompact(r.derived.medianViewsLong), estimate: true });
    if (r.derived.medianViewsShorts !== null) stats.push({ label: "Median views (Shorts)", value: formatCompact(r.derived.medianViewsShorts), estimate: true });
    if (r.derived.likeRatePct !== null) stats.push({ label: "Median like rate", value: `${r.derived.likeRatePct}%`, estimate: true });
    if (r.derived.commentRatePct !== null) stats.push({ label: "Median comment rate", value: `${r.derived.commentRatePct}%`, estimate: true });
  }

  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          {c.avatarUrl ? (
            <Image src={c.avatarUrl} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-full" />
          ) : (
            <div className="h-16 w-16 shrink-0 rounded-full bg-surface-2" />
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{c.title}</p>
            <p className="text-sm text-muted">
              {c.handle ?? "No handle"} · Joined {new Date(c.publishedAt).getFullYear()}
              {c.country ? ` · ${c.country}` : ""}
            </p>
          </div>
        </div>
        {shareUrl && <CopyButton text={shareUrl} label="Copy share link" className="shrink-0 bg-surface-2" />}
      </div>

      {grade && (
        <div className="mt-5 rounded-2xl border border-border bg-surface-2/50 p-4 sm:p-5">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-4xl font-black text-white">
              {grade.letter}
            </span>
            <div>
              <p className="font-semibold">Channel report card: {grade.score}/100</p>
              <p className="text-sm text-muted">A channelpeek estimate from the newest {r.sampleSize} public uploads. The math is shown below.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {grade.components.map((comp) => (
              <GradeBar key={comp.id} comp={comp} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border px-4 py-3">
            <p className="text-xs text-muted">
              {s.label}
              {s.estimate && <span title="channelpeek estimate"> *</span>}
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <ViewsChart series={r.series} />

      {r.topVideos.length > 0 && (
        <div className="mt-5 rounded-xl border border-border p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Top recent videos</span>
            <span className="text-xs text-muted">by views, newest {r.sampleSize} uploads</span>
          </div>
          <ul className="mt-3 space-y-3">
            {r.topVideos.map((v) => (
              <li key={v.id} className="flex items-center gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-10 w-[72px] shrink-0 overflow-hidden rounded-md bg-surface-2"
                >
                  {v.thumbnailUrl && <Image src={v.thumbnailUrl} alt="" fill sizes="72px" className="object-cover" />}
                  <span className="absolute bottom-0.5 right-0.5 rounded-sm bg-black/80 px-1 text-[9px] text-white">
                    {formatDuration(v.durationSeconds)}
                  </span>
                </a>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{v.title}</p>
                  <p className="text-xs text-muted">
                    {v.views !== null ? `${formatCompact(v.views)} views` : "Views hidden"}
                    {v.isShort && " · Short"}
                  </p>
                </div>
                {v.outlierMultiplier !== null && <span className="text-sm font-bold text-accent">{v.outlierMultiplier}×</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          {r.derived ? "* channelpeek estimates, calculated from public YouTube data." : "Showing YouTube's own figures for the newest public uploads."}
        </p>
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}

function GradeBar({ comp }: { comp: GradeComponent }) {
  const pct = comp.score === null ? 0 : Math.round((comp.score / comp.max) * 100);
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{comp.label}</span>
        <span className="text-muted">{comp.score === null ? "–" : `${comp.score}/${comp.max}`}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">{comp.note}</p>
    </div>
  );
}

function ViewsChart({ series }: { series: AnalyzerReport["series"] }) {
  const points = series.filter((p) => p.views !== null) as { publishedAt: string; views: number; isShort: boolean }[];
  if (points.length < 3) return null;
  const w = 600;
  const h = 160;
  const max = Math.max(...points.map((p) => p.views)) * 1.1 || 1;
  const step = w / (points.length - 1);
  const pts = points.map((p, i) => [i * step, h - (p.views / max) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const peak = pts[points.findIndex((p) => p.views === Math.max(...points.map((q) => q.views)))];

  return (
    <div className="mt-4 rounded-xl border border-border p-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">Views per upload</span>
        <span className="text-muted">Newest {points.length} uploads, oldest first</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-36 w-full" preserveAspectRatio="none" role="img" aria-label="Views per upload over time">
        <defs>
          <linearGradient id="ca-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 80, 120].map((y) => (
          <line key={y} x1="0" x2={w} y1={y} y2={y} stroke="var(--border)" />
        ))}
        <path d={`${line} L${w} ${h} L0 ${h} Z`} fill="url(#ca-fill)" />
        <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <circle cx={peak[0]} cy={peak[1]} r="4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="mt-5 h-24 w-full" />
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[72px]" />
        ))}
      </div>
      <Skeleton className="mt-4 h-48 w-full" />
    </div>
  );
}
