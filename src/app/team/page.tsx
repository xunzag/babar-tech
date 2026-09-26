import type { Metadata } from "next";
import { CTA, Eyebrow } from "@/site/Blocks";
import { REVIEWS, TEAM } from "@/site/content";
import { Star } from "@/site/Icons";
import Words from "@/site/Words";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the people behind Babar Tech Solutions: founder Fahad Ali and the specialists in customer service, sales, virtual assistance, customer success and operations.",
  alternates: { canonical: "/team/" },
};

export default function TeamPage() {
  const [founder, ...crew] = TEAM;
  return (
    <>
      <section className="pt-[calc(var(--nav-h)+48px)] sm:pt-[calc(var(--nav-h)+80px)]">
        <div className="wrap">
          <Eyebrow>Team</Eyebrow>
          <Words as="h1" className="display mt-8 max-w-[12ch]" text="Small team. | *Senior* people." />
          <p className="lede mt-10 max-w-2xl" data-reveal>
            Everyone here is someone Fahad hired, trained and still works alongside. When you bring us in, these are the people doing the work,
            not a rotating bench of strangers.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section id={founder.slug} className="py-20 sm:py-28">
        <div className="wrap grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal="scale">
            <div className="photo aspect-[4/5] rounded-[28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={founder.photo} alt={`${founder.name}, ${founder.role}`} width={400} height={500} />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal><span className="n">01</span> {founder.role}</p>
            <Words className="h2 mt-6" text={founder.name} />
            <blockquote className="mt-10 text-[clamp(1.4rem,2.8vw,2.3rem)] font-medium leading-[1.15] tracking-[-0.025em]" data-reveal>
              &ldquo;If we wouldn&apos;t be proud to show the work to our best client, it doesn&apos;t ship.&rdquo;
            </blockquote>
            <p className="mt-8 max-w-xl" style={{ color: "var(--mute)" }} data-reveal>{founder.bio}</p>
            <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
              {founder.skills.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Specialists */}
      <section className="pb-24 sm:pb-36">
        <div className="wrap">
          {crew.map((m, i) => {
            const review = REVIEWS.find((r) => m.name.startsWith(r.who));
            return (
              <article key={m.slug} id={m.slug} className="group grid gap-8 border-t py-12 sm:py-16 md:grid-cols-12 md:gap-10" style={{ borderColor: "var(--line)" }}>
                <div className="md:col-span-4 lg:col-span-3" data-reveal>
                  <div className="photo photo-mono aspect-[4/5] max-w-[340px] rounded-[22px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.photo}
                      srcSet={m.photoLarge ? `${m.photo} 400w, ${m.photoLarge} 720w` : undefined}
                      sizes="(min-width: 768px) 25vw, 90vw"
                      alt={`${m.name}, ${m.role}`}
                      width={400}
                      height={500}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="md:col-span-8 lg:col-span-9 lg:grid lg:grid-cols-9 lg:gap-10">
                  <div className="lg:col-span-5">
                    <p className="eyebrow" data-reveal><span className="n">0{i + 2}</span> {m.focus}</p>
                    <h2 className="h3 mt-4 !text-[clamp(2rem,3.6vw,3.25rem)]" data-reveal>{m.name}</h2>
                    <p className="mt-1" style={{ color: "var(--mute)" }} data-reveal>{m.role}</p>
                    <p className="mt-6 text-[clamp(1.1rem,1.6vw,1.3rem)] font-medium leading-snug tracking-tight" data-reveal>{m.line}</p>
                    <p className="mt-4 max-w-lg" style={{ color: "var(--mute)" }} data-reveal>{m.bio}</p>
                    <ul className="mt-6 flex flex-wrap gap-2" data-reveal>
                      {m.skills.map((s) => <li key={s} className="chip">{s}</li>)}
                    </ul>
                  </div>
                  {review && (
                    <figure className="mt-10 self-end rounded-[20px] p-6 lg:col-span-4 lg:mt-0" style={{ background: "var(--card)", border: "1px solid var(--line)" }} data-reveal>
                      <div className="flex gap-0.5" style={{ color: "var(--orange)" }} aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, j) => <Star key={j} />)}
                      </div>
                      <blockquote className="mt-3 text-[15px] leading-relaxed">&ldquo;{review.quote}&rdquo;</blockquote>
                      <figcaption className="mono mt-4 text-[11px] uppercase tracking-[0.06em]" style={{ color: "var(--faint)" }}>
                        Upwork client · {review.project}
                      </figcaption>
                    </figure>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <CTA />
    </>
  );
}
