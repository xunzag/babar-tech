"use client";

import Link from "next/link";
import { useRef } from "react";
import { Eyebrow } from "../Blocks";
import { SERVICES, type VizKind } from "../content";
import { useGsap } from "../gsap";
import { Arrow, ArrowUR } from "../Icons";
import Viz from "../Viz";
import Words from "../Words";

/* Clay objects that float beside each service. Add one here as /img/obj/<name>-{360,720}.webp lands. */
const OBJECTS: Partial<Record<VizKind, { name: string; h: number }>> = {
  support: { name: "headset", h: 735 },
  assist: { name: "planner", h: 678 },
  sales: { name: "phone", h: 718 },
};

/**
 * Services as a free-scrolling run of rows. Nothing pins: each row's demo card swings
 * from a 3D tilt to flat as it crosses the screen, while its object, number and chips
 * travel at different depths around it.
 */
export default function ServicesFlow() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap, reduced, mobile }) => {
    if (reduced) return;
    const k = mobile ? 0.55 : 1;
    gsap.utils.toArray<HTMLElement>("[data-sf-row]", root.current).forEach((row, i) => {
      const side = i % 2 ? -1 : 1;
      const q = gsap.utils.selector(row);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.6 },
        defaults: { ease: "none" },
      });
      tl.fromTo(q("[data-sf-card]"), { rotationX: 26 * k, rotationY: -18 * side * k, y: 140 * k, z: -140 }, { rotationX: 0, rotationY: 0, y: 0, z: 0, ease: "power2.out", duration: 0.5 }, 0)
        .to(q("[data-sf-card]"), { rotationX: -10 * k, rotationY: 8 * side * k, y: -70 * k, duration: 0.5 }, 0.5)
        .fromTo(q("[data-sf-num]"), { y: 60 * k }, { y: -40 * k, duration: 1 }, 0)
        .fromTo(q("[data-sf-obj]"), { y: 260 * k, rotate: 16 * side, rotationY: -34 * side, scale: 0.78 }, { y: -260 * k, rotate: -10 * side, rotationY: 22 * side, scale: 1.06, duration: 1 }, 0);
      q("[data-sf-chip]").forEach((chip, j) => {
        const depth = [1.6, 0.7, 1.2][j % 3];
        tl.fromTo(chip, { y: 160 * depth * k }, { y: -160 * depth * k, duration: 1 }, 0);
      });
    });
  });

  return (
    <section ref={root} id="services" className="relative overflow-hidden py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow n="01">What we do</Eyebrow>
            <Words className="h2 mt-6 max-w-[16ch]" text="Six kinds of help. | *One team accountable.*" />
          </div>
          <Link href="/services/" className="btn btn-line self-start lg:self-auto" data-reveal>
            All services in detail <Arrow size={16} className="arr" />
          </Link>
        </div>

        <ol className="mt-10 sm:mt-16">
          {SERVICES.map((s, i) => {
            const obj = OBJECTS[s.viz];
            const flip = i % 2 === 1;
            return (
              <li key={s.id} data-sf-row className="grid items-center gap-10 border-t py-16 sm:py-24 lg:grid-cols-12 lg:gap-14" style={{ borderColor: "var(--line)" }}>
                {/* copy */}
                <div className={`min-w-0 lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <div className="flex items-baseline justify-between" data-reveal>
                    <span className="mono text-[13px]" style={{ color: "var(--orange-ink)" }}>{s.num} / 0{SERVICES.length}</span>
                    <span className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--faint)" }}>{s.short}</span>
                  </div>
                  <p
                    data-sf-num
                    aria-hidden
                    className="display mt-4 select-none !text-[clamp(4.5rem,9vw,8rem)] !leading-[0.85] tnum"
                    style={{ color: "transparent", WebkitTextStroke: "1.5px rgb(15 17 20 / .22)" }}
                  >
                    {s.num}
                  </p>
                  <h3 className="h2 mt-3 !text-[clamp(2rem,4vw,3.4rem)]" data-reveal>{s.name}</h3>
                  <p className="mt-4 text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-snug tracking-tight" data-reveal>{s.line}</p>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: "var(--mute)" }} data-reveal>{s.body}</p>
                  <Link href={`/services/#${s.id}`} className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium" data-reveal>
                    <span className="link-u">Explore {s.short.toLowerCase()}</span> <ArrowUR size={16} />
                  </Link>
                </div>

                {/* stage */}
                <div className={`relative min-w-0 lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : ""}`} style={{ perspective: "1200px" }}>
                  <div data-sf-card className="relative aspect-[4/3] will-change-transform sm:aspect-[16/9]" style={{ transformStyle: "preserve-3d" }}>
                    <div className="h-full rounded-[26px]" style={{ boxShadow: "0 50px 90px -45px rgb(15 17 20 / .45), 0 0 0 1px rgb(15 17 20 / .05)" }}>
                      <Viz kind={s.viz} className="h-full" />
                    </div>
                  </div>
                  {s.roles.slice(0, 3).map((r, j) => (
                    <span
                      key={r}
                      data-sf-chip
                      aria-hidden
                      className={`chip pointer-events-none absolute !text-[12px] max-sm:hidden ${["-left-5 -top-4", "right-[10%] -bottom-4", "-right-5 bottom-[28%]"][j]}`}
                      style={{ background: "var(--paper)", boxShadow: "0 14px 30px -14px rgb(15 17 20 / .4), inset 0 0 0 1px var(--line)" }}
                    >
                      {r}
                    </span>
                  ))}
                  {obj && (
                    <div data-sf-obj className={`pointer-events-none absolute -top-[26%] w-[34%] will-change-transform sm:w-[28%] ${flip ? "-left-[9%]" : "-right-[9%]"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/img/obj/${obj.name}-720.webp`}
                        srcSet={`/img/obj/${obj.name}-360.webp 360w, /img/obj/${obj.name}-720.webp 720w`}
                        sizes="(min-width: 1024px) 22vw, 40vw"
                        alt=""
                        width={720}
                        height={obj.h}
                        loading="lazy"
                        className="h-auto w-full"
                        style={{ filter: "drop-shadow(0 40px 40px rgb(15 17 20 / .28))" }}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-4 flex flex-col items-start justify-between gap-6 rounded-[28px] p-8 sm:flex-row sm:items-center sm:p-10" style={{ background: "var(--ink)", color: "var(--cream)" }} data-reveal>
          <div>
            <p className="h3">Not sure which you need?</p>
            <p className="mt-2 text-[15px]" style={{ color: "#a3a39d" }}>Most clients start with one role and add a second within a few months.</p>
          </div>
          <Link href="/services/#build" className="btn btn-orange flex-none">Build your team <Arrow size={16} className="arr" /></Link>
        </div>
      </div>
    </section>
  );
}
