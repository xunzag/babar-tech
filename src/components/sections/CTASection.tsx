"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, MessageSquare, CalendarDays } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: "#05091A" }}
    >
      {/* Background animated gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 800px 500px at 50% 50%, rgba(255,107,53,0.08) 0%, transparent 70%)",
              "radial-gradient(ellipse 800px 500px at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)",
              "radial-gradient(ellipse 800px 500px at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)",
              "radial-gradient(ellipse 800px 500px at 50% 50%, rgba(255,107,53,0.08) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.4), transparent)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{
            background: "rgba(255,107,53,0.1)",
            border: "1px solid rgba(255,107,53,0.25)",
            color: "#FF8C42",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Ready to build something premium?
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8"
        >
          Let's Turn Your{" "}
          <span className="text-gradient">Vision Into Reality</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          From a single project to a full remote workforce — Babar Tech Solutions delivers
          with precision and care. Start the conversation today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="mailto:hello@babartechsolutions.com"
            className="group relative flex items-center gap-2 px-8 py-4.5 rounded-xl text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #FF6B35, #f97316)",
              boxShadow: "0 0 40px rgba(255,107,53,0.4), 0 4px 24px rgba(255,107,53,0.25)",
            }}
          >
            <Mail className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Get a Free Quote</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]" />
          </a>

          <a
            href="https://calendly.com/babartechsolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4.5 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#94A3B8",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(22,102,204,0.4)";
              e.currentTarget.style.color = "#60A5FA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#94A3B8";
            }}
          >
            <CalendarDays className="w-4 h-4" />
            Book a Call
          </a>

          <a
            href="https://www.upwork.com/agencies/babartechsolutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4.5 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#94A3B8",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)";
              e.currentTarget.style.color = "#34D399";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#94A3B8";
            }}
          >
            <MessageSquare className="w-4 h-4" />
            Hire on Upwork
          </a>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600"
        >
          {["No long-term commitment", "Fast onboarding", "24/7 communication", "100% satisfaction"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-orange-500/50" />
              {item}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
