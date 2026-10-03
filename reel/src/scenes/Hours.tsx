import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Eyebrow, Grain, Rise } from "../parts";
import { C, F, easeInOut, prog } from "../theme";

const pad = (h: number) => String(((Math.round(h) % 24) + 24) % 24).padStart(2, "0");

function Clock({ label, sub, hour, color }: { label: string; sub: string; hour: number; color: string }) {
  return (
    <div style={{ flex: 1, background: C.card, borderRadius: 36, padding: "36px 40px", border: `1px solid ${C.line}` }}>
      <div style={{ fontFamily: F.mono, fontSize: 24, letterSpacing: ".08em", textTransform: "uppercase", color: C.mute }}>{label}</div>
      <div style={{ fontFamily: F.mono, fontSize: 110, letterSpacing: "-0.04em", color, lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>{pad(hour)}:00</div>
      <div style={{ fontFamily: F.body, fontSize: 28, color: C.mute }}>{sub}</div>
    </div>
  );
}

export function Hours() {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [18, 54], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut });
  const band = prog(frame, 50, 18);
  const exit = prog(frame, 108, 12, easeInOut);
  const W = 900;

  return (
    <AbsoluteFill style={{ background: C.paper2, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 90, right: 90, top: 250, opacity: 1 - exit }}>
        <Eyebrow><span style={{ color: C.orange }}>Time zones</span></Eyebrow>
        <Rise text="We keep|*your* hours." start={4} stagger={4} size={140} style={{ marginTop: 26 }} />
      </div>

      <div style={{ position: "absolute", left: 90, right: 90, top: 760, display: "flex", gap: 24, opacity: prog(frame, 10, 16) * (1 - exit) }}>
        <Clock label="You · New York" sub="start of your day" hour={9} color={C.ink} />
        <Clock label="Team · Pakistan" sub="start of our shift" hour={9 + shift} color={C.orange} />
      </div>

      {/* 24h rails, aligned by real time */}
      <div style={{ position: "absolute", left: 90, top: 1130, width: W, opacity: prog(frame, 16, 16) * (1 - exit) }}>
        {[
          { label: "Your day", off: 0 },
          { label: "Team", off: shift },
        ].map((row, ri) => (
          <div key={row.label} style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 26, marginBottom: 10 }}>{row.label}</div>
            <div style={{ position: "relative", height: 92, background: C.card, borderRadius: 18, overflow: "hidden", border: `1px solid ${C.line}` }}>
              {Array.from({ length: 24 }).map((_, h) => (
                <div key={h} style={{ position: "absolute", left: (h / 24) * W, top: 0, bottom: 0, borderLeft: h ? `1px solid ${C.line}` : undefined }}>
                  {h % 3 === 0 && (
                    <span style={{ position: "absolute", left: 6, top: 6, fontFamily: F.mono, fontSize: 18, color: C.faint }}>{pad(h + row.off)}</span>
                  )}
                </div>
              ))}
              <div
                style={{
                  position: "absolute",
                  left: (9 / 24) * W,
                  width: (8 / 24) * W,
                  bottom: 12,
                  height: 30,
                  borderRadius: 8,
                  background: ri === 0 ? C.ink : C.orange,
                  transform: `scaleX(${ri === 0 ? prog(frame, 20, 16) : band})`,
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>
        ))}
        <div style={{ fontFamily: F.hand, fontWeight: 600, fontSize: 64, color: C.orange, marginTop: 20, clipPath: `inset(0 ${(1 - prog(frame, 64, 20)) * 100}% 0 0)` }}>
          your 9–5, live, every day →
        </div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
}
