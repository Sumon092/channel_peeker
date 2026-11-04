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

    const out = await generateJson<{ description?: unknown }>(
      `You write YouTube video descriptions. Video topic: "${topic}".
Write one description with this structure:
1. A 2-sentence hook stating what the viewer gets (this shows above the fold).
2. A short paragraph with detail and naturally-placed keywords.
3. A chapters block: "Chapters:" then 4-6 lines like "0:00 Intro" with placeholder timestamps the creator will adjust.
4. A line with [LINK] placeholders for socials/resources.
5. 3 relevant hashtags on the last line.
Plain text only, no markdown. Answer with pure JSON: {"description": "..."}`,
      "description-generator",
    );
    const description = typeof out.description === "string" ? out.description.trim().slice(0, 5000) : "";
    if (!description) throw new AppError("upstream", "The AI returned no usable description. Please try again.");
    return Response.json({ description });
  } catch (err) {
    return errorResponse(err);
  }
}
