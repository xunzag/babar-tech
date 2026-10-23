"use client";

import { useState, type CSSProperties } from "react";
import { REVIEWS, TEAM, type VizKind } from "../content";
import { Star } from "../Icons";

const FILTERS: { k: VizKind | "all"; label: string }[] = [
  { k: "all", label: "All" },
  { k: "support", label: "Support" },
  { k: "assist", label: "Assistance" },
  { k: "sales", label: "Sales" },
  { k: "ops", label: "Operations" },
  { k: "dev", label: "Development" },
];

/* Paper stocks the notes are written on, cycled so neighbours never match */
const PAPERS = [
  { bg: "#fbfaf6", fg: "var(--ink)", sub: "#6b6e75", tape: "rgb(242 112 31 / .55)", stamp: "var(--orange-ink)" },
  { bg: "#f6dcc6", fg: "var(--ink)", sub: "#7a5a44", tape: "rgb(255 255 255 / .55)", stamp: "#a94b0b" },
  { bg: "#e9e5db", fg: "var(--ink)", sub: "#6b6e75", tape: "rgb(35 80 224 / .35)", stamp: "#2350e0" },
  { bg: "#dbe3fb", fg: "var(--ink)", sub: "#4a5577", tape: "rgb(255 255 255 / .6)", stamp: "#2350e0" },
];
const TILT = [-2.6, 1.8, -1.2, 2.4, -1.9, 1.1, -2.2, 2.8];
const DEPTH = ["0.05", "-0.04", "0.09", "-0.02", "0.07", "-0.06"];

const match = (f: VizKind | "all", s: VizKind) => f === "all" || s === f || (f === "ops" && s === "success");

/** Client reviews as a wall of thank-you notes: taped up at angles, at different depths, each signed by who earned it. */
export default function Reviews() {
  const [f, setF] = useState<VizKind | "all">("all");
  const list = REVIEWS.filter((r) => match(f, r.service));

  return (
    <>
      <div className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1" role="tablist" aria-label="Filter reviews by service">
        {FILTERS.map((x) => {
          const n = REVIEWS.filter((r) => match(x.k, r.service)).length;
          return (
            <button
              key={x.k}
              role="tab"
              aria-selected={f === x.k}
              onClick={() => setF(x.k)}
              className="flex-none rounded-full px-4 py-2 text-[14px] transition-all duration-300"
              style={f === x.k ? { background: "var(--cream)", color: "var(--ink)" } : { boxShadow: "inset 0 0 0 1px var(--line-strong)", color: "var(--mute)" }}
            >
              {x.label} <span className="mono ml-1 text-[11px] opacity-60">{n}</span>
            </button>
          );
        })}
      </div>

      <div data-reveal="fade" className="notes">
        <div key={f} className="no-scrollbar -mx-[var(--gutter)] mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pt-4 pb-10 md:mx-0 md:block md:columns-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 xl:columns-3">
          {list.map((r, i) => {
            const paper = PAPERS[i % PAPERS.length];
            const m = TEAM.find((t) => t.slug === r.who.toLowerCase());
            const short = r.quote.length < 110;
            return (
              <div key={r.project} className="w-[80vw] max-w-[340px] flex-none snap-center md:mb-10 md:w-auto md:max-w-none md:break-inside-avoid" data-parallax={DEPTH[i % DEPTH.length]}>
                <figure
                  className="note note-in relative rounded-[6px] px-6 pt-8 pb-6 sm:px-7"
                  style={{ background: paper.bg, color: paper.fg, ["--r" as string]: `${TILT[i % TILT.length]}deg`, ["--i" as string]: i } as CSSProperties}
                >
                  <span aria-hidden className="note__tape" style={{ background: paper.tape }} />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5" style={{ color: "var(--orange)" }} role="img" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} />)}
                    </div>
                    <span className="note__stamp mono" style={{ color: paper.stamp, borderColor: paper.stamp }}>
                      {r.hours ? `${r.hours} hrs` : "Fixed price"}
                    </span>
                  </div>
                  <blockquote className={`mt-5 font-medium tracking-[-0.02em] ${short ? "text-[clamp(1.35rem,1.9vw,1.6rem)] leading-[1.2]" : "text-[17px] leading-[1.45]"}`}>
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m ? m.photo.replace("-400", "-96") : "/img/mark.webp"}
                      alt=""
                      width={44}
                      height={44}
                      loading="lazy"
                      className="h-11 w-11 flex-none rounded-full object-cover"
                      style={{ boxShadow: "0 0 0 3px #fff, 0 6px 14px -6px rgb(15 17 20 / .5)", background: "#fff", padding: m ? 0 : 6 }}
                    />
                    <div className="min-w-0">
                      <p className="text-[24px] leading-none [font-family:var(--font-hand)]">for {m ? m.name.split(" ")[0] : "the team"}</p>
                      <p className="mt-1.5 truncate text-[12px]" style={{ color: paper.sub }}>{r.project} · {r.period}</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
