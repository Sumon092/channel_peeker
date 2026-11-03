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
  return (
    <p className="text-xs text-muted">
      Data from YouTube, fetched {new Date(iso).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" })}
    </p>
  );
}
