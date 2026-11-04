import { z } from "zod";
import { cleanTopic, generateJson } from "@/lib/ai";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";

/** YouTube accepts at most 500 characters of tags per video. */
const TAG_LIMIT = 500;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = z.object({ topic: z.string().min(3).max(200) }).safeParse(body);
    if (!parsed.success) throw new AppError("invalid_input", "Describe your video topic in a few words.");
    await enforceRateLimit(req, "ai");
    const topic = cleanTopic(parsed.data.topic);

    const out = await generateJson<{ tags?: unknown }>(
      `You suggest YouTube tags. Video topic: "${topic}".
Suggest 25 tags: the exact topic phrase first, then specific long-tail variations, then a few broader category terms. Lowercase, 1-4 words each, no hashtags, no duplicates.
Answer with pure JSON: {"tags": ["...", "..."]}`,
      "tag-generator",
    );
    const seen = new Set<string>();
    const tags: string[] = [];
    let total = 0;
    for (const raw of Array.isArray(out.tags) ? out.tags : []) {
      if (typeof raw !== "string") continue;
      const tag = raw.trim().toLowerCase().replace(/^#/, "").slice(0, 60);
      if (!tag || seen.has(tag)) continue;
      // Keep the joined list inside YouTube's limit (commas count when pasted).
      if (total + tag.length + (tags.length ? 1 : 0) > TAG_LIMIT) break;
      seen.add(tag);
      tags.push(tag);
      total += tag.length + (tags.length > 1 ? 1 : 0);
    }
    if (tags.length === 0) throw new AppError("upstream", "The AI returned no usable tags. Please try again.");
    return Response.json({ tags, characters: tags.join(",").length, limit: TAG_LIMIT });
  } catch (err) {
    return errorResponse(err);
  }
}
