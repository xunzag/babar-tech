"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const FACTS = [
  { label: "Founded",       value: "2024"      },
  { label: "Job Success",   value: "100%"      },
  { label: "Upwork Badge",  value: "Top Rated" },
  { label: "All Reviews",   value: "5.0 ★"    },
  { label: "Response Time", value: "< 2 hours" },
  { label: "Onboarding",    value: "24 hours"  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

      <div className="w-full grid lg:grid-cols-2" style={{ alignItems: "stretch" }}>

        {/* ── LEFT: Content ── */}
        <div
          className="flex flex-col justify-center px-8 md:px-14 xl:px-20 py-20"
          style={{ borderRight: "1px solid var(--border)" }}
        >
          <div className="section-label mb-10">About the Agency</div>

          <h2
            className="font-bold mb-7"
            style={{
              fontSize: "clamp(2.25rem, 4vw, 3.75rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            One team.
            <br />
            <span style={{ color: "var(--accent)" }}>Every discipline.</span>
          </h2>

          <p className="mb-5 max-w-md" style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
            Babar Tech Solutions was founded by{" "}
            <span style={{ color: "var(--text)", fontWeight: 600 }}>Fahad Ali</span> in 2024 as a
            remote-first agency on Upwork. What started as solo freelancing became a structured team
            of vetted specialists — each expert in their vertical, all working under one accountable roof.
          </p>
          <p className="mb-12 max-w-md" style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.75 }}>
            We operate globally, serve businesses of every size, and hold ourselves to a single
            standard: every client gets the same quality we would demand ourselves.
          </p>

          {/* Fact grid */}
          <div
            className="mb-12 grid grid-cols-2 sm:grid-cols-3 gap-px"
            style={{ border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}
          >
            {FACTS.map((f) => (
              <div
                key={f.label}
                className="flex flex-col gap-1 px-5 py-4"
                style={{ background: "var(--bg-surface)" }}
              >
                <span className="font-bold" style={{ color: "var(--text)", fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
                  {f.value}
                </span>
                <span style={{ fontSize: "11px", color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/team"
            className="group inline-flex items-center gap-2 font-semibold text-sm"
            style={{ color: "var(--accent)" }}
          >
            Meet the full team
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ── RIGHT: Fahad photo — centered card, not edge-glued ── */}
        <div
          className="hidden lg:flex flex-col items-center justify-center py-16 px-12"
          style={{ background: "var(--bg-elevated)", position: "relative", overflow: "hidden" }}
        >
          {/* Large logo bleeding behind the photo */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0.07 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-final.jpg" alt="" aria-hidden
              style={{
                width: "340px",
                height: "340px",
                objectFit: "cover",
                borderRadius: "48px",
              }}
            />
          </div>
          {/* Card wrapper — fixed width so photo never over-scales */}
          <div
            style={{
              width: "100%",
              maxWidth: "360px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/fahad.jpg"
              alt="Fahad Ali — CEO & Founder, Babar Tech Solutions"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
                objectPosition: "center top",
                maxHeight: "460px",
              }}
            />
            {/* Name nameplate */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}
            >
              <div>
                <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>Fahad Ali</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--accent)" }}>CEO & Founder</div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>Available</span>
              </div>
            </div>
          </div>

          {/* Subtle logo watermark below card */}
          <div className="mt-8 flex items-center gap-2 opacity-30" style={{ position: "relative", zIndex: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-final.jpg" alt="" width={28} height={28} style={{ borderRadius: "6px" }} aria-hidden />
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)", fontWeight: 600 }}>
              Babar Tech Solutions
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
