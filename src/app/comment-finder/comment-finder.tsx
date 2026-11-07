"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { useInitialQuery } from "@/components/ui/use-initial-query";
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
  video: { id: string; title: string; commentCount: number | null; thumbnailUrl: string | null };
  search: string;
  order: "relevance" | "time";
  comments: CommentItem[];
  fetchedAt: string;
}

const inputCls = "w-full field-pill px-4 py-3";

function csvEscape(v: string) {
  // Commenter-controlled text: neutralize spreadsheet formula injection (=, +, -, @, tab)
  // before quoting, or Excel/Sheets executes it on open.
  const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
  return /[",\n]/.test(safe) ? `"${safe.replaceAll('"', '""')}"` : safe;
}

function downloadCsv(r: Result) {
  const rows = [
    ["author", "comment", "likes", "replies", "published"],
    ...r.comments.map((c) => [c.author, c.text, String(c.likes), String(c.replies), c.publishedAt]),
  ];
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `comments-${r.video.id}${r.search ? `-${r.search.replace(/\W+/g, "-")}` : ""}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function CommentFinder() {
  const id = useId();
  const { w } = useI18n();
  const f = w.finder;
  const { state, run } = useToolRequest<Result>("/api/tools/comment-finder");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"relevance" | "time">("relevance");
  const [validation, setValidation] = useState<string | null>(null);

  // Arriving from the home smart search (?q=): prefill and run without another click.
  useInitialQuery((q) => {
    setInput(q);
    const parsed = parseYouTubeInput(q, "video");
    if (parsed.ok) run({ input: q, order: "relevance" });
    else setValidation(w.parseErrors[parsed.code]);
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state.status === "loading") return;
    const parsed = parseYouTubeInput(input, "video");
    if (!parsed.ok) {
      setValidation(w.parseErrors[parsed.code]);
      return;
    }
    setValidation(null);
    run({ input: input.trim(), search: search.trim() || undefined, order });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
        <label className="block text-sm font-medium" htmlFor={`${id}-v`}>
          {w.videoInputLabel}
          <input
            id={`${id}-v`}
            type="text"
            value={input}
            aria-invalid={Boolean(validation)}
            aria-describedby={validation ? `${id}-err` : undefined}
            onChange={(e) => {
              setInput(e.target.value);
              if (validation) setValidation(null);
            }}
            placeholder={w.videoPlaceholder}
            className={`mt-2 font-normal ${inputCls}`}
          />
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
          <label className="text-sm font-medium" htmlFor={`${id}-s`}>
            {f.searchLabel} <span className="font-normal text-muted">{w.optional}</span>
            <input
              id={`${id}-s`}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={f.searchPlaceholder}
              className={`mt-2 font-normal ${inputCls}`}
            />
          </label>
          <label className="text-sm font-medium" htmlFor={`${id}-o`}>
            {f.sortLabel}
            <select id={`${id}-o`} value={order} onChange={(e) => setOrder(e.target.value as "relevance" | "time")} className={`mt-2 font-normal ${inputCls}`}>
              <option value="relevance">{f.sortTop}</option>
              <option value="time">{f.sortNew}</option>
            </select>
          </label>
        </div>
        {validation && (
          <p id={`${id}-err`} role="alert" className="mt-3 text-sm font-medium text-bad">
            {validation}
          </p>
        )}
        <button
          type="submit"
          aria-disabled={state.status === "loading"}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent-fill px-7 py-3.5 font-medium text-white transition hover:bg-accent-fill-strong active:scale-[0.97] aria-disabled:opacity-70 sm:w-auto"
        >
          {state.status === "loading" ? f.searching : f.submit}
        </button>
      </form>

      {/* Always-mounted status: a one-line summary instead of reading 100 comments aloud. */}
      <p role="status" className="sr-only">
        {state.status === "loading"
          ? f.searchingStatus
          : state.status === "done"
            ? fmt(state.data.comments.length === 1 ? f.foundOne : f.foundMany, { n: state.data.comments.length })
            : ""}
      </p>
      <div>
        {state.status === "loading" && <Skeleton className="h-72 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <Results {...state.data} />}
      </div>
    </div>
  );
}

function Results(r: Result) {
  const { intl, w } = useI18n();
  const f = w.finder;
  const countNote = r.video.commentCount !== null ? fmt(f.commentsOnVideo, { n: r.video.commentCount.toLocaleString(intl) }) : f.countUnavailable;

  const n = r.comments.length;
  const nShown = `${n}${n === 100 ? "+" : ""}`;
  const summary =
    n === 0
      ? r.search
        ? f.noMatch
        : f.noneFound
      : fmt(r.search ? (n === 1 ? f.countSummaryMatchedOne : f.countSummaryMatchedMany) : n === 1 ? f.countSummaryOne : f.countSummaryMany, { n: nShown });

  return (
    <div className="result-enter rounded-3xl border border-border bg-surface p-5 shadow-panel sm:p-7">
      <div className="flex items-center gap-4">
        <span className="relative h-14 w-[100px] shrink-0 overflow-hidden rounded-lg bg-surface-2">
          {r.video.thumbnailUrl && <Image src={r.video.thumbnailUrl} alt="" fill sizes="100px" className="object-cover" />}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{r.video.title}</p>
          <p className="text-sm text-muted">
            {countNote}
            {r.search ? fmt(f.showingMatches, { q: r.search }) : ""}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">{summary}</p>
        {n > 0 && (
          <button
            type="button"
            onClick={() => downloadCsv(r)}
            className="rounded-lg bg-surface-2 px-3 py-2 text-sm font-medium transition hover:bg-surface-3 active:scale-[0.97]"
          >
            {f.downloadCsv}
          </button>
        )}
      </div>

      {n > 0 && (
        <ul role="list" className="mt-4 space-y-3">
          {r.comments.map((c) => (
            <li key={c.id} className="rounded-xl bg-surface-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold">
                  {c.authorChannelUrl?.startsWith("http") ? (
                    <a href={c.authorChannelUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {c.author}
                      <span className="sr-only"> {w.opensInNewTab}</span>
                    </a>
                  ) : (
                    c.author
                  )}
                </p>
                <p className="shrink-0 text-xs text-muted">
                  {c.publishedAt ? new Date(c.publishedAt).toLocaleDateString(intl, { dateStyle: "medium" }) : ""}
                </p>
              </div>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed">{c.text}</p>
              <p className="mt-2 text-xs tabular-nums text-muted">
                {fmt(c.likes === 1 ? f.likesOne : f.likesMany, { n: c.likes.toLocaleString(intl) })} ·{" "}
                {fmt(c.replies === 1 ? f.repliesOne : f.repliesMany, { n: c.replies.toLocaleString(intl) })}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex justify-end">
        <FetchedAt iso={r.fetchedAt} />
      </div>
    </div>
  );
}
