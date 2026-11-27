"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { useI18n } from "@/components/i18n-provider";
import { averageViewsPerVideo, channelAge, formatAgeIn, isPlaceholderDate, pluralUnit, subscribersPerMonth, totalDays } from "@/lib/channel-age";
import { fmt } from "@/lib/widget-i18n";
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

/** The page language's channel-age strings. */
function useAgeStrings() {
  const { intl, w } = useI18n();
  return { intl, w, a: w.channelAge };
}

/** "95.9K" / "9.6万"; in languages that don't shorten thousands (German "95.884") a whole number, never "95.883,7". */
function compact(n: number, intl: string): string {
  const short = new Intl.NumberFormat(intl, { notation: "compact", maximumFractionDigits: 1 }).format(n);
  return /\p{L}/u.test(short) ? short : new Intl.NumberFormat(intl, { maximumFractionDigits: 0 }).format(n);
}
const whole = (n: number, intl: string) => new Intl.NumberFormat(intl).format(n);

/** Share link query: the handle when there is one (kept readable, "@" unescaped), else the channel ID. */
function shareQuery(c: Result["channel"]): string {
  return `?c=${encodeURIComponent(c.handle ?? c.id).replace(/^%40/, "@")}`;
}

/** "United States" from "US" in the page language; the raw code if the browser can't name it; null if the channel left it blank. */
function countryName(code: string | null, intl: string): string | null {
  if (!code) return null;
  try {
    return new Intl.DisplayNames(intl, { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function ChannelAgeChecker() {
  const { w, a } = useAgeStrings();
  const { state, run } = useToolRequest<Result>("/api/tools/channel-age");

  // Make every result shareable: put the channel in the URL without a navigation.
  const shared = state.status === "done" ? shareQuery(state.data.channel) : null;
  useEffect(() => {
    if (shared) history.replaceState(null, "", shared);
  }, [shared]);

  return (
    <div className="space-y-4">
      <ToolInput
        label={w.channelInputLabel}
        placeholder={w.channelPlaceholder}
        submitLabel={a.submit}
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
          return r.ok ? null : w.parseErrors[r.code];
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
  const { intl, w, a } = useAgeStrings();
  const created = new Date(c.publishedAt);
  const dateText = new Intl.DateTimeFormat(intl, { dateStyle: "long", timeZone: "UTC" }).format(created);
  const timeText = `${new Intl.DateTimeFormat(intl, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "UTC" }).format(created)} UTC`;
  const now = new Date();
  // YouTube returns 1970-01-01 for some channels (e.g. @YouTube): never turn that into an age.
  const unknownDate = isPlaceholderDate(created);
  const age = formatAgeIn(channelAge(created, now), a.units, intl);
  const daysText = pluralUnit(totalDays(created, now), a.units.day, intl);
  const perMonth = unknownDate ? null : subscribersPerMonth(c.subscribers, c.subscribersHidden, created, now);
  const perMonthText = unknownDate ? a.notAvailable : perMonth === null ? a.hiddenByCreator : `≈ ${compact(perMonth, intl)}`;
  const resultText = unknownDate
    ? fmt(a.resultTextNotPublic, { title: c.title })
    : fmt(a.resultText, { title: c.title, date: dateText, time: timeText, age, days: daysText });
  const perVideo = averageViewsPerVideo(c.views, c.videoCount);
  const averages = [
    { label: a.perMonth, value: perMonthText, muted: perMonth === null },
    { label: a.perVideo, value: perVideo === null ? a.noVideos : compact(perVideo, intl), muted: perVideo === null },
  ];
  const shareUrl = `${location.origin}${location.pathname}${shareQuery(c)}`;
  const subs = c.subscribersHidden || c.subscribers === null ? a.hiddenByCreator : c.subscribers >= 1000 ? `≈ ${compact(c.subscribers, intl)}` : whole(c.subscribers, intl);
  const country = countryName(c.country, intl);
  const stats = [
    { label: a.statSubscribers, value: subs },
    { label: a.statViews, value: compact(c.views, intl) },
    { label: a.statVideos, value: whole(c.videoCount, intl) },
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
          <p className="text-sm text-muted">{c.handle ?? a.noHandle}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-surface-2 p-5 text-center">
        {unknownDate ? (
          <>
            <p className="text-3xl font-black tracking-tight">{a.notPublicTitle}</p>
            <p className="mt-1 text-sm text-muted">{a.notPublicBody}</p>
          </>
        ) : (
          <>
            <p className="text-sm text-muted">{a.thisChannelIs}</p>
            <p className="mt-1 text-3xl font-black tabular-nums tracking-tight">{fmt(a.ageOld, { age })}</p>
            <p className="mt-1 text-base font-semibold tabular-nums text-muted">{fmt(a.daysInTotal, { days: daysText })}</p>
            <p className="mt-1 text-sm text-muted">{fmt(a.createdOn, { date: dateText, time: timeText })}</p>
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
          <dt className="text-muted">{a.country}</dt>
          <dd className={country ? "font-medium" : "text-muted"}>{country ?? a.notSet}</dd>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <dt className="text-muted">{a.channelId}</dt>
          <dd className="flex min-w-0 items-center gap-2">
            <code className="truncate font-mono text-[13px]">{c.id}</code>
            <CopyButton text={c.id} label={a.copyId} ariaLabel={a.copyIdAria} className="shrink-0 px-2.5 py-1 text-xs" />
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <CopyButton text={resultText} label={a.copyResult} />
          <CopyButton text={shareUrl} label={a.copyLink} ariaLabel={a.copyLinkAria} />
          <a
            href={`https://www.youtube.com/channel/${c.id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${a.openOnYouTube} ${w.opensInNewTab}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition hover:border-accent"
          >
            {a.openOnYouTube} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
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
