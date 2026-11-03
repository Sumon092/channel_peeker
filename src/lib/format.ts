const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const full = new Intl.NumberFormat("en");

export const formatCompact = (n: number) => compact.format(n);
export const formatNumber = (n: number) => full.format(n);

/** Public subscriber counts are rounded by YouTube above 1,000, so show them as approximate. */
export function formatSubscribers(n: number | null, hidden: boolean) {
  if (hidden || n === null) return "Hidden by creator";
  return n >= 1000 ? `≈ ${formatCompact(n)}` : formatNumber(n);
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" });
}

export function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (x: number) => String(x).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
