"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { averageViewsPerVideo, channelAge, formatAge, isPlaceholderDate, subscribersPerMonth, totalDays } from "@/lib/channel-age";
import { formatCompact, formatNumber, formatSubscribers } from "@/lib/format";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  channel: {
    id: string;
    title: string;
    handle: string | null;
    avatarUrl: string | null;
    publishedAt: string;
    country: string | null;
    subscribers: number | null;
    subscribersHidden: boolean;
    videoCount: number;
    views: number;
  };
  fetchedAt: string;
}

const UTC_DATE = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" });
const UTC_TIME = new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "UTC" });

/** Share link query: the handle when there is one (kept readable, "@" unescaped), else the channel ID. */
function shareQuery(c: Result["channel"]): string {
  return `?c=${encodeURIComponent(c.handle ?? c.id).replace(/^%40/, "@")}`;
}

/** "United States" from "US"; the raw code if the browser can't name it, "Not set" if the channel left it blank. */
function countryName(code: string | null): string {
  if (!code) return "Not set";
  try {
    return new Intl.DisplayNames("en", { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function ChannelAgeChecker() {
  const { state, run } = useToolRequest<Result>("/api/tools/channel-age");

  // Make every result shareable: put the channel in the URL without a navigation.
  const shared = state.status === "done" ? shareQuery(state.data.channel) : null;
  useEffect(() => {
    if (shared) history.replaceState(null, "", shared);
  }, [shared]);

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/@name"
        submitLabel="Check age"
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
          return r.ok ? null : r.message;
        }}
        queryParams={["c", "q"]}
        onSubmit={(input) => run({ input })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <ResultSkeleton />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard {...state.data} />}
      </div>
    </div>
  );
}

function ResultCard({ channel: c, fetchedAt }: Result) {
  const created = new Date(c.publishedAt);
  const dateText = UTC_DATE.format(created);
  const timeText = `${UTC_TIME.format(created)} UTC`;
  const now = new Date();
  // YouTube returns 1970-01-01 for some channels (e.g. @YouTube): never turn that into an age.
  const unknownDate = isPlaceholderDate(created);
  const age = formatAge(channelAge(created, now));
  const days = totalDays(created, now);
  const daysText = `${formatNumber(days)} ${days === 1 ? "day" : "days"}`;
  const perMonth = unknownDate ? null : subscribersPerMonth(c.subscribers, c.subscribersHidden, created, now);
  const perMonthText = unknownDate ? "Not available" : perMonth === null ? "Hidden by creator" : `≈ ${formatCompact(perMonth)}`;
  const resultText = unknownDate
    ? `${c.title}: creation date not public.`
    : `${c.title} was created on ${dateText} at ${timeText} (${age} ago, or ${daysText}).`;
  const perVideo = averageViewsPerVideo(c.views, c.videoCount);
  const averages = [
    {
      label: "Subscribers per month",
      value: perMonthText,
      muted: perMonth === null,
    },
    { label: "Average views per video", value: perVideo === null ? "No public videos" : formatCompact(perVideo), muted: perVideo === null },
  ];
  const shareUrl = `${location.origin}${location.pathname}${shareQuery(c)}`;
  const stats = [
    { label: "Subscribers", value: formatSubscribers(c.subscribers, c.subscribersHidden) },
    { label: "Total views since creation", value: formatCompact(c.views) },
    { label: "Public videos", value: formatNumber(c.videoCount) },
  ];
  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        {c.avatarUrl ? (
          <Image src={c.avatarUrl} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-full" />
        ) : (
          <div className="h-16 w-16 shrink-0 rounded-full bg-surface-2" />
        )}
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{c.title}</p>
          <p className="text-sm text-muted">{c.handle ?? "No handle"}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-surface-2 p-5 text-center">
        {unknownDate ? (
          <>
            <p className="text-3xl font-black tracking-tight">Creation date not public</p>
            <p className="mt-1 text-sm text-muted">
              YouTube doesn&apos;t give a real creation date for this channel, so its age can&apos;t be worked out.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-muted">This channel is</p>
            <p className="mt-1 text-3xl font-black tabular-nums tracking-tight">{age} old</p>
            <p className="mt-1 text-base font-semibold tabular-nums text-muted">{daysText} in total</p>
            <p className="mt-1 text-sm text-muted">
              Created on {dateText} at {timeText}
            </p>
          </>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border px-4 py-3">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 text-xl font-bold tabular-nums tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {averages.map((s) => (
          <div key={s.label} className="rounded-xl border border-border px-4 py-3">
            <p className="text-xs text-muted">{s.label}</p>
            <p className={`mt-1 tabular-nums tracking-tight ${s.muted ? "text-base text-muted" : "text-xl font-bold"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <dl className="mt-4 divide-y divide-border rounded-xl border border-border text-sm">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <dt className="text-muted">Country</dt>
          <dd className={c.country ? "font-medium" : "text-muted"}>{countryName(c.country)}</dd>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <dt className="text-muted">Channel ID</dt>
          <dd className="flex min-w-0 items-center gap-2">
            <code className="truncate font-mono text-[13px]">{c.id}</code>
            <CopyButton text={c.id} label="Copy ID" ariaLabel="Copy ID of this channel" className="shrink-0 px-2.5 py-1 text-xs" />
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <CopyButton text={resultText} label="Copy result" />
          <CopyButton text={shareUrl} label="Copy link" ariaLabel="Copy link to this result" />
          <a
            href={`https://www.youtube.com/channel/${c.id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open on YouTube (opens in a new tab)"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition hover:border-accent"
          >
            Open on YouTube <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        <FetchedAt iso={fetchedAt} />
      </div>
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
      <Skeleton className="mt-4 h-28 w-full" />
      <Skeleton className="mt-4 h-[72px] w-full" />
      <Skeleton className="mt-3 h-[72px] w-full" />
      <Skeleton className="mt-4 h-[98px] w-full" />
    </div>
  );
}
