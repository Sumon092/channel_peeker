"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { useInitialQuery } from "@/components/ui/use-initial-query";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

export function PlaylistIdFinder() {
  const id = useId();
  const [url, setUrl] = useState("");
  useInitialQuery(setUrl);

  const parsed = url.trim() ? parseYouTubeInput(url) : null;
  const value = parsed?.ok ? parsed.value : null;
  const playlistId = value?.kind === "playlist" ? value.id : value?.kind === "video" && value.playlistId ? value.playlistId : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <label htmlFor={id} className="text-sm font-medium">
        Playlist link (or a video link opened from a playlist)
      </label>
      <input
        id={id}
        type="text"
        inputMode="url"
        autoComplete="off"
        spellCheck={false}
        value={url}
        placeholder="https://www.youtube.com/playlist?list=… or watch?v=…&list=…"
        onChange={(e) => setUrl(e.target.value)}
        className="mt-2 w-full field-pill px-5 py-3.5"
      />
      {url.trim() && !playlistId && (
        <p role="alert" className="mt-2 text-sm font-medium text-bad">
          {parsed && !parsed.ok ? parsed.message : "That link has no playlist in it — look for list= in the URL."}
        </p>
      )}

      {playlistId && (
        <div className="mt-4 space-y-3" aria-live="polite">
          <div className="flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs text-muted">Playlist ID</p>
              <code className="block break-all font-mono text-lg">{playlistId}</code>
            </div>
            <CopyButton text={playlistId} label="Copy ID" className="shrink-0 bg-surface" />
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs text-muted">Clean playlist URL</p>
              <code className="block break-all font-mono text-sm">{`https://www.youtube.com/playlist?list=${playlistId}`}</code>
            </div>
            <CopyButton text={`https://www.youtube.com/playlist?list=${playlistId}`} label="Copy URL" className="shrink-0 bg-surface" />
          </div>
        </div>
      )}
    </div>
  );
}
