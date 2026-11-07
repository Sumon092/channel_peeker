"use client";

import { useId, useState } from "react";
import {
  COUNTRY_TIERS,
  CREATOR_SHARE_FAN_FUNDING,
  CREATOR_SHARE_LONG,
  DEFAULT_MONETIZED_SHARE,
  formatMoney,
  formatRange,
  LIVE_CPM_MULTIPLIER,
  NICHES,
  type MoneyRange,
} from "@/lib/revenue-data";

const inputCls = "w-full field-pill px-4 py-3";

function parseNum(v: string): number | null {
  // Strict: "1k" must show an error, not silently calculate with 1 (or 0).
  if (!/^[\d,.\s$]*$/.test(v) || !v.trim()) return null;
  const n = Number.parseFloat(v.replace(/[,\s$]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

const fieldErr = (v: string) => (v.trim() && parseNum(v) === null ? "Enter a number, e.g. 50,000 or 4.99" : null);

export function LiveStreamEarningsCalculator() {
  const id = useId();
  const [views, setViews] = useState("50,000");
  const [nicheId, setNicheId] = useState("gaming");
  const [tierId, setTierId] = useState("tier1");
  const [superChat, setSuperChat] = useState("200");
  const [members, setMembers] = useState("50");
  const [memberPrice, setMemberPrice] = useState("4.99");

  const niche = NICHES.find((n) => n.id === nicheId) ?? NICHES[0];
  const tier = COUNTRY_TIERS.find((t) => t.id === tierId) ?? COUNTRY_TIERS[0];

  const errs = { v: fieldErr(views), sc: fieldErr(superChat), mb: fieldErr(members), mp: fieldErr(memberPrice) };

  const monthlyViews = parseNum(views) ?? 0;
  const adBase = (monthlyViews / 1000) * DEFAULT_MONETIZED_SHARE * CREATOR_SHARE_LONG * tier.multiplier * LIVE_CPM_MULTIPLIER;
  const ads: MoneyRange = { low: adBase * niche.cpmLow, high: adBase * niche.cpmHigh };

  const superChatNet = (parseNum(superChat) ?? 0) * CREATOR_SHARE_FAN_FUNDING;
  const membershipNet = (parseNum(members) ?? 0) * (parseNum(memberPrice) ?? 0) * CREATOR_SHARE_FAN_FUNDING;

  const total: MoneyRange = { low: ads.low + superChatNet + membershipNet, high: ads.high + superChatNet + membershipNet };

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-medium" htmlFor={`${id}-v`}>
          Monthly live views
          <input
            id={`${id}-v`}
            type="text"
            inputMode="numeric"
            value={views}
            aria-invalid={Boolean(errs.v)}
            aria-describedby={errs.v ? `${id}-v-err` : undefined}
            onChange={(e) => setViews(e.target.value)}
            className={`mt-2 font-normal ${inputCls}`}
          />
          {errs.v && (
            <span id={`${id}-v-err`} className="mt-1 block text-sm font-medium text-bad">
              {errs.v}
            </span>
          )}
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-n`}>
          Niche
          <select id={`${id}-n`} value={nicheId} onChange={(e) => setNicheId(e.target.value)} className={`mt-2 font-normal ${inputCls}`}>
            {NICHES.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-t`}>
          Main audience
          <select id={`${id}-t`} value={tierId} onChange={(e) => setTierId(e.target.value)} className={`mt-2 font-normal ${inputCls}`}>
            {COUNTRY_TIERS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-sc`}>
          Super Chat & Stickers / month (gross $)
          <input
            id={`${id}-sc`}
            type="text"
            inputMode="decimal"
            value={superChat}
            aria-invalid={Boolean(errs.sc)}
            aria-describedby={errs.sc ? `${id}-sc-err` : undefined}
            onChange={(e) => setSuperChat(e.target.value)}
            className={`mt-2 font-normal ${inputCls}`}
          />
          {errs.sc && (
            <span id={`${id}-sc-err`} className="mt-1 block text-sm font-medium text-bad">
              {errs.sc}
            </span>
          )}
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-mb`}>
          Channel members
          <input
            id={`${id}-mb`}
            type="text"
            inputMode="numeric"
            value={members}
            aria-invalid={Boolean(errs.mb)}
            aria-describedby={errs.mb ? `${id}-mb-err` : undefined}
            onChange={(e) => setMembers(e.target.value)}
            className={`mt-2 font-normal ${inputCls}`}
          />
          {errs.mb && (
            <span id={`${id}-mb-err`} className="mt-1 block text-sm font-medium text-bad">
              {errs.mb}
            </span>
          )}
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-mp`}>
          Membership price ($/month)
          <input
            id={`${id}-mp`}
            type="text"
            inputMode="decimal"
            value={memberPrice}
            aria-invalid={Boolean(errs.mp)}
            aria-describedby={errs.mp ? `${id}-mp-err` : undefined}
            onChange={(e) => setMemberPrice(e.target.value)}
            className={`mt-2 font-normal ${inputCls}`}
          />
          {errs.mp && (
            <span id={`${id}-mp-err`} className="mt-1 block text-sm font-medium text-bad">
              {errs.mp}
            </span>
          )}
        </label>
      </div>

      <div className="mt-5 rounded-xl bg-surface-2 px-4 py-4 text-center" role="status">
        <p className="text-xs text-muted">Estimated monthly live stream earnings</p>
        <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{formatRange(total)}</p>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-xl bg-surface-2 px-4 py-3">
          <dt className="text-xs text-muted">Live ads</dt>
          <dd className="mt-0.5 font-semibold tabular-nums">{formatRange(ads)}</dd>
        </div>
        <div className="rounded-xl bg-surface-2 px-4 py-3">
          <dt className="text-xs text-muted">Super Chat (your 70%)</dt>
          <dd className="mt-0.5 font-semibold tabular-nums">{formatMoney(superChatNet)}</dd>
        </div>
        <div className="rounded-xl bg-surface-2 px-4 py-3">
          <dt className="text-xs text-muted">Memberships (your 70%)</dt>
          <dd className="mt-0.5 font-semibold tabular-nums">{formatMoney(membershipNet)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Ads use our published niche CPM table at a {LIVE_CPM_MULTIPLIER * 100}% live-stream rate (live CPMs run below VOD), the standard 55%
        creator share and ~60% monetized views. Super Chat, Stickers and memberships show your share after YouTube&apos;s 30% fee — mobile
        purchases can net less after app-store fees. A channelpeek estimate; YouTube Studio has your real numbers.
      </p>
    </div>
  );
}
