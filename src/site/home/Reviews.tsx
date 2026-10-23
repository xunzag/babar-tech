"use client";

import { useState } from "react";
import { RECORD, REVIEWS, SITE, TEAM, type Review } from "../content";
import { Eyebrow } from "../Blocks";
import { ArrowUR, Star } from "../Icons";
import ScrubText from "../ScrubText";
import Words from "../Words";

/* The three that get a full screen each. Quotes stay verbatim; `*…*` marks the line that lands in orange. */
const FEATURED: { project: string; text: string }[] = [
  {
    project: "Customer service rep, patient retention in medical supply",
    text: "Fahad is excellent and really good at customer service. He helped our business tremendously by retaining our customers. *His retention rate was close to 98%.*",
  },
  {
    project: "Cold caller, outbound sales",
    text: "Great, I recommend her, she was much better than *most people we've hired on Upwork.*",
  },
  {
    project: "Online speaking app for English learners",
    text: "Sterling work on a speaking app for high school English learners in Slovakia. Easy to communicate with. *The final iteration surpassed my expectations.*",
  },
];

/* Verbatim fragments for the marquee between the big quotes */
const PHRASES = [
  ["retention rate was close to 98%", "great tonality and pacing", "an invaluable member of our team", "extremely dependable", "helped us convert new clients"],
  ["seamless functionality and clean code", "proactive and organised", "surpassed my expectations", "learns fast", "such reliable help"],
];

const member = (r: Review) => TEAM.find((t) => t.slug === r.who.toLowerCase());
const firstName = (r: Review) => member(r)?.name.split(" ")[0] ?? "Babar Tech team";
const avatar = (r: Review) => member(r)?.photo.replace("-400", "-96") ?? "/img/mark.webp";
const meta = (r: Review) => `${r.period}${r.hours ? ` · ${r.hours} hrs` : " · fixed price"}`;

function Big({ r, text, i }: { r: Review; text: string; i: number }) {
  return (
    <article className="grid min-h-[64svh] content-center gap-10 border-t py-16 sm:min-h-[80svh] sm:py-20 lg:grid-cols-12 lg:gap-8" style={{ borderColor: "var(--line)" }}>
      <div className="lg:col-span-9">
        <div className="flex items-center gap-4" data-reveal>
          <span className="mono text-[12px]" style={{ color: "var(--orange)" }}>0{i + 1} / 0{FEATURED.length}</span>
          <span className="flex gap-0.5" style={{ color: "var(--orange)" }} role="img" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={13} />)}
          </span>
        </div>
        <blockquote className="mt-8">
          <ScrubText className="max-w-[24ch] text-[clamp(2rem,4.8vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.035em] [font-family:var(--font-display)]" text={`“${text}”`} />
        </blockquote>
        <div className="mt-10 flex items-center gap-4" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar(r)} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 rounded-full object-cover" style={{ background: "#fff" }} />
          <div className="text-[14px]">
            <p>
              <span className="font-medium">{firstName(r)}</span>
              <span style={{ color: "var(--mute)" }}> · {r.project}</span>
            </p>
            <p className="mono mt-1 text-[11px] uppercase tracking-[0.06em]" style={{ color: "var(--faint)" }}>{meta(r)} · Upwork</p>
          </div>
        </div>
      </div>
      {r.hours && (
        <div className="self-end lg:col-span-3 lg:text-right" data-reveal>
          <p className="display tnum !text-[clamp(4rem,9vw,8.5rem)] !leading-[0.85]" style={{ color: "transparent", WebkitTextStroke: "1.5px rgb(236 233 225 / .4)" }}>
            {r.hours}
          </p>
          <p className="mono mt-3 text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--mute)" }}>hours on this job</p>
        </div>
      )}
    </article>
  );
}

function Phrases() {
  return (
    <div className="-mx-[var(--gutter)] overflow-hidden py-10 sm:py-16" aria-hidden>
      {PHRASES.map((row, k) => (
        <div key={k} className={`marquee ${k ? "marquee-rev mt-3" : ""}`} data-anim>
          <div className="marquee__track" style={{ ["--dur" as string]: k ? "62s" : "50s" }}>
            {[0, 1].map((dup) => (
              <ul key={dup} className="flex flex-none items-center">
                {row.map((t) => (
                  <li key={t} className="flex items-center gap-8 pr-8 whitespace-nowrap">
                    <span
                      className="display !text-[clamp(2.4rem,6vw,5.6rem)] !leading-[1.05]"
                      style={k ? { color: "transparent", WebkitTextStroke: "1.5px rgb(236 233 225 / .55)" } : undefined}
                    >
                      &ldquo;{t}&rdquo;
                    </span>
                    <span className="h-3 w-3 flex-none rounded-full" style={{ background: "var(--orange)" }} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Reviews as editorial: three full-screen quotes that ink in as you scroll, a phrase marquee, then the full list. */
export default function Reviews() {
  const [all, setAll] = useState(false);
  const featured = FEATURED.map((f) => ({ ...f, r: REVIEWS.find((r) => r.project === f.project)! }));
  const rest = REVIEWS.filter((r) => !FEATURED.some((f) => f.project === r.project));
  const shown = all ? rest : rest.slice(0, 4);

  return (
    <section id="reviews" className="ink relative py-24 sm:py-36" data-expand>
      <div className="wrap">
        <div className="grid gap-10 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow n="06">Client reviews</Eyebrow>
            <Words className="h2 mt-6" text={`${RECORD.reviews} reviews. | Every one *five stars.*`} />
          </div>
          <div className="self-end lg:col-span-5" data-reveal>
            <p style={{ color: "var(--mute)" }}>Quoted word for word from our public Upwork profile, where you can check every one of them.</p>
            <a href={SITE.upwork} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-medium">
              <span className="link-u">Verify on Upwork</span> <ArrowUR size={16} />
            </a>
          </div>
        </div>

        <Big r={featured[0].r} text={featured[0].text} i={0} />
        <Phrases />
        <Big r={featured[1].r} text={featured[1].text} i={1} />
        <Big r={featured[2].r} text={featured[2].text} i={2} />

        {/* everything else, plainly */}
        <div className="border-t pt-12" style={{ borderColor: "var(--line)" }}>
          <p className="mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--mute)" }}>More from clients</p>
          <ul data-rev-list className="mt-6" data-reveal>
            {shown.map((r, i) => (
              <li key={r.project} className="sheet-in grid gap-3 border-t py-7 md:grid-cols-12 md:gap-8" style={{ borderColor: "var(--line)", animationDelay: `${(i % 6) * 50}ms` }}>
                <div className="flex items-center gap-3 md:col-span-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatar(r)} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 flex-none rounded-full object-cover" style={{ background: "#fff" }} />
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium">{firstName(r)}</p>
                    <p className="mono text-[10.5px] uppercase tracking-[0.06em]" style={{ color: "var(--faint)" }}>{meta(r)}</p>
                  </div>
                </div>
                <blockquote className="text-[clamp(1.05rem,1.5vw,1.3rem)] leading-snug tracking-[-0.01em] md:col-span-6">&ldquo;{r.quote}&rdquo;</blockquote>
                <p className="text-[13px] md:col-span-3 md:text-right" style={{ color: "var(--mute)" }}>{r.project}</p>
              </li>
            ))}
          </ul>
          {!all && rest.length > shown.length && (
            <button type="button" onClick={() => setAll(true)} className="btn btn-line mt-8">
              Show {rest.length - shown.length} more reviews
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
