"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

export function ShortsLinkConverter() {
  const id = useId();
  const [url, setUrl] = useState("");

  const parsed = url.trim() ? parseYouTubeInput(url, "video") : null;
  const videoId = parsed?.ok && parsed.value.kind === "video" ? parsed.value.id : null;

  const links = videoId
    ? ([
        ["Watch URL (normal player)", `https://www.youtube.com/watch?v=${videoId}`],
        ["Shorts URL (Shorts player)", `https://www.youtube.com/shorts/${videoId}`],
        ["Short share link", `https://youtu.be/${videoId}`],
      ] as const)
    : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-[0_8px_30px_rgb(0_0_0/0.08)] sm:p-6">
      <label htmlFor={id} className="text-sm font-medium">
        Shorts link or any video link
      </label>
      <input
        id={id}
        type="text"
        inputMode="url"
        autoComplete="off"
        spellCheck={false}
        value={url}
        placeholder="https://www.youtube.com/shorts/… or watch?v=…"
        onChange={(e) => setUrl(e.target.value)}
        className="mt-2 w-full rounded-full border border-border bg-bg px-5 py-3 text-base outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/12"
      />
      {url.trim() && !videoId && (
        <p role="alert" className="mt-2 text-sm font-medium text-bad">
          {parsed && !parsed.ok ? parsed.message : "Paste a link to a single video or Short."}
        </p>
      )}

      {links && (
        <div className="mt-5 space-y-3" aria-live="polite">
          {links.map(([label, link]) => (
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
