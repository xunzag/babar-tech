import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Grain, Ribbon, Rise } from "../parts";
import { C, F, pop, prog } from "../theme";

// Hugs the right edge behind the photos so the headline sits on clean paper
const CTA_RIBBON = "M1250 -80 C980 80 1140 380 990 620 C860 830 1090 960 1260 1000";

const TEAM = [
  ["fahad", "Fahad", "Founder"],
  ["ryan", "Ryan", "Support"],
  ["izma", "Izma", "Sales"],
  ["ria", "Ria", "Assistance"],
  ["hooria", "Hooria", "Success"],
  ["samra", "Samra", "Operations"],
] as const;

export function Cta() {
  const frame = useCurrentFrame();
  const url = pop(frame, 44, 11, 0.7);

  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <Ribbon start={0} dur={40} width={110} opacity={0.35} pulses={false} d={CTA_RIBBON} />

      {/* team */}
      <div style={{ position: "absolute", left: 90, right: 90, top: 250, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {TEAM.map(([img, name, role], i) => {
          const s = pop(frame, i * 3, 12, 0.6);
          return (
            <div key={img} style={{ transform: `translateY(${(1 - s) * 80}px) scale(${0.9 + 0.1 * s})`, opacity: Math.min(1, s * 1.5) }}>
              <div style={{ aspectRatio: "1 / 1", borderRadius: 28, overflow: "hidden", background: C.paper2 }}>
                <Img src={staticFile(`img/team/${img}.webp`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 28, marginTop: 10 }}>{name}</div>
              <div style={{ fontFamily: F.body, fontSize: 22, color: C.mute }}>{role}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", left: 90, right: 90, top: 1010 }}>
        <Rise text="Your next hire|starts *tomorrow.*" start={18} stagger={4} size={118} />
        <div
          style={{
            marginTop: 50,
            display: "inline-flex",
            alignItems: "center",
            gap: 18,
            background: C.orange,
            color: "#fff",
            borderRadius: 999,
            padding: "28px 46px",
            fontFamily: F.body,
            fontWeight: 600,
            fontSize: 42,
            transform: `scale(${url})`,
            transformOrigin: "left center",
            boxShadow: "0 24px 50px -20px rgba(242,112,31,.7)",
          }}
        >
          babartechsolutions.com <span style={{ fontSize: 40 }}>→</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 34, opacity: prog(frame, 56, 16) }}>
          <Img src={staticFile("img/mark.webp")} style={{ width: 54 }} />
          <span style={{ fontFamily: F.body, fontSize: 30, color: C.mute }}>Book a free 30-min call · Top Rated on Upwork</span>
        </div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
}
