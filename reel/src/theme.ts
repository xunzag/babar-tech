import { loadFont } from "@remotion/fonts";
import { Easing, interpolate, spring, staticFile } from "remotion";

/* Same design tokens as babartechsolutions.com */
export const C = {
  paper: "#f2f0eb",
  paper2: "#e8e5dd",
  card: "#fbfaf7",
  sheet: "#fdfcf8",
  ink: "#0f1114",
  ink2: "#181b20",
  cream: "#ece9e1",
  mute: "#595d65",
  faint: "#8a8d94",
  blue: "#2350e0",
  orange: "#f2701f",
  green: "#24a164",
  line: "rgba(15,17,20,.12)",
};

/* Self-hosted (public/fonts) so rendering never depends on a network fetch. */
const face = (family: string, file: string, weight: string, extra: Record<string, string> = {}) =>
  loadFont({ family, url: staticFile(`fonts/${file}`), weight, format: "woff2", ...extra });
face("Bricolage Grotesque", "BricolageGrotesque.woff2", "200 800");
face("Geist", "Geist.woff2", "100 900");
face("Geist Mono", "GeistMono.woff2", "100 900");
face("Caveat", "Caveat.woff2", "400 700");

export const F = {
  display: "'Bricolage Grotesque', sans-serif",
  body: "Geist, sans-serif",
  mono: "'Geist Mono', monospace",
  hand: "Caveat, cursive",
};

export const FPS = 30;
export const BEAT = 15; // 120 BPM
export const BAR = 60;

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** 0→1 over [start, start+dur] with the site's ease-out curve. */
export const prog = (frame: number, start: number, dur: number, ease = easeOut) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

/** Spring that starts at `delay`. */
export const pop = (frame: number, delay = 0, damping = 14, mass = 0.7) =>
  spring({ frame: frame - delay, fps: FPS, config: { damping, mass, stiffness: 140 } });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
