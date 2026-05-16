"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, MessageSquare } from "lucide-react";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.35 }} />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(240,101,41,0.05) 0%, transparent 100%)" }}
      />

      <div className="relative z-10 w-full grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] min-h-[420px]">

        {/* ── LEFT: Headline ── */}
        <div
          className="flex flex-col justify-center px-8 md:px-14 xl:px-20 py-20"
          style={{ borderRight: "1px solid var(--border)" }}
        >
          <div className="section-label mb-8">Ready to Start</div>

          <h2
            className="font-bold mb-5"
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "var(--text)",
            }}
          >
            Let&apos;s build something
            <br />
            <span style={{ color: "var(--accent)" }}>that ships.</span>
          </h2>

          <p
            className="max-w-md"
            style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.7 }}
          >
            From a single project to a full remote workforce — Babar Tech Solutions delivers
            with precision and care. Start the conversation today.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8">
            {["No long-term commitment", "Fast onboarding", "100% satisfaction"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                <span style={{ fontSize: "0.8rem", color: "var(--text-subtle)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: CTA buttons ── */}
        <div
          className="hidden lg:flex flex-col justify-center gap-4 px-10 xl:px-12 py-20"
          style={{ background: "var(--bg-surface)" }}
        >
          <a
            href="mailto:hello@babartechsolutions.com"
            className="btn-accent flex items-center justify-between gap-3 text-sm group"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="https://calendly.com/babartechsolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Book a Call
            </span>
            <ArrowRight className="w-4 h-4 opacity-40" />
          </a>

          <a
            href="https://www.upwork.com/agencies/babartechsolutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Hire on Upwork
            </span>
            <ArrowRight className="w-4 h-4 opacity-40" />
          </a>

          <div className="mt-2 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span style={{ fontSize: "0.8rem", color: "var(--text-subtle)" }}>
                Available now · Onboarded within 24 hours
              </span>
            </div>
          </div>
        </div>

        {/* Mobile CTA (shown only when sidebar is hidden) */}
        <div className="lg:hidden flex flex-col gap-3 px-8 md:px-14 pb-16">
          <a
            href="mailto:hello@babartechsolutions.com"
            className="btn-accent flex items-center justify-center gap-2 text-sm"
          >
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://calendly.com/babartechsolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex items-center justify-center gap-2 text-sm"
          >
            <CalendarDays className="w-4 h-4" /> Book a Call
          </a>
        </div>

      </div>
    </section>
  );
}
