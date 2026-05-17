"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import SilkCanvas from "@/components/common/SilkCanvas";

const STATS = [
  { value: "100%",      label: "Job Success Score" },
  { value: "Top Rated", label: "Upwork Badge"       },
  { value: "5.0★",      label: "All Reviews"        },
  { value: "< 2h",      label: "Response Time"      },
];


const CYCLING_WORDS = ["tomorrow.", "in 24h.", "today.", "fast."];

function WordCycler() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % CYCLING_WORDS.length);
        setVisible(true);
      }, 380);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        color: "var(--accent)",
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(-12px)",
        transition: "opacity 0.38s cubic-bezier(0.4,0,0.2,1), transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        minWidth: "6ch",
      }}
    >
      {CYCLING_WORDS[index]}
    </span>
  );
}

/* Subtle logo-colour geometric decoration — SVG dots + arcs */
function HeroDecoration() {
  return (
    <svg
      className="absolute pointer-events-none select-none"
      style={{ right: "calc(420px + 40px)", top: "15%", width: 220, height: 220, opacity: 0.07, zIndex: 2 }}
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden
    >
      <circle cx="110" cy="110" r="90" stroke="#1464CC" strokeWidth="1.5" strokeDasharray="6 10" />
      <circle cx="110" cy="110" r="58" stroke="#F06529" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx="110" cy="22" r="5" fill="#1464CC" />
      <circle cx="198" cy="110" r="5" fill="#F06529" />
      <circle cx="110" cy="198" r="5" fill="#1464CC" />
      <circle cx="22" cy="110" r="5" fill="#F06529" />
      <line x1="110" y1="22" x2="198" y2="110" stroke="#1464CC" strokeWidth="0.8" />
      <line x1="198" y1="110" x2="110" y2="198" stroke="#F06529" strokeWidth="0.8" />
      <line x1="110" y1="198" x2="22" y2="110" stroke="#1464CC" strokeWidth="0.8" />
      <line x1="22" y1="110" x2="110" y2="22" stroke="#F06529" strokeWidth="0.8" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Silk string canvas — follows mouse in dark mode */}
      <SilkCanvas />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.4 }} />

      {/* Orange glow — top right corner */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 65% at 100% 0%, rgba(240,101,41,0.13) 0%, transparent 60%)" }} />
      {/* Blue glow — top left */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 0% 5%, rgba(20,100,204,0.11) 0%, transparent 60%)" }} />

      {/* Geometric decoration (desktop only) */}
      <HeroDecoration />

      {/* Full-width two-column grid */}
      <div className="relative z-10 w-full grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] min-h-screen">

        {/* ── LEFT: Editorial headline ── */}
        <div className="flex flex-col justify-center px-8 md:px-14 xl:px-20 pt-28 pb-16"
          style={{ borderRight: "1px solid var(--border)" }}>

          <div className="section-label mb-10">
            Top Rated Upwork Agency · Est. 2024
          </div>

          <h1 className="mb-7" style={{ lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            <span className="reveal-line block font-bold"
              style={{ fontSize: "clamp(3rem, 6vw, 5.75rem)", color: "var(--text)" }}>
              Remote specialists,
            </span>
            <span className="reveal-line block font-bold"
              style={{ fontSize: "clamp(3rem, 6vw, 5.75rem)", color: "var(--text)" }}>
              ready to work
            </span>
            <span className="reveal-line block font-bold"
              style={{ fontSize: "clamp(3rem, 6vw, 5.75rem)" }}>
              <WordCycler />
            </span>
          </h1>

          <p className="reveal-line mb-10 max-w-lg"
            style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.7, animationDelay: "0.46s" }}>
            Customer service, virtual assistance, sales support and web
            development — fully vetted, no contracts, onboarded within 24&nbsp;hours.
          </p>

          <div className="reveal-line flex flex-wrap gap-3 mb-16" style={{ animationDelay: "0.58s" }}>
            <Link href="/contact" className="btn-accent flex items-center gap-2 text-sm">
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://calendly.com/farhan-babar123/30min" target="_blank" rel="noopener noreferrer"
              className="btn-ghost flex items-center gap-2 text-sm">
              <CalendarDays className="w-4 h-4" /> Book a Call
            </a>
          </div>

          {/* Stats row */}
          <div className="reveal-line flex flex-wrap gap-x-10 gap-y-5 pt-8"
            style={{ borderTop: "1px solid var(--border)", animationDelay: "0.7s" }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-bold text-2xl" style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>
                  {s.value}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Social proof trust panel ── */}
        <div
          className="hidden lg:flex flex-col justify-between px-10 xl:px-12 pt-28 pb-14 gap-6"
          style={{ background: "var(--bg-surface)" }}
        >

          {/* ── Upwork card ── */}
          <div>
            <div className="section-label mb-6">Verified & Trusted</div>

            <div
              className="p-5 rounded-2xl mb-4"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/upwork%20logo.png" alt="Upwork" width={36} height={36} style={{ borderRadius: "50%" }} />
                <div className="flex-1">
                  <div className="text-sm font-bold" style={{ color: "var(--text)" }}>Upwork · Top Rated Agency</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>Identity & credentials verified</div>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: "rgba(16,185,129,0.12)", color: "#0d9e6e", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  ✓ Verified
                </span>
              </div>
              <div className="flex gap-8">
                {[
                  { value: "100%",  label: "Job Success" },
                  { value: "5.0 ★", label: "All Reviews"  },
                  { value: "14+",   label: "Reviews"       },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-bold text-xl" style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>{s.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google business row */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Google_G_logo.svg.png" alt="Google" width={34} height={34} style={{ borderRadius: "6px" }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>Google Business</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#FBBC05">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                  <span className="text-xs ml-1" style={{ color: "var(--text-subtle)" }}>5.0 verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── What we handle ── */}
          <div>
            <div className="label-tag mb-3">What we handle</div>
            <div className="flex flex-col">
              {[
                "Customer Service & Support",
                "Virtual Assistance",
                "Sales Support & Lead Generation",
                "Web & Software Development",
                "Customer Success & Retention",
                "Operations & Project Management",
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5 hover-row rounded-lg px-2 -mx-2"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer strip ── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="text-xs" style={{ color: "var(--text-subtle)" }}>Available now · Onboard within 24h</span>
            </div>
            <a
              href="https://www.upwork.com/agencies/babartechsolutions/"
              target="_blank" rel="noopener noreferrer"
              className="text-xs transition-colors duration-150"
              style={{ color: "var(--text-subtle)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-subtle)")}>
              View our Upwork profile →
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
