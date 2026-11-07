"use client";

import { CircleCheck, CircleHelp, CircleX, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import type { Signal, SignalStatus, Verdict } from "@/lib/monetization";
import { fmt, type WidgetStrings } from "@/lib/widget-i18n";
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
    country: string | null;
    madeForKids: boolean | null;
    recentUploads: number;
  };
  verdict: Verdict;
  signals: Signal[];
  fetchedAt: string;
}

export function MonetizationChecker() {
  const { w } = useI18n();
  const { state, run } = useToolRequest<Result>("/api/tools/monetization");

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
          { label: w.exampleVideoLink, value: "https://youtu.be/dQw4w9WgXcQ" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
          return r.ok ? null : w.parseErrors[r.code];
        }}
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

const verdictTone: Record<Verdict, string> = {
  strong: "border-good/30 bg-good-soft",
  partial: "border-warn/30 bg-warn-soft",
  not_yet: "border-bad/30 bg-bad-soft",
  unclear: "border-border bg-surface-2",
};

const statusIcon: Record<SignalStatus, { Icon: typeof CircleCheck; cls: string }> = {
  pass: { Icon: CircleCheck, cls: "text-good" },
  warn: { Icon: TriangleAlert, cls: "text-warn" },
  fail: { Icon: CircleX, cls: "text-bad" },
  unknown: { Icon: CircleHelp, cls: "text-muted" },
};

/**
 * On non-English pages, rebuild each signal's texts natively from the raw data
 * the API now sends (the status itself still comes from the server, so the
 * logic lives in one place). English pages show the server's own strings.
 */
function localizeSignal(s: Signal, c: Result["channel"], m: WidgetStrings["monetization"], intl: string): { label: string; value: string; detail: string } {
  const sig = m.signals;
  switch (s.id) {
    case "subscribers": {
      const t = sig.subscribers;
      if (s.status === "unknown") return { label: t.label, value: t.hiddenValue, detail: t.hiddenDetail };
      const n = c.subscribers ?? 0;
      const value = n >= 1000 ? `≈ ${Intl.NumberFormat(intl, { notation: "compact", maximumFractionDigits: 1 }).format(n)}` : n.toLocaleString(intl);
      return { label: t.label, value, detail: s.status === "pass" ? t.passDetail : s.status === "warn" ? t.warnDetail : t.failDetail };
    }
    case "country": {
      const t = sig.country;
      if (s.status === "unknown" || !c.country) return { label: t.label, value: t.notSetValue, detail: t.notSetDetail };
      let name = c.country;
      try {
        name = new Intl.DisplayNames(intl, { type: "region" }).of(c.country) ?? c.country;
      } catch {
        // Unknown region code: fall back to the raw code.
      }
      return { label: t.label, value: name, detail: fmt(s.status === "pass" ? t.passDetail : t.failDetail, { name }) };
    }
    case "activity": {
      const t = sig.activity;
      if (c.videoCount === 0) return { label: t.label, value: t.noVideosValue, detail: t.noVideosDetail };
      const value = fmt(t.uploadsValue, { n: c.recentUploads.toLocaleString(intl) });
      const detail = s.status === "pass" ? t.passDetail : c.recentUploads > 0 ? t.warnFewDetail : t.warnNoneDetail;
      return { label: t.label, value, detail };
    }
    case "made_for_kids": {
      const t = sig.madeForKids;
      if (c.madeForKids === null) return { label: t.label, value: t.notPublicValue, detail: t.notPublicDetail };
      return c.madeForKids
        ? { label: t.label, value: t.yesValue, detail: t.yesDetail }
        : { label: t.label, value: t.noValue, detail: t.noDetail };
    }
    case "watch_time":
      return sig.watchTime;
    case "policies":
      return sig.policies;
  }
}

function ResultCard({ channel: c, verdict, signals, fetchedAt }: Result) {
  const { lang, intl, w } = useI18n();
  const m = w.monetization;
  const v = m.verdicts[verdict];
  const subs =
    c.subscribersHidden || c.subscribers === null
      ? m.hiddenByCreator
      : c.subscribers >= 1000
        ? `≈ ${Intl.NumberFormat(intl, { notation: "compact", maximumFractionDigits: 1 }).format(c.subscribers)}`
        : c.subscribers.toLocaleString(intl);

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

      <div className={`mt-4 rounded-xl border px-4 py-3 ${verdictTone[verdict]}`}>
        <p className="font-semibold">{v.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{v.body}</p>
      </div>

      <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
        {signals.map((s) => {
          const { Icon, cls } = statusIcon[s.status];
          const text = lang === "en" ? { label: s.label, value: s.value, detail: s.detail } : localizeSignal(s, c, m, intl);
          return (
            <li key={s.id} className="flex gap-3 px-4 py-3">
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${cls}`} aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  <span className="sr-only">{m.statusSr[s.status]}: </span>
                  {text.label} <span className="font-normal text-muted">— {text.value}</span>
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{text.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">{m.estimateNote}</p>
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
      <Skeleton className="mt-4 h-20 w-full" />
      <Skeleton className="mt-4 h-72 w-full" />
    </div>
  );
}
