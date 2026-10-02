import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Grain, Rise } from "../parts";
import { BEAT, C, F, easeInOut, pop, prog } from "../theme";

const TASKS = [
  { text: "Answer the refund emails", note: "refunded, customer stayed", who: "Ryan", photo: "ryan" },
  { text: "Clear my inbox (34 unread)", note: "inbox zero", who: "Ria", photo: "ria" },
  { text: "Call the Texas roofing leads", note: "3 inspections booked", who: "Izma", photo: "izma" },
  { text: "Fix the checkout bug", note: "shipped", who: "Fahad", photo: "fahad" },
  { text: "Onboard two new accounts", note: "both live", who: "Hooria", photo: "hooria" },
];

const FIRST_TICK = 36;

export function Todo() {
  const frame = useCurrentFrame();
  const enter = prog(frame, 0, 26);
  const exit = prog(frame, 160, 20, easeInOut);
  const done = TASKS.filter((_, i) => frame >= FIRST_TICK + i * BEAT).length;

  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 90, right: 90, top: 230 }}>
        <Rise text="We empty your|*to-do list.*" start={2} stagger={4} size={118} />
      </div>

      {/* paper stack */}
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 600,
          transform: `translateY(${(1 - enter) * 700 + exit * -60}px) rotate(${-1.2 + (1 - enter) * 6}deg) scale(${1 - exit * 0.06})`,
          opacity: 1 - exit,
        }}
      >
        <div style={{ position: "absolute", inset: "30px 20px -18px", background: "#f6f3ec", borderRadius: 10, transform: "rotate(3deg)", boxShadow: "0 30px 60px -30px rgba(15,17,20,.35)" }} />
        <div style={{ position: "absolute", inset: "18px 8px -8px", background: "#f6f3ec", borderRadius: 10, transform: "rotate(-2deg)", boxShadow: "0 30px 60px -30px rgba(15,17,20,.35)" }} />
        <div
          style={{
            position: "relative",
            background: C.sheet,
            borderRadius: 10,
            padding: "70px 56px 44px 70px",
            boxShadow: "0 2px 2px rgba(15,17,20,.05), 0 30px 50px -24px rgba(15,17,20,.3), 0 80px 120px -60px rgba(15,17,20,.4)",
          }}
        >
          {/* tape + margin line */}
          <div style={{ position: "absolute", top: -22, left: "50%", width: 220, height: 56, marginLeft: -110, background: "rgba(236,231,218,.85)", transform: "rotate(-3deg)", boxShadow: "0 2px 4px rgba(15,17,20,.12)" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 36, width: 2, background: "rgba(242,112,31,.35)" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "4px solid rgba(15,17,20,.85)", paddingBottom: 18 }}>
            <div style={{ fontFamily: F.hand, fontWeight: 600, fontSize: 92, lineHeight: 1 }}>To do</div>
            <div style={{ fontFamily: F.hand, fontWeight: 600, fontSize: 46, color: C.orange }}>{126 + done} done today</div>
          </div>

          {TASKS.map((t, i) => {
            const at = FIRST_TICK + i * BEAT;
            const tick = prog(frame, at, 6);
            const strike = prog(frame, at + 3, 9);
            const note = prog(frame, at + 6, 12);
            const face = pop(frame, at + 2, 9, 0.5);
            const isDone = frame >= at;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 30, height: 130, borderBottom: "2px solid rgba(35,80,224,.14)" }}>
                <svg width="56" height="56" viewBox="0 0 24 24" style={{ flex: "none" }}>
                  <path d="M3.5 4.2c5.4-.6 11.2-.5 16.6-.2.5 5.2.6 10.6.2 15.9-5.5.4-11 .5-16.5.1-.4-5.3-.6-10.6-.3-15.8Z" fill="none" stroke={C.ink} strokeWidth="1.4" />
                  <path d="M5 12.5 9.8 17 19.5 6.5" fill="none" stroke={C.orange} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - tick} />
                </svg>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ position: "relative", display: "inline-block", fontFamily: F.body, fontSize: 42, color: isDone ? C.faint : C.ink }}>
                    {t.text}
                    <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={{ position: "absolute", left: "-2%", width: "104%", top: "50%", height: 20, marginTop: -10 }}>
                      <path d="M1 6.2C18 4.4 34 6.8 52 5.1S84 4.2 99 5.6" fill="none" stroke={C.ink} strokeWidth="1.2" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - strike} />
                    </svg>
                  </div>
                  <div style={{ fontFamily: F.hand, fontWeight: 600, fontSize: 46, color: C.orange, height: 54, clipPath: `inset(0 ${(1 - note) * 100}% 0 0)` }}>
                    {t.note} — {t.who}
                  </div>
                </div>
                <div style={{ width: 96, height: 96, borderRadius: 99, overflow: "hidden", flex: "none", transform: `scale(${face}) rotate(${(1 - face) * -20}deg)`, boxShadow: "0 0 0 5px #fdfcf8, 0 0 0 7px rgba(15,17,20,.12)" }}>
                  <Img src={staticFile(`img/team/${t.photo}.webp`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
}
