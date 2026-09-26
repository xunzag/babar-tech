"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { when: "Hour 0", title: "A 30-minute call", body: "Tell us the role, the hours and the tools you use. No job post, no proposals to read." },
  { when: "Same day", title: "Matched", body: "We pick the specialist whose experience fits, and you meet them before anything starts." },
  { when: "Within 24h", title: "Working", body: "Access to your tools, a walkthrough of how you like things done, and real work on day one." },
  { when: "Every week", title: "Reported", body: "A weekly summary of what got done, plus a direct line to Fahad if anything needs adjusting." },
];

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the list's top hits 85% of the viewport, 1 when its bottom reaches 55%
        const v = (vh * 0.85 - r.top) / (r.height + vh * 0.3);
        setP(Math.max(0, Math.min(1, v)));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <ol ref={ref} className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
      {/* track */}
      <div aria-hidden className="absolute left-[11px] top-3 bottom-3 w-px lg:left-0 lg:right-0 lg:top-[11px] lg:bottom-auto lg:h-px lg:w-auto" style={{ background: "var(--line-strong)" }}>
        <div className="proc-line absolute inset-0" style={{ background: "var(--orange)", ["--p" as string]: p }} />
      </div>
      {STEPS.map((s, i) => {
        const on = p >= (i + 0.35) / STEPS.length || (i === 0 && p > 0.02);
        return (
          <li key={s.when} className="relative pl-12 lg:pl-0 lg:pt-14" data-reveal style={{ ["--d" as string]: i * 120 }}>
            <span
              className="absolute left-0 top-0 grid h-6 w-6 place-items-center rounded-full transition-all duration-500"
              style={{ background: on ? "var(--orange)" : "var(--paper)", boxShadow: on ? "0 0 0 6px rgb(242 112 31 / .15)" : "inset 0 0 0 1px var(--line-strong)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full transition-colors duration-500" style={{ background: on ? "#fff" : "var(--faint)" }} />
            </span>
            <p className="mono text-[12px] uppercase tracking-[0.08em] transition-colors duration-500" style={{ color: on ? "var(--orange)" : "var(--faint)" }}>{s.when}</p>
            <h3 className="h3 mt-3">{s.title}</h3>
            <p className="mt-3 max-w-xs" style={{ color: "var(--mute)" }}>{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
