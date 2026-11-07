"use client";

import { useCallback, useRef, useState } from "react";

type State<T> = { status: "idle" } | { status: "loading" } | { status: "error"; message: string } | { status: "done"; data: T };

/** POSTs `{ input }` (or a custom body) to a tool route and tracks loading/error/result state. */
export function useToolRequest<T>(endpoint: string) {
  const [state, setState] = useState<State<T>>({ status: "idle" });
  const controller = useRef<AbortController | null>(null);

  const run = useCallback(
    async (body: unknown) => {
      controller.current?.abort();
      const ac = new AbortController();
      controller.current = ac;
      setState({ status: "loading" });
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: ac.signal,
        });
        const json = await res.json().catch(() => null);
        if (!res.ok) {
          setState({ status: "error", message: json?.error?.message ?? "Something went wrong. Please try again." });
          return;
        }
        setState({ status: "done", data: json as T });
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setState({ status: "error", message: "Couldn't reach channelpeeker. Check your connection and try again." });
      }
    },
    [endpoint],
  );

  return { state, run };
}
