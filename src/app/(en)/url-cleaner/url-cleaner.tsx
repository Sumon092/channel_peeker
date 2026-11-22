"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { useInitialQuery } from "@/components/ui/use-initial-query";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

const KEEP = new Set(["v", "list", "t", "start"]);

function clean(raw: string): { url: string; short: string | null; removed: string[] } | null {
  const parsed = parseYouTubeInput(raw);
  if (!parsed.ok) return null;

  let original: URL | null = null;
  try {
    original = new URL(/^https?:\/\//i.test(raw.trim()) ? raw.trim() : `https://${raw.trim().replace(/^\/\//, "")}`);
  } catch {
    original = null;
  }
  const removed = original ? [...original.searchParams.keys()].filter((k) => !KEEP.has(k)) : [];
  const t = original?.searchParams.get("t") ?? original?.searchParams.get("start");
  const tSuffix = t ? `&t=${encodeURIComponent(t)}` : "";

  const v = parsed.value;
  if (v.kind === "video") {
    const listSuffix = v.playlistId ? `&list=${v.playlistId}` : "";
    return {
      url: `https://www.youtube.com/watch?v=${v.id}${listSuffix}${tSuffix}`,
      short: `https://youtu.be/${v.id}${t ? `?t=${encodeURIComponent(t)}` : ""}`,
      removed,
    };
  }
  if (v.kind === "playlist") return { url: `https://www.youtube.com/playlist?list=${v.id}`, short: null, removed };
  if (v.by === "id") return { url: `https://www.youtube.com/channel/${v.id}`, short: null, removed };
  if (v.by === "handle") return { url: `https://www.youtube.com/@${v.handle}`, short: null, removed };
  return null;
}

export function UrlCleaner() {
  const id = useId();
  const [url, setUrl] = useState("");
  useInitialQuery(setUrl);

  const looksLikeLink = /youtu|\//.test(url);
  const result = url.trim() && looksLikeLink ? clean(url) : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <label htmlFor={id} className="text-sm font-medium">
        YouTube link to clean
      </label>
      <input
        id={id}
        type="text"
        inputMode="url"
        autoComplete="off"
        spellCheck={false}
        value={url}
        placeholder="https://youtu.be/…?si=AbC123… or any YouTube link"
        onChange={(e) => setUrl(e.target.value)}
        className="mt-2 w-full field-pill px-5 py-3.5"
      />
      {url.trim() && looksLikeLink && !result && (
        <p role="alert" className="mt-2 text-sm font-medium text-bad">
          We couldn&apos;t recognize that as a YouTube link.
        </p>
      )}

      {result && (
        <div className="mt-4 space-y-3" aria-live="polite">
          <div className="flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs text-muted">Clean link</p>
              <code className="block break-all font-mono text-sm">{result.url}</code>
            </div>
            <CopyButton text={result.url} label="Copy" className="shrink-0 bg-surface" />
          </div>
          {result.short && (
            <div className="flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs text-muted">Clean short link</p>
                <code className="block break-all font-mono text-sm">{result.short}</code>
              </div>
              <CopyButton text={result.short} label="Copy" className="shrink-0 bg-surface" />
            </div>
          )}
          <p className="text-xs text-muted">
            {result.removed.length > 0
              ? `Removed: ${result.removed.map((r) => `${r}=`).join(", ")} — kept only the video, playlist and timestamp.`
              : "That link was already clean — nothing to remove."}
          </p>
        </div>
      )}
    </div>
  );
}
