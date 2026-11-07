/**
 * Brand mark "trend dot": rising bars with an insight dot breaking upward —
 * honest analytics, deliberately not a play button or a magnifier cliché.
 * Geometry: all bars share baseline y=19.1; dot is centered over the ghost bar.
 * `gid` must be unique per instance on a page (SVG gradient ids are
 * document-global; the mark renders in header and footer).
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
      <rect x="1" y="1" width="22" height="22" rx="6.2" fill={`url(#${gid})`} />
      <rect x="1.75" y="1.75" width="20.5" height="20.5" rx="5.6" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="0.9" />
      <rect x="5.1" y="13.4" width="3.3" height="5.7" rx="1.65" fill="#fff" />
      <rect x="10.35" y="9.9" width="3.3" height="9.2" rx="1.65" fill="#fff" />
      <rect x="15.6" y="11.1" width="3.3" height="8" rx="1.65" fill="#fff" opacity="0.5" />
      <circle cx="17.25" cy="6.8" r="2.45" fill="#fff" />
    </svg>
  );
}

export function Logo({ className = "", gid }: { className?: string; gid?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark gid={gid} />
      <span className="text-[1.2rem] font-extrabold tracking-[-0.035em]">
        channel<span className="text-accent">peeker</span>
      </span>
    </span>
  );
}
