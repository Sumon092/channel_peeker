"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { fmt } from "@/lib/widget-i18n";
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
  const { w } = useI18n();
  const p = w.picker;
  const { state, run } = useToolRequest<Result>("/api/tools/comment-picker");

  return (
    <div className="space-y-4">
      <ToolInput
        label={p.inputLabel}
        placeholder={w.videoPlaceholder}
        submitLabel={p.submit}
        loading={state.status === "loading"}
        validate={(v) => {
          const r = parseYouTubeInput(v, "video");
          return r.ok ? null : w.parseErrors[r.code];
        }}
        onSubmit={(input) => run({ input })}
      />

      {/* Always-mounted status line: announces a short summary instead of the whole card. */}
      <p role="status" className="sr-only">
        {state.status === "loading" ? p.loading : state.status === "done" ? fmt(p.loaded, { n: state.data.comments.length }) : ""}
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
  const { intl, w } = useI18n();
  const p = w.picker;
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
      ? fmt(p.announcement, { title: r.video.title, winners: winners.map((x) => x.author).join(", "), n: entries.length.toLocaleString(intl) })
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
            {r.video.channelTitle} · {fmt(p.commentsLoaded, { n: r.comments.length.toLocaleString(intl) })}
            {r.hasMore ? p.hasMoreNote : ""}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-medium" htmlFor="cp-kw">
          {p.mustContain} <span className="font-normal text-muted">{w.optional}</span>
          <input
            id="cp-kw"
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              resetDraw();
            }}
            placeholder={p.keywordPlaceholder}
            className={`mt-2 font-normal ${inputCls}`}
          />
        </label>
        <label className="text-sm font-medium" htmlFor="cp-n">
          {p.winnersLabel}
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
          {p.onePerPerson}
        </label>
      </div>

      {/* Visual draw box only — hidden from AT while names cycle; the sr-only status below announces instead. */}
      <div className="mt-5 flex min-h-28 flex-col items-center justify-center rounded-xl bg-surface-2 px-4 py-6 text-center" aria-hidden={drawing || undefined}>
        {cycling ? (
          <p className="text-2xl font-black tracking-tight">{cycling}</p>
        ) : winners && winners.length > 0 ? (
          <div className="result-enter space-y-3">
            <p className="text-xs uppercase tracking-wide text-muted">{winners.length === 1 ? p.winnerOne : p.winnerMany}</p>
            {winners.map((x) => (
              <div key={x.id}>
                <p className="text-2xl font-black tracking-tight text-good">
                  {x.authorChannelUrl?.startsWith("http") ? (
                    <a href={x.authorChannelUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:no-underline">
                      {x.author}
                      <span className="sr-only"> {w.opensInNewTab}</span>
                    </a>
                  ) : (
                    x.author
                  )}
                </p>
                <p className="mx-auto mt-1 line-clamp-2 max-w-md break-words text-sm text-muted">“{x.text}”</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm tabular-nums text-muted">
            {fmt(entries.length === 1 ? p.entriesReadyOne : p.entriesReadyMany, { n: entries.length.toLocaleString(intl) })}
          </p>
        )}
      </div>

      {/* Always mounted: announces the draw start and the winners without reading the cycling names. */}
      <p role="status" className="sr-only">
        {drawing
          ? p.drawing
          : winners && winners.length > 0
            ? `${winners.length === 1 ? p.winnerOne : p.winnerMany}: ${winners.map((x) => x.author).join(", ")}`
            : ""}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={startDraw}
          aria-disabled={drawing || entries.length === 0}
          className="inline-flex items-center justify-center rounded-full bg-accent-fill px-7 py-3 font-medium text-white transition hover:bg-accent-fill-strong active:scale-[0.97] aria-disabled:cursor-not-allowed aria-disabled:opacity-70"
        >
          {drawing ? p.drawing : winners ? p.drawAgain : winnerCount > 1 ? p.pickWinnerMany : p.pickWinnerOne}
        </button>
        {winners && winners.length > 0 && <CopyButton text={announcement} label={p.copyAnnouncement} />}
        <span className="ml-auto">
          <FetchedAt iso={r.fetchedAt} />
        </span>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        {fmt(p.fairNote, { source: r.hasMore ? p.fairSourceNewest : r.comments.length.toLocaleString(intl) })}
      </p>
    </div>
  );
}
