import { z } from "zod";
import { cleanTopic, generateJson } from "@/lib/ai";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = z.object({ topic: z.string().min(3).max(200) }).safeParse(body);
    if (!parsed.success) throw new AppError("invalid_input", "Describe your video topic in a few words.");
    await enforceRateLimit(req, "ai");
    const topic = cleanTopic(parsed.data.topic);

    const out = await generateJson<{ hashtags?: unknown }>(
      `You suggest YouTube hashtags. Video topic: "${topic}".
Suggest 15 hashtags: 3 broad, the rest specific to the topic. CamelCase for multi-word (#LikeThis), no spaces, no punctuation beyond the #.
Answer with pure JSON: {"hashtags": ["#...", "#..."]}`,
      "hashtag-generator",
    );
    const seen = new Set<string>();
    const hashtags = (Array.isArray(out.hashtags) ? out.hashtags : [])
      .filter((h): h is string => typeof h === "string")
      .map((h) => `#${h.replace(/[^\p{L}\p{N}_]/gu, "")}`.slice(0, 60))
      .filter((h) => {
        const k = h.toLowerCase();
        if (h.length < 3 || seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, 15);
    if (hashtags.length === 0) throw new AppError("upstream", "The AI returned no usable hashtags. Please try again.");
    return Response.json({ hashtags });
  } catch (err) {
    return errorResponse(err);
  }
}
