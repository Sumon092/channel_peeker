"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import type { AnalyzerReport, GradeComponent } from "@/lib/analyzer";
import { formatDuration } from "@/lib/format";
import { fmt } from "@/lib/widget-i18n";
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
  const { w } = useI18n();
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
        label={w.channelInputLabel}
        placeholder={w.channelPlaceholder}
        submitLabel={w.analyzer.submit}
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
          { label: w.exampleVideoLink, value: "https://youtu.be/dQw4w9WgXcQ" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
          return r.ok ? null : w.parseErrors[r.code];
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
  const { intl, w } = useI18n();
  const a = w.analyzer;
  const { channel: c, report: r, fetchedAt } = result;
  const shareUrl = shareInput ? `${location.origin}${location.pathname}?q=${encodeURIComponent(shareInput)}` : null;
  const grade = r.derived?.grade ?? null;

  const compact = (n: number) => Intl.NumberFormat(intl, { notation: "compact", maximumFractionDigits: 1 }).format(n);
  const num = (n: number) => n.toLocaleString(intl);
  const subs = c.subscribersHidden || c.subscribers === null ? a.hiddenByCreator : c.subscribers >= 1000 ? `≈ ${compact(c.subscribers)}` : num(c.subscribers);

  const stats: { label: string; value: string; estimate?: boolean }[] = [
    { label: a.statSubscribers, value: subs },
    { label: a.statViews, value: compact(c.views) },
    { label: a.statVideos, value: num(c.videoCount) },
    { label: a.statUploads90, value: num(r.uploads90d) },
  ];
  if (r.derived) {
    if (r.derived.medianViewsLong !== null) stats.push({ label: a.medianLong, value: compact(r.derived.medianViewsLong), estimate: true });
    if (r.derived.medianViewsShorts !== null) stats.push({ label: a.medianShorts, value: compact(r.derived.medianViewsShorts), estimate: true });
    if (r.derived.likeRatePct !== null) stats.push({ label: a.likeRate, value: `${r.derived.likeRatePct}%`, estimate: true });
    if (r.derived.commentRatePct !== null) stats.push({ label: a.commentRate, value: `${r.derived.commentRatePct}%`, estimate: true });
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
              {c.handle ?? a.noHandle} · {fmt(a.joined, { year: new Date(c.publishedAt).getFullYear() })}
              {c.country ? ` · ${c.country}` : ""}
            </p>
          </div>
        </div>
        {shareUrl && <CopyButton text={shareUrl} label={a.copyShare} className="shrink-0 bg-surface-2" />}
      </div>

      {grade && (
        <div className="mt-5 rounded-2xl border border-border bg-surface-2/50 p-4 sm:p-5">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent-fill text-4xl font-black text-white">
              {grade.letter}
            </span>
            <div>
              <p className="font-semibold">{fmt(a.reportCard, { score: grade.score })}</p>
              <p className="text-sm text-muted">{fmt(a.reportNote, { n: r.sampleSize })}</p>
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
              {s.estimate && <span aria-hidden="true"> *</span>}
              {s.estimate && <span className="sr-only"> {a.estimateSr}</span>}
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <ViewsChart series={r.series} />

      {r.topVideos.length > 0 && (
        <div className="mt-5 rounded-xl border border-border p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{a.topVideos}</span>
            <span className="text-xs text-muted">{fmt(a.topVideosNote, { n: r.sampleSize })}</span>
          </div>
          <ul className="mt-3 space-y-3">
            {r.topVideos.map((v) => (
              <li key={v.id} className="flex items-center gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={fmt(a.opensOnYouTube, { title: v.title })}
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
                    {v.views !== null ? fmt(a.viewsCompact, { n: compact(v.views) }) : a.viewsHidden}
                    {v.isShort && ` · ${a.short}`}
                  </p>
                </div>
                {v.outlierMultiplier !== null && (
                  <span className="text-sm font-bold text-accent">
                    {v.outlierMultiplier}×<span className="sr-only"> {a.outlierSr}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">{r.derived ? a.footEstimates : a.footOfficial}</p>
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
  const { intl, w } = useI18n();
  const a = w.analyzer;
  const points = series.filter((p) => p.views !== null) as { publishedAt: string; views: number; isShort: boolean }[];
  if (points.length < 3) return null;
  const compact = (n: number) => Intl.NumberFormat(intl, { notation: "compact", maximumFractionDigits: 1 }).format(n);
  const vw = 600;
  const h = 160;
  const max = Math.max(...points.map((p) => p.views)) * 1.1 || 1;
  const step = vw / (points.length - 1);
  const pts = points.map((p, i) => [i * step, h - (p.views / max) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const peak = pts[points.findIndex((p) => p.views === Math.max(...points.map((q) => q.views)))];

  return (
    <div className="mt-4 rounded-xl border border-border p-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{a.chartTitle}</span>
        <span className="text-muted">{fmt(a.chartNote, { n: points.length })}</span>
      </div>
      <svg
        viewBox={`0 0 ${vw} ${h}`}
        className="mt-3 h-36 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={fmt(a.chartAria, {
          n: points.length,
          peak: compact(Math.max(...points.map((p) => p.views))),
          latest: compact(points[points.length - 1].views),
        })}
      >
        <defs>
          <linearGradient id="ca-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 80, 120].map((y) => (
          <line key={y} x1="0" x2={vw} y1={y} y2={y} stroke="var(--border)" />
        ))}
        <path d={`${line} L${vw} ${h} L0 ${h} Z`} fill="url(#ca-fill)" />
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
