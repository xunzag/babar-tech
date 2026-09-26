import Link from "next/link";
import { CTA, Eyebrow, FAQ } from "@/site/Blocks";
import { FAQ as FAQS, RECORD, SITE, TEAM } from "@/site/content";
import HoursTool from "@/site/home/HoursTool";
import Process from "@/site/home/Process";
import Reviews from "@/site/home/Reviews";
import ServiceStage from "@/site/home/ServiceStage";
import { Arrow, ArrowUR, Check, Close } from "@/site/Icons";
import LiveDesk from "@/site/LiveDesk";
import Ribbon from "@/site/Ribbon";
import Words from "@/site/Words";

const ROLES = [
  "Customer support reps", "Executive assistants", "Cold callers", "Appointment setters", "Customer success managers",
  "Project coordinators", "E-commerce operations", "Full-stack developers", "Automation builders", "Help-desk agents",
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+40px)] sm:pt-[calc(var(--nav-h)+64px)]">
        <Ribbon className="absolute -right-[60%] top-[44%] h-[900px] w-[190%] opacity-90 sm:-right-[20%] sm:w-[130%] lg:inset-x-0 lg:top-0 lg:right-0 lg:h-[1100px] lg:w-full" />
        <div className="wrap relative">
          <p className="eyebrow" data-reveal>
            <span className="dot-live" /> Top Rated on Upwork · {RECORD.jss} Job Success · {RECORD.rating}★ from {RECORD.reviews} reviews
          </p>
          <Words as="h1" className="display mt-7 sm:mt-9" text="Your next hire | starts *tomorrow.*" />

          <div className="mt-10 grid gap-12 sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5 lg:pt-4">
              <p className="lede max-w-[34rem]" data-reveal style={{ ["--d" as string]: 250 }}>
                Babar Tech Solutions places vetted support reps, assistants, sales callers, coordinators and developers with
                businesses in the US, UK, Europe and Australia. Matched the same day, working within 24 hours, managed by us.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-reveal style={{ ["--d" as string]: 350 }}>
                <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-orange">
                  Book a free 30-min call <Arrow size={16} className="arr" />
                </a>
                <Link href="/services/" className="btn btn-line">See what we do</Link>
              </div>

              <div className="mt-12 flex items-center gap-4" data-reveal style={{ ["--d" as string]: 450 }}>
                <div className="flex -space-x-2.5">
                  {TEAM.map((m) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={m.slug} src={m.photo} alt={m.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" style={{ boxShadow: "0 0 0 3px var(--paper)" }} />
                  ))}
                </div>
                <p className="text-[14px] leading-snug" style={{ color: "var(--mute)" }}>
                  <span style={{ color: "var(--ink)" }} className="font-medium">A small, senior team.</span>
                  <br />Led by founder Fahad Ali.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7" data-reveal="scale" style={{ ["--d" as string]: 300 }}>
              <div data-tilt="3">
                <LiveDesk />
              </div>
            </div>
          </div>
        </div>

        {/* Roles marquee */}
        <div className="relative mt-20 border-y py-5 sm:mt-28" style={{ borderColor: "var(--line)", background: "var(--paper)" }} aria-label="Roles we staff">
          <div className="marquee" data-anim>
            <div className="marquee__track" style={{ ["--dur" as string]: "55s" }}>
              {[0, 1].map((dup) => (
                <ul key={dup} className="flex flex-none items-center" aria-hidden={dup === 1}>
                  {ROLES.map((r) => (
                    <li key={r} className="flex items-center gap-8 pr-8 text-[clamp(1.1rem,2vw,1.5rem)] tracking-tight whitespace-nowrap">
                      {r}
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--orange)" }} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Record ───────────── */}
      <section className="py-20 sm:py-28">
        <div className="wrap">
          <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {[
              { v: RECORD.jss, l: "Job Success Score on Upwork" },
              { v: `${RECORD.rating}`, l: `Average rating, all ${RECORD.reviews} reviews five stars` },
              { v: RECORD.hours, l: "Hours logged on reviewed contracts" },
              { v: "24h", l: "From first call to first task" },
            ].map((s, i) => (
              <div key={s.l} className="pr-6 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0" style={{ borderColor: "var(--line)", ["--d" as string]: i * 90 }} data-reveal>
                <p className="display tnum !text-[clamp(3rem,6vw,5.5rem)]"><span data-count>{s.v}</span></p>
                <p className="mt-3 max-w-[16rem] text-[14px]" style={{ color: "var(--mute)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Services ───────────── */}
      <section id="services" className="pb-12 sm:pb-24">
        <div className="wrap">
          <div className="grid gap-8 pb-12 lg:grid-cols-12 lg:pb-8">
            <div className="lg:col-span-7">
              <Eyebrow n="01">What we do</Eyebrow>
              <Words className="h2 mt-6" text="Six kinds of help. | One team *accountable.*" />
            </div>
            <p className="lede self-end lg:col-span-5" data-reveal>
              Most clients start with one role and add a second within a few months. Everyone reports to the same place, so nothing falls between desks.
            </p>
          </div>
          <ServiceStage />
        </div>
      </section>

      {/* ───────────── Hours ───────────── */}
      <section id="hours" className="py-24 sm:py-32" style={{ background: "var(--paper-2)" }} data-expand>
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow n="02">Time zones</Eyebrow>
            <Words className="h2 mt-6" text="We keep | *your* hours." />
            <p className="mt-6 max-w-sm" style={{ color: "var(--mute)" }} data-reveal>
              The team is based in Pakistan and works the shift your business needs. Pick your city and see how the day lines up, including
              the overnight handoff, where work you send at 6pm is done by morning.
            </p>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <HoursTool />
          </div>
        </div>
      </section>

      {/* ───────────── Process ───────────── */}
      <section id="process" className="py-24 sm:py-36">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow n="03">How it works</Eyebrow>
              <Words className="h2 mt-6" text="From hello to handled | in *a day.*" />
            </div>
          </div>
          <div className="mt-16 sm:mt-24">
            <Process />
          </div>
        </div>
      </section>

      {/* ───────────── Compare ───────────── */}
      <section className="pb-24 sm:pb-36">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow n="04">The difference</Eyebrow>
              <Words className="h2 mt-6" text="Skip the | *hiring.*" />
              <p className="mt-6 max-w-sm" style={{ color: "var(--mute)" }} data-reveal>
                You could post a job, read fifty proposals and interview ten people. Or you could tell us what you need.
              </p>
            </div>
            <div className="overflow-hidden rounded-[22px] lg:col-span-8" style={{ border: "1px solid var(--line)" }} data-reveal>
              <div className="grid grid-cols-[1.1fr_1fr_1fr] text-[14px] sm:text-[15px]">
                <div className="p-4 sm:p-5" />
                <div className="p-4 sm:p-5 font-medium" style={{ color: "var(--mute)" }}>Hiring alone</div>
                <div className="p-4 sm:p-5 font-medium" style={{ background: "var(--ink)", color: "var(--cream)" }}>With Babar Tech</div>
                {[
                  ["Time to first day", "Weeks of posts and interviews", "About 24 hours"],
                  ["Vetting", "You, from a profile", "Done, by people who've done the job"],
                  ["When someone's out", "Work stops", "Covered by the team"],
                  ["If it's not a fit", "Start over", "We replace them"],
                  ["Management", "On you", "Weekly report + a direct line"],
                  ["Commitment", "Varies", "No lock-in"],
                ].map(([k, a, b]) => (
                  <div key={k} className="contents">
                    <div className="border-t p-4 sm:p-5 font-medium" style={{ borderColor: "var(--line)" }}>{k}</div>
                    <div className="flex gap-2 border-t p-4 sm:p-5" style={{ borderColor: "var(--line)", color: "var(--mute)" }}>
                      <Close size={16} className="mt-0.5 flex-none opacity-50 max-sm:hidden" /> {a}
                    </div>
                    <div className="flex gap-2 border-t p-4 sm:p-5" style={{ background: "var(--ink)", color: "var(--cream)", borderColor: "rgb(255 255 255 / .09)" }}>
                      <Check size={16} className="mt-0.5 flex-none max-sm:hidden" style={{ color: "var(--orange)" }} /> {b}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Team ───────────── */}
      <section id="team" className="pb-24 sm:pb-36">
        <div className="wrap">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow n="05">The people</Eyebrow>
              <Words className="h2 mt-6" text="Faces, not | *freelancer IDs.*" />
            </div>
            <Link href="/team/" className="btn btn-line self-start lg:self-auto" data-reveal>
              Meet the team <Arrow size={16} className="arr" />
            </Link>
          </div>

          <ul className="no-scrollbar -mx-[var(--gutter)] mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
            {TEAM.map((m, i) => (
              <li key={m.slug} className="group w-[62vw] max-w-[260px] flex-none snap-start lg:w-auto lg:max-w-none" data-reveal style={{ ["--d" as string]: i * 70 }}>
                <Link href={`/team/#${m.slug}`} className="block">
                  <div className="photo photo-mono aspect-[4/5] rounded-[18px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.photo} alt={`${m.name}, ${m.role}`} width={400} height={500} loading="lazy" />
                  </div>
                  <p className="mt-4 font-medium">{m.name}</p>
                  <p className="text-[14px]" style={{ color: "var(--mute)" }}>{m.role}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Reviews ───────────── */}
      <section id="reviews" className="ink relative py-24 sm:py-36" data-expand>
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow n="06">Client reviews</Eyebrow>
              <Words className="h2 mt-6" text={`${RECORD.reviews} reviews. | Every one *five stars.*`} />
            </div>
            <div className="self-end lg:col-span-5" data-reveal>
              <p style={{ color: "var(--mute)" }}>
                Quoted word for word from our public Upwork profile, where you can check every one of them.
              </p>
              <a href={SITE.upwork} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-medium">
                <span className="link-u">Verify on Upwork</span> <ArrowUR size={16} />
              </a>
            </div>
          </div>

          {/* Featured */}
          <figure className="mt-16 border-y py-12 sm:py-16" style={{ borderColor: "var(--line)" }}>
            <blockquote>
              <Words
                as="p"
                className="max-w-5xl text-[clamp(1.6rem,3.6vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.03em]"
                text="“He helped our business tremendously by retaining our customers. His retention rate was close to *98%.*”"
              />
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/team/fahad-400.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              <div className="text-[14px]">
                <p>Customer service, patient retention in medical supply</p>
                <p className="mono text-[11px] uppercase tracking-[0.06em]" style={{ color: "var(--faint)" }}>Fahad · 406 hrs · Mar – May 2025</p>
              </div>
            </figcaption>
          </figure>

          <div className="mt-14">
            <Reviews />
          </div>
        </div>
      </section>

      <FAQ n="07" />
      <CTA />
    </>
  );
}
