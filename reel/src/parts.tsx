import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { C, F, easeOut, prog } from "./theme";

/** Headline that rises word by word from behind a mask. `*word*` = orange accent, `|` = line break. */
export function Rise({
  text,
  start = 0,
  stagger = 3,
  size = 120,
  color = C.ink,
  accent = C.orange,
  weight = 600,
  lineHeight = 0.95,
  style,
}: {
  text: string;
  start?: number;
  stagger?: number;
  size?: number;
  color?: string;
  accent?: string;
  weight?: number;
  lineHeight?: number;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  let i = 0;
  let on = false;
  return (
    <div style={{ fontFamily: F.display, fontWeight: weight, fontSize: size, lineHeight, letterSpacing: "-0.035em", color, ...style }}>
      {text.split("|").map((line, li) => (
        <div key={li}>
          {line.trim().split(/\s+/).map((raw, wi) => {
            if (raw.startsWith("*")) on = true;
            const isAcc = on;
            if (raw.replace(/[^\w*]+$/, "").endsWith("*")) on = false;
            const p = prog(frame, start + i++ * stagger, 22);
            return (
              <span key={wi} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
                <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 110}%)`, color: isAcc ? accent : undefined }}>
                  {raw.replace(/\*/g, "")}
                </span>
                {" "}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Mono uppercase label, like the site's eyebrows. */
export function Eyebrow({ children, color = C.mute, style }: { children: ReactNode; color?: string; style?: CSSProperties }) {
  return (
    <div style={{ fontFamily: F.mono, fontSize: 30, letterSpacing: "0.1em", textTransform: "uppercase", color, display: "flex", alignItems: "center", gap: 18, ...style }}>
      {children}
    </div>
  );
}

export const RIBBON = "M1250 -60 C980 -60 760 120 800 330 C840 540 1080 600 1040 840 C1000 1080 640 1060 470 1240 C330 1390 380 1600 250 1760 C170 1860 40 1900 -80 1980";

/** The logo's blue→orange ribbon, drawing itself across the frame. */
export function Ribbon({ start = 0, dur = 40, width = 150, opacity = 1, pulses = true, d = RIBBON }: { start?: number; dur?: number; width?: number; opacity?: number; pulses?: boolean; d?: string }) {
  const frame = useCurrentFrame();
  const draw = prog(frame, start, dur);
  const sway = Math.sin((frame - start) / 40) * 1.6;
  return (
    <AbsoluteFill style={{ opacity, transform: `rotate(${sway}deg) scale(1.04)`, transformOrigin: "60% 40%" }}>
      <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="rg" x1="1100" y1="0" x2="0" y2="1920" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2350e0" />
            <stop offset=".4" stopColor="#5b4fd6" />
            <stop offset=".62" stopColor="#c0569a" />
            <stop offset=".85" stopColor="#f2701f" />
            <stop offset="1" stopColor="#ffab5c" />
          </linearGradient>
        </defs>
        <path d={d} pathLength={1} fill="none" stroke="#0f1114" strokeOpacity=".08" strokeWidth={width + 14} strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - draw} transform="translate(22 30)" />
        <path d={d} pathLength={1} fill="none" stroke="url(#rg)" strokeWidth={width} strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - draw} />
        <path d={d} pathLength={1} fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth={4} strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - draw} transform="translate(-40 -30)" />
        {pulses &&
          [0, 1, 2].map((k) => {
            const t = ((frame - start - dur + k * 22) % 66) / 66;
            if (frame - start < dur) return null;
            return (
              <path key={k} d={d} pathLength={1} fill="none" stroke="#fff" strokeOpacity={0.55 * Math.sin(Math.PI * t)} strokeWidth={width * 0.22} strokeLinecap="round" strokeDasharray="0.07 0.93" strokeDashoffset={1.07 - t * 1.07} />
            );
          })}
      </svg>
    </AbsoluteFill>
  );
}

/** Film grain so flat colour doesn't band after Instagram's compression. */
export function Grain({ opacity = 0.06 }: { opacity?: number }) {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 8;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity,
        mixBlendMode: "multiply",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' seed='${seed}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/** A quick white flash on a cut (frames relative to the sequence). */
export function Flash({ at, len = 8, color = "#fff" }: { at: number; len?: number; color?: string }) {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 1, at + len], [0, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: color, opacity: o, pointerEvents: "none" }} />;
}

/** Small deterministic camera shake. */
export const shake = (frame: number, amount: number) => ({
  x: (random(`x${frame}`) - 0.5) * amount,
  y: (random(`y${frame}`) - 0.5) * amount,
});

export const fadeOut = (frame: number, at: number, len = 10) => 1 - prog(frame, at, len, easeOut);
