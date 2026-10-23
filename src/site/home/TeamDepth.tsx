"use client";

import { useRef } from "react";
import { TEAM } from "../content";
import { useGsap } from "../gsap";

/* Transparent cutouts in /img/cutout, with their pixel sizes. */
const CUTOUTS: Record<string, { w: number; h: number }> = {
  fahad: { w: 393, h: 389 },
  hooria: { w: 431, h: 504 },
  ria: { w: 384, h: 389 },
  samra: { w: 290, h: 400 },
};

/* Left-to-right lineup: x is the centre (% of the stage), h the height, d the depth (1 = front). */
const SLOTS: { slug: string; x: number; h: number; d: number }[] = [
  { slug: "izma", x: 10, h: 70, d: 0.4 },
  { slug: "ria", x: 26, h: 80, d: 0.65 },
  { slug: "fahad", x: 43, h: 96, d: 1 },
  { slug: "hooria", x: 59, h: 92, d: 0.9 },
  { slug: "ryan", x: 75, h: 82, d: 0.65 },
  { slug: "samra", x: 90, h: 72, d: 0.4 },
];

/** Shown only once every team member has a cutout, so nobody is left out of the group shot. */
export const TEAM_DEPTH_READY = TEAM.every((m) => CUTOUTS[m.slug]);

/**
 * The team as one group shot with real depth. As it scrolls past, the line-up spreads out
 * from the centre and each person rises at a speed set by how close they stand to you.
 */
export default function TeamDepth() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(root, ({ gsap, reduced, mobile }) => {
    if (reduced) return;
    const k = mobile ? 0.6 : 1;
    const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.7 };
    const width = () => root.current?.offsetWidth ?? window.innerWidth;
    gsap.utils.toArray<HTMLElement>("[data-td-person]", root.current).forEach((el) => {
      const x = parseFloat(el.dataset.x || "50");
      const d = parseFloat(el.dataset.d || "1");
      gsap.fromTo(
        el,
        { x: () => ((50 - x) / 100) * width() * 0.3, y: 90 * d * k, scale: 0.92 },
        { x: () => ((x - 50) / 100) * width() * 0.05, y: -40 * d * k, scale: 1, ease: "none", scrollTrigger: { ...st, invalidateOnRefresh: true } },
      );
    });
    gsap.fromTo(root.current!.querySelector("[data-td-sun]"), { scale: 0.7, yPercent: 20 }, { scale: 1.12, yPercent: -6, ease: "none", scrollTrigger: st });
    gsap.fromTo(root.current!.querySelector("[data-td-word]"), { xPercent: 8 }, { xPercent: -14, ease: "none", scrollTrigger: st });
  });

  if (!TEAM_DEPTH_READY) return null;

  return (
    <div ref={root} className="relative mt-14 h-[min(52svh,420px)] overflow-hidden [--tdk:0.62] sm:h-[min(62svh,600px)] sm:[--tdk:0.85] lg:[--tdk:1] rounded-[28px] sm:rounded-[36px]" style={{ background: "var(--paper-2)" }} role="img" aria-label="The Babar Tech team">
      <div data-td-sun aria-hidden className="absolute bottom-[-55%] left-1/2 aspect-square w-[min(110%,1100px)] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #f68a44, var(--orange) 60%)" }} />
      <p data-td-word aria-hidden className="display pointer-events-none absolute top-[6%] left-0 whitespace-nowrap select-none !text-[clamp(5rem,16vw,15rem)] !leading-none" style={{ color: "transparent", WebkitTextStroke: "1.5px rgb(15 17 20 / .16)" }}>
        Babar Tech · Babar Tech ·
      </p>
      {SLOTS.map((s) => {
        const c = CUTOUTS[s.slug];
        const m = TEAM.find((t) => t.slug === s.slug);
        if (!c || !m) return null;
        return (
          <div
            key={s.slug}
            data-td-person
            data-x={s.x}
            data-d={s.d}
            className="absolute bottom-0 will-change-transform"
            style={{ left: `${s.x}%`, height: `calc(${s.h}% * var(--tdk))`, zIndex: Math.round(s.d * 10) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/img/cutout/${s.slug}.webp`}
              alt=""
              width={c.w}
              height={c.h}
              loading="lazy"
              className="h-full w-auto max-w-none -translate-x-1/2"
              style={{ filter: `drop-shadow(0 30px 40px rgb(15 17 20 / ${(0.15 + s.d * 0.2).toFixed(2)}))` }}
            />
          </div>
        );
      })}
    </div>
  );
}
