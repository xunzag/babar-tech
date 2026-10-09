import type { Metadata } from "next";
import { pageMeta } from "@/site/meta";
import { CTA, Eyebrow } from "@/site/Blocks";
import { SERVICES } from "@/site/content";
import Builder from "@/site/services/Builder";
import Chapter from "@/site/services/Chapter";
import Photo from "@/site/Photo";
import Words from "@/site/Words";

export const metadata: Metadata = {
  ...pageMeta({ title: "Remote Staffing Services · Babar Tech Solutions", description: "Customer support, virtual assistants, sales and lead generation, customer success, operations and web development. Vetted specialists, working in 24 hours.", path: "/services/", image: "/og/services.jpg" }),
  title: "Remote Staffing Services",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-[calc(var(--nav-h)+48px)] pb-16 sm:pt-[calc(var(--nav-h)+80px)] sm:pb-24">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
          <Eyebrow>Services</Eyebrow>
          <Words as="h1" className="display mt-8 max-w-[14ch] !text-[clamp(3rem,7.4vw,7.2rem)]" text="Help for every desk | that's *overflowing.*" />
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
          <figure className="relative mx-auto w-full max-w-[420px] lg:col-span-4 lg:max-w-none" data-reveal="scale">
            <div className="overflow-hidden rounded-[28px]" style={{ aspectRatio: "4 / 5", boxShadow: "0 40px 80px -40px rgb(15 17 20 / .35)" }}>
              <div className="h-full w-full" data-parallax="0.05">
                <Photo name="services-ribbon" alt="A paper ribbon sculpture curving from cobalt blue to orange, echoing the Babar Tech logo" sizes="(min-width: 1024px) 34vw, 90vw" eager className="h-full w-full scale-[1.08] object-cover" />
              </div>
            </div>
          </figure>
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
