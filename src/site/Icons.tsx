import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 18): SVGProps<SVGSVGElement> => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
});

export const Arrow = ({ size, ...p }: P) => (<svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ArrowUR = ({ size, ...p }: P) => (<svg {...base(size)} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>);
export const Plus = ({ size, ...p }: P) => (<svg {...base(size)} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const Close = ({ size, ...p }: P) => (<svg {...base(size)} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const Check = ({ size, ...p }: P) => (<svg {...base(size)} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const Calendar = ({ size, ...p }: P) => (<svg {...base(size)} {...p}><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>);
export const Mail = ({ size, ...p }: P) => (<svg {...base(size)} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>);
export const Clock = ({ size, ...p }: P) => (<svg {...base(size)} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>);
export const Star = ({ size = 14, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.8 14.8 9l6.7.6-5.1 4.4 1.6 6.6L12 17.1l-6 3.5 1.6-6.6L2.5 9.6 9.2 9z" />
  </svg>
);
export const LinkedIn = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6v5.4h-4v-4.8c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v4.9h-4z" />
  </svg>
);
export const Instagram = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" /></svg>
);
export const Facebook = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />
  </svg>
);
export const Upwork = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.5 13.9c-1 0-1.9-.4-2.8-1.1l.2-1c.2-1.1.8-2.9 2.6-2.9a2.5 2.5 0 0 1 0 5zm0-7.4c-2.3 0-4.1 1.5-4.8 4-1.1-1.7-2-3.7-2.4-5.4H7.7v6.6a2.3 2.3 0 1 1-4.7 0V5.1H.4v6.6a5 5 0 0 0 10 0v-1.1c.5 1 1.1 2.1 1.8 3l-1.5 7.2h2.6l1.1-5.2c1 .6 2 1 3.1 1a5.1 5.1 0 0 0 0-10.2z" />
  </svg>
);
