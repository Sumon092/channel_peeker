"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

function Thumb({ url, className }: { url: string | null; className: string }) {
  return (
    <span className={`relative shrink-0 overflow-hidden rounded-lg bg-surface-3 ${className}`}>
      {url && <Image src={url} alt="" fill unoptimized className="object-cover" />}
    </span>
  );
}

function Avatar() {
  return <span className="h-8 w-8 shrink-0 rounded-full bg-surface-3" aria-hidden="true" />;
}

export function ThumbnailTester() {
  const id = useId();
  const [url, setUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("My video title that makes people click");
  const [channel, setChannel] = useState("Your channel");

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url);
  }, [url]);

  function onFile(file: File | undefined) {
    if (!file) return;
    setUrl(URL.createObjectURL(file));
  }

  const inputCls =
    "w-full rounded-full border border-border bg-bg px-5 py-3 text-base outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/12";

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-[0_8px_30px_rgb(0_0_0/0.08)] sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <label
          htmlFor={id}
          className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-bg px-4 py-5 text-center transition hover:border-accent"
        >
          <Upload className="h-5 w-5 text-muted" aria-hidden="true" />
          <span className="text-sm font-medium">{url ? "Swap thumbnail" : "Upload thumbnail"}</span>
          <span className="text-xs text-muted">Stays in your browser</span>
          <input id={id} type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
        </label>
        <label className="text-sm font-medium">
          Video title
          <input type="text" value={title} maxLength={100} onChange={(e) => setTitle(e.target.value)} className={`mt-2 font-normal ${inputCls}`} />
        </label>
        <label className="text-sm font-medium">
          Channel name
          <input type="text" value={channel} maxLength={50} onChange={(e) => setChannel(e.target.value)} className={`mt-2 font-normal ${inputCls}`} />
        </label>
      </div>

      {url && (
        <div className="mt-6 grid gap-5 lg:grid-cols-2" aria-live="polite">
          <figure className="rounded-xl border border-border bg-bg p-4">
            <figcaption className="text-xs font-medium text-muted">Home feed (desktop)</figcaption>
            <div className="mt-3 max-w-sm">
              <Thumb url={url} className="block aspect-video w-full" />
              <div className="mt-2.5 flex gap-2.5">
                <Avatar />
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug">{title || "Untitled"}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {channel || "Channel"} · 12K views · 3 hours ago
                  </p>
                </div>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl border border-border bg-bg p-4">
            <figcaption className="text-xs font-medium text-muted">Search result</figcaption>
            <div className="mt-3 flex gap-3">
              <Thumb url={url} className="aspect-video w-40 sm:w-48" />
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold leading-snug">{title || "Untitled"}</p>
                <p className="mt-1 text-xs text-muted">12K views · 3 hours ago</p>
                <p className="mt-1 text-xs text-muted">{channel || "Channel"}</p>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl border border-border bg-bg p-4">
            <figcaption className="text-xs font-medium text-muted">Suggested sidebar</figcaption>
            <div className="mt-3 flex max-w-sm gap-2">
              <Thumb url={url} className="aspect-video w-32" />
              <div className="min-w-0">
                <p className="line-clamp-2 text-xs font-semibold leading-snug">{title || "Untitled"}</p>
                <p className="mt-0.5 text-[11px] text-muted">{channel || "Channel"}</p>
                <p className="text-[11px] text-muted">12K views</p>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl border border-border bg-bg p-4">
            <figcaption className="text-xs font-medium text-muted">Mobile feed</figcaption>
            <div className="mx-auto mt-3 w-full max-w-[280px]">
              <Thumb url={url} className="block aspect-video w-full" />
              <div className="mt-2 flex gap-2">
                <Avatar />
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug">{title || "Untitled"}</p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {channel || "Channel"} · 12K views
                  </p>
                </div>
              </div>
            </div>
          </figure>
        </div>
      )}
    </div>
  );
}
