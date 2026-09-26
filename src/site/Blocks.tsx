import Link from "next/link";
import { FAQ as FAQS, SITE } from "./content";
import { Arrow, Plus } from "./Icons";
import Words from "./Words";

export function Eyebrow({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <p className="eyebrow" data-reveal>
      {n && <span className="n">{n}</span>}
      {n && <span className="inline-block h-px w-6" style={{ background: "var(--line-strong)" }} />}
      {children}
    </p>
  );
}

export function FAQ({ items = FAQS, n }: { items?: { q: string; a: string }[]; n?: string }) {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow n={n}>Questions</Eyebrow>
          <Words className="h2 mt-6" text="Straight | *answers.*" />
          <p className="mt-6 max-w-xs" style={{ color: "var(--mute)" }} data-reveal>
            Anything else? Email <a className="link-u" style={{ color: "var(--ink)" }} href={`mailto:${SITE.email}`}>{SITE.email}</a> and you&apos;ll hear back from a person.
          </p>
        </div>
        <div className="lg:col-span-8">
          {items.map((f, i) => (
            <details key={f.q} className="acc group border-t last:border-b" data-reveal style={{ borderColor: "var(--line)", ["--d" as string]: i * 60 }}>
              <summary className="flex items-center gap-6 py-6 text-[clamp(1.05rem,1.6vw,1.3rem)] font-medium tracking-tight">
                <span className="flex-1">{f.q}</span>
                <span className="acc-plus grid h-9 w-9 flex-none place-items-center rounded-full transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)]" style={{ boxShadow: "inset 0 0 0 1px var(--line-strong)" }}>
                  <Plus size={16} />
                </span>
              </summary>
              <div className="acc-body">
                <div>
                  <p className="max-w-2xl pb-7 pr-12" style={{ color: "var(--mute)" }}>{f.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="ink relative overflow-hidden rounded-[28px] sm:rounded-[36px]" data-scale-in>
        <div className="wrap relative z-10 pt-20 pb-[62vw] sm:py-36">
          <Eyebrow>Ready when you are</Eyebrow>
          <Words as="h2" className="display mt-8 max-w-[11ch]" text="Stop doing it all *yourself.*" />
          <p className="lede mt-8 max-w-md" data-reveal>
            One call, a matched specialist the same day, and someone working on your list by tomorrow.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-orange">
              Book a free 30-min call <Arrow size={16} className="arr" />
            </a>
            <Link href="/contact/" className="btn btn-line">Send a brief instead</Link>
          </div>
        </div>
        {/* Brand mark, drifting slowly */}
        <div data-parallax="0.12" className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/mark-3d.webp"
          alt=""
          width={704}
          height={720}
          loading="lazy"
          data-anim
          className="float-mark pointer-events-none absolute -right-[14%] -bottom-[10%] w-[72%] max-w-[640px] sm:-right-[6%] sm:-bottom-[14%] sm:w-[52%]"
        />
        </div>
      </div>
    </section>
  );
}
