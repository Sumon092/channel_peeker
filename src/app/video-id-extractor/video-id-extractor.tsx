"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

export function VideoIdExtractor() {
  const id = useId();
  const [url, setUrl] = useState("");

  const parsed = url.trim() ? parseYouTubeInput(url, "video") : null;
  const videoId = parsed?.ok && parsed.value.kind === "video" ? parsed.value.id : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-[0_8px_30px_rgb(0_0_0/0.08)] sm:p-6">
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
        className="mt-2 w-full rounded-full border border-border bg-bg px-5 py-3.5 text-base outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/12"
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
