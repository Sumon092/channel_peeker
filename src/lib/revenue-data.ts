/**
 * channelpeeker's published CPM/RPM table (see /methodology). All figures are
 * channelpeeker estimates: broad industry-typical ranges for long-form ad CPM in
 * USD, NOT YouTube data. Reviewed quarterly. Last reviewed: November 2026.
 */

export interface Niche {
  id: string;
  name: string;
  /** Advertiser CPM range in USD per 1,000 monetized long-form views. */
  cpmLow: number;
  cpmHigh: number;
}

export const NICHES: Niche[] = [
  { id: "finance", name: "Finance & investing", cpmLow: 15, cpmHigh: 40 },
  { id: "business", name: "Business & marketing", cpmLow: 10, cpmHigh: 25 },
  { id: "tech", name: "Tech & software", cpmLow: 8, cpmHigh: 20 },
  { id: "education", name: "Education & how-to", cpmLow: 6, cpmHigh: 15 },
  { id: "health", name: "Health & fitness", cpmLow: 5, cpmHigh: 12 },
  { id: "beauty", name: "Beauty & fashion", cpmLow: 4, cpmHigh: 10 },
  { id: "travel", name: "Travel & outdoors", cpmLow: 4, cpmHigh: 10 },
  { id: "food", name: "Food & cooking", cpmLow: 3, cpmHigh: 8 },
  { id: "gaming", name: "Gaming", cpmLow: 2, cpmHigh: 6 },
  { id: "entertainment", name: "Entertainment & vlogs", cpmLow: 2, cpmHigh: 5 },
  { id: "music", name: "Music", cpmLow: 1, cpmHigh: 4 },
  { id: "other", name: "Other / mixed", cpmLow: 2, cpmHigh: 8 },
];

export interface CountryTier {
  id: string;
  name: string;
  /** Multiplier applied to the niche CPM range. */
  multiplier: number;
}

export const COUNTRY_TIERS: CountryTier[] = [
  { id: "tier1", name: "US, UK, Canada, Australia", multiplier: 1 },
  { id: "tier2", name: "Western Europe, Japan, Korea", multiplier: 0.7 },
  { id: "tier3", name: "Eastern Europe, Latin America, SE Asia", multiplier: 0.35 },
  { id: "tier4", name: "South Asia, Africa, other", multiplier: 0.15 },
];

/** Creators keep 55% of long-form ad revenue; ~60% of views typically show ads. */
export const CREATOR_SHARE_LONG = 0.55;
export const DEFAULT_MONETIZED_SHARE = 0.6;

/** Shorts creator RPM range in USD per 1,000 Shorts views (already after the 45% pool share). */
export const SHORTS_RPM_LOW = 0.04;
export const SHORTS_RPM_HIGH = 0.15;

/** Sponsors typically pay this per 1,000 expected views for a dedicated integration. */
export const SPONSOR_CPM_LOW = 20;
export const SPONSOR_CPM_HIGH = 50;

/**
 * Creators keep 70% of Super Chat, Super Stickers and channel memberships
 * (YouTube's published 30% platform fee; app-store fees on mobile purchases can take more).
 */
export const CREATOR_SHARE_FAN_FUNDING = 0.7;

/**
 * Live stream ad CPMs typically run below long-form VOD CPMs — fewer ad slots
 * and lower advertiser demand. Multiplier applied to the niche CPM range.
 */
export const LIVE_CPM_MULTIPLIER = 0.5;

export interface MoneyRange {
  low: number;
  high: number;
}

/** Monthly long-form ad earnings range from monthly views, a niche and a country tier. */
export function estimateLongFormEarnings(monthlyViews: number, niche: Niche, tier: CountryTier, monetizedShare = DEFAULT_MONETIZED_SHARE): MoneyRange {
  const base = (monthlyViews / 1000) * monetizedShare * CREATOR_SHARE_LONG * tier.multiplier;
  return { low: base * niche.cpmLow, high: base * niche.cpmHigh };
}

/** Monthly Shorts earnings range from monthly Shorts views and a country tier. */
export function estimateShortsEarnings(monthlyViews: number, tier: CountryTier): MoneyRange {
  const base = (monthlyViews / 1000) * tier.multiplier;
  return { low: base * SHORTS_RPM_LOW, high: base * SHORTS_RPM_HIGH };
}

/** One-off sponsorship fee range for a dedicated integration, from expected views. */
export function estimateSponsorshipRate(expectedViews: number): MoneyRange {
  return { low: (expectedViews / 1000) * SPONSOR_CPM_LOW, high: (expectedViews / 1000) * SPONSOR_CPM_HIGH };
}

export const formatMoney = (n: number) =>
  n >= 1000 ? `$${Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n)}` : `$${n.toFixed(n < 10 ? 2 : 0)}`;

export const formatRange = (r: MoneyRange) => `${formatMoney(r.low)} – ${formatMoney(r.high)}`;
