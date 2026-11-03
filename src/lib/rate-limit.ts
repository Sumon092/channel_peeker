import "server-only";
import { AppError } from "./errors";
import { kv } from "./kv";

export const limits = {
  /** Anonymous tool runs (plan 7.5). */
  tool: { max: 30, windowSeconds: 3600 },
  /** AI generations per IP per day. */
  ai: { max: 10, windowSeconds: 86400 },
} as const;

export function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** Fixed-window limiter. Throws a user-facing AppError when the window is full. */
export async function enforceRateLimit(req: Request, name: keyof typeof limits) {
  const { max, windowSeconds } = limits[name];
  const window = Math.floor(Date.now() / 1000 / windowSeconds);
  const count = await kv.incrBy(`rl:${name}:${clientIp(req)}:${window}`, 1, windowSeconds);
  if (count > max) {
    const retryAfter = windowSeconds - (Math.floor(Date.now() / 1000) % windowSeconds);
    throw new AppError("rate_limited", "You've reached the free limit for now. Please try again a little later.", retryAfter);
  }
}
