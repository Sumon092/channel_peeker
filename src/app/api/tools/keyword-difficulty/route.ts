import { z } from "zod";
import { AppError, errorResponse } from "@/lib/errors";
import { cached, TTL } from "@/lib/kv";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannelById } from "@/lib/youtube/channels";
import { ytGet } from "@/lib/youtube/client";

interface SearchItem {
  id?: { videoId?: string };
  snippet?: { channelId?: string; title?: string };
}

/** Top-10 search results for a keyword. search.list costs 100 units, so results cache for 7 days. */
async function topRanking(q: string) {
  return cached(`yt:kwdiff:${q.toLowerCase()}:v1`, 7 * TTL.day, async () => {
    const res = await ytGet<{ items?: SearchItem[] }>(
      "search",
      { part: "snippet", q, type: "video", maxResults: 10, fields: "items(id(videoId),snippet(channelId,title))" },
      { tool: "keyword-difficulty", bucket: "search", units: 100 },
    );
    return (res.items ?? [])
      .map((i) => ({ videoId: i.id?.videoId ?? "", channelId: i.snippet?.channelId ?? "", videoTitle: i.snippet?.title ?? "" }))
      .filter((i) => i.videoId && i.channelId);
  });
}

function difficultyFromSubs(medianSubs: number): { score: number; label: string } {
  // Log-scale: 10K median subs ≈ 27, 1M ≈ 63, 10M ≈ 81, capped 5–95.
  const score = Math.max(5, Math.min(95, Math.round(18 * Math.log10(Math.max(10, medianSubs)) - 45)));
  const label = score >= 75 ? "Very hard" : score >= 55 ? "Hard" : score >= 35 ? "Moderate" : "Easier";
  return { score, label };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = z.object({ q: z.string().min(2).max(80) }).safeParse(body);
    if (!parsed.success) throw new AppError("invalid_input", "Type a keyword of 2 to 80 characters.");
    await enforceRateLimit(req, "tool");
    const q = parsed.data.q.replace(/\s+/g, " ").trim();

    const { data: ranking, fetchedAt } = await topRanking(q);
    if (ranking.length === 0) throw new AppError("not_found", "YouTube returned no results for that keyword.");

    const channels = await Promise.all([...new Set(ranking.map((r) => r.channelId))].map((id) => getChannelById(id, "keyword-difficulty")));
    const byId = new Map(channels.map((c) => [c.data.id, c.data]));

    const results = ranking.map((r) => {
      const c = byId.get(r.channelId);
      return {
        videoId: r.videoId,
        videoTitle: r.videoTitle,
        channelTitle: c?.title ?? "Unknown",
        subscribers: c?.subscribers ?? null,
        subscribersHidden: c?.subscribersHidden ?? false,
      };
    });

    // The difficulty score is a channelpeek estimate (plan 3.2 gate).
    let difficulty: { score: number; label: string } | null = null;
    if (process.env.DERIVED_METRICS_APPROVED === "true") {
      const subs = results.map((r) => r.subscribers).filter((s): s is number => s !== null).sort((a, b) => a - b);
      if (subs.length > 0) {
        const mid = Math.floor(subs.length / 2);
        difficulty = difficultyFromSubs(subs.length % 2 ? subs[mid] : (subs[mid - 1] + subs[mid]) / 2);
      }
    }

    return Response.json({ q, results, difficulty, fetchedAt });
  } catch (err) {
    return errorResponse(err);
  }
}
