"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { formatCompact, formatSubscribers } from "@/lib/format";
import { COUNTRY_TIERS, estimateLongFormEarnings, estimateShortsEarnings, formatRange, NICHES } from "@/lib/revenue-data";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Result {
  channel: { id: string; title: string; handle: string | null; avatarUrl: string | null; subscribers: number | null; subscribersHidden: boolean };
  views30dLong: number;
  views30dShorts: number;
  uploads30d: number;
  fetchedAt: string;
}

export function ChannelEarningsEstimator() {
  const { state, run } = useToolRequest<Result>("/api/tools/channel-earnings");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Channel link, @handle or video link"
        placeholder="@handle or https://www.youtube.com/@name"
        submitLabel="Estimate"
        loading={state.status === "loading"}
        examples={[
          { label: "@mkbhd", value: "@mkbhd" },
          { label: "@veritasium", value: "@veritasium" },
        ]}
        validate={(v) => {
          const r = parseYouTubeInput(v, "channel");
          return r.ok ? null : r.message;
        }}
        onSubmit={(input) => run({ input })}
      />

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-72 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <ResultCard {...state.data} />}
      </div>
    </div>
  );
}

function ResultCard({ channel: c, views30dLong, views30dShorts, uploads30d, fetchedAt }: Result) {
  const id = useId();
  const [nicheId, setNicheId] = useState("other");
  const [tierId, setTierId] = useState("tier1");

  const niche = NICHES.find((n) => n.id === nicheId) ?? NICHES[NICHES.length - 1];
  const tier = COUNTRY_TIERS.find((t) => t.id === tierId) ?? COUNTRY_TIERS[0];
  const longRange = views30dLong > 0 ? estimateLongFormEarnings(views30dLong, niche, tier) : null;
  const shortsRange = views30dShorts > 0 ? estimateShortsEarnings(views30dShorts, tier) : null;

  const selectCls =
    "w-full field-pill px-4 py-3";

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        {c.avatarUrl ? (
          <Image src={c.avatarUrl} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full" />
        ) : (
          <span className="h-14 w-14 shrink-0 rounded-full bg-surface-2" />
        )}
        <div className="min-w-0">
          <p className="truncate font-semibold">{c.title}</p>
          <p className="text-sm text-muted">
            {c.handle ?? ""} · {formatSubscribers(c.subscribers, c.subscribersHidden)} subscribers
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-border px-3 py-3">
          <p className="text-xs text-muted">Uploads (30d)</p>
          <p className="mt-1 text-lg font-bold">{uploads30d}</p>
        </div>
        <div className="rounded-xl border border-border px-3 py-3">
          <p className="text-xs text-muted">Long-form views (30d)</p>
          <p className="mt-1 text-lg font-bold">{formatCompact(views30dLong)}</p>
        </div>
        <div className="rounded-xl border border-border px-3 py-3">
          <p className="text-xs text-muted">Shorts views (30d)</p>
          <p className="mt-1 text-lg font-bold">{formatCompact(views30dShorts)}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium" htmlFor={`${id}-n`}>
          Niche
          <select id={`${id}-n`} value={nicheId} onChange={(e) => setNicheId(e.target.value)} className={`mt-2 font-normal ${selectCls}`}>
            {NICHES.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-t`}>
          Main audience
          <select id={`${id}-t`} value={tierId} onChange={(e) => setTierId(e.target.value)} className={`mt-2 font-normal ${selectCls}`}>
            {COUNTRY_TIERS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {(longRange || shortsRange) ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2" aria-live="polite">
          {longRange && (
            <div className="rounded-xl bg-surface-2 px-4 py-4 text-center">
              <p className="text-xs text-muted">Est. monthly long-form ad earnings</p>
              <p className="mt-1 text-2xl font-black tracking-tight">{formatRange(longRange)}</p>
            </div>
          )}
          {shortsRange && (
            <div className="rounded-xl bg-surface-2 px-4 py-4 text-center">
              <p className="text-xs text-muted">Est. monthly Shorts earnings</p>
              <p className="mt-1 text-2xl font-black tracking-tight">{formatRange(shortsRange)}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-4 rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">
          No uploads in the last 30 days, so there&apos;s nothing recent to base an estimate on.
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs leading-relaxed text-muted">
          channelpeek estimate from the last 30 days&apos; upload views and our published CPM table — assumes the channel is monetized
          (check with the Monetization Checker) and excludes memberships and sponsorships.
        </p>
        <FetchedAt iso={fetchedAt} />
      </div>
    </div>
  );
}
