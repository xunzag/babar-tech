"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search, CreditCard, Send, Clock, AlertTriangle,
  MessageCircle, Zap, Rocket, BarChart3, TrendingUp,
  XCircle, CheckCircle2,
} from "lucide-react";

const OLD_WAY = [
  {
    icon: Search,
    title: "Browse & Post a Job",
    desc: "Spend hours writing a job post, hoping the right person sees it.",
  },
  {
    icon: CreditCard,
    title: "Buy Connects",
    desc: "Pay for credits just to reach freelancers who may never respond.",
  },
  {
    icon: Send,
    title: "Send 50+ Proposals",
    desc: "Blast generic messages into the void. Most go unread or ignored.",
  },
  {
    icon: Clock,
    title: "Wait Days for Replies",
    desc: "Refresh your inbox hoping someone qualified actually responds.",
  },
  {
    icon: AlertTriangle,
    title: "Wrong Hire, Missed Deadline",
    desc: "The hire falls through. Budget burned. You're back to square one.",
  },
];

const NEW_WAY = [
  {
    icon: MessageCircle,
    title: "Tell Us What You Need",
    desc: "One message or call. Describe your goal — no lengthy job post required.",
  },
  {
    icon: Zap,
    title: "Matched Same Day",
    desc: "We pair you with a pre-vetted specialist from our team. Zero guesswork.",
  },
  {
    icon: Rocket,
    title: "Onboarded in 24 Hours",
    desc: "Your specialist is briefed, equipped, and actively working — fast.",
  },
  {
    icon: BarChart3,
    title: "Transparent Progress",
    desc: "Regular updates, clear communication, zero surprises — full visibility always.",
  },
  {
    icon: TrendingUp,
    title: "Results Delivered. Scale Up.",
    desc: "Hit your goals, then grow your team across any service — one trusted partner.",
  },
];

function OldStep({ step, index }: { step: typeof OLD_WAY[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex items-start gap-4"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}
        >
          <step.icon className="w-4 h-4 text-red-500/60" />
        </div>
        {index < OLD_WAY.length - 1 && (
          <div className="w-px flex-1 my-2 min-h-[28px]"
            style={{ background: "linear-gradient(180deg, rgba(239,68,68,0.2), transparent)" }} />
        )}
      </div>
      <div className="pb-5">
        <h4 className="font-semibold text-sm mb-1 line-through decoration-red-500/40"
          style={{ color: "var(--text-muted)" }}>
          {step.title}
        </h4>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-subtle)" }}>{step.desc}</p>
      </div>
    </motion.div>
  );
}

function NewStep({ step, index }: { step: typeof NEW_WAY[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.1 }}
      className="flex items-start gap-4"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-strong)",
          }}
        >
          <step.icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
        </div>
        {index < NEW_WAY.length - 1 && (
          <div className="w-px flex-1 my-2 min-h-[28px]"
            style={{ background: "linear-gradient(180deg, var(--border-strong), transparent)" }} />
        )}
      </div>
      <div className="pb-5">
        <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>{step.title}</h4>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-subtle)" }}>{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const outcomeRef = useRef(null);
  const outcomeInView = useInView(outcomeRef, { once: true, margin: "-60px" });

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label mb-6">How We Work</div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bold mb-5"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            Stop gambling on<br />
            <span style={{ color: "var(--accent)" }}>individual freelancers.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
            style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7 }}
          >
            Most businesses burn weeks buying connects and sending proposals into silence.
            We replaced all of that with a single, streamlined system.
          </motion.p>
        </div>

        {/* ── Main VS diagram ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-0 items-start">

          {/* LEFT — The Old Way */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
            className="p-8 rounded-2xl lg:rounded-r-none"
            style={{
              background: "rgba(239,68,68,0.03)",
              border: "1px solid rgba(239,68,68,0.12)",
              borderRight: "none",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <div className="text-red-400/80 font-bold text-sm tracking-wide uppercase">The Upwork Lottery</div>
                <div className="text-xs" style={{ color: "var(--text-subtle)" }}>How most teams waste time & money</div>
              </div>
            </div>
            <div>
              {OLD_WAY.map((step, i) => (
                <OldStep key={i} step={step} index={i} />
              ))}
            </div>
          </motion.div>

          {/* CENTER — VS */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-8">
            <div className="w-px flex-1 min-h-[40px]"
              style={{ background: "linear-gradient(180deg, transparent, var(--border))" }} />
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 my-4"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-strong)",
                color: "var(--text-muted)",
              }}
            >
              VS
            </div>
            <div className="w-px flex-1 min-h-[40px]"
              style={{ background: "linear-gradient(180deg, var(--border), transparent)" }} />
          </div>

          {/* RIGHT — The Babar Tech Way */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="p-8 rounded-2xl lg:rounded-l-none"
            style={{
              background: "rgba(240,101,41,0.03)",
              border: "1px solid var(--border)",
              borderLeft: "none",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <div className="font-bold text-sm tracking-wide uppercase" style={{ color: "var(--accent)" }}>The Babar Tech Way</div>
                <div className="text-xs" style={{ color: "var(--text-subtle)" }}>How clients get real results</div>
              </div>
            </div>
            <div>
              {NEW_WAY.map((step, i) => (
                <NewStep key={i} step={step} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Outcome strip ── */}
        <div ref={outcomeRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={outcomeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4 p-6 rounded-2xl"
            style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}
          >
            <XCircle className="w-5 h-5 text-red-500/60 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-red-400/70 font-semibold text-sm mb-1">Without Babar Tech</div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-subtle)" }}>
                Weeks lost. Budget burned. Wrong fit hired, deadlines missed, and the whole process starts over.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={outcomeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex items-start gap-4 p-6 rounded-2xl"
            style={{ background: "rgba(240,101,41,0.04)", border: "1px solid var(--border)" }}
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
            <div>
              <div className="font-semibold text-sm mb-1" style={{ color: "var(--accent)" }}>With Babar Tech</div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Your specialist is onboarded in 24 hours and delivering real work. No vetting, no chasing — just results.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
