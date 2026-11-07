"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ErrorBox, FetchedAt, Skeleton } from "@/components/ui/status";
import { useInitialQuery } from "@/components/ui/use-initial-query";
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
  const { state, run } = useToolRequest<Result>("/api/tools/comment-finder");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"relevance" | "time">("relevance");
  const [validation, setValidation] = useState<string | null>(null);

  // Arriving from the home smart search (?q=): prefill and run without another click.
  useInitialQuery((q) => {
    setInput(q);
    if (parseYouTubeInput(q, "video").ok) run({ input: q, order: "relevance" });
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseYouTubeInput(input, "video");
    if (!parsed.ok) {
      setValidation(parsed.message);
      return;
    }
    setValidation(null);
    run({ input: input.trim(), search: search.trim() || undefined, order });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
        <label className="block text-sm font-medium" htmlFor={`${id}-v`}>
          Video link or ID
          <input
            id={`${id}-v`}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
            className={`mt-2 font-normal ${inputCls}`}
          />
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
          <label className="text-sm font-medium" htmlFor={`${id}-s`}>
            Search within comments <span className="font-normal text-muted">(optional)</span>
            <input
              id={`${id}-s`}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="A word, name or phrase"
              className={`mt-2 font-normal ${inputCls}`}
            />
          </label>
          <label className="text-sm font-medium" htmlFor={`${id}-o`}>
            Sort by
            <select id={`${id}-o`} value={order} onChange={(e) => setOrder(e.target.value as "relevance" | "time")} className={`mt-2 font-normal ${inputCls}`}>
              <option value="relevance">Top comments</option>
              <option value="time">Newest first</option>
            </select>
          </label>
        </div>
        {validation && (
          <p role="alert" className="mt-3 text-sm font-medium text-bad">
            {validation}
          </p>
        )}
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent-fill px-7 py-3.5 font-medium text-white transition hover:bg-accent-fill-strong active:scale-[0.97] disabled:opacity-70 sm:w-auto"
        >
          {state.status === "loading" ? "Searching…" : "Find comments"}
        </button>
      </form>

      <div aria-live="polite">
        {state.status === "loading" && <Skeleton className="h-72 w-full rounded-3xl" />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <Results {...state.data} />}
      </div>
    </div>
  );
}

function Results(r: Result) {
  const countNote =
    r.video.commentCount !== null ? `${r.video.commentCount.toLocaleString("en")} comments on this video` : "Comment count unavailable";

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
            {r.search ? ` · showing matches for “${r.search}”` : ""}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {r.comments.length === 0
            ? r.search
              ? "No top-level comments match that search."
              : "No top-level comments found."
            : `${r.comments.length}${r.comments.length === 100 ? "+" : ""} top-level comment${r.comments.length === 1 ? "" : "s"}${r.search ? " matched" : ""} (replies not included).`}
        </p>
        {r.comments.length > 0 && (
          <button
            type="button"
            onClick={() => downloadCsv(r)}
            className="rounded-lg bg-surface-2 px-3 py-2 text-sm font-medium transition hover:bg-surface-3"
          >
            Download CSV
          </button>
        )}
      </div>

      {r.comments.length > 0 && (
        <ul className="mt-4 space-y-3">
          {r.comments.map((c) => (
            <li key={c.id} className="rounded-xl bg-surface-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold">
                  {c.authorChannelUrl?.startsWith("http") ? (
                    <a href={c.authorChannelUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {c.author}
                    </a>
                  ) : (
                    c.author
                  )}
                </p>
                <p className="shrink-0 text-xs text-muted">
                  {c.publishedAt ? new Date(c.publishedAt).toLocaleDateString("en", { dateStyle: "medium" }) : ""}
                </p>
              </div>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed">{c.text}</p>
              <p className="mt-2 text-xs text-muted">
                {c.likes.toLocaleString("en")} like{c.likes === 1 ? "" : "s"} · {c.replies.toLocaleString("en")} repl{c.replies === 1 ? "y" : "ies"}
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
