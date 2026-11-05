"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

export function EmbedCodeGenerator() {
  const id = useId();
  const [url, setUrl] = useState("");
  const [start, setStart] = useState("");
  const [privacy, setPrivacy] = useState(true);
  const [responsive, setResponsive] = useState(true);

  const parsed = url.trim() ? parseYouTubeInput(url, "video") : null;
  const videoId = parsed?.ok && parsed.value.kind === "video" ? parsed.value.id : null;

  let code: string | null = null;
  if (videoId) {
    const host = privacy ? "www.youtube-nocookie.com" : "www.youtube.com";
    const startSec = Number.parseInt(start, 10);
    const src = `https://${host}/embed/${videoId}${Number.isFinite(startSec) && startSec > 0 ? `?start=${startSec}` : ""}`;
    const iframe = `<iframe ${responsive ? 'style="position:absolute;top:0;left:0;width:100%;height:100%;border:0"' : 'width="560" height="315" style="border:0"'} src="${src}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    code = responsive ? `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden">\n  ${iframe}\n</div>` : iframe;
  }

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
        className="mt-2 w-full field-pill px-5 py-3"
      />
      {url.trim() && !videoId && (
        <p role="alert" className="mt-2 text-sm font-medium text-bad">
          {parsed && !parsed.ok ? parsed.message : "Paste a link to a single video."}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={responsive} onChange={(e) => setResponsive(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
          Responsive (fills its container, 16:9)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
          Privacy-enhanced (youtube-nocookie.com)
        </label>
        <label className="flex items-center gap-2">
          Start at
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={start}
            placeholder="0"
            onChange={(e) => setStart(e.target.value)}
            className="w-20 field-pill px-3 py-1.5 text-center text-sm"
          />
          seconds
        </label>
      </div>

      {code && (
        <div className="mt-5" aria-live="polite">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Embed code</p>
            <CopyButton text={code} label="Copy code" />
          </div>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-surface-2 p-4 font-mono text-xs leading-relaxed">{code}</pre>
        </div>
      )}
    </div>
  );
}
