"use client";

import { useRef } from "react";
import { useGsap } from "../gsap";

const ROWS = [
  { text: "Support · Sales · Assistance · ", outline: false },
  { text: "Operations · Success · Development · ", outline: true },
  { text: "Your team, already on shift · ", outline: false },
];

/* The mark, cut into its three pieces. Each flies in from its own spot in 3D space;
   `from` is relative to the logo's size (x/y in %) and depth in px. */
const PIECES = [
  { name: "top", label: "Hired by Fahad", at: "left-[58%] top-[12%]", from: { xPercent: 30, yPercent: -32, z: 220, rotate: 12, rotationY: 32, rotationX: 0 } },
  { name: "band", label: "Trained on your tools", at: "left-[-6%] top-[30%]", from: { xPercent: -40, yPercent: 4, z: 380, rotate: -14, rotationY: 0, rotationX: 28 } },
  { name: "bottom", label: "Managed every week", at: "left-[40%] top-[78%]", from: { xPercent: 24, yPercent: 36, z: -160, rotate: -10, rotationY: -26, rotationX: 0 } },
] as const;

// Stacked, darkened copies behind each face give the pieces real thickness when they turn
const DEPTH = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Scroll scene, never pinned: as the section passes, the stage drifts at ~70% of scroll speed,
 * the giant word rows slide sideways and the logo's pieces fly together, then the whole mark turns.
 */
export default function LogoScene() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap, reduced, mobile }) => {
    const q = gsap.utils.selector(root);
    if (reduced) {
      gsap.set(q("[data-ls-label]"), { opacity: 0 });
      return;
    }
    const k = mobile ? 0.6 : 1;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
      defaults: { ease: "none" },
    });
    tl.fromTo(q("[data-ls-stage]"), { y: () => -window.innerHeight * 0.35 }, { y: () => window.innerHeight * 0.35, duration: 1 }, 0);
    q("[data-ls-row]").forEach((row, i) => {
      tl.fromTo(row, { xPercent: i % 2 ? -30 : 0 }, { xPercent: i % 2 ? 0 : -30, duration: 1 }, 0);
    });
    tl.fromTo(q("[data-ls-mark]"), { rotationY: -38, rotationX: 22, scale: 0.8 }, { rotationY: 0, rotationX: 0, scale: 1, ease: "power2.out", duration: 0.5 }, 0)
      .to(q("[data-ls-mark]"), { rotationY: 14, rotationX: -6, scale: 1.04, duration: 0.5 }, 0.5);
    PIECES.forEach((p, i) => {
      const f = p.from;
      tl.fromTo(
        q("[data-ls-piece]")[i],
        { xPercent: f.xPercent * k, yPercent: f.yPercent * k, z: f.z * k, rotate: f.rotate, rotationY: f.rotationY, rotationX: f.rotationX },
        { xPercent: 0, yPercent: 0, z: 0, rotate: 0, rotationY: 0, rotationX: 0, ease: "power1.out", duration: 0.48 },
        0.06,
      );
    });
    tl.to(q("[data-ls-label]"), { opacity: 0, duration: 0.08 }, 0.44)
      .fromTo(q("[data-ls-cap]"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.14 }, 0.5);
  });

  return (
    <section ref={root} className="relative h-[130svh] overflow-hidden" aria-label="One team for everything on your list">
      <div data-ls-stage className="absolute inset-x-0 top-[15svh] flex h-[100svh] flex-col justify-center will-change-transform">
        <div aria-hidden className="pointer-events-none flex flex-col gap-[1vw] select-none">
          {ROWS.map((r, i) => (
            <div key={i} data-ls-row className="whitespace-nowrap will-change-transform">
              <span
                className="display !text-[clamp(4rem,13vw,13rem)] !leading-[1]"
                style={r.outline ? { color: "transparent", WebkitTextStroke: "2px var(--ink)" } : { opacity: 0.9 }}
              >
                {r.text.repeat(3)}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 grid place-items-center" style={{ perspective: "1100px" }}>
          <div data-ls-mark role="img" aria-label="Babar Tech Solutions logo" className="relative aspect-[704/720] w-[min(70vw,520px)]" style={{ transformStyle: "preserve-3d" }}>
            {PIECES.map((p) => (
              <div key={p.name} data-ls-piece className="absolute inset-0 will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                {DEPTH.map((d) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={d} src={`/img/mark/${p.name}-edge.webp`} alt="" width={352} height={360} loading="lazy" className="absolute inset-0 h-full w-full" style={{ transform: `translateZ(${-d * 2.6}px)` }} />
                ))}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/mark/${p.name}.webp`} alt="" width={704} height={720} loading="lazy" className="absolute inset-0 h-full w-full" />
                <span
                  data-ls-label
                  className={`absolute ${p.at} rounded-full px-3 py-1.5 mono text-[10px] uppercase tracking-[0.08em] whitespace-nowrap sm:text-[11px]`}
                  style={{ background: "var(--ink)", color: "var(--cream)", transform: "translateZ(40px)", boxShadow: "0 10px 24px -10px rgb(15 17 20 / .5)" }}
                >
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div data-ls-cap className="absolute inset-x-0 bottom-[7svh] text-center">
          <p className="mono text-[12px] uppercase tracking-[0.12em]" style={{ color: "var(--mute)" }}>Hired · trained · managed</p>
          <p className="mt-2 text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium tracking-tight">One team for everything on your list.</p>
        </div>
      </div>
    </section>
  );
}
