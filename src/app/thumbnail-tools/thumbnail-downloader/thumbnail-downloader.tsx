"use client";

import { Download, ExternalLink, FileSpreadsheet, Info } from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorBox, Skeleton } from "@/components/ui/status";
import { ToolInput } from "@/components/ui/tool-input";
import { useToolRequest } from "@/components/ui/use-tool-request";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

interface Size {
  key: string;
  label: string;
  width: number;
  height: number;
  url: string;
  bytes: number | null;
}
interface VideoThumbs {
  id: string;
  title: string | null;
  sizes: Size[];
}
interface Result {
  videos: VideoThumbs[];
  invalid: string[];
}

const MAX_BULK = 20;

const formatBytes = (b: number | null) => (b === null ? "" : b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);

function downloadHref(id: string, s: Size) {
  const q = new URLSearchParams({ id, size: s.key });
  if (["fhd", "qhd", "uhd"].includes(s.key)) q.set("src", s.url);
  return `/api/tools/thumbnails/download?${q}`;
}

export function ThumbnailDownloader() {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const { state, run } = useToolRequest<Result>("/api/tools/thumbnails");
  const loading = state.status === "loading";

  return (
    <div className="space-y-5">
      <div role="tablist" aria-label="Mode" className="mx-auto flex w-fit gap-1 rounded-full bg-surface-2 p-1 text-sm font-medium">
        {(["single", "bulk"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full px-5 py-2 transition ${mode === m ? "bg-surface shadow-sm" : "text-muted hover:text-text"}`}
          >
            {m === "single" ? "Single video" : `Bulk (up to ${MAX_BULK})`}
          </button>
        ))}
      </div>

      {mode === "single" ? (
        <ToolInput
          label="Video or Shorts link"
          placeholder="https://www.youtube.com/watch?v=…"
          submitLabel="Get thumbnails"
          loading={loading}
          examples={[
            { label: "A music video", value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
            { label: "A youtu.be link", value: "https://youtu.be/jNQXAC9IVRw" },
          ]}
          validate={(v) => {
            const r = parseYouTubeInput(v, "video");
            if (!r.ok) return r.message;
            return r.value.kind === "video" ? null : "That's not a video link. Paste a link to a video or a Short.";
          }}
          onSubmit={(input) => run({ inputs: [input] })}
        />
      ) : (
        <BulkForm loading={loading} onSubmit={(inputs) => run({ inputs })} />
      )}

      <div aria-live="polite">
        {loading && <ResultSkeleton />}
        {state.status === "error" && <ErrorBox message={state.message} />}
        {state.status === "done" && <Results data={state.data} />}
      </div>
    </div>
  );
}

function BulkForm({ loading, onSubmit }: { loading: boolean; onSubmit: (inputs: string[]) => void }) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const lines = text.split(/\s+/).map((l) => l.trim()).filter(Boolean);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (lines.length === 0) return setError("Paste at least one video link.");
    if (lines.length > MAX_BULK) return setError(`You can check up to ${MAX_BULK} videos at once. You pasted ${lines.length}.`);
    setError(null);
    onSubmit(lines);
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <label htmlFor="bulk" className="text-sm font-medium">
        Video links, one per line
      </label>
      <textarea
        id="bulk"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        placeholder={"https://www.youtube.com/watch?v=…\nhttps://youtu.be/…\nhttps://www.youtube.com/shorts/…"}
        className="mt-2.5 w-full resize-y rounded-2xl border border-border bg-bg px-5 py-4 font-mono text-sm outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/12"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className={`text-sm ${lines.length > MAX_BULK ? "font-medium text-bad" : "text-muted"}`}>
          {lines.length} / {MAX_BULK} links
        </span>
        <button type="submit" disabled={loading} className="rounded-full bg-accent-fill px-7 py-3 font-medium text-white transition hover:bg-accent-fill-strong active:scale-[0.97] disabled:opacity-70">
          {loading ? "Working…" : "Get all thumbnails"}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-bad">
          {error}
        </p>
      )}
    </form>
  );
}

function exportCsv(videos: VideoThumbs[]) {
  const rows = [["video_id", "size", "width", "height", "url"]];
  for (const v of videos) for (const s of v.sizes) rows.push([v.id, s.key, String(s.width), String(s.height), s.url]);
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "youtube-thumbnails.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

function Results({ data }: { data: Result }) {
  return (
    <div className="space-y-5 text-left">
      {data.invalid.length > 0 && (
        <div className="flex gap-2 rounded-2xl bg-warn-soft px-4 py-3 text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
          <span>
            Skipped {data.invalid.length} line{data.invalid.length > 1 ? "s" : ""} that {data.invalid.length > 1 ? "weren't video links" : "wasn't a video link"}.
          </span>
        </div>
      )}
      {data.videos.length > 1 && (
        <div className="flex justify-end">
          <button onClick={() => exportCsv(data.videos)} className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-2 text-sm font-medium hover:bg-surface-3">
            <FileSpreadsheet className="h-4 w-4" aria-hidden="true" /> Export CSV of all links
          </button>
        </div>
      )}
      {data.videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}

function VideoCard({ video }: { video: VideoThumbs }) {
  const best = video.sizes[0];
  const hasMaxres = video.sizes.some((s) => s.key === "maxres");

  if (!best) {
    return <ErrorBox message={`No thumbnails found for ${video.id}. The video may be private or deleted.`} />;
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-surface shadow-panel">
      <div className="grid gap-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="bg-surface-2 p-4 sm:p-5">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-surface-3">
            <Image src={best.url} alt={video.title ? `Thumbnail of ${video.title}` : "Video thumbnail"} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
          </div>
          <p className="mt-3 line-clamp-2 font-medium">{video.title ?? `Video ${video.id}`}</p>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm text-muted hover:text-text"
          >
            Watch on YouTube <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          {!hasMaxres && (
            <p className="mt-3 flex gap-2 rounded-xl bg-surface px-3 py-2 text-xs text-muted">
              <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
              No HD (1280×720) version exists. The video was likely uploaded in a lower resolution or before HD thumbnails.
            </p>
          )}
        </div>

        <ul className="divide-y divide-border">
          {video.sizes.map((s) => (
            <li key={s.key} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="font-medium">
                  {s.label}
                  {["fhd", "qhd", "uhd"].includes(s.key) && <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent-strong">NEW</span>}
                </p>
                <p className="text-sm text-muted">
                  {s.width}×{s.height}
                  {s.bytes !== null && ` · ${formatBytes(s.bytes)}`}
                </p>
              </div>
              <div className="flex gap-2">
                <CopyButton text={s.url} label="Copy link" className="rounded-full! border-0 bg-surface-2 hover:bg-surface-3" />
                <a
                  href={downloadHref(video.id, s)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-text px-4 py-1.5 text-sm font-medium text-bg transition hover:opacity-85"
                >
                  <Download className="h-4 w-4" aria-hidden="true" /> Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ResultSkeleton() {
  return (
    <div className="grid overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="bg-surface-2 p-5">
        <Skeleton className="aspect-video w-full rounded-xl bg-surface-3" />
        <Skeleton className="mt-3 h-5 w-3/4 bg-surface-3" />
      </div>
      <div className="space-y-4 p-5">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-11 w-full" />
        ))}
      </div>
    </div>
  );
}
