"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle2, Zap, Clock, Headphones, UserCheck, TrendingUp, CalendarDays } from "lucide-react";

const ROTATING_WORDS = [
  "Web Development",
  "UI/UX Design",
  "Automation",
  "Customer Support",
  "Virtual Assistance",
];

const TERMINAL_LINES = [
  { text: "$ deploying babar-tech-project...", color: "#64748B", delay: "0.4s" },
  { text: "▶  Compiling TypeScript…", color: "#FCD34D", delay: "1.1s" },
  { text: "✓  Build complete in 1.3s", color: "#34D399", delay: "1.9s" },
  { text: "✓  142 unit tests passed", color: "#34D399", delay: "2.5s" },
  { text: "✓  0 security vulnerabilities", color: "#34D399", delay: "3.1s" },
  { text: "✓  Live in production  🚀", color: "#FF6B35", delay: "3.7s" },
];

const STATS = [
  { value: "100%", label: "Job Success" },
  { value: "5.0★", label: "Upwork Rating" },
  { value: "6", label: "Specialists" },
  { value: "Top Rated", label: "Upwork Badge" },
];

const SERVICE_CARDS = [
  {
    icon: Headphones,
    title: "Customer Service",
    desc: "24/7 support & retention",
    color: "#F06529",
  },
  {
    icon: UserCheck,
    title: "Virtual Assistant",
    desc: "Inbox, calendar & ops",
    color: "#10B981",
  },
  {
    icon: TrendingUp,
    title: "Sales Support",
    desc: "Lead gen & closing",
    color: "#1666CC",
  },
];

/* ─── Blur-morph rotating word ─── */
function MorphWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const id = setInterval(() => {
      setPhase("out");
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setPhase("in");
      }, 450);
      return () => clearTimeout(t);
    }, 3000);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span
      className="text-gradient inline-block"
      style={{
        transition: "filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease",
        filter: phase === "out" ? "blur(14px)" : "blur(0px)",
        opacity: phase === "out" ? 0 : 1,
        transform: phase === "out" ? "scale(1.06) translateY(-4px)" : "scale(1) translateY(0)",
        willChange: "filter, opacity, transform",
      }}
    >
      {words[index]}
    </span>
  );
}

/* ─── Compact terminal card ─── */
function TerminalCard() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden w-full"
      style={{
        background: "rgba(8,14,30,0.95)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-3 text-slate-500 text-xs font-mono">deploy.sh</span>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium">
          ● Live
        </span>
      </div>

      {/* Terminal output */}
      <div className="p-4 space-y-1.5 font-mono text-xs">
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className="terminal-line flex items-start gap-2"
            style={{ animationDelay: line.delay, color: line.color }}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Service mini card ─── */
function ServiceMiniCard({ icon: Icon, title, desc, color }: (typeof SERVICE_CARDS)[number]) {
  return (
    <div
      className="rounded-xl p-3 flex flex-col gap-2"
      style={{
        background: "rgba(8,14,30,0.9)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: `${color}15`, border: `1px solid ${color}28` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <div className="text-white text-xs font-semibold leading-tight">{title}</div>
        <div className="text-slate-500 text-xs mt-0.5 leading-snug">{desc}</div>
      </div>
    </div>
  );
}

/* ─── Main Hero ─── */
export default function Hero() {
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#05091A" }}
    >
      {/* ── Pure CSS background – zero JS overhead ── */}
      <div className="hero-blob-1" />
      <div className="hero-blob-2" />
      <div className="hero-blob-3" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Vertical accent line from top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(255,107,53,0.5), transparent)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* LEFT COLUMN */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Trust badge */}
            <motion.div variants={item} className="mb-8 w-fit">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(255,107,53,0.08)",
                  border: "1px solid rgba(255,107,53,0.2)",
                  color: "#FF8C42",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Trusted on Upwork · Top Rated Agency
                <span className="flex gap-0.5 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={item}>
              <h1 className="text-[2.8rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-bold text-white leading-[1.08] tracking-tight mb-5">
                Powering Modern
                <br />
                Business Through
                <br />
                <MorphWord words={ROTATING_WORDS} />
              </h1>
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              variants={item}
              className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg"
            >
              Elite freelance professionals and software solutions under one roof.
              From code to customer care — we deliver results globally, reliably,
              and always on time.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/#contact"
                className="group relative flex items-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #f97316)",
                  boxShadow: "0 0 32px rgba(255,107,53,0.4), 0 4px 20px rgba(255,107,53,0.2)",
                }}
              >
                <Zap className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Start a Project</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-600 skew-x-[-20deg]" />
              </Link>

              <a
                href="https://calendly.com/babartechsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:text-white hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "#94A3B8",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
              >
                <CalendarDays className="w-4 h-4" />
                Book a Call
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={item}
              className="grid grid-cols-4 gap-3"
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-slate-600 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN — terminal + service cards */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="hidden lg:flex flex-col gap-4 max-w-md ml-auto"
          >
            {/* Floating badges above the terminal */}
            <div className="flex items-center gap-2 justify-end flex-wrap">
              <div
                className="float-badge-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{
                  background: "rgba(255,107,53,0.15)",
                  border: "1px solid rgba(255,107,53,0.35)",
                  color: "#FF8C42",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Star className="w-3 h-3 fill-current text-yellow-400" />
                Top Rated · 5.0★
              </div>
              <div
                className="float-badge-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#34D399",
                  backdropFilter: "blur(12px)",
                }}
              >
                <CheckCircle2 className="w-3 h-3" />
                100% Job Success
              </div>
              <div
                className="float-badge-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  color: "#60A5FA",
                  backdropFilter: "blur(12px)",
                  animationDelay: "1.5s",
                }}
              >
                <Clock className="w-3 h-3" />
                &lt; 2h Response
              </div>
            </div>

            {/* Terminal card */}
            <TerminalCard />

            {/* Service mini cards */}
            <div className="grid grid-cols-3 gap-3">
              {SERVICE_CARDS.map((card) => (
                <ServiceMiniCard key={card.title} {...card} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs text-slate-700 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10"
          style={{ background: "linear-gradient(180deg, rgba(255,107,53,0.5), transparent)" }}
          animate={{ scaleY: [1, 0, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
