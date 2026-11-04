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

    const out = await generateJson<{ titles?: unknown }>(
      `You write YouTube titles that earn clicks without lying. Video topic: "${topic}".
Write 8 distinct title options: mix curiosity, how-to, listicle, bold-claim and question styles. Rules: under 70 characters each, no clickbait that the video can't deliver, no ALL CAPS, front-load the key words, no emoji, no numbering.
Answer with pure JSON: {"titles": ["...", "..."]}`,
      "title-generator",
    );
    const titles = (Array.isArray(out.titles) ? out.titles : []).filter((t): t is string => typeof t === "string" && t.trim().length > 0).map((t) => t.trim().slice(0, 100)).slice(0, 10);
    if (titles.length === 0) throw new AppError("upstream", "The AI returned no usable titles. Please try again.");
    return Response.json({ titles });
  } catch (err) {
    return errorResponse(err);
  }
}
