"use client";

import { CircleCheck, CircleX, TriangleAlert, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

const RECOMMENDED = { width: 1280, height: 720 };
const MIN_WIDTH = 640;
const MAX_BYTES = 2 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

interface Checked {
  name: string;
  url: string;
  width: number;
  height: number;
  bytes: number;
  type: string;
}

type Status = "pass" | "warn" | "fail";

const fmtBytes = (b: number) => (b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(2)} MB` : `${Math.round(b / 1024)} KB`);

function checks(c: Checked): { status: Status; text: string }[] {
  const ratio = c.width / c.height;
  const is169 = Math.abs(ratio - 16 / 9) < 0.01;
  return [
    {
      status: c.width === RECOMMENDED.width && c.height === RECOMMENDED.height ? "pass" : c.width >= MIN_WIDTH ? "warn" : "fail",
      text:
        c.width === RECOMMENDED.width && c.height === RECOMMENDED.height
          ? `${c.width}×${c.height} — YouTube's recommended size`
          : c.width >= MIN_WIDTH
            ? `${c.width}×${c.height} — accepted, but ${RECOMMENDED.width}×${RECOMMENDED.height} is recommended`
            : `${c.width}×${c.height} — below YouTube's ${MIN_WIDTH}px minimum width`,
    },
    {
      status: is169 ? "pass" : "warn",
      text: is169 ? "16:9 aspect ratio — fills the player frame" : `Aspect ratio ${ratio.toFixed(2)}:1 — YouTube pads or crops anything that isn't 16:9`,
    },
    {
      status: c.bytes <= MAX_BYTES ? "pass" : "fail",
      text: c.bytes <= MAX_BYTES ? `${fmtBytes(c.bytes)} — under the 2 MB limit` : `${fmtBytes(c.bytes)} — over YouTube's 2 MB limit, it will be rejected`,
    },
    {
      status: TYPES.includes(c.type) ? "pass" : "fail",
      text: TYPES.includes(c.type) ? `${c.type.replace("image/", "").toUpperCase()} format — accepted` : `${c.type || "Unknown"} — YouTube accepts JPG, PNG, GIF and WebP`,
    },
  ];
}

const icon: Record<Status, { Icon: typeof CircleCheck; cls: string }> = {
  pass: { Icon: CircleCheck, cls: "text-good" },
  warn: { Icon: TriangleAlert, cls: "text-warn" },
  fail: { Icon: CircleX, cls: "text-bad" },
};

export function ThumbnailSizeChecker() {
  const id = useId();
  const [checked, setChecked] = useState<Checked | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => {
    if (checked) URL.revokeObjectURL(checked.url);
  }, [checked]);

  function onFile(file: File | undefined) {
    setError(null);
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => setChecked({ name: file.name, url, width: img.naturalWidth, height: img.naturalHeight, bytes: file.size, type: file.type });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError("That file couldn't be read as an image.");
    };
    img.src = url;
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-[0_8px_30px_rgb(0_0_0/0.08)] sm:p-6">
      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-bg px-6 py-10 text-center transition hover:border-accent"
      >
        <Upload className="h-6 w-6 text-muted" aria-hidden="true" />
        <span className="font-medium">Choose your thumbnail image</span>
        <span className="text-sm text-muted">Checked right here in your browser — never uploaded</span>
        <input id={id} type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-bad">
          {error}
        </p>
      )}

      {checked && (
        <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" aria-live="polite">
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface-2">
              <Image src={checked.url} alt="Your thumbnail preview" fill unoptimized className="object-contain" />
            </div>
            <p className="mt-2 truncate text-xs text-muted">{checked.name}</p>
          </div>
          <ul className="space-y-2.5">
            {checks(checked).map((c) => {
              const { Icon, cls } = icon[c.status];
              return (
                <li key={c.text} className="flex items-start gap-2 text-sm">
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${cls}`} aria-hidden="true" />
                  {c.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
