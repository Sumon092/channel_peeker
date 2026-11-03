import "server-only";
import { AppError } from "@/lib/errors";
import { kv, TTL } from "@/lib/kv";

/**
 * Per-bucket daily quota guard (plan 3.3 and 7.5). Quota is per Google Cloud project and resets
 * at midnight Pacific time. Units are counted before each call because failed calls cost quota too.
 */
export type QuotaBucket = "main" | "search" | "batchStats";

const LIMITS: Record<QuotaBucket, number> = {
  main: Number(process.env.YT_QUOTA_MAIN ?? 10_000),
  search: Number(process.env.YT_QUOTA_SEARCH ?? 100),
  batchStats: Number(process.env.YT_QUOTA_BATCH_STATS ?? 10_000),
};

/** At this share of a bucket we stop making calls and serve cache only. */
const DEGRADE_AT = 0.95;
const ALARMS = [0.5, 0.8, 0.95];

export function pacificDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(now); // YYYY-MM-DD
}

const key = (bucket: QuotaBucket) => `quota:${pacificDate()}:${bucket}`;

export async function consumeQuota(bucket: QuotaBucket, units: number, tool: string) {
  const limit = LIMITS[bucket];
  const used = await kv.incrBy(key(bucket), units, 2 * TTL.day);
  const before = used - units;

  for (const level of ALARMS) {
    if (before < limit * level && used >= limit * level) {
      // Picked up by log-based alerting (Sentry/Vercel log drains).
      console.warn(`[quota-alarm] bucket=${bucket} crossed ${level * 100}% (${used}/${limit})`);
    }
  }
  console.info(`[quota] bucket=${bucket} units=${units} tool=${tool} used=${used}/${limit}`);

  if (used > limit * DEGRADE_AT) {
    throw new AppError(
      "quota_exhausted",
      "We've hit today's data limit from YouTube. Cached results still work; fresh lookups resume after midnight Pacific time.",
    );
  }
}

export async function quotaUsage() {
  const buckets = Object.keys(LIMITS) as QuotaBucket[];
  const values = await Promise.all(buckets.map((b) => kv.get<number>(key(b))));
  return Object.fromEntries(buckets.map((b, i) => [b, { used: Number(values[i] ?? 0), limit: LIMITS[b] }]));
}
