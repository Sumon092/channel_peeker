import "server-only";
import { z } from "zod";
import { AppError } from "./errors";
import { parseYouTubeInput, type Expect, type ParsedInput } from "./youtube/parse-input";

/** Reads `{ input }` from a JSON body and parses it into a YouTube reference, or throws a user-facing error. */
export async function readYouTubeInput(req: Request, expect: Expect): Promise<ParsedInput> {
  const body = await req.json().catch(() => null);
  const parsed = z.object({ input: z.string().max(4096) }).safeParse(body);
  if (!parsed.success) throw new AppError("invalid_input", "Paste a YouTube link, @handle or ID.");
  const result = parseYouTubeInput(parsed.data.input, expect);
  if (!result.ok) throw new AppError("invalid_input", result.message);
  return result.value;
}
