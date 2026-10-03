import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Flash, Grain, Rise, shake } from "../parts";
import { C, F, easeInOut, pop, prog } from "../theme";

const NOTES = [
  { app: "Mail", title: "34 unread emails", sub: "3 marked urgent", color: "#2350e0" },
  { app: "Phone", title: "Missed call", sub: "Lead · Austin, TX", color: "#24a164" },
  { app: "Helpdesk", title: "Ticket #4821", sub: "“Where is my refund?”", color: "#f2701f" },
  { app: "Calendar", title: "3 meetings overlap", sub: "Today, 2:00 pm", color: "#c0569a" },
  { app: "Slack", title: "12 new mentions", sub: "#ops · #sales", color: "#5b4fd6" },
  { app: "Invoices", title: "Supplier invoice overdue", sub: "Due 4 days ago", color: "#d94a3a" },
  { app: "GitHub", title: "Checkout bug reported", sub: "Priority: high", color: "#0f1114" },
  { app: "CRM", title: "48 leads not contacted", sub: "Pipeline · this week", color: "#2350e0" },
  { app: "Mail", title: "“Any update on this?”", sub: "Client · 2nd follow-up", color: "#2350e0" },
];

export function Hook() {
  const frame = useCurrentFrame();
  // Notifications arrive faster and faster (accelerando into the drop)
  const times = NOTES.map((_, i) => Math.round(4 + 52 * Math.pow(i / NOTES.length, 0.8)));
  const chaos = interpolate(frame, [0, 112], [0, 1], { extrapolateRight: "clamp" });
  const sk = shake(frame, chaos * chaos * 14);
  const collapse = prog(frame, 104, 14, easeInOut);

  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      {/* soft vignette glow */}
      <AbsoluteFill style={{ background: "radial-gradient(70% 50% at 50% 38%, rgba(242,112,31,.16), transparent 70%)" }} />

      {/* Notification pile */}
      <AbsoluteFill style={{ transform: `translate(${sk.x}px, ${sk.y}px) scale(${1 - collapse * 0.25})`, opacity: 1 - collapse, filter: `blur(${collapse * 18}px)` }}>
        {NOTES.map((n, i) => {
          const s = pop(frame, times[i], 12, 0.6);
          if (frame < times[i]) return null;
          const rot = ((i * 37) % 11) - 5;
          const x = ((i * 53) % 120) - 60;
          const y = 290 + i * 124;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 90 + x,
                top: y,
                width: 900,
                transform: `translateY(${(1 - s) * -120}px) rotate(${rot * s}deg) scale(${0.85 + 0.15 * s})`,
                opacity: Math.min(1, s * 1.4),
                background: "rgba(36,39,46,.92)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 34,
                padding: "26px 32px",
                display: "flex",
                gap: 26,
                alignItems: "center",
                boxShadow: "0 30px 60px -20px rgba(0,0,0,.6)",
              }}
            >
              <div style={{ width: 74, height: 74, borderRadius: 20, background: n.color, flex: "none", display: "grid", placeItems: "center", color: "#fff", fontFamily: F.display, fontWeight: 700, fontSize: 34 }}>
                {n.app[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.body, fontSize: 24, color: "#8f8f88" }}>
                  <span style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>{n.app}</span>
                  <span>now</span>
                </div>
                <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 38, color: C.cream, marginTop: 4 }}>{n.title}</div>
                <div style={{ fontFamily: F.body, fontSize: 30, color: "#a3a39d" }}>{n.sub}</div>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* The question, landing on beat 3 of bar 1 */}
      <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 90px 420px", opacity: 1 - collapse }}>
        <div style={{ background: "linear-gradient(transparent, rgba(15,17,20,.95) 30%)", margin: "0 -90px", padding: "120px 90px 0" }}>
          <Rise text="Still doing it|all *yourself?*" start={62} stagger={4} size={128} color={C.cream} />
        </div>
      </AbsoluteFill>

      <Grain opacity={0.08} />
      <Flash at={116} len={10} />
    </AbsoluteFill>
  );
}
