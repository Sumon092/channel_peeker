"use client";

import { ArrowRight, CornerDownLeft, Film, ListVideo, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

export interface SmartTool {
  path: string;
  name: string;
  live: boolean;
}

interface Props {
  /** Tools per detected input kind, in priority order. */
  byKind: Record<"video" | "channel" | "playlist", SmartTool[]>;
}

const kindMeta = {
  video: { label: "Video detected", icon: Film },
  channel: { label: "Channel detected", icon: UserRound },
  playlist: { label: "Playlist detected", icon: ListVideo },
} as const;

const examples = [
  { label: "@mkbhd", value: "@mkbhd" },
  { label: "A video link", value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { label: "A Shorts link", value: "https://www.youtube.com/shorts/9bZkp7q19f0" },
];

/**
 * Paste anything: we detect what it is as you type and offer the tools that fit.
 * Enter runs the first available tool. Press "/" anywhere to focus.
 */
export function SmartSearch({ byKind }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const parsed = useMemo(() => (value.trim() ? parseYouTubeInput(value, "any") : null), [value]);
  const kind = parsed?.ok ? parsed.value.kind : null;
  const suggestions = kind ? byKind[kind] : [];
  const primary = suggestions.find((t) => t.live);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || (el as HTMLElement | null)?.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(path: string) {
    router.push(`${path}?q=${encodeURIComponent(value.trim())}`);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (primary) go(primary.path);
  }

  const error = touched && value.trim() && !parsed?.ok ? parsed?.message : touched && !value.trim() ? "Paste a YouTube link, @handle or ID first." : null;
  const noLiveTool = parsed?.ok && !primary;

  return (
    <div className="w-full text-left">
      <form
        onSubmit={submit}
        className="group relative flex items-center gap-3 rounded-2xl border border-border bg-surface p-2 pl-5 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_40px_rgb(0_0_0/0.08)] transition focus-within:border-text/30 focus-within:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_48px_rgb(0_0_0/0.12)] sm:rounded-full"
      >
        <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
        <label htmlFor="smart-q" className="sr-only">
          Paste a YouTube link, @handle or ID
        </label>
        <input
          ref={inputRef}
          id="smart-q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste any YouTube link, @handle or channel ID"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          aria-describedby="smart-hint"
          className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none placeholder:text-muted sm:text-lg"
        />
        {kind && (
          <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-good-soft px-3 py-1 text-xs font-medium text-good sm:inline-flex">
            {(() => {
              const Icon = kindMeta[kind].icon;
              return <Icon className="h-3.5 w-3.5" aria-hidden="true" />;
            })()}
            {kindMeta[kind].label}
          </span>
        )}
        {!value && (
          <kbd className="hidden shrink-0 rounded-md border border-border px-2 py-0.5 font-sans text-xs text-muted sm:block" aria-hidden="true">
            /
          </kbd>
        )}
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-5 py-3 font-medium text-white transition hover:bg-accent-strong sm:rounded-full sm:px-7"
        >
          <span className="hidden sm:inline">{primary ? "Analyze" : "Go"}</span>
          <ArrowRight className="h-4 w-4 sm:hidden" aria-hidden="true" />
        </button>
      </form>

      <div id="smart-hint" aria-live="polite" className="mt-4 min-h-10">
        {error ? (
          <p className="text-center text-sm font-medium text-bad">{error}</p>
        ) : kind ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {suggestions.map((t) =>
              t.live ? (
                <button
                  key={t.path}
                  type="button"
                  onClick={() => go(t.path)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    t === primary ? "bg-text text-bg hover:opacity-85" : "bg-surface ring-1 ring-border hover:ring-text/30"
                  }`}
                >
                  {t.name}
                  {t === primary && <CornerDownLeft className="h-3.5 w-3.5 opacity-70" aria-label="Enter" />}
                </button>
              ) : (
                <span key={t.path} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted">
                  {t.name} <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">Soon</span>
                </span>
              ),
            )}
            {noLiveTool && <p className="w-full text-center text-sm text-muted">Tools for this type of link are shipping soon.</p>}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-muted">Try</span>
            {examples.map((ex) => (
              <button
                key={ex.value}
                type="button"
                onClick={() => {
                  setValue(ex.value);
                  inputRef.current?.focus();
                }}
                className="rounded-full bg-surface px-3.5 py-1.5 font-medium ring-1 ring-border transition hover:ring-text/30"
              >
                {ex.label}
              </button>
            ))}
            <span className="text-muted">or</span>
            <Link href="/tools" className="font-medium text-accent hover:underline">
              browse all tools
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
