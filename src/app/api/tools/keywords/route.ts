import { z } from "zod";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { expandKeyword } from "@/lib/youtube/suggest";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = z
      .object({ q: z.string().min(2).max(80), mode: z.enum(["research", "related", "longtail"]) })
      .safeParse(body);
    if (!parsed.success) throw new AppError("invalid_input", "Type a keyword of 2 to 80 characters.");
    await enforceRateLimit(req, "tool");
    const seed = parsed.data.q.replace(/\s+/g, " ").trim();
    const keywords = await expandKeyword(seed, parsed.data.mode);
    return Response.json({ seed, keywords, fetchedAt: new Date().toISOString() });
  } catch (err) {
    return errorResponse(err);
  }
}
