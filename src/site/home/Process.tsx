"use client";

import { useRef } from "react";
import { TEAM } from "../content";
import { useGsap } from "../gsap";

const STEPS = [
  { when: "Hour 0", title: "A 30-minute call", body: "Tell us the role, the hours and the tools you use. No job post, no proposals to read." },
  { when: "Same day", title: "Matched", body: "We pick the specialist whose experience fits, and you meet them before anything starts." },
  { when: "Within 24h", title: "Working", body: "Access to your tools, a walkthrough of how you like things done, and real work on day one." },
  { when: "Every week", title: "Reported", body: "A weekly summary of what got done, plus a direct line to Fahad if anything needs adjusting." },
];

const TONES = [
  { bg: "var(--card)", fg: "var(--ink)", sub: "var(--mute)", line: "var(--line)" },
  { bg: "var(--paper-2)", fg: "var(--ink)", sub: "var(--mute)", line: "var(--line)" },
  { bg: "var(--ink)", fg: "var(--cream)", sub: "#a3a39d", line: "rgb(255 255 255 / .1)" },
  { bg: "var(--orange)", fg: "var(--ink)", sub: "rgb(15 17 20 / .7)", line: "rgb(15 17 20 / .15)" },
];

const face = (slug: string) => TEAM.find((m) => m.slug === slug)!;

/* Small illustration for each step */
function Art({ i, sub, line }: { i: number; sub: string; line: string }) {
  if (i === 0)
    return (
      <div className="rounded-2xl p-5" style={{ boxShadow: `inset 0 0 0 1px ${line}` }}>
        <p className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: sub }}>Tuesday</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "15:30"].map((t) => (
            <span key={t} className="rounded-lg py-2 text-center mono text-[12px]" style={t === "10:00" ? { background: "var(--orange)", color: "#fff" } : { boxShadow: `inset 0 0 0 1px ${line}` }}>{t}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/team/fahad-96.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          <p className="text-[14px]">Call with Fahad · <span style={{ color: sub }}>30 min</span></p>
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className="flex items-end gap-3">
        {["ryan", "izma", "ria"].map((s, k) => (
          <div key={s} className={`relative overflow-hidden rounded-2xl ${k === 1 ? "h-44 w-32" : "h-36 w-24 opacity-60 grayscale"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={face(s).photo} alt="" width={128} height={176} className="h-full w-full object-cover" />
            {k === 1 && <span className="absolute inset-x-2 bottom-2 rounded-full py-1 text-center mono text-[10px] uppercase tracking-[0.08em]" style={{ background: "var(--orange)", color: "#fff" }}>Matched</span>}
          </div>
        ))}
      </div>
    );
  if (i === 2)
    return (
      <ul className="space-y-2">
        {["Gorgias", "HubSpot", "Slack", "Google Workspace"].map((t) => (
          <li key={t} className="flex items-center justify-between rounded-xl px-4 py-3 text-[14px]" style={{ background: "rgb(255 255 255 / .06)", boxShadow: `inset 0 0 0 1px ${line}` }}>
            {t}
            <span className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "#3ad08a" }}>✓ access</span>
          </li>
        ))}
      </ul>
    );
  return (
    <div className="rounded-2xl p-5" style={{ background: "rgb(255 255 255 / .35)" }}>
      <p className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: sub }}>Weekly report · example</p>
      <div className="mt-4 flex h-24 items-end gap-2">
        {[38, 52, 46, 64, 58, 30, 22].map((h, k) => (
          <span key={k} className="flex-1 rounded-t-md" style={{ height: `${h + 30}%`, background: "var(--ink)", opacity: k > 4 ? 0.35 : 0.9 }} />
        ))}
      </div>
      <p className="mt-3 text-[14px]"><strong>42 tasks</strong> done · 0 open escalations</p>
    </div>
  );
}

/** "How it works" as stacking cards: each scales back and dims as the next slides over it. */
export default function Process() {
  const root = useRef<HTMLOListElement>(null);

  useGsap(root, ({ gsap, reduced }) => {
    if (reduced) return;
    const q = gsap.utils.selector(root);
    const cards = q("[data-stack]");
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      const st = { trigger: cards[i + 1], start: "top bottom", end: "top top+=160", scrub: true };
      gsap.to(card.querySelector("[data-stack-inner]"), { scale: 0.92 + i * 0.015, ease: "none", scrollTrigger: st });
      gsap.to(card.querySelector("[data-shade]"), { opacity: 0.45, ease: "none", scrollTrigger: st });
    });
  });

  return (
    <ol ref={root} className="relative">
      {STEPS.map((s, i) => {
        const t = TONES[i];
        return (
          <li key={s.when} data-stack className="sticky pb-6" style={{ top: `calc(var(--nav-h) + 24px + ${i * 22}px)` }}>
            <div data-stack-inner className="relative origin-top overflow-hidden rounded-[32px]" style={{ background: t.bg, color: t.fg, boxShadow: "0 -1px 0 rgb(15 17 20 / .04), 0 40px 80px -50px rgb(15 17 20 / .5)" }}>
              <div className="grid min-h-[min(68vh,560px)] gap-8 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
                <div className="flex flex-col lg:col-span-7">
                  <div className="flex items-center gap-4">
                    <span className="mono text-[12px] uppercase tracking-[0.08em]" style={{ color: i === 3 ? "var(--ink)" : "var(--orange)" }}>{s.when}</span>
                    <span className="h-px flex-1" style={{ background: t.line }} />
                  </div>
                  <p className="display mt-6 !text-[clamp(4.5rem,11vw,9rem)] !leading-[0.85] tnum" style={{ opacity: 0.14 }}>0{i + 1}</p>
                  <h3 className="h2 mt-auto pt-6">{s.title}</h3>
                  <p className="mt-4 max-w-md text-[17px] leading-relaxed" style={{ color: t.sub }}>{s.body}</p>
                </div>
                <div className="self-end lg:col-span-5">
                  <Art i={i} sub={t.sub} line={t.line} />
                </div>
              </div>
              <div data-shade className="pointer-events-none absolute inset-0 bg-black opacity-0" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
