"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

export function TimestampLinkGenerator() {
  const id = useId();
  const [url, setUrl] = useState("");
  const [h, setH] = useState("0");
  const [m, setM] = useState("1");
  const [s, setS] = useState("30");

  const parsed = url.trim() ? parseYouTubeInput(url, "video") : null;
  const videoId = parsed?.ok && parsed.value.kind === "video" ? parsed.value.id : null;
  const seconds = (Number.parseInt(h, 10) || 0) * 3600 + (Number.parseInt(m, 10) || 0) * 60 + (Number.parseInt(s, 10) || 0);

  const shortLink = videoId ? `https://youtu.be/${videoId}?t=${seconds}` : null;
  const watchLink = videoId ? `https://www.youtube.com/watch?v=${videoId}&t=${seconds}s` : null;

  const inputCls =
    "w-full field-pill px-5 py-3";
  const timeCls =
    "w-full field-pill px-4 py-3 text-center";

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <label htmlFor={id} className="text-sm font-medium">
        Video link
      </label>
      <input
        id={id}
        type="text"
        inputMode="url"
        autoComplete="off"
        spellCheck={false}
        value={url}
        placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
        onChange={(e) => setUrl(e.target.value)}
        className={`mt-2 ${inputCls}`}
      />
      {url.trim() && !videoId && (
        <p role="alert" className="mt-2 text-sm font-medium text-bad">
          {parsed && !parsed.ok ? parsed.message : "Paste a link to a single video."}
        </p>
      )}

      <p className="mt-4 text-sm font-medium">Start time</p>
      <div className="mt-2 grid max-w-xs grid-cols-3 gap-2">
        {(
          [
            ["Hours", h, setH, 99],
            ["Minutes", m, setM, 59],
            ["Seconds", s, setS, 59],
          ] as const
        ).map(([label, val, set, max]) => (
          <label key={label} className="text-xs text-muted">
            {label}
            <input
              type="number"
              min="0"
              max={max}
              inputMode="numeric"
              value={val}
              onChange={(e) => set(e.target.value)}
              className={`mt-1 ${timeCls}`}
            />
          </label>
        ))}
      </div>

      {shortLink && watchLink && (
        <div className="mt-5 space-y-3" aria-live="polite">
          {(
            [
              ["Short link", shortLink],
              ["Full link", watchLink],
            ] as const
          ).map(([label, link]) => (
            <div key={label} className="flex flex-col gap-2 rounded-xl bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs text-muted">{label}</p>
                <code className="block break-all font-mono text-sm">{link}</code>
              </div>
              <CopyButton text={link} label="Copy" className="shrink-0 bg-surface" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
