"use client";

const BIG_STATS = [
  { value: "100%",  label: "Job Success Score on Upwork",               color: "#F06529" },
  { value: "5.0★",  label: "Average rating, every verified review",      color: "#1464CC" },
  { value: "14+",   label: "Real client engagements, zero ghost work",   color: "#F06529" },
  { value: "24h",   label: "From brief to specialist actively working",  color: "#1464CC" },
];

const REASONS = [
  {
    n: "01",
    title: "Verified, not promised",
    desc: "100% JSS and Top Rated badge earned across 14+ client engagements. Every number is public, auditable on Upwork.",
  },
  {
    n: "02",
    title: "Async-ready from day one",
    desc: "Remote-first team covering every time zone. Real coverage without local overhead or sunrise delays on your tickets.",
  },
  {
    n: "03",
    title: "24-hour onboarding",
    desc: "No three-week hiring cycles. Your specialist is briefed and actively working within one business day of sign-off.",
  },
  {
    n: "04",
    title: "Deadlines are non-negotiable",
    desc: "On-time delivery is a cultural expectation here — not a bullet point we added to make the landing page look good.",
  },
  {
    n: "05",
    title: "No lock-in contracts",
    desc: "Start with one project or one specialist. Scale as trust builds. Leave whenever — no minimums, no exit penalties.",
  },
  {
    n: "06",
    title: "One contact, zero chasing",
    desc: "Fahad handles all coordination. You never juggle multiple freelancers or track down replies across different platforms.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }}
      />

      {/* ── Editorial headline ── */}
      <div
        className="px-8 md:px-14 xl:px-20 pt-20 pb-16"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <p className="text-xs uppercase tracking-[0.15em] mb-6" style={{ color: "var(--text-subtle)" }}>
          Why Babar Tech
        </p>
        <h2
          className="font-bold"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            maxWidth: "800px",
          }}
        >
          Not a vendor.{" "}
          <span style={{ color: "var(--accent)" }}>A team that ships.</span>
        </h2>
        <p
          className="mt-6 max-w-xl"
          style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8 }}
        >
          Every metric we carry was earned through real client work — 14 verified reviews,
          zero failed contracts, 100% job success on Upwork. The kind of track record
          you check before you trust someone with your business.
        </p>
      </div>

      {/* ── Large alternating stats ── */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {BIG_STATS.map((s, i) => (
          <div
            key={i}
            className="relative flex flex-col gap-3 px-8 md:px-12 xl:px-14 py-14"
            style={{ borderRight: i < BIG_STATS.length - 1 ? "1px solid var(--border)" : undefined }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 20% 40%, ${s.color}09 0%, transparent 65%)`,
              }}
            />
            <span
              className="relative font-black leading-none"
              style={{
                fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)",
                letterSpacing: "-0.05em",
                color: s.color,
              }}
            >
              {s.value}
            </span>
            <span
              className="relative text-xs leading-snug"
              style={{ color: "var(--text-subtle)", maxWidth: "150px" }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Numbered reasons — editorial list, no icon cards ── */}
      <div className="px-8 md:px-14 xl:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {REASONS.map((r, i) => (
            <div
              key={i}
              className="flex gap-6 py-8"
              style={{
                borderBottom: i < REASONS.length - 2 ? "1px solid var(--border)" : undefined,
                borderLeft: i % 2 === 1 ? "1px solid var(--border)" : undefined,
                paddingLeft: i % 2 === 1 ? "2.5rem" : undefined,
                paddingRight: i % 2 === 0 ? "2.5rem" : undefined,
              }}
            >
              <span
                className="font-mono font-bold flex-shrink-0 mt-0.5"
                style={{
                  fontSize: "0.75rem",
                  color: i % 2 === 0 ? "#F06529" : "#1464CC",
                  letterSpacing: "0.05em",
                }}
              >
                {r.n}
              </span>
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{ fontSize: "0.9375rem", color: "var(--text)" }}
                >
                  {r.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.75 }}>
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fahad quote */}
        <div
          className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-10"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden"
            style={{ border: "2px solid var(--accent)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/team/fahad.jpg" alt="Fahad Ali" className="w-full h-full object-cover object-top" />
          </div>
          <blockquote>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.78 }}>
              &ldquo;If we wouldn&apos;t be proud to show the work to our best client, it doesn&apos;t ship.
              Every person on this team holds that standard.&rdquo;
            </p>
            <footer className="mt-2 flex items-center gap-2">
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }}>Fahad Ali</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>CEO & Founder</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
