"use client";

import { BadgeCheck, Clock, Globe, ShieldCheck, CheckCircle2, Zap } from "lucide-react";

const STATS = [
  { value: "100%",       label: "Job Success Score"  },
  { value: "Top Rated",  label: "Upwork Badge"        },
  { value: "5.0 ★",     label: "Average Review"      },
  { value: "< 2h",      label: "Response Time"       },
];

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Verified by Upwork",
    desc: "100% Job Success Score and Top Rated badge — earned through consistent client satisfaction, not inflated.",
  },
  {
    icon: Globe,
    title: "Global, async-ready",
    desc: "Remote-first team covering all time zones. You get real coverage without paying for a local overhead.",
  },
  {
    icon: Zap,
    title: "Onboarded in 24 hours",
    desc: "No three-week hiring cycles. Your specialist is briefed and actively working within one business day.",
  },
  {
    icon: Clock,
    title: "Deadline discipline",
    desc: "We treat your timelines as non-negotiable. On-time delivery is a cultural expectation here, not a promise.",
  },
  {
    icon: CheckCircle2,
    title: "No long-term lock-in",
    desc: "Start with one project or one person, scale the engagement as trust builds. No contracts required.",
  },
  {
    icon: BadgeCheck,
    title: "One point of contact",
    desc: "Fahad and the team handle coordination so you never chase multiple freelancers across different platforms.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

      {/* ── Stats strip ── */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 px-8 md:px-14 xl:px-20 py-10"
            style={{
              borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : undefined,
            }}
          >
            <span
              className="font-bold"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", color: "var(--text)" }}
            >
              {s.value}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Body: label + reasons ── */}
      <div className="px-8 md:px-14 xl:px-20 py-16">
        <div className="section-label mb-10">Why Babar Tech</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
          style={{ border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
          {REASONS.map((r, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 p-6 transition-colors duration-150"
              style={{
                background: "var(--bg-surface)",
                borderRight: (i % 3 !== 2) ? "1px solid var(--border)" : undefined,
                borderBottom: i < 3 ? "1px solid var(--border)" : undefined,
              }}
            >
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
              >
                <r.icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3
                  className="font-semibold mb-1.5"
                  style={{ fontSize: "0.9375rem", color: "var(--text)" }}
                >
                  {r.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fahad quote */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-xl"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden"
            style={{ border: "1px solid var(--border-strong)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/team/fahad.jpg" alt="Fahad Ali" className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.7 }}>
              &ldquo;We built this agency around one principle — if we wouldn&apos;t be proud to show the work
              to our best client, it doesn&apos;t ship. Every person on this team holds that standard.&rdquo;
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }}>Fahad Ali</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>CEO & Founder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
