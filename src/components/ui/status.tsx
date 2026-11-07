"use client";

import { useI18n } from "@/components/i18n-provider";
import { fmt } from "@/lib/widget-i18n";

export function ErrorBox({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-xl border border-bad/30 bg-bad-soft px-4 py-3 text-sm">
      {message}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-lg bg-surface-2 ${className}`} />;
}

export function FetchedAt({ iso }: { iso: string }) {
  const { intl, w } = useI18n();
  return (
    <p className="text-xs text-muted">
      {fmt(w.fetchedAt, { date: new Date(iso).toLocaleString(intl, { dateStyle: "medium", timeStyle: "short" }) })}
    </p>
  );
}
