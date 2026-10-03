"use client";

import { useRef } from "react";
import { useGsap } from "../gsap";

const ROWS = [
  { text: "Support · Sales · Assistance · ", outline: false },
  { text: "Operations · Success · Development · ", outline: true },
  { text: "Your team, already on shift · ", outline: false },
];

// Deepest point of the orange band on /img/mark-3d.webp (measured from the image)
const ORIGIN = "39.8% 45.4%";

/**
 * Scroll scene: giant word rows slide past, the mark spins into place,
 * then the camera flies through its orange band until the screen is brand orange.
 * The section after this one starts orange, so the dive lands seamlessly.
 */
export default function Dive() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap, reduced, mobile }) => {
    const q = gsap.utils.selector(root);
    if (reduced) {
      gsap.set(q("[data-dive-mark]"), { scale: 1, rotate: 0, opacity: 1 });
      return;
    }
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      defaults: { ease: "none" },
    });
    q("[data-dive-row]").forEach((row, i) => {
      tl.fromTo(row, { xPercent: i % 2 ? -32 : 0 }, { xPercent: i % 2 ? 0 : -32, duration: 1 }, 0);
    });
    tl.fromTo(q("[data-dive-mark]"), { scale: 0.55, rotate: -140, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, ease: "power2.out", duration: 0.32 }, 0)
      .to(q("[data-dive-cap]"), { opacity: 0, y: 30, duration: 0.12 }, 0.4)
      .to(q("[data-dive-mark]"), { scale: mobile ? 34 : 46, transformOrigin: ORIGIN, ease: "power3.in", duration: 0.5 }, 0.44)
      .to(q("[data-dive-row]"), { opacity: 0, scale: 1.35, ease: "power2.in", duration: 0.3 }, 0.5)
      .to(q("[data-dive-sticky]"), { backgroundColor: "#f2701f", duration: 0.1 }, 0.84)
      .set(q("[data-dive-mark]"), { opacity: 0 }, 0.96);
  });

  return (
    <section ref={root} data-tall className="relative h-[280vh] sm:h-[320vh]" aria-label="One team for everything on your list">
      <div data-dive-sticky className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" style={{ background: "var(--paper)" }}>
        <div aria-hidden className="pointer-events-none flex flex-col gap-[1vw] select-none">
          {ROWS.map((r, i) => (
            <div key={i} data-dive-row className="whitespace-nowrap will-change-transform">
              <span
                className="display !text-[clamp(4rem,13vw,13rem)] !leading-[1]"
                style={r.outline ? { color: "transparent", WebkitTextStroke: "2px var(--ink)" } : undefined}
              >
                {r.text.repeat(3)}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 grid place-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-dive-mark
            src="/img/mark-3d.webp"
            alt="Babar Tech Solutions logo"
            width={704}
            height={720}
            loading="lazy"
            className="w-[min(58vw,440px)] will-change-transform"
            style={{ filter: "drop-shadow(0 40px 60px rgb(15 17 20 / .25))" }}
          />
        </div>
        <p data-dive-cap className="absolute inset-x-0 bottom-[9vh] text-center mono text-[12px] uppercase tracking-[0.12em]" style={{ color: "var(--mute)" }}>
          One team for everything on your list
        </p>
      </div>
    </section>
  );
}
