"use client";

import { ArrowRight, CalendarClock, CircleCheck, CircleHelp, CircleX, ExternalLink, History, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import {
  activityPath,
  confidence,
  countryInSentence,
  formatSubscriberCount,
  REQUIREMENTS_2027_ID,
  type Check,
  type Confidence,
  type MonetizationReport,
  type SelfCheck,
  type SignalStatus,
  type TierVerdict,
} from "@/lib/monetization";
import { addRecent, clearRecent, getRecent, getServerRecent, subscribeRecent } from "@/lib/recent-checks";
import { defaultMonthlyEarnings, formatUsd } from "@/lib/revenue-data";
import { fmt, type WidgetStrings } from "@/lib/widget-i18n";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Channel {
  id: string;
  title: string;
  handle: string | null;
  avatarUrl: string | null;
  subscribers: number | null;
  subscribersHidden: boolean;
  videoCount: number;
  country: string | null;
  madeForKids: boolean | null;
}

interface Result extends MonetizationReport {
  channel: Channel;
  /** Views on the last 30 days' uploads; only sent when the ad tier's public requirements are met. */
  recentViews: { views30dLong: number; views30dShorts: number; uploads30d: number } | null;
  fetchedAt: string;
}

/** localStorage key of this tool's "Recently checked" list (browser only). */
const RECENT_KEY = "cp:recent:monetization-checker";

type M = WidgetStrings["monetization"];

/** Handle when there is one (kept readable, "@" unescaped), else the channel ID. */
const channelParam = (c: Channel) => encodeURIComponent(c.handle ?? c.id).replace(/^%40/, "@");

export function MonetizationChecker() {
  const { w } = useI18n();
  const { state, run } = useToolRequest<Result>("/api/tools/monetization");
  const recent = useSyncExternalStore(subscribeRecent, () => getRecent(RECENT_KEY), getServerRecent);
  const [prefill, setPrefill] = useState<{ value: string; key: number }>();

  // Make every result shareable: put the channel in the URL without a navigation (canonical stays parameter-free).
  // and remember it in this browser's "Recently checked" list. `done` is a new object for each finished check.
  const done = state.status === "done" ? state.data.channel : null;
  useEffect(() => {
    if (!done) return;
    history.replaceState(null, "", `?c=${channelParam(done)}`);
    addRecent(RECENT_KEY, { input: done.handle ?? done.id, title: done.title, avatarUrl: done.avatarUrl });
  }, [done]);

  function checkAgain(input: string) {
    if (state.status === "loading") return;
    setPrefill((p) => ({ value: input, key: (p?.key ?? 0) + 1 }));
    run({ input });
  }

  return (
    <div className="space-y-4">
      <ToolInput
        label={w.channelInputLabel}
        placeholder={w.channelPlaceholder}
        submitLabel={w.monetization.submit}
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
          { label: w.monetization.exampleVideo, value: "https://youtu.be/dQw4w9WgXcQ" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
          return r.ok ? null : w.parseErrors[r.code];
        }}
        queryParams={["c", "q"]}
        prefill={prefill}
        onSubmit={(input) => run({ input })}
      />

      {recent.length > 0 && <RecentList items={recent} onPick={checkAgain} />}

      <div aria-live="polite">
        {state.status === "loading" && <ResultSkeleton />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {/* Keyed by channel so the self-check ticks reset for each new channel. */}
        {state.status === "done" && <ResultCard key={state.data.channel.id} {...state.data} />}
      </div>
    </div>
  );
}

const verdictTone: Record<TierVerdict, string> = {
  met: "border-good/30 bg-good-soft",
  partial: "border-warn/30 bg-warn-soft",
  not_yet: "border-bad/30 bg-bad-soft",
  unclear: "border-border bg-surface-2",
};

const confidenceTone: Record<Confidence, string> = {
  very_likely: "border-good/30 bg-good-soft",
  possibly: "border-warn/30 bg-warn-soft",
  possibly_fan: "border-warn/30 bg-warn-soft",
  unlikely: "border-bad/30 bg-bad-soft",
  cant_tell: "border-border bg-surface-2",
};

const statusIcon: Record<SignalStatus, { Icon: typeof CircleCheck; cls: string }> = {
  pass: { Icon: CircleCheck, cls: "text-good" },
  warn: { Icon: TriangleAlert, cls: "text-warn" },
  fail: { Icon: CircleX, cls: "text-bad" },
  unknown: { Icon: CircleHelp, cls: "text-muted" },
};

interface Ctx {
  c: Channel;
  r: Result;
  m: M;
  lang: string;
  intl: string;
}

function compact(n: number, intl: string) {
  return new Intl.NumberFormat(intl, { notation: "compact", maximumSignificantDigits: 3 }).format(n);
}

function uploadsValue({ c, r, m, intl }: Ctx) {
  const t = m.checks.uploads;
  if (c.videoCount === 0) return t.noVideosValue;
  const n = r.recentUploads.toLocaleString(intl);
  if (r.recentUploadsCapped) return fmt(t.uploadsCapped, { n });
  return r.recentUploads === 1 ? t.uploadsOne : fmt(t.uploadsMany, { n });
}

/** Label, value and detail of one check, in the page's language. */
function checkText(tier: "fan" | "ad", check: Check, ctx: Ctx): { label: string; value: string; detail: string } {
  const { c, r, m, lang, intl } = ctx;
  const s = check.status;
  switch (check.id) {
    case "subscribers": {
      const t = m.checks.subscribers;
      const label = tier === "fan" ? t.fanLabel : t.adLabel;
      if (s === "unknown" || c.subscribers === null) return { label, value: t.hiddenValue, detail: t.hiddenDetail };
      const value = formatSubscriberCount(c.subscribers, intl);
      if (tier === "ad") return { label, value, detail: s === "pass" ? t.adPassDetail : t.adFailDetail };
      if (s === "fail") return { label, value, detail: t.fanFailDetail };
      return { label, value, detail: c.subscribers >= 1000 ? t.fanPassFullDetail : t.fanPassStarterDetail };
    }
    case "country": {
      const t = m.checks.country;
      if (s === "unknown" || !c.country) return { label: t.label, value: t.notSetValue, detail: t.notSetDetail };
      let name = c.country;
      try {
        name = new Intl.DisplayNames(intl, { type: "region" }).of(c.country) ?? c.country;
      } catch {
        // Unknown region code: fall back to the raw code.
      }
      const inSentence = countryInSentence(c.country, name, lang);
      return { label: t.label, value: name, detail: fmt(s === "pass" ? t.passDetail : t.failDetail, { name: inSentence }) };
    }
    case "uploads": {
      const t = m.checks.uploads;
      const value = uploadsValue(ctx);
      if (c.videoCount === 0) return { label: t.label, value, detail: t.noVideosDetail };
      const detail = s === "pass" ? t.passDetail : r.recentUploads > 0 ? t.failFewDetail : t.failNoneDetail;
      return { label: t.label, value, detail };
    }
    case "made_for_kids": {
      const t = m.checks.madeForKids;
      if (c.madeForKids === null) return { label: t.label, value: t.notPublicValue, detail: t.notPublicDetail };
      if (!c.madeForKids) return { label: t.label, value: t.noValue, detail: t.noDetail };
      return { label: t.label, value: t.yesValue, detail: tier === "fan" ? t.fanYesDetail : t.adYesDetail };
    }
    case "watch_time": {
      const t = m.checks.watchTime;
      if (tier === "fan") return { label: t.fanLabel, value: m.notPublic, detail: t.detail };
      const now = r.rules.era === "current";
      const vars = { hours: r.rules.adWatchHours.toLocaleString(intl), shorts: compact(r.rules.adShortsViews, intl) };
      return {
        label: fmt(now ? t.adLabelNow : t.adLabel2027, vars),
        value: m.notPublic,
        detail: `${t.detail} ${now ? t.adNoteNow : t.adNote2027}`,
      };
    }
  }
}

function CheckRow({ label, value, detail, status, sr }: { label: string; value: string; detail: string; status: SignalStatus; sr: string }) {
  const { Icon, cls } = statusIcon[status];
  return (
    <li className="flex gap-3 px-4 py-3">
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${cls}`} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm font-medium">
          <span className="sr-only">{sr}: </span>
          {label} <span className="font-normal text-muted">— {value}</span>
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-muted">{detail}</p>
      </div>
    </li>
  );
}

function TierBlock({ tier, ctx }: { tier: "fan" | "ad"; ctx: Ctx }) {
  const { r, m } = ctx;
  const t = r.tiers[tier];
  const v = m.tierVerdicts[t.verdict];
  return (
    <section className="rounded-2xl border border-border">
      <div className="px-4 pt-4">
        <h3 className="font-semibold">{m.tiers[tier].title}</h3>
        <p className="text-sm text-muted">{m.tiers[tier].unlocks}</p>
      </div>
      <div className={`mx-4 mt-3 rounded-xl border px-4 py-3 ${verdictTone[t.verdict]}`}>
        <p className="font-semibold">{v.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{v.body}</p>
      </div>
      <ul className="mt-2 divide-y divide-border">
        {t.checks.map((check) => (
          <CheckRow key={check.id} {...checkText(tier, check, ctx)} status={check.status} sr={m.statusSr[check.status]} />
        ))}
      </ul>
    </section>
  );
}

function ActiveChannel({ ctx }: { ctx: Ctx }) {
  const { r, m, intl } = ctx;
  const a = m.active;
  const now = r.rules.era === "current";
  const n = r.recentUploads;
  const line = r.recentUploadsCapped
    ? fmt(a.uploadsLineCapped, { n: n.toLocaleString(intl) })
    : n === 1
      ? a.uploadsLineOne
      : fmt(a.uploadsLine, { n: n.toLocaleString(intl) });
  const path = activityPath(n);
  return (
    <section className="rounded-2xl border border-border px-4 py-4">
      <h3 className="font-semibold">{now ? a.titleNow : a.title2027}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{now ? a.ruleNow : a.rule2027}</p>
      <p className="mt-3 text-sm font-medium">{line}</p>
      <p className="mt-0.5 text-sm leading-relaxed text-muted">
        {path === "enough_any" ? a.enoughAny : path === "enough_if_long" ? a.enoughIfLong : a.notEnough} {a.splitNote}
      </p>
      <p className="mt-2 text-xs text-muted">{a.infoOnly}</p>
    </section>
  );
}

const CLUES = ["join", "store", "supers", "ads"] as const;

function SelfCheckPanel({ ctx }: { ctx: Ctx }) {
  const { w } = useI18n();
  const { c, r, m } = ctx;
  const t = m.selfCheck;
  const [ticks, setTicks] = useState<SelfCheck>({ join: false, store: false, supers: false, ads: false });
  const level = confidence(c, r.tiers.ad.verdict, ticks);
  const anyTicked = CLUES.some((k) => ticks[k]);
  const ytUrl = c.handle ? `https://www.youtube.com/${c.handle}` : `https://www.youtube.com/channel/${c.id}`;
  return (
    <section className="rounded-2xl border border-border px-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold">{t.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{t.intro}</p>
        </div>
        <a
          href={ytUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.openChannel} ${w.opensInNewTab}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition hover:border-accent"
        >
          {t.openChannel} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <fieldset className="mt-3">
        <legend className="sr-only">{t.title}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CLUES.map((k) => (
            <label key={k} className="flex cursor-pointer gap-3 rounded-xl border border-border px-3 py-2.5 transition hover:border-accent">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
                checked={ticks[k]}
                onChange={(e) => setTicks((prev) => ({ ...prev, [k]: e.target.checked }))}
              />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{t.clues[k].label}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">{t.clues[k].strength}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={`mt-3 rounded-xl border px-4 py-3 ${confidenceTone[level]}`} aria-live="polite">
        <p className="font-semibold">
          <span className="text-sm font-medium text-muted">{t.confidenceLabel}: </span>
          {t.confidence[level].title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{t.confidence[level].body}</p>
        {!anyTicked && <p className="mt-1 text-xs text-muted">{t.tickHint}</p>}
      </div>
    </section>
  );
}

function RecentList({ items, onPick }: { items: { input: string; title: string; avatarUrl: string | null }[]; onPick: (input: string) => void }) {
  const { w } = useI18n();
  const t = w.monetization.recent;
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="inline-flex items-center gap-1.5 text-muted">
        <History className="h-4 w-4" aria-hidden="true" /> {t.title}:
      </span>
      {items.map((x) => (
        <button
          key={x.input}
          type="button"
          onClick={() => onPick(x.input)}
          aria-label={fmt(t.checkAgain, { title: x.title })}
          className="inline-flex max-w-[14rem] items-center gap-1.5 rounded-lg bg-surface-2 py-1.5 pl-1.5 pr-3 font-medium transition hover:bg-surface-3"
        >
          {x.avatarUrl ? (
            <Image src={x.avatarUrl} alt="" width={20} height={20} className="h-5 w-5 shrink-0 rounded-full" />
          ) : (
            <span className="h-5 w-5 shrink-0 rounded-full bg-surface-3" />
          )}
          <span className="truncate">{x.title}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => clearRecent(RECENT_KEY)}
        aria-label={t.clearAria}
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-muted transition hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" /> {t.clear}
      </button>
      <span className="text-xs text-muted">{t.note}</span>
    </div>
  );
}

function EarningsBox({ r, param, m, intl }: { r: Result; param: string; m: M; intl: string }) {
  const t = m.earnings;
  const met = r.tiers.ad.verdict === "met" && r.recentViews !== null;
  const range = met ? defaultMonthlyEarnings(r.recentViews!.views30dLong, r.recentViews!.views30dShorts) : null;
  return (
    <section className="rounded-2xl border border-border px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">{t.title}</h3>
        {range && <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">{t.badge}</span>}
      </div>
      {range ? (
        <>
          <p className="mt-2 text-2xl font-black tabular-nums tracking-tight">
            {formatUsd(range.low, intl)} – {formatUsd(range.high, intl)}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{t.basis}</p>
        </>
      ) : (
        <p className="mt-1 text-sm leading-relaxed text-muted">{met ? t.noUploads : t.notShown}</p>
      )}
      <Link
        href={`/revenue-calculator/channel-earnings-estimator?q=${param}`}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-accent-fill px-3.5 py-2 text-sm font-medium text-white transition hover:bg-accent-fill-strong"
      >
        {m.estimateEarnings} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </section>
  );
}

function ResultCard(r: Result) {
  const { lang, intl, w } = useI18n();
  const m = w.monetization;
  const c = r.channel;
  const ctx: Ctx = { c, r, m, lang, intl };
  const subs = c.subscribersHidden || c.subscribers === null ? m.hiddenByCreator : formatSubscriberCount(c.subscribers, intl);
  const days = r.rules.daysUntilChange;
  const countdown = days === null ? null : days === 1 ? m.countdownOne : fmt(m.countdownMany, { n: days.toLocaleString(intl) });
  const param = channelParam(c);
  const shareUrl = `${location.origin}${location.pathname}?c=${param}`;

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
          <p className="text-sm text-muted">
            {c.handle ?? m.noHandle} · {fmt(m.channelMeta, { subs, videos: c.videoCount.toLocaleString(intl) })}
          </p>
        </div>
      </div>

      {countdown && (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-surface-2 px-4 py-2.5 text-sm font-medium">
          <CalendarClock className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
          {/* Every language's page has the 2027 requirements section with this anchor. */}
          <a href={`#${REQUIREMENTS_2027_ID}`} className="text-accent-strong underline">
            {countdown}
          </a>
        </p>
      )}

      <div className="mt-4 space-y-4">
        <TierBlock tier="fan" ctx={ctx} />
        <TierBlock tier="ad" ctx={ctx} />
        <ul className="rounded-2xl border border-border">
          <CheckRow
            label={`${m.bothTiers}: ${m.checks.policies.label}`}
            value={m.notPublic}
            detail={m.checks.policies.detail}
            status="unknown"
            sr={m.statusSr.unknown}
          />
        </ul>
        <EarningsBox r={r} param={param} m={m} intl={intl} />
        <ActiveChannel ctx={ctx} />
        <SelfCheckPanel ctx={ctx} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <CopyButton text={shareUrl} label={m.copyLink} ariaLabel={m.copyLinkAria} />
        </div>
        <FetchedAt iso={r.fetchedAt} />
      </div>
      <p className="mt-3 text-xs text-muted">{m.estimateNote}</p>
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
      <Skeleton className="mt-4 h-10 w-full" />
      <Skeleton className="mt-4 h-96 w-full" />
      <Skeleton className="mt-4 h-80 w-full" />
    </div>
  );
}
