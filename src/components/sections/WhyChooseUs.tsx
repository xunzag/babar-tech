"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Clock, Globe, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

const COUNTERS = [
  { value: 500, suffix: "+", label: "Projects Completed", color: "#FF6B35" },
  { value: 98, suffix: "%", label: "Client Satisfaction", color: "#3B82F6" },
  { value: 50, suffix: "+", label: "Team Members", color: "#8B5CF6" },
  { value: 2, suffix: "h", label: "Avg. Response Time", color: "#10B981" },
];

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Verified & Trusted",
    desc: "Upwork Top Rated badge with 100% Job Success Score and verified client reviews from real engagements.",
    color: "#FF6B35",
  },
  {
    icon: Globe,
    title: "Global Operations",
    desc: "Remote-first team covering all time zones, ensuring around-the-clock delivery without compromise.",
    color: "#3B82F6",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    desc: "Every deliverable held to the standard you'd expect from a top-tier enterprise agency.",
    color: "#8B5CF6",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    desc: "Strict project discipline with deadline respect baked into our culture — not just promised.",
    color: "#10B981",
  },
  {
    icon: CheckCircle2,
    title: "End-to-End Solutions",
    desc: "Strategy, build, support, and scale — one trusted partner across your entire business journey.",
    color: "#F59E0B",
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    desc: "Clients report measurable improvements in efficiency and conversion after working with us.",
    color: "#EC4899",
  },
];

function AnimatedCounter({ target, suffix, color, duration = 1800 }: { target: number; suffix: string; color: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.round(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums" style={{ color }}>
      {count}{suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05091A 0%, #080D20 100%)" }}
    >
      <div className="absolute inset-0 grid-bg-sm opacity-40" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.25), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#A78BFA" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Why Babar Tech
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            The Numbers{" "}
            <span className="text-gradient-cool">Speak for Themselves</span>
          </motion.h2>
        </div>

        {/* ── Counters ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-20"
          style={{ background: "rgba(255,255,255,0.04)", borderRadius: "1.5rem", overflow: "hidden" }}>
          {COUNTERS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center py-10 px-6"
              style={{ background: "#05091A" }}
            >
              <div className="text-5xl md:text-6xl font-black mb-2 leading-none">
                <AnimatedCounter target={item.value} suffix={item.suffix} color={item.color} />
              </div>
              <div className="text-slate-500 text-sm">{item.label}</div>
              <div className="mt-3 h-0.5 w-8 rounded-full" style={{ background: item.color, opacity: 0.4 }} />
            </motion.div>
          ))}
        </div>

        {/* ── Reasons: grid-list, no card backgrounds ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{ border: "1px solid rgba(255,255,255,0.05)", borderRadius: "1.5rem", overflow: "hidden" }}
        >
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex items-start gap-5 p-7"
              style={{
                background: "#05091A",
                borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
                borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              {/* Icon — minimal, no heavy box */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${reason.color}0e`, border: `1px solid ${reason.color}1a` }}
              >
                <reason.icon className="w-4.5 h-4.5" style={{ color: reason.color }} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1.5 text-[15px] group-hover:text-white/95 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
