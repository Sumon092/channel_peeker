"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface CommentItem {
  id: string;
  author: string;
  authorAvatarUrl: string | null;
  authorChannelUrl: string | null;
  text: string;
  likes: number;
  replies: number;
  publishedAt: string;
}

interface Result {
  video: { id: string; title: string; channelTitle: string; commentCount: number | null; thumbnailUrl: string | null };
  comments: CommentItem[];
  hasMore: boolean;
  pagesFetched: number;
  fetchedAt: string;
}

const inputCls = "w-full field-pill px-4 py-3";

/** Unbiased random index via rejection sampling on crypto.getRandomValues. */
function secureRandomIndex(max: number): number {
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

function drawWinners(entries: CommentItem[], count: number): CommentItem[] {
  const pool = [...entries];
  const winners: CommentItem[] = [];
  while (winners.length < count && pool.length > 0) {
    winners.push(...pool.splice(secureRandomIndex(pool.length), 1));
  }
  return winners;
}

export function CommentPicker() {
  const { state, run } = useToolRequest<Result>("/api/tools/comment-picker");

  return (
    <div className="space-y-4">
      <ToolInput
        label="Giveaway video link or ID"
        placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
        submitLabel="Load comments"
        loading={state.status === "loading"}
        validate={(v) => {
          const r = parseYouTubeInput(v, "video");
          return r.ok ? null : r.message;
        }}
        onSubmit={(input) => run({ input })}
      />

      {/* Always-mounted status line: announces a short summary instead of the whole card. */}
      <p role="status" className="sr-only">
        {state.status === "loading" ? "Loading comments…" : state.status === "done" ? `Loaded ${state.data.comments.length} top-level comments.` : ""}
      </p>
      <div>
        {state.status === "loading" && <Skeleton className="h-72 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {/* Keyed by video: loading a different video must reset winners, filters and any in-flight draw. */}
        {state.status === "done" && <Picker key={state.data.video.id} {...state.data} />}
      </div>
    </div>
  );
}

function Picker(r: Result) {
  const [keyword, setKeyword] = useState("");
  const [onePerPerson, setOnePerPerson] = useState(true);
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState<CommentItem[] | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [cycling, setCycling] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const entries = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    let list = r.comments;
    if (kw) list = list.filter((c) => c.text.toLowerCase().includes(kw));
    if (onePerPerson) {
      const seen = new Set<string>();
      list = list.filter((c) => {
        const key = c.authorChannelUrl ?? c.author;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    return list;
  }, [r.comments, keyword, onePerPerson]);

  /** Cancels an in-flight draw (filters changed mid-draw would make it stale) and clears results. */
  function resetDraw() {
    if (timer.current) clearInterval(timer.current);
    setDrawing(false);
    setCycling(null);
    setWinners(null);
  }

  function startDraw() {
    if (entries.length === 0 || drawing) return;
    setWinners(null);
    // Reduced motion: reveal instantly, no cycling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWinners(drawWinners(entries, Math.min(winnerCount, entries.length)));
      return;
    }
    setDrawing(true);
    // Recordable suspense: cycle random entrant names before the reveal.
    const started = Date.now();
    timer.current = setInterval(() => {
      setCycling(entries[secureRandomIndex(entries.length)].author);
      if (Date.now() - started > 2600) {
        if (timer.current) clearInterval(timer.current);
        setCycling(null);
        setWinners(drawWinners(entries, Math.min(winnerCount, entries.length)));
        setDrawing(false);
      }
    }, 90);
  }

  const announcement =
    winners && winners.length > 0
      ? `🎉 Giveaway result for “${r.video.title}”: ${winners.map((w) => w.author).join(", ")} — picked at random from ${entries.length.toLocaleString("en")} entries with channelpeek.com/comment-picker`
      : "";

  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <span className="relative h-14 w-[100px] shrink-0 overflow-hidden rounded-lg bg-surface-2">
          {r.video.thumbnailUrl && <Image src={r.video.thumbnailUrl} alt="" fill sizes="100px" className="object-cover" />}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{r.video.title}</p>
          <p className="text-sm tabular-nums text-muted">
            {r.video.channelTitle} · {r.comments.length.toLocaleString("en")} top-level comments loaded
            {r.hasMore ? " (newest 500 — the video has more)" : ""}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-medium" htmlFor="cp-kw">
          Must contain <span className="font-normal text-muted">(optional)</span>
          <input
            id="cp-kw"
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              resetDraw();
            }}
            placeholder="e.g. #giveaway"
            className={`mt-2 font-normal ${inputCls}`}
          />
        </label>
        <label className="text-sm font-medium" htmlFor="cp-n">
          Winners
          <select
            id="cp-n"
            value={winnerCount}
            onChange={(e) => {
              setWinnerCount(Number(e.target.value));
              resetDraw();
            }}
            className={`mt-2 font-normal ${inputCls}`}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-end gap-2 pb-3 text-sm font-medium" htmlFor="cp-dedupe">
          <input
            id="cp-dedupe"
            type="checkbox"
            checked={onePerPerson}
            onChange={(e) => {
              setOnePerPerson(e.target.checked);
              resetDraw();
            }}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          One entry per person
        </label>
      </div>

      {/* Visual draw box only — hidden from AT while names cycle; the sr-only status below announces instead. */}
      <div className="mt-5 flex min-h-28 flex-col items-center justify-center rounded-xl bg-surface-2 px-4 py-6 text-center" aria-hidden={drawing || undefined}>
        {cycling ? (
          <p className="text-2xl font-black tracking-tight">{cycling}</p>
        ) : winners && winners.length > 0 ? (
          <div className="result-enter space-y-3">
            <p className="text-xs uppercase tracking-wide text-muted">{winners.length === 1 ? "Winner" : "Winners"}</p>
            {winners.map((w) => (
              <div key={w.id}>
                <p className="text-2xl font-black tracking-tight text-good">
                  {w.authorChannelUrl?.startsWith("http") ? (
                    <a href={w.authorChannelUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:no-underline">
                      {w.author}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  ) : (
                    w.author
                  )}
                </p>
                <p className="mx-auto mt-1 line-clamp-2 max-w-md break-words text-sm text-muted">“{w.text}”</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm tabular-nums text-muted">
            {entries.length.toLocaleString("en")} eligible {entries.length === 1 ? "entry" : "entries"} ready
          </p>
        )}
      </div>

      {/* Always mounted: announces the draw start and the winners without reading the cycling names. */}
      <p role="status" className="sr-only">
        {drawing ? "Drawing…" : winners && winners.length > 0 ? `${winners.length === 1 ? "Winner" : "Winners"}: ${winners.map((w) => w.author).join(", ")}` : ""}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={startDraw}
          aria-disabled={drawing || entries.length === 0}
          className="inline-flex items-center justify-center rounded-full bg-accent-fill px-7 py-3 font-medium text-white transition hover:bg-accent-fill-strong active:scale-[0.97] aria-disabled:cursor-not-allowed aria-disabled:opacity-70"
        >
          {drawing ? "Drawing…" : winners ? "Draw again" : "Pick winner" + (winnerCount > 1 ? "s" : "")}
        </button>
        {winners && winners.length > 0 && <CopyButton text={announcement} label="Copy announcement" />}
        <span className="ml-auto">
          <FetchedAt iso={r.fetchedAt} />
        </span>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Fair by design: the draw runs in your browser with cryptographic randomness (not a predictable shuffle), from the{" "}
        {r.hasMore ? "newest 500" : `${r.comments.length.toLocaleString("en")}`} top-level comments via the official YouTube API. Replies
        inside threads aren&apos;t separate entries, and YouTube doesn&apos;t let anyone verify who&apos;s subscribed — check that manually
        if your giveaway requires it. Record your screen during the draw for a transparent announcement.
      </p>
    </div>
  );
}
