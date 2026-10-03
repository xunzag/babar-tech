import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Eyebrow, Flash, Grain, Ribbon, Rise } from "../parts";
import { C, F, easeInOut, pop, prog } from "../theme";

// Sweeps in behind the logo and leaves on the right, keeping the wordmark on clean paper
const BRAND_RIBBON = "M1250 -80 C930 -40 690 180 760 420 C830 660 1120 640 1130 860 C1140 1040 980 1080 1220 1260";

export function Brand() {
  const frame = useCurrentFrame();
  const m = pop(frame, 4, 11, 0.9);
  const exit = prog(frame, 104, 16, easeInOut);
  const float = Math.sin(frame / 14) * 10;

  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <Ribbon start={0} dur={34} width={170} opacity={0.95} d={BRAND_RIBBON} />

      <AbsoluteFill style={{ transform: `translateY(${-exit * 220}px)`, opacity: 1 - exit }}>
        {/* 3D mark */}
        <Img
          src={staticFile("img/mark-3d.webp")}
          style={{
            position: "absolute",
            left: 540 - 260,
            top: 360 + float,
            width: 520,
            transform: `scale(${0.3 + 0.7 * m}) rotate(${(1 - m) * -40}deg)`,
            opacity: Math.min(1, m * 1.5),
            filter: "drop-shadow(0 40px 60px rgba(15,17,20,.25))",
          }}
        />

        {/* Wordmark */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Rise text="Babar Tech" start={14} stagger={5} size={168} style={{ textAlign: "center" }} />
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 40,
              letterSpacing: interpolate(prog(frame, 22, 30), [0, 1], [0.1, 0.62]) + "em",
              color: C.mute,
              marginTop: 18,
              opacity: prog(frame, 22, 20),
              textTransform: "uppercase",
              paddingLeft: "0.6em",
            }}
          >
            Solutions
          </div>
          <div
            style={{
              marginTop: 70,
              opacity: prog(frame, 40, 20),
              transform: `translateY(${(1 - prog(frame, 40, 20)) * 30}px)`,
              background: C.ink,
              color: C.cream,
              borderRadius: 999,
              padding: "22px 40px",
            }}
          >
            <Eyebrow color={C.cream} style={{ fontSize: 28 }}>
              <span style={{ width: 16, height: 16, borderRadius: 99, background: "#3ad08a", display: "inline-block" }} />
              Top Rated on Upwork · 100% Job Success
            </Eyebrow>
          </div>
        </div>
      </AbsoluteFill>

      <Grain />
      <Flash at={0} len={12} />
    </AbsoluteFill>
  );
}
