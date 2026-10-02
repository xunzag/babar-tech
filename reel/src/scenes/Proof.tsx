import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Eyebrow, Flash, Grain, Rise } from "../parts";
import { BEAT, C, F, easeInOut, pop, prog } from "../theme";

const STATS = [
  { to: 100, fmt: (v: number) => `${Math.round(v)}%`, label: "Job Success Score" },
  { to: 5, fmt: (v: number) => v.toFixed(1), label: "Rating · all 15 reviews 5★" },
  { to: 1500, fmt: (v: number) => `${Math.round(v).toLocaleString("en-US")}+`, label: "Hours on reviewed contracts" },
  { to: 24, fmt: (v: number) => `${Math.round(v)}h`, label: "From first call to first task" },
];

export function Proof() {
  const frame = useCurrentFrame();
  const q = prog(frame, 96, 20);
  const exit = prog(frame, 166, 14, easeInOut);

  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "radial-gradient(60% 40% at 50% 30%, rgba(35,80,224,.22), transparent 70%)" }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: 250, opacity: 1 - exit }}>
        <Eyebrow color="#a3a39d">
          <span style={{ width: 16, height: 16, borderRadius: 99, background: "#3ad08a" }} />
          Verified on Upwork
        </Eyebrow>
      </div>

      <div style={{ position: "absolute", left: 90, right: 90, top: 340, display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 56, columnGap: 40, opacity: 1 - exit }}>
        {STATS.map((s, i) => {
          const at = i * BEAT;
          const p = prog(frame, at, 26);
          const sc = pop(frame, at, 10, 0.6);
          return (
            <div key={s.label} style={{ transform: `translateY(${(1 - sc) * 60}px)`, opacity: Math.min(1, sc * 1.6) }}>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 156, letterSpacing: "-0.04em", lineHeight: 1, color: i === 0 ? C.orange : C.cream, fontVariantNumeric: "tabular-nums" }}>
                {s.fmt(s.to * p)}
              </div>
              <div style={{ fontFamily: F.body, fontSize: 30, color: "#a3a39d", marginTop: 12 }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* real review, verbatim */}
      <div style={{ position: "absolute", left: 90, right: 90, top: 1010, opacity: q * (1 - exit), transform: `translateY(${(1 - q) * 50}px)` }}>
        <div style={{ height: 2, background: "rgba(255,255,255,.1)", marginBottom: 44 }} />
        <div style={{ display: "flex", gap: 8, marginBottom: 26 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="44" height="44" viewBox="0 0 24 24" style={{ transform: `scale(${pop(frame, 100 + i * 3, 9, 0.5)})` }}>
              <path d="M12 2.8 14.8 9l6.7.6-5.1 4.4 1.6 6.6L12 17.1l-6 3.5 1.6-6.6L2.5 9.6 9.2 9z" fill={C.orange} />
            </svg>
          ))}
        </div>
        <Rise text="“His retention rate was|close to *98%.*”" start={104} stagger={3} size={84} color={C.cream} weight={500} lineHeight={1.08} />
        <div style={{ fontFamily: F.mono, fontSize: 24, letterSpacing: ".06em", textTransform: "uppercase", color: "#8f8f88", marginTop: 26, opacity: prog(frame, 124, 14) }}>
          Upwork client · customer service, medical supply
        </div>
      </div>
      <Grain opacity={0.07} />
      <Flash at={0} len={10} />
    </AbsoluteFill>
  );
}
