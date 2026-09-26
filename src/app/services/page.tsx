import type { Metadata } from "next";
import Link from "next/link";
import { CTA, Eyebrow } from "@/site/Blocks";
import { SERVICES, SITE } from "@/site/content";
import { Arrow, Check } from "@/site/Icons";
import Viz from "@/site/Viz";
import Words from "@/site/Words";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Customer support, virtual assistance, sales and lead generation, customer success, operations and web development. Vetted specialists, matched the same day and working within 24 hours.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-[calc(var(--nav-h)+48px)] pb-16 sm:pt-[calc(var(--nav-h)+80px)] sm:pb-24">
        <div className="wrap">
          <Eyebrow>Services</Eyebrow>
          <Words as="h1" className="display mt-8 max-w-[14ch]" text="Help for every desk | that's *overflowing.*" />
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <p className="lede lg:col-span-6" data-reveal>
              Six service lines, one team. Each specialist is vetted for the role, trained on your tools and managed by us, so you get the output
              without the overhead of hiring.
            </p>
            <nav aria-label="Jump to service" className="lg:col-span-6" data-reveal>
              <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {SERVICES.map((s) => (
                  <li key={s.id} className="border-t" style={{ borderColor: "var(--line)" }}>
                    <a href={`#${s.id}`} className="group flex items-baseline gap-2 py-3 text-[15px]">
                      <span className="mono text-[11px]" style={{ color: "var(--orange)" }}>{s.num}</span>
                      <span className="link-u">{s.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section key={s.id} id={s.id} className="border-t py-20 sm:py-28" style={{ borderColor: "var(--line)" }}>
          <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
              <p className="eyebrow" data-reveal><span className="n">{s.num}</span> {s.short}</p>
              <Words className="h2 mt-6" text={s.name} />
              <p className="mt-6 text-[clamp(1.15rem,1.8vw,1.45rem)] font-medium leading-snug tracking-tight" data-reveal>{s.line}</p>
              <p className="mt-4 max-w-xl" style={{ color: "var(--mute)" }} data-reveal>{s.body}</p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2" data-reveal>
                <div>
                  <p className="eyebrow">What they handle</p>
                  <ul className="mt-4 space-y-2.5">
                    {s.roles.map((r) => (
                      <li key={r} className="flex gap-2.5 text-[15px]">
                        <Check size={16} className="mt-1 flex-none" style={{ color: "var(--orange)" }} /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow">What you get</p>
                  <ul className="mt-4 space-y-2.5">
                    {s.outcomes.map((o) => (
                      <li key={o} className="text-[15px]">{o}</li>
                    ))}
                  </ul>
                  <p className="eyebrow mt-8">Tools</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.tools.map((t) => <li key={t} className="chip !text-[12px]">{t}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : ""}`} data-reveal="scale">
              <div className="rounded-[28px] p-3 sm:p-5" style={{ background: "var(--paper-2)" }}>
                <Viz kind={s.viz} className="aspect-[4/3.2]" />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t py-20 sm:py-28" style={{ borderColor: "var(--line)" }}>
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Words className="h2" text="Not sure which | you *need?*" />
          </div>
          <div className="lg:col-span-5" data-reveal>
            <p style={{ color: "var(--mute)" }}>
              That&apos;s most people, and it&apos;s what the first call is for. Tell us what&apos;s eating your week and we&apos;ll tell you honestly
              which role would take it off your plate, or if you don&apos;t need one yet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-orange">Book a call <Arrow size={16} className="arr" /></a>
              <Link href="/contact/" className="btn btn-line">Send a brief</Link>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
