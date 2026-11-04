import "server-only";
import { AppError } from "@/lib/errors";
import { cached, TTL } from "@/lib/kv";

/**
 * YouTube search suggestions via Google's public suggest endpoint
 * (client=firefox&ds=yt returns plain JSON). Costs no Data API quota.
 * Suggestions are what real users type, which is the whole value.
 */
async function fetchSuggestions(q: string): Promise<string[]> {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=en&q=${encodeURIComponent(q)}`;
  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(6000) });
  } catch {
    throw new AppError("upstream", "The suggestion service didn't respond. Please try again.");
  }
  if (!res.ok) throw new AppError("upstream", "The suggestion service returned an error. Please try again.");
  const data = (await res.json().catch(() => null)) as unknown;
  const list = Array.isArray(data) && Array.isArray(data[1]) ? (data[1] as unknown[]) : [];
  return list.filter((s): s is string => typeof s === "string");
}

const getSuggestions = (q: string) => cached(`yt:suggest:${q.toLowerCase()}:v1`, TTL.day, () => fetchSuggestions(q));

const QUESTION_PREFIXES = ["how to", "why", "what is", "can you", "is it"];

/**
 * Expands a seed keyword into real search phrases: base suggestions, a–z
 * expansions and question forms. `depth` controls how many a–z letters run.
 */
export async function expandKeyword(seed: string, mode: "research" | "related" | "longtail") {
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (items: string[]) => {
    for (const s of items) {
      const k = s.toLowerCase().trim();
      if (!k || seen.has(k) || k === seed.toLowerCase()) continue;
      seen.add(k);
      out.push(s);
    }
  };

  push((await getSuggestions(seed)).data);

  if (mode === "related") {
    // Related terms: suggestions for the seed without its last word, plus "vs"/"alternative" forms.
    const words = seed.trim().split(/\s+/);
    if (words.length > 1) push((await getSuggestions(words.slice(0, -1).join(" "))).data);
    push((await getSuggestions(`${seed} vs`)).data);
  } else {
    const letters = mode === "longtail" ? "abcdefghijklmnopqrstuvwxyz" : "abcdefghij";
    const batches = await Promise.all([...letters].map((l) => getSuggestions(`${seed} ${l}`).catch(() => ({ data: [] as string[] }))));
    for (const b of batches) push(b.data);
    if (mode === "research") {
      const questions = await Promise.all(QUESTION_PREFIXES.map((p) => getSuggestions(`${p} ${seed}`).catch(() => ({ data: [] as string[] }))));
      for (const b of questions) push(b.data);
    }
  }

  if (mode === "longtail") {
    return out.filter((s) => s.trim().split(/\s+/).length >= 4);
  }
  return out;
}
