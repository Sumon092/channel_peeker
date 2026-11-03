import "server-only";
import { AppError } from "@/lib/errors";
import { consumeQuota, type QuotaBucket } from "./quota";

const BASE = "https://www.googleapis.com/youtube/v3";

type Params = Record<string, string | number | undefined>;

interface CallOptions {
  /** Tool name, for quota logging. */
  tool: string;
  bucket?: QuotaBucket;
  units?: number;
}

interface GoogleError {
  error?: { code?: number; message?: string; errors?: { reason?: string }[] };
}

/**
 * Thin wrapper over the YouTube Data API v3. Callers pass only the `part` and `fields`
 * they need; quota is charged before the request since failed calls cost quota too.
 */
export async function ytGet<T>(endpoint: string, params: Params, { tool, bucket = "main", units = 1 }: CallOptions): Promise<T> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new AppError("not_configured", "This tool isn't connected to YouTube yet. Please try again later.");

  await consumeQuota(bucket, units, tool);

  const url = new URL(`${BASE}/${endpoint}`);
  for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, String(v));
  url.searchParams.set("key", key);

  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
  } catch {
    throw new AppError("upstream", "YouTube didn't respond in time. Please try again.");
  }

  if (res.ok) return (await res.json()) as T;

  const body = (await res.json().catch(() => ({}))) as GoogleError;
  const reason = body.error?.errors?.[0]?.reason;
  console.error(`[youtube] ${endpoint} ${res.status} ${reason ?? ""} ${body.error?.message ?? ""}`);

  if (reason === "quotaExceeded" || reason === "dailyLimitExceeded" || reason === "rateLimitExceeded") {
    throw new AppError("quota_exhausted", "We've hit today's data limit from YouTube. Fresh lookups resume after midnight Pacific time.");
  }
  if (res.status === 404) throw new AppError("not_found", "We couldn't find that on YouTube.");
  if (res.status === 403 && reason === "forbidden") throw new AppError("private", "That content is private or restricted.");
  throw new AppError("upstream", "YouTube returned an error. Please try again in a moment.");
}

/** Splits IDs into the API's maximum batch size of 50. */
export function chunk<T>(items: T[], size = 50): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}
