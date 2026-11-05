"use client";

import { useEffect, useRef } from "react";

/**
 * Reads ?q= once on mount so arrivals from the home smart search (and shared
 * links) land with the widget prefilled instead of an empty form.
 */
export function useInitialQuery(apply: (q: string) => void) {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q?.trim()) apply(q.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
