import type { Metadata } from "next";
import { pageMeta } from "@/site/meta";
import { CTA, Eyebrow } from "@/site/Blocks";
import { SERVICES } from "@/site/content";
import Builder from "@/site/services/Builder";
import Chapter from "@/site/services/Chapter";
import Words from "@/site/Words";

export const metadata: Metadata = {
  ...pageMeta({ title: "Remote Staffing Services · Babar Tech Solutions", description: "Customer support, virtual assistants, sales and lead generation, customer success, operations and web development. Vetted specialists, working in 24 hours.", path: "/services/", image: "/og/services.jpg" }),
  title: "Remote Staffing Services",
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
                      <span className="mono text-[11px]" style={{ color: "var(--orange-ink)" }}>{s.num}</span>
                      <span className="link-u">{s.name}</span>
                    </a>
                  </li>
                ))}
                <li className="col-span-2 border-t sm:col-span-3" style={{ borderColor: "var(--line)" }}>
                  <a href="#build" className="flex items-baseline gap-2 py-3 text-[15px] font-medium">
                    <span className="mono text-[11px]" style={{ color: "var(--orange-ink)" }}>→</span>
                    <span className="link-u">Build your team in thirty seconds</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <Chapter key={s.id} s={s} index={i} total={SERVICES.length} />
      ))}

      <Builder />
      <CTA />
    </>
  );
}
