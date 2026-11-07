/**
 * Brand mark: a red gradient tile with a "peek" lens over a rising data line.
 * Deliberately not a play button. `gid` must be unique per instance on a page
 * (SVG gradient ids are document-global; the mark renders in header and footer).
 */
export function LogoMark({ size = 28, gid = "cp-g" }: { size?: number; gid?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff3357" />
          <stop offset="1" stopColor="#d4002b" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill={`url(#${gid})`} />
      <rect x="1.75" y="1.75" width="20.5" height="20.5" rx="5.9" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.9" />
      <circle cx="10.7" cy="10.7" r="5" fill="none" stroke="#fff" strokeWidth="2.2" />
      <path d="M14.4 14.4 17.9 17.9" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M8.3 12.7 9.9 10.5 11.2 11.6 13 9.3" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13" cy="9.3" r="0.95" fill="#fff" />
    </svg>
  );
}

export function Logo({ className = "", gid }: { className?: string; gid?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark gid={gid} />
      <span className="text-[1.2rem] font-extrabold tracking-[-0.035em]">
        channel<span className="text-accent">peek</span>
      </span>
    </span>
  );
}
