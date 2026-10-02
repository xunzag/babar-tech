import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Eyebrow, Grain } from "../parts";
import { BAR, C, F, easeInOut, pop, prog } from "../theme";

const DARK = "#181b20";
const LINE = "rgba(255,255,255,.09)";

/* ── mini scenes (f = frame within the slide, 0..60) ── */
function Chat({ f }: { f: number }) {
  const b = (at: number) => ({ opacity: prog(f, at, 8), transform: `translateY(${(1 - prog(f, at, 10)) * 24}px)` });
  const st = pop(f, 30, 9, 0.5);
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14, fontFamily: F.body, fontSize: 30 }}>
      <div style={{ ...b(4), alignSelf: "flex-start", background: "#2a2e36", color: C.cream, padding: "16px 24px", borderRadius: "26px 26px 26px 8px", maxWidth: "78%" }}>My order arrived damaged.</div>
      <div style={{ ...b(14), alignSelf: "flex-end", background: C.cream, color: C.ink, padding: "16px 24px", borderRadius: "26px 26px 8px 26px", maxWidth: "82%" }}>Replacement ships today, shipping refunded.</div>
      <div style={{ position: "absolute", right: 0, bottom: -64, transform: `scale(${st}) rotate(-8deg)`, border: "4px solid #3ad08a", color: "#3ad08a", borderRadius: 12, padding: "6px 16px", fontFamily: F.mono, fontSize: 26, letterSpacing: ".08em" }}>
        RESOLVED · 4 MIN
      </div>
    </div>
  );
}

function Inbox({ f }: { f: number }) {
  const n = Math.round(interpolate(f, [8, 40], [34, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
      <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 150, lineHeight: 1, color: n === 0 ? "#3ad08a" : C.cream, fontVariantNumeric: "tabular-nums", width: 230 }}>{n}</div>
      <div style={{ fontFamily: F.body, fontSize: 32, color: "#a3a39d", lineHeight: 1.3 }}>
        unread emails
        <div style={{ fontFamily: F.hand, fontSize: 48, color: C.orange, opacity: prog(f, 40, 8) }}>inbox zero ✓</div>
      </div>
    </div>
  );
}

function Funnel({ f }: { f: number }) {
  const rows = [
    ["Dialed", 120, 1],
    ["Spoke", 34, 0.62],
    ["Qualified", 11, 0.36],
    ["Booked", 6, 0.2],
  ] as const;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {rows.map(([t, n, w], i) => (
        <div key={t} style={{ display: "grid", gridTemplateColumns: "150px 1fr 60px", alignItems: "center", gap: 16, fontFamily: F.body, fontSize: 26, color: "#a3a39d" }}>
          {t}
          <div style={{ height: 30, borderRadius: 8, background: "#2a2e36" }}>
            <div style={{ height: "100%", borderRadius: 8, width: `${w * 100 * prog(f, 6 + i * 6, 18)}%`, background: i === 3 ? C.orange : C.cream }} />
          </div>
          <span style={{ fontFamily: F.mono, color: C.cream, textAlign: "right" }}>{n}</span>
        </div>
      ))}
    </div>
  );
}

function Churn({ f }: { f: number }) {
  const d = prog(f, 4, 34);
  return (
    <div style={{ position: "relative" }}>
      <svg viewBox="0 0 600 170" width="100%" height="170">
        {[40, 90, 140].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke={LINE} strokeWidth="2" />)}
        <path d="M0 30 C 90 34, 130 50, 190 74 S 300 130, 380 140 S 520 150, 600 152" fill="none" stroke={C.orange} strokeWidth="7" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - d} />
      </svg>
      <div style={{ position: "absolute", right: 0, top: 0, fontFamily: F.hand, fontWeight: 600, fontSize: 46, color: C.orange, opacity: prog(f, 34, 8) }}>churn ↓</div>
    </div>
  );
}

function Kanban({ f }: { f: number }) {
  const col = interpolate(f, [8, 22, 34, 48], [0, 1, 1, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut });
  return (
    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, height: 190 }}>
      {["To do", "Doing", "Done"].map((c) => (
        <div key={c} style={{ background: "#22262d", borderRadius: 18, padding: 16, fontFamily: F.mono, fontSize: 22, color: "#8f8f88", textTransform: "uppercase", letterSpacing: ".08em" }}>{c}</div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 62,
          left: `calc(${col} * (100% + 16px) / 3 + 12px)`,
          width: "calc((100% - 32px) / 3 - 24px)",
          background: col > 1.95 ? "#3ad08a" : C.cream,
          color: C.ink,
          borderRadius: 14,
          padding: "14px 16px",
          fontFamily: F.body,
          fontSize: 26,
          fontWeight: 500,
          boxShadow: "0 16px 30px -12px rgba(0,0,0,.5)",
        }}
      >
        Launch checklist
      </div>
    </div>
  );
}

function Code({ f }: { f: number }) {
  const lines = ["export async function checkout(cart) {", "  const tax = round(cart.total * rate, 2)", "  await stripe.charge({ ...cart, tax })", "}"];
  const live = f > 42;
  return (
    <div style={{ background: "#0d0f12", borderRadius: 20, padding: "22px 26px", fontFamily: F.mono, fontSize: 25, color: "#d6deeb" }}>
      {lines.map((l, i) => {
        const p = prog(f, 4 + i * 8, 10);
        return (
          <div key={i} style={{ whiteSpace: "pre", clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`, lineHeight: 1.6 }}>
            <span style={{ color: "#3b4252", marginRight: 18 }}>{i + 1}</span>
            <span style={{ color: i === 0 ? "#c792ea" : undefined }}>{l}</span>
          </div>
        );
      })}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 9, background: "rgba(255,255,255,.08)" }}>
          <div style={{ height: "100%", borderRadius: 9, width: `${prog(f, 30, 14) * 100}%`, background: "#6fd6a4" }} />
        </div>
        <span style={{ padding: "6px 16px", borderRadius: 99, fontSize: 20, background: live ? "#24a164" : "#2a2e36", color: live ? "#fff" : "#6b6c66" }}>LIVE</span>
      </div>
    </div>
  );
}

/* ── layout ── */
const SLIDES: { num: string; name: string; line: string; scene: (f: number) => ReactNode }[][] = [
  [
    { num: "01", name: "Customer Support", line: "Every ticket answered like it's the only one.", scene: (f) => <Chat f={f} /> },
    { num: "02", name: "Virtual Assistance", line: "The work you keep pushing to tomorrow, done today.", scene: (f) => <Inbox f={f} /> },
  ],
  [
    { num: "03", name: "Sales & Lead Gen", line: "A pipeline that fills itself while you close.", scene: (f) => <Funnel f={f} /> },
    { num: "04", name: "Customer Success", line: "Keep the customers you worked hard to win.", scene: (f) => <Churn f={f} /> },
  ],
  [
    { num: "05", name: "Operations", line: "Someone who owns the timeline, so you don't.", scene: (f) => <Kanban f={f} /> },
    { num: "06", name: "Web & Software", line: "Websites, apps and automations that just work.", scene: (f) => <Code f={f} /> },
  ],
];

function Panel({ s, f, delay }: { s: (typeof SLIDES)[0][0]; f: number; delay: number }) {
  const e = prog(f, delay, 18);
  return (
    <div
      style={{
        background: DARK,
        border: `1px solid ${LINE}`,
        borderRadius: 44,
        padding: "44px 50px 56px",
        transform: `translateY(${(1 - e) * 80}px)`,
        opacity: e,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
        <span style={{ fontFamily: F.mono, fontSize: 30, color: C.orange }}>{s.num}</span>
        <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 72, letterSpacing: "-0.03em", color: C.cream }}>{s.name}</span>
      </div>
      <div style={{ fontFamily: F.body, fontSize: 32, color: "#a3a39d", marginTop: 8, marginBottom: 34 }}>{s.line}</div>
      {s.scene(Math.max(0, f - delay))}
    </div>
  );
}

export function Services() {
  const frame = useCurrentFrame();
  const idx = Math.min(2, Math.floor(frame / BAR));
  const f = frame - idx * BAR;
  const exit = prog(frame, 168, 12, easeInOut);

  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 90, right: 90, top: 240, opacity: 1 - exit }}>
        <Eyebrow color="#a3a39d">
          <span style={{ color: C.orange }}>What we do</span>
          <span style={{ flex: 1, height: 2, background: LINE }} />
          <span>{SLIDES[idx][0].num}–{SLIDES[idx][1].num} / 06</span>
        </Eyebrow>
      </div>
      <div style={{ position: "absolute", left: 70, right: 70, top: 330, display: "flex", flexDirection: "column", gap: 34, opacity: 1 - exit, transform: `translateY(${exit * -60}px)` }}>
        <Panel key={`${idx}a`} s={SLIDES[idx][0]} f={f} delay={0} />
        <Panel key={`${idx}b`} s={SLIDES[idx][1]} f={f} delay={6} />
      </div>
      {/* progress ticks */}
      <div style={{ position: "absolute", left: 90, right: 90, top: 300, display: "flex", gap: 10, opacity: 1 - exit }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: "rgba(255,255,255,.12)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${i < idx ? 100 : i === idx ? prog(f, 0, BAR, (t) => t) * 100 : 0}%`, background: C.orange }} />
          </div>
        ))}
      </div>
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
}
