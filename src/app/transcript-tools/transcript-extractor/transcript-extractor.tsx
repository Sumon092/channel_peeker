"use client";

import { useId, useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";

interface Cue {
  seconds: number;
  text: string;
}

const TIME_LINE = /^(\d{1,2}:)?\d{1,2}:\d{2}$/;

function toSeconds(stamp: string): number {
  const parts = stamp.split(":").map(Number);
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

/** Parses text copied from YouTube's transcript panel: "0:00" lines (or "0:00 text") followed by caption text. */
function parseTranscript(raw: string): Cue[] {
  const cues: Cue[] = [];
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t) continue;
    if (TIME_LINE.test(t)) {
      cues.push({ seconds: toSeconds(t), text: "" });
      continue;
    }
    const inline = t.match(/^((?:\d{1,2}:)?\d{1,2}:\d{2})\s+(.+)$/);
    if (inline) {
      cues.push({ seconds: toSeconds(inline[1]), text: inline[2] });
      continue;
    }
    if (cues.length > 0) {
      cues[cues.length - 1].text = cues[cues.length - 1].text ? `${cues[cues.length - 1].text} ${t}` : t;
    } else {
      cues.push({ seconds: 0, text: t });
    }
  }
  return cues.filter((c) => c.text);
}

const pad = (n: number, l = 2) => String(n).padStart(l, "0");

function stamp(seconds: number, ms: string, sep: string) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${pad(h)}:${pad(m)}:${pad(s)}${sep}${ms}`;
}

function buildOutputs(cues: Cue[]) {
  const text = cues.map((c) => c.text).join(" ").replace(/\s+/g, " ").trim();
  const srt = cues
    .map((c, i) => {
      const end = i + 1 < cues.length ? cues[i + 1].seconds : c.seconds + 3;
      return `${i + 1}\n${stamp(c.seconds, "000", ",")} --> ${stamp(end, "000", ",")}\n${c.text}\n`;
    })
    .join("\n");
  const vtt = `WEBVTT\n\n${cues
    .map((c, i) => {
      const end = i + 1 < cues.length ? cues[i + 1].seconds : c.seconds + 3;
      return `${stamp(c.seconds, "000", ".")} --> ${stamp(end, "000", ".")}\n${c.text}\n`;
    })
    .join("\n")}`;
  return { text, srt, vtt };
}

function download(filename: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const FORMATS = ["text", "srt", "vtt"] as const;
type Format = (typeof FORMATS)[number];

export function TranscriptExtractor() {
  const id = useId();
  const [raw, setRaw] = useState("");
  const [format, setFormat] = useState<Format>("text");

  const cues = useMemo(() => (raw.trim() ? parseTranscript(raw) : []), [raw]);
  const outputs = useMemo(() => (cues.length ? buildOutputs(cues) : null), [cues]);
  const current = outputs ? outputs[format] : "";

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <label htmlFor={id} className="text-sm font-medium">
        Paste the transcript (on YouTube: description → “Show transcript” → select all → copy)
      </label>
      <textarea
        id={id}
        rows={7}
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder={"0:00\nhey everyone welcome back\n0:04\ntoday we're looking at…"}
        className="mt-2.5 w-full field-area px-4 py-3 font-mono text-sm"
      />
      <p className="mt-2 text-xs text-muted">Everything runs in your browser — the transcript is never uploaded.</p>

      {outputs && (
        <div className="mt-5" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2" role="group" aria-label="Output format">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  aria-pressed={format === f}
                  className={`rounded-full px-4 py-2 text-sm font-medium uppercase transition ${format === f ? "bg-accent text-white" : "bg-surface-2 hover:bg-surface-3"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <CopyButton text={current} label="Copy" />
              <button
                type="button"
                onClick={() => download(`transcript.${format === "text" ? "txt" : format}`, current)}
                className="rounded-full bg-surface-2 px-4 py-2 text-sm font-medium transition hover:bg-surface-3"
              >
                Download
              </button>
            </div>
          </div>
          <pre className="mt-3 max-h-80 overflow-y-auto whitespace-pre-wrap rounded-xl bg-surface-2 p-4 text-sm leading-relaxed">{current}</pre>
          <p className="mt-2 text-xs text-muted">
            {cues.length} caption lines parsed. SRT/VTT end times are inferred from the next line&apos;s start.
          </p>
        </div>
      )}
    </div>
  );
}
