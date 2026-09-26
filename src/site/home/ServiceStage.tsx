"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "../content";
import { ArrowUR } from "../Icons";
import Viz from "../Viz";

export default function ServiceStage() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* List */}
      <ol className="lg:col-span-6">
        {SERVICES.map((s, i) => (
          <li
            key={s.id}
            ref={(el) => { refs.current[i] = el; }}
            data-i={i}
            className="border-t py-10 lg:flex lg:min-h-[54vh] lg:flex-col lg:justify-center lg:py-16"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="flex items-baseline gap-4">
              <span className="mono text-[13px] transition-colors duration-500" style={{ color: active === i ? "var(--orange)" : "var(--faint)" }}>{s.num}</span>
              <h3
                className="h3 transition-opacity duration-500 lg:opacity-[var(--o)]"
                style={{ ["--o" as string]: active === i ? 1 : 0.28 }}
              >
                {s.name}
              </h3>
            </div>
            <p className="mt-4 text-[clamp(1.1rem,1.6vw,1.35rem)] font-medium leading-snug tracking-tight">{s.line}</p>
            <p className="mt-3 max-w-lg" style={{ color: "var(--mute)" }}>{s.body}</p>

            {/* Inline scene on small screens */}
            <div className="mt-8 aspect-[4/3] lg:hidden">
              <Viz kind={s.viz} className="h-full" />
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {s.roles.slice(0, 4).map((r) => <li key={r} className="chip">{r}</li>)}
            </ul>
            <Link href={`/services/#${s.id}`} className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium">
              <span className="link-u">More on {s.name.toLowerCase()}</span> <ArrowUR size={16} />
            </Link>
          </li>
        ))}
      </ol>

      {/* Sticky stage */}
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-[calc(50vh-230px)]">
          <div className="relative aspect-[4/3.4] rounded-[28px] p-5" style={{ background: "var(--paper-2)" }}>
            {SERVICES.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-5"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "none" : `translateY(${i < active ? -24 : 24}px) scale(.97)`,
                  transition: "opacity .6s var(--ease-out), transform .9s var(--ease-out)",
                  pointerEvents: active === i ? "auto" : "none",
                }}
                aria-hidden={active !== i}
              >
                {Math.abs(active - i) <= 1 && <Viz kind={s.viz} className="h-full" />}
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="mono text-[12px] uppercase tracking-[0.08em]" style={{ color: "var(--mute)" }}>
              {SERVICES[active].num} / 0{SERVICES.length} · {SERVICES[active].short}
            </p>
            <div className="flex gap-1.5">
              {SERVICES.map((s, i) => (
                <span key={s.id} className="h-1 rounded-full transition-all duration-500" style={{ width: active === i ? 28 : 8, background: active === i ? "var(--ink)" : "var(--line-strong)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
