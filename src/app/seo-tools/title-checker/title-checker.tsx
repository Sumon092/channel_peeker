"use client";

import { CircleCheck, TriangleAlert } from "lucide-react";
import { useId, useState } from "react";

const MAX_LENGTH = 100;
const DESKTOP_CUTOFF = 70;
const MOBILE_CUTOFF = 40;

const truncate = (s: string, n: number) => (s.length > n ? `${s.slice(0, n).trimEnd()}…` : s);

export function TitleChecker() {
  const id = useId();
  const [title, setTitle] = useState("");
  const len = title.length;

  const checks: { ok: boolean; text: string }[] = title.trim()
    ? [
        { ok: len <= MAX_LENGTH, text: len <= MAX_LENGTH ? `Within YouTube's ${MAX_LENGTH}-character limit` : `Over YouTube's ${MAX_LENGTH}-character limit — it can't be saved` },
        { ok: len <= DESKTOP_CUTOFF, text: len <= DESKTOP_CUTOFF ? "Shows in full in desktop search results" : `Truncated after ~${DESKTOP_CUTOFF} characters in desktop search` },
        { ok: len <= MOBILE_CUTOFF, text: len <= MOBILE_CUTOFF ? "Shows in full on small mobile cards" : `Truncated after ~${MOBILE_CUTOFF} characters on small mobile cards` },
        {
          ok: !(title === title.toUpperCase() && /[A-Z]/.test(title)),
          text: title === title.toUpperCase() && /[A-Z]/.test(title) ? "All caps — viewers often read this as spammy" : "Mixed case reads naturally",
        },
      ]
    : [];

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-[0_8px_30px_rgb(0_0_0/0.08)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          Your video title
        </label>
        <span className={`text-sm font-medium tabular-nums ${len > MAX_LENGTH ? "text-bad" : len > DESKTOP_CUTOFF ? "text-warn" : "text-muted"}`}>
          {len}/{MAX_LENGTH}
        </span>
      </div>
      <input
        id={id}
        type="text"
        autoComplete="off"
        value={title}
        placeholder="The title you plan to publish…"
        onChange={(e) => setTitle(e.target.value)}
        className="mt-2.5 w-full rounded-full border border-border bg-bg px-5 py-3.5 text-base outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/12"
      />

      {title.trim() && (
        <div aria-live="polite">
          <ul className="mt-4 space-y-2">
            {checks.map((c) => (
              <li key={c.text} className="flex items-center gap-2 text-sm">
                {c.ok ? (
                  <CircleCheck className="h-4 w-4 shrink-0 text-good" aria-hidden="true" />
                ) : (
                  <TriangleAlert className="h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
                )}
                {c.text}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm font-medium">How it will look</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-bg p-4">
              <p className="text-xs text-muted">Desktop search result</p>
              <div className="mt-2 flex gap-3">
                <span className="h-12 w-[86px] shrink-0 rounded-md bg-surface-3" aria-hidden="true" />
                <p className="text-sm font-medium leading-snug">{truncate(title, DESKTOP_CUTOFF)}</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg p-4">
              <p className="text-xs text-muted">Compact mobile card</p>
              <div className="mt-2 flex gap-3">
                <span className="h-10 w-[72px] shrink-0 rounded-md bg-surface-3" aria-hidden="true" />
                <p className="text-sm font-medium leading-snug">{truncate(title, MOBILE_CUTOFF)}</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">
            Cutoffs are approximate — YouTube truncates by pixel width, not characters, so wide letters shorten the visible text.
          </p>
        </div>
      )}
    </div>
  );
}
