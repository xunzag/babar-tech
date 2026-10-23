"use client";

import { useRef } from "react";
import type { Service } from "../content";
import { useScrollProgress } from "../gsap";
import { Check } from "../Icons";
import Demo from "./Demos";

/**
 * One service as a full-screen chapter that scrolls freely (no pinning). The demo plays
 * out as the chapter crosses the screen and swings up from a 3D tilt as it arrives.
 */
export default function Chapter({ s, index, total }: { s: Service; index: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref, "top 85%", "center 40%");
  const tilt = 1 - Math.min(1, p * 2.2);
  const dark = index % 2 === 1;
  const fg = dark ? "var(--cream)" : "var(--ink)";
  const sub = dark ? "#a3a39d" : "var(--mute)";
  const line = dark ? "rgb(255 255 255 / .1)" : "var(--line)";

  return (
    <section ref={ref} id={s.id} className="relative overflow-hidden" style={{ background: dark ? "var(--ink)" : "var(--paper)", color: fg }} aria-labelledby={`${s.id}-title`}>
      <div className="flex min-h-[100svh] flex-col justify-center py-20 sm:py-28">
        <div className="wrap grid w-full items-center gap-6 lg:grid-cols-12 lg:gap-14">
          {/* copy */}
          <div className="min-w-0 lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="mono text-[12px] uppercase tracking-[0.08em]" style={{ color: dark ? "var(--orange)" : "var(--orange-ink)" }}>{s.num} / 0{total}</span>
              <span className="relative h-px flex-1 overflow-hidden" style={{ background: line }}>
                <span className="absolute inset-0 origin-left" style={{ background: "var(--orange)", transform: `scaleX(${p})` }} />
              </span>
            </div>
            <p
              aria-hidden
              className="display mt-3 select-none !text-[clamp(4rem,10vw,9rem)] !leading-[0.8] tnum max-lg:hidden"
              style={{ color: "transparent", WebkitTextStroke: `1.5px ${dark ? "rgb(236 233 225 / .35)" : "rgb(15 17 20 / .25)"}` }}
            >
              {s.num}
            </p>
            <h2 id={`${s.id}-title`} className="h2 mt-3 !text-[clamp(2rem,4.4vw,4rem)] lg:mt-4">{s.name}</h2>
            <p className="mt-3 text-[clamp(1.05rem,1.5vw,1.3rem)] font-medium leading-snug tracking-tight">{s.line}</p>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed max-lg:hidden" style={{ color: sub }}>{s.body}</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 max-lg:hidden">
              <ul className="space-y-2">
                {s.roles.map((r, i) => (
                  <li key={r} className="flex gap-2.5 text-[14px] transition-opacity duration-500" style={{ opacity: p > i * 0.08 ? 1 : 0.35 }}>
                    <Check size={15} className="mt-[3px] flex-none" style={{ color: "var(--orange)" }} /> {r}
                  </li>
                ))}
              </ul>
              <div>
                <p className="mono text-[10px] uppercase tracking-[0.08em]" style={{ color: sub }}>Tools</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {s.tools.map((t) => (
                    <li key={t} className="rounded-full px-2.5 py-1 text-[12px]" style={{ boxShadow: `inset 0 0 0 1px ${line}`, color: sub }}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* demo */}
          <div
            className="h-[min(60svh,520px)] min-w-0 lg:col-span-7 lg:h-[min(72svh,600px)]"
            style={{
              transform: `perspective(1400px) rotateX(${(tilt * 18).toFixed(2)}deg) rotateY(${(tilt * (dark ? 10 : -10)).toFixed(2)}deg) translateY(${(tilt * 80).toFixed(1)}px)`,
              transformOrigin: "50% 100%",
              transition: "transform .3s linear",
            }}
          >
            <Demo kind={s.viz} p={p} />
          </div>
        </div>
      </div>
    </section>
  );
}
