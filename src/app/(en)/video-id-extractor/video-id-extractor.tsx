"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { useInitialQuery } from "@/components/ui/use-initial-query";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

export function VideoIdExtractor() {
  const id = useId();
  const [url, setUrl] = useState("");
  useInitialQuery(setUrl);

  const parsed = url.trim() ? parseYouTubeInput(url, "video") : null;
  const videoId = parsed?.ok && parsed.value.kind === "video" ? parsed.value.id : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <label htmlFor={id} className="text-sm font-medium">
        Any YouTube video link
      </label>
      <input
        id={id}
        type="text"
        inputMode="url"
        autoComplete="off"
        spellCheck={false}
        value={url}
        placeholder="watch?v=…, youtu.be/…, /shorts/…, /embed/… — all work"
        onChange={(e) => setUrl(e.target.value)}
        className="mt-2 w-full field-pill px-5 py-3.5"
      />
      {url.trim() && !videoId && (
        <p role="alert" className="mt-2 text-sm font-medium text-bad">
          {parsed && !parsed.ok ? parsed.message : "Paste a link to a single video."}
        </p>
      )}

      {videoId && (
        <div className="mt-4 flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
          <div className="min-w-0">
            <p className="text-xs text-muted">Video ID</p>
            <code className="block break-all font-mono text-lg">{videoId}</code>
          </div>
          <CopyButton text={videoId} label="Copy ID" className="shrink-0 bg-surface" />
        </div>
      )}
    </div>
  );
}
