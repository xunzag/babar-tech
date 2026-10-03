"use client";

import Link from "next/link";
import { useRef } from "react";
import { SERVICES } from "../content";
import { useGsap } from "../gsap";
import { Arrow, ArrowUR } from "../Icons";
import Viz from "../Viz";

/**
 * Services on brand orange (continuing from the dive).
 * Desktop: the section pins and the cards travel sideways as you scroll down.
 * Phones: a native swipe row, no pinning.
 */
export default function HServices() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap, reduced, mobile }) => {
    if (reduced || mobile) return;
    const q = gsap.utils.selector(root);
    const track = q("[data-hs-track]")[0] as HTMLElement;
    const bar = q("[data-hs-bar]")[0];
    const counter = q("[data-hs-n]")[0];
    const cards = q("[data-hs-card]");
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.to(track, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: () => "+=" + dist(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (s) => {
          gsap.set(bar, { scaleX: s.progress });
          counter.textContent = String(Math.min(SERVICES.length, Math.floor(s.progress * (SERVICES.length - 0.001)) + 1)).padStart(2, "0");
        },
      },
    });
    // each card settles in as it arrives from the right
    cards.forEach((c) =>
      gsap.from(c, {
        opacity: 0.35,
        scale: 0.9,
        rotate: 2.5,
        ease: "none",
        scrollTrigger: { trigger: c, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true },
      }),
    );
  });

  return (
    <section ref={root} id="services" className="relative overflow-hidden" style={{ background: "var(--orange)", color: "var(--ink)" }}>
      <div className="flex min-h-[100svh] flex-col justify-center py-16 lg:h-[100svh] lg:pt-[calc(var(--nav-h)+8px)] lg:pb-6">
        {/* header row */}
        <div className="wrap flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow" style={{ color: "var(--ink)" }}><span>01</span><span className="inline-block h-px w-6" style={{ background: "currentColor" }} />What we do</p>
            <h2 className="h2 mt-3 max-w-[14ch] !text-[clamp(2.1rem,4.2vw,3.6rem)] lg:max-w-none">Six kinds of help. One team accountable.</h2>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <span className="mono text-[13px]"><span data-hs-n>01</span> / 0{SERVICES.length}</span>
            <span className="relative block h-[3px] w-40 overflow-hidden rounded-full" style={{ background: "rgb(15 17 20 / .2)" }}>
              <span data-hs-bar className="absolute inset-0 origin-left scale-x-0 rounded-full" style={{ background: "var(--ink)" }} />
            </span>
          </div>
        </div>

        {/* track */}
        <div className="no-scrollbar mt-10 overflow-x-auto lg:mt-[min(4vh,40px)] lg:overflow-visible" style={{ scrollSnapType: "x mandatory" }}>
          <ol data-hs-track className="flex w-max gap-4 px-[var(--gutter)] lg:gap-6 lg:will-change-transform">
            {SERVICES.map((s) => (
              <li
                key={s.id}
                data-hs-card
                className="flex w-[84vw] max-w-[440px] flex-none snap-start flex-col rounded-[28px] p-5 sm:p-6 lg:w-[min(36vw,520px)] lg:max-w-none"
                style={{ background: "var(--paper)", boxShadow: "0 30px 60px -30px rgb(15 17 20 / .45)" }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="mono text-[13px]" style={{ color: "var(--orange-ink)" }}>{s.num}</span>
                  <span className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--faint)" }}>{s.short}</span>
                </div>
                <h3 className="h3 mt-3">{s.name}</h3>
                <p className="mt-2 text-[15px] leading-snug" style={{ color: "var(--mute)" }}>{s.line}</p>
                <div className="mt-4 aspect-[4/3] lg:aspect-auto lg:h-[clamp(150px,27vh,300px)]">
                  <Viz kind={s.viz} className="h-full" />
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.roles.slice(0, 3).map((r) => <span key={r} className="chip !text-[12px]">{r}</span>)}
                </div>
                <Link href={`/services/#${s.id}`} className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[15px] font-medium">
                  <span className="link-u">Explore {s.short.toLowerCase()}</span> <ArrowUR size={16} />
                </Link>
              </li>
            ))}
            {/* end card */}
            <li className="flex w-[70vw] max-w-[360px] flex-none snap-start flex-col justify-center rounded-[28px] p-8 lg:w-[min(28vw,400px)]" style={{ background: "var(--ink)", color: "var(--cream)" }}>
              <p className="h3">Not sure which you need?</p>
              <p className="mt-3 text-[15px]" style={{ color: "#a3a39d" }}>Most clients start with one role and add a second within a few months.</p>
              <Link href="/services/" className="btn btn-orange mt-8 self-start">See all services <Arrow size={16} className="arr" /></Link>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
