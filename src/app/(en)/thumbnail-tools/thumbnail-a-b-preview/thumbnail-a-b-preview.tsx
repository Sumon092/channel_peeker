"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

const SIZES = [
  { label: "Feed size", className: "w-full max-w-sm" },
  { label: "Search size", className: "w-48" },
  { label: "Sidebar size", className: "w-32" },
] as const;

function Slot({ label, url, onFile }: { label: string; url: string | null; onFile: (f: File | undefined) => void }) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-bg px-4 py-6 text-center transition hover:border-accent has-[:focus-visible]:border-accent has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20"
    >
      <Upload className="h-5 w-5 text-muted" aria-hidden="true" />
      <span className="text-sm font-medium">{url ? `Swap version ${label}` : `Upload version ${label}`}</span>
      <span className="text-xs text-muted">Stays in your browser</span>
      <input id={id} type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
    </label>
  );
}

export function ThumbnailAbPreview() {
  const [a, setA] = useState<string | null>(null);
  const [b, setB] = useState<string | null>(null);

  useEffect(() => () => {
    if (a) URL.revokeObjectURL(a);
  }, [a]);
  useEffect(() => () => {
    if (b) URL.revokeObjectURL(b);
  }, [b]);

  const make = (set: (u: string) => void) => (file: File | undefined) => {
    if (file) set(URL.createObjectURL(file));
  };

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Slot label="A" url={a} onFile={make(setA)} />
        <Slot label="B" url={b} onFile={make(setB)} />
      </div>

      {a && b && (
        <div className="mt-6 space-y-6" aria-live="polite">
          {SIZES.map((size) => (
            <figure key={size.label} className="rounded-xl border border-border bg-bg p-4">
              <figcaption className="text-xs font-medium text-muted">{size.label}</figcaption>
              <div className="mt-3 flex flex-wrap items-start gap-4">
                {[
                  ["A", a],
                  ["B", b],
                ].map(([label, url]) => (
                  <div key={label} className={size.className}>
                    <span className="relative block aspect-video w-full overflow-hidden rounded-lg bg-surface-3">
                      <Image src={url as string} alt={`Version ${label}`} fill unoptimized className="object-cover" />
                      <span className="absolute left-1 top-1 rounded-sm bg-black/80 px-1.5 text-[10px] font-bold text-white">{label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </figure>
          ))}
          <p className="text-xs text-muted">
            Squint test: at sidebar size, which version still tells the story? That&apos;s usually your winner.
          </p>
        </div>
      )}
    </div>
  );
}
