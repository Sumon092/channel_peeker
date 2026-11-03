/** Brand mark: a red rounded tile with a "peek" lens. Deliberately not a play button. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill="var(--accent)" />
      <circle cx="11" cy="11" r="5" fill="none" stroke="#fff" strokeWidth="2.4" />
      <path d="M14.6 14.6 18 18" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M8.8 12.4 10.4 10.2 11.9 11.5 13.4 9.4" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="text-[1.2rem] font-bold tracking-[-0.03em]">
        channel<span className="text-accent">peek</span>
      </span>
    </span>
  );
}
