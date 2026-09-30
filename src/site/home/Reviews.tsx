"use client";

import { useState } from "react";
import { REVIEWS, type VizKind } from "../content";
import { Star } from "../Icons";

const FILTERS: { k: VizKind | "all"; label: string }[] = [
  { k: "all", label: "All" },
  { k: "support", label: "Support" },
  { k: "assist", label: "Assistance" },
  { k: "sales", label: "Sales" },
  { k: "ops", label: "Operations" },
  { k: "dev", label: "Development" },
];

export default function Reviews() {
  const [f, setF] = useState<VizKind | "all">("all");
  const list = REVIEWS.filter((r) => f === "all" || r.service === f || (f === "ops" && r.service === "success"));

  return (
    <>
      <div className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1" role="tablist" aria-label="Filter reviews by service">
        {FILTERS.map((x) => {
          const n = x.k === "all" ? REVIEWS.length : REVIEWS.filter((r) => r.service === x.k || (x.k === "ops" && r.service === "success")).length;
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

      <div key={f} className="no-scrollbar -mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:block md:columns-2 md:gap-4 md:overflow-visible md:px-0 xl:columns-3">
        {list.map((r, i) => (
          <figure
            key={r.project}
            data-tilt="0" className="spot sheet-in w-[84vw] max-w-[360px] flex-none snap-center rounded-[20px] p-6 md:mb-4 md:w-auto md:max-w-none md:break-inside-avoid"
            style={{ background: "var(--ink-2)", animationDelay: `${i * 50}ms`, border: "1px solid var(--line)" }}
          >
            <div className="flex gap-0.5" style={{ color: "var(--orange)" }} role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} />)}
            </div>
            <blockquote className="mt-4 text-[17px] leading-relaxed" style={{ color: "#ecE9e1" }}>
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t pt-4 text-[13px]" style={{ borderColor: "var(--line)" }}>
              <p style={{ color: "#cfccc4" }}>{r.project}</p>
              <p className="mono mt-1 text-[11px] uppercase tracking-[0.06em]" style={{ color: "var(--faint)" }}>
                {r.who === "Team" ? "Babar Tech team" : r.who} · {r.period}{r.hours ? ` · ${r.hours} hrs` : " · fixed price"}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
