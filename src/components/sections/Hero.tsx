"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const CYCLING_WORDS = ["tomorrow.", "in 24h.", "today.", "fast."];

function WordCycler() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(i => (i + 1) % CYCLING_WORDS.length); setVisible(true); }, 380);
    }, 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{
      color: "var(--accent)", display: "inline-block",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-10px)",
      transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
    }}>
      {CYCLING_WORDS[index]}
    </span>
  );
}

/* ── Logo — clean neon float, no rings or lightning ── */
function LogoCell() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [10, -10]), { stiffness: 50, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), { stiffness: 50, damping: 18 });

  return (
    <div ref={wrapRef} className="w-full h-full flex items-center justify-center"
      style={{ perspective: "900px", position: "relative" }}
      onMouseMove={(e) => {
        const r = wrapRef.current?.getBoundingClientRect();
        if (!r) return;
        mouseX.set((e.clientX - r.left - r.width / 2) / (r.width / 2));
        mouseY.set((e.clientY - r.top - r.height / 2) / (r.height / 2));
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.038) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Breathing colour wash — diffuse, not circular */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 80% 55% at 48% 50%, rgba(240,101,41,0.12) 0%, transparent 65%)",
            "radial-gradient(ellipse 55% 80% at 52% 50%, rgba(20,100,204,0.1) 0%, transparent 65%)",
          ].join(", "),
        }}
        animate={{ opacity: [0.7, 1, 0.55, 0.9, 0.7] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative", zIndex: 2, willChange: "transform" }}
        animate={{ y: [0, -16, -5, -20, -3, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/transparent-hero.png" alt="Babar Tech Solutions" loading="eager"
          style={{
            width: 340, height: 340, objectFit: "contain", display: "block",
            filter: [
              "drop-shadow(0 0 22px rgba(240,101,41,0.92))",
              "drop-shadow(0 0 60px rgba(240,101,41,0.38))",
              "drop-shadow(0 0 100px rgba(20,100,204,0.58))",
            ].join(" "),
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img src="/transparent-hero.png" alt="" aria-hidden loading="eager"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "contain", filter: "blur(14px)", mixBlendMode: "screen",
            pointerEvents: "none", willChange: "opacity",
          }}
          animate={{ opacity: [0.25, 0.52, 0.18, 0.44, 0.25] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

/* ── Cell wrapper ── */
function Cell({ children, style, hover = true }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.007 } : undefined}
      transition={{ duration: 0.2 }}
      style={{ borderRadius: 14, border: "1px solid var(--border)", background: "var(--bg-surface)", overflow: "hidden", position: "relative", ...style }}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { value: "100%",      label: "Job Success Score",    color: "#F06529" },
  { value: "5.0 ★",     label: "Average Rating",       color: "#1464CC" },
  { value: "Top Rated", label: "Upwork Agency Badge",  color: "#F06529" },
  { value: "14+",       label: "Verified Reviews",     color: "#1464CC" },
];

const MARQUEE_ITEMS = [
  "Customer Service", "Virtual Assistance", "Sales Support",
  "Web Development", "Customer Success", "Operations",
  "Lead Generation", "Project Management", "CRM Systems",
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden"
      style={{ background: "var(--bg)", minHeight: "calc(100vh - 63px)", padding: "8px" }}>

      {/* ── Desktop bento ── */}
      <div className="hidden lg:grid w-full"
        style={{
          gridTemplateColumns: "1.85fr 1.5fr 1.1fr",
          gridTemplateRows: "1fr 0.55fr 42px",
          gridTemplateAreas: '"headline logo stats" "cta logo available" "ticker ticker ticker"',
          gap: "7px",
          minHeight: "calc(100vh - 79px)",
        }}
      >

        {/* ── Headline ── */}
        <Cell style={{ gridArea: "headline", padding: "2.75rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(240,101,41,0.07) 0%, transparent 65%)" }} />
          <div className="section-label mb-6" style={{ position: "relative" }}>
            Top Rated Upwork Agency · Est. 2024
          </div>
          <h1 style={{ lineHeight: 1.04, letterSpacing: "-0.035em", position: "relative" }} className="mb-6">
            <span className="block font-bold" style={{ fontSize: "clamp(2.4rem, 3.5vw, 4.25rem)", color: "var(--text)" }}>
              Remote specialists,
            </span>
            <span className="block font-bold" style={{ fontSize: "clamp(2.4rem, 3.5vw, 4.25rem)", color: "var(--text)" }}>
              ready to work
            </span>
            <span className="block font-bold" style={{ fontSize: "clamp(2.4rem, 3.5vw, 4.25rem)" }}>
              <WordCycler />
            </span>
          </h1>
          <div style={{ width: "2.5rem", height: "1px", background: "var(--border-strong)", marginBottom: "1.25rem", position: "relative" }} />
          <p style={{ fontSize: "0.925rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "400px", position: "relative" }}>
            Fully vetted remote talent in customer service, virtual assistance,
            sales support and web development. No contracts, onboarded in 24h.
          </p>
        </Cell>

        {/* ── Logo — spans 2 rows ── */}
        <Cell hover={false} style={{ gridArea: "logo", background: "var(--bg-elevated)" }}>
          <LogoCell />
        </Cell>

        {/* ── Stats — editorial vertical list ── */}
        <Cell style={{ gridArea: "stats", display: "flex", flexDirection: "column" }}>
          <div className="px-5 pt-5 pb-3">
            <div className="section-label">Verified track record</div>
          </div>
          <div className="flex flex-col flex-1">
            {STATS.map((s, i) => (
              <div key={s.label}
                className="flex items-center justify-between flex-1 px-5 py-0"
                style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined, minHeight: 0 }}
              >
                <div>
                  <div className="font-black leading-none"
                    style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", color: s.color, letterSpacing: "-0.03em" }}>
                    {s.value}
                  </div>
                  <div className="text-xs mt-1 leading-tight" style={{ color: "var(--text-subtle)" }}>
                    {s.label}
                  </div>
                </div>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, opacity: 0.4, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </Cell>

        {/* ── CTA ── */}
        <Cell style={{ gridArea: "cta", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.6rem" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 100% 100%, rgba(240,101,41,0.07) 0%, transparent 65%)" }} />
          <Link href="/contact" className="btn-accent flex items-center justify-between gap-2 text-sm" style={{ position: "relative" }}>
            <span>Start a Project</span><ArrowRight className="w-4 h-4" />
          </Link>
          <a href="https://calendly.com/farhan-babar123/30min" target="_blank" rel="noopener noreferrer"
            className="btn-ghost flex items-center justify-between gap-2 text-sm" style={{ position: "relative" }}>
            <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4" />Book a Call</span>
            <ArrowRight className="w-4 h-4 opacity-40" />
          </a>
          <a href="https://www.upwork.com/agencies/babartechsolutions/" target="_blank" rel="noopener noreferrer"
            className="text-xs transition-colors duration-150 text-center mt-1" style={{ color: "var(--text-subtle)", position: "relative" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-subtle)")}
          >
            View Upwork profile →
          </a>
        </Cell>

        {/* ── Available / trust ── */}
        <Cell style={{ gridArea: "available", padding: "1.25rem 1.75rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.75rem" }}>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>Available now</span>
            <span className="text-xs" style={{ color: "var(--text-subtle)" }}>· Onboard in 24h</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="flex items-center gap-1.5">
              <img src="/upwork%20logo.png" alt="Upwork" width={16} height={16} style={{ borderRadius: "50%", opacity: 0.9 }} />
              <span className="text-xs" style={{ color: "var(--text-subtle)" }}>100% JSS · 5.0★</span>
            </div>
            <div style={{ width: 1, height: 12, background: "var(--border)", flexShrink: 0 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="flex items-center gap-1.5">
              <img src="/Google_G_logo.svg.png" alt="Google" width={13} height={13} style={{ borderRadius: "3px", opacity: 0.9 }} />
              <span className="text-xs" style={{ color: "var(--text-subtle)" }}>5.0★</span>
            </div>
          </div>
        </Cell>

        {/* ── Ticker ── */}
        <Cell hover={false}
          style={{ gridArea: "ticker", display: "flex", alignItems: "center", overflow: "hidden", padding: 0, borderRadius: 10 }}>
          <div className="relative w-full h-full overflow-hidden flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-14 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, var(--bg-surface), transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-14 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, var(--bg-surface), transparent)" }} />
            <motion.div
              className="flex items-center flex-shrink-0 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="flex items-center gap-3 px-5">
                  <span className="text-xs font-medium uppercase tracking-[0.13em]" style={{ color: "var(--text-subtle)" }}>
                    {item}
                  </span>
                  <span style={{ color: "var(--accent)", fontSize: "0.55rem" }}>◆</span>
                </span>
              ))}
            </motion.div>
          </div>
        </Cell>

      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden flex flex-col gap-2.5 pt-2">
        <Cell style={{ padding: "1.75rem 1.5rem" }}>
          <div className="section-label mb-4">Top Rated Upwork Agency · Est. 2024</div>
          <h1 style={{ lineHeight: 1.06, letterSpacing: "-0.03em" }} className="mb-4">
            <span className="block font-bold" style={{ fontSize: "clamp(2rem, 7.5vw, 3rem)", color: "var(--text)" }}>Remote specialists,</span>
            <span className="block font-bold" style={{ fontSize: "clamp(2rem, 7.5vw, 3rem)", color: "var(--text)" }}>ready to work</span>
            <span className="block font-bold" style={{ fontSize: "clamp(2rem, 7.5vw, 3rem)" }}><WordCycler /></span>
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
            Fully vetted remote talent. No contracts, onboarded in 24h.
          </p>
        </Cell>
        <Cell hover={false} style={{ height: 300, background: "var(--bg-elevated)" }}>
          <LogoCell />
        </Cell>
        <Cell style={{ padding: 0 }}>
          <div className="grid grid-cols-2">
            {STATS.map((s, i) => (
              <div key={s.label} className="px-5 py-4"
                style={{ borderBottom: i < 2 ? "1px solid var(--border)" : undefined, borderRight: i % 2 === 0 ? "1px solid var(--border)" : undefined }}>
                <div className="font-black text-xl mb-1" style={{ color: s.color, letterSpacing: "-0.03em" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "var(--text-subtle)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          <Link href="/contact" className="btn-accent flex items-center justify-center gap-2 text-sm">
            Start a Project <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="https://calendly.com/farhan-babar123/30min" target="_blank" rel="noopener noreferrer"
            className="btn-ghost flex items-center justify-center gap-2 text-sm">
            <CalendarDays className="w-4 h-4" /> Book a Call
          </a>
        </Cell>
      </div>

    </section>
  );
}
