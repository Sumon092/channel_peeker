import "server-only";
import { AppError } from "@/lib/errors";

const BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-3.5-flash-lite";

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
  promptFeedback?: { blockReason?: string };
  error?: { code?: number; message?: string; status?: string };
}

/**
 * One Gemini text generation. The prompt must instruct the model to answer with
 * pure JSON; callers parse the result. Generations are metered per IP by the
 * "ai" rate-limit bucket — enforce it before calling this.
 */
export async function generateJson<T>(prompt: string, tool: string): Promise<T> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AppError("not_configured", "AI generation isn't set up yet. Please try again later.");
  const model = process.env.GEMINI_MODEL ?? DEFAULT_MODEL;

  let res: Response;
  try {
    res = await fetch(`${BASE}/${model}:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(25_000),
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", maxOutputTokens: 2048, temperature: 0.9 },
      }),
    });
  } catch {
    throw new AppError("upstream", "The AI service didn't respond in time. Please try again.");
  }

  const body = (await res.json().catch(() => ({}))) as GeminiResponse;
  if (!res.ok) {
    console.error(`[gemini] ${tool} ${res.status} ${body.error?.status ?? ""} ${body.error?.message ?? ""}`);
    if (res.status === 429) throw new AppError("quota_exhausted", "The AI service is at its limit right now. Please try again later.");
    throw new AppError("upstream", "The AI service returned an error. Please try again in a moment.");
  }

  if (body.promptFeedback?.blockReason) {
    throw new AppError("invalid_input", "That topic was declined by the AI's safety filter. Try rephrasing it.");
  }
  const text = body.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  try {
    return JSON.parse(text) as T;
  } catch {
    console.error(`[gemini] ${tool} unparseable output: ${text.slice(0, 200)}`);
    throw new AppError("upstream", "The AI returned an unexpected format. Please try again.");
  }
}

/** Topics are user text headed into a prompt: cap length and strip control characters. */
export function cleanTopic(raw: string): string {
  return raw.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 200);
}
