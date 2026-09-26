import type { CSSProperties } from "react";

/* The logo's blue→orange ribbon, drawn across the hero. Pure SVG + CSS. */
const D = "M1600 40 C1300 10 1080 120 1130 290 C1175 440 1420 450 1370 640 C1320 830 960 790 820 930 C730 1020 760 1120 700 1220";

export default function Ribbon({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`} data-parallax="-0.12">
      <svg viewBox="0 0 1440 1100" preserveAspectRatio="xMaxYMin slice" className="h-full w-full" data-anim>
        <defs>
          <linearGradient id="rib-g" x1="1500" y1="0" x2="700" y2="1200" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2350e0" />
            <stop offset=".42" stopColor="#5b4fd6" />
            <stop offset=".62" stopColor="#c0569a" />
            <stop offset=".85" stopColor="#f2701f" />
            <stop offset="1" stopColor="#ffab5c" />
          </linearGradient>
          <linearGradient id="rib-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".9" />
            <stop offset="1" stopColor="#fff" stopOpacity=".2" />
          </linearGradient>
        </defs>
        <g className="ribbon-sway">
          {/* soft shadow */}
          <path d={D} pathLength={1} fill="none" stroke="#0f1114" strokeOpacity=".07" strokeWidth="96" strokeLinecap="round" className="ribbon-draw" transform="translate(18 26)" />
          {/* body */}
          <path d={D} pathLength={1} fill="none" stroke="url(#rib-g)" strokeWidth="84" strokeLinecap="round" className="ribbon-draw" />
          {/* glossy edge */}
          <path d={D} pathLength={1} fill="none" stroke="url(#rib-edge)" strokeWidth="3" strokeLinecap="round" className="ribbon-draw" transform="translate(-26 -22)" opacity=".7" />
          {/* light pulses travelling along the ribbon */}
          {[0, 1, 2].map((k) => (
            <path
              key={k}
              d={D}
              pathLength={1}
              fill="none"
              stroke="#fff"
              strokeOpacity=".55"
              strokeWidth="18"
              strokeLinecap="round"
              className="ribbon-pulse"
              style={{ ["--k" as string]: k } as CSSProperties}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
