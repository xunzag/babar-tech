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
    color: "#FF6B35",
  },
  {
    icon: Zap,
    title: "Matched Same Day",
    desc: "We pair you with a pre-vetted specialist from our elite team. Zero guesswork.",
    color: "#3B82F6",
  },
  {
    icon: Rocket,
    title: "Onboarded in 24 Hours",
    desc: "Your specialist is briefed, equipped, and actively working — fast.",
    color: "#8B5CF6",
  },
  {
    icon: BarChart3,
    title: "Transparent Progress",
    desc: "Regular updates, clear communication, zero surprises — full visibility always.",
    color: "#10B981",
  },
  {
    icon: TrendingUp,
    title: "Results Delivered. Scale Up.",
    desc: "Hit your goals, then grow your team across any service — one trusted partner.",
    color: "#FF6B35",
  },
];

function OldStep({ step, index }: { step: (typeof OLD_WAY)[number]; index: number }) {
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
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}
        >
          <step.icon className="w-4 h-4 text-red-500/60" />
        </div>
        {index < OLD_WAY.length - 1 && (
          <div className="w-px flex-1 my-2 min-h-[28px]" style={{ background: "linear-gradient(180deg, rgba(239,68,68,0.2), transparent)" }} />
        )}
      </div>

      {/* Content */}
      <div className="pb-5">
        <h4 className="text-slate-400 font-semibold text-sm mb-1 line-through decoration-red-500/40">
          {step.title}
        </h4>
        <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

function NewStep({ step, index }: { step: (typeof NEW_WAY)[number]; index: number }) {
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
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${step.color}12`,
            border: `1px solid ${step.color}30`,
            boxShadow: `0 0 16px ${step.color}10`,
          }}
        >
          <step.icon className="w-4 h-4" style={{ color: step.color }} />
        </div>
        {index < NEW_WAY.length - 1 && (
          <div
            className="w-px flex-1 my-2 min-h-[28px]"
            style={{ background: `linear-gradient(180deg, ${step.color}35, transparent)` }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-5">
        <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
        <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
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
      style={{ background: "linear-gradient(180deg, #080D20 0%, #05091A 100%)" }}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.2), transparent)" }}
      />
      {/* Ambient orbs */}
      <div
        className="absolute left-1/4 bottom-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(240,101,41,0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute right-1/4 top-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(22,102,204,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)", color: "#FF8C42" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            How We Work
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
          >
            Stop Gambling on{" "}
            <span className="text-gradient">Freelancers.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Most businesses burn weeks buying connects and sending proposals into silence.
            We replaced all of that with a single, streamlined system.
          </motion.p>
        </div>

        {/* ── Main diagram ── */}
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
              border: "1px solid rgba(239,68,68,0.1)",
              borderRight: "none",
            }}
          >
            {/* Column header */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <div className="text-red-400/80 font-bold text-sm tracking-wide uppercase">The Upwork Lottery</div>
                <div className="text-slate-600 text-xs">How most teams waste time & money</div>
              </div>
            </div>

            {/* Steps */}
            <div>
              {OLD_WAY.map((step, i) => (
                <OldStep key={i} step={step} index={i} />
              ))}
            </div>
          </motion.div>

          {/* CENTER — VS divider */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-8 gap-0">
            {/* Top line */}
            <div className="w-px flex-1 min-h-[40px]" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.08))" }} />

            {/* VS badge */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 my-4"
              style={{
                background: "rgba(10,18,34,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 30px rgba(255,107,53,0.1)",
              }}
            >
              VS
            </div>

            {/* Bottom line */}
            <div className="w-px flex-1 min-h-[40px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent)" }} />
          </div>

          {/* RIGHT — The Babar Tech Way */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="p-8 rounded-2xl lg:rounded-l-none"
            style={{
              background: "rgba(255,107,53,0.03)",
              border: "1px solid rgba(255,107,53,0.12)",
              borderLeft: "none",
            }}
          >
            {/* Column header */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.25)" }}
              >
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="font-bold text-sm tracking-wide uppercase" style={{ color: "#FF8C42" }}>The Babar Tech Way</div>
                <div className="text-slate-600 text-xs">How elite clients get real results</div>
              </div>
            </div>

            {/* Steps */}
            <div>
              {NEW_WAY.map((step, i) => (
                <NewStep key={i} step={step} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Outcome comparison ── */}
        <div ref={outcomeRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Bad outcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={outcomeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4 p-6 rounded-2xl"
            style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}
          >
            <XCircle className="w-5 h-5 text-red-500/60 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-red-400/70 font-semibold text-sm mb-1">The Result</div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Weeks lost. Budget burned. Wrong fit hired, deadlines missed, and the whole process starts over — with nothing to show for it.
              </p>
            </div>
          </motion.div>

          {/* Good outcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={outcomeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex items-start gap-4 p-6 rounded-2xl"
            style={{ background: "rgba(255,107,53,0.04)", border: "1px solid rgba(255,107,53,0.15)" }}
          >
            <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-sm mb-1" style={{ color: "#FF8C42" }}>The Result</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your specialist is onboarded in 24 hours and delivering real work. No vetting, no chasing — just results, on time, with a team that scales with you.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── CTA nudge ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">Ready to skip the lottery?</p>
          <a
            href="/#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #FF6B35, #f97316)",
              boxShadow: "0 0 24px rgba(255,107,53,0.25)",
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            Get Matched Today
          </a>
        </motion.div>

      </div>
    </section>
  );
}
