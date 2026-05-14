"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How quickly can you get someone started?",
    a: "Same-day matching is standard. Once we understand your needs, we assign the right specialist and have them fully onboarded and working within 24 hours. No lengthy interview pipelines — we handle the vetting.",
  },
  {
    q: "What types of services do you offer?",
    a: "We cover Customer Service & Support, Virtual Assistance, Sales Support & Lead Generation, Customer Success & Retention, Operations & Project Management, and Web/Software Development. Most clients combine two or more services.",
  },
  {
    q: "How is Babar Tech different from hiring on Upwork directly?",
    a: "When you hire through Babar Tech you get a pre-vetted, managed professional — not an unknown freelancer. Our team carries a 100% Job Success Score and Top Rated agency status on Upwork. We take responsibility for quality and delivery so you never have to gamble.",
  },
  {
    q: "Do you require long-term contracts?",
    a: "No lock-in contracts, ever. Start with a short engagement, scale up or down as you need, or stop at any time. We earn your continued business through results, not paperwork.",
  },
  {
    q: "What tools and platforms does your team work with?",
    a: "Our team is proficient with HubSpot, Gorgias, Freshdesk, GoHighLevel, Zendesk, Trello, Asana, Slack, Notion, and many more. We adapt to your existing stack — no need to change your workflow.",
  },
  {
    q: "What time zones do you cover?",
    a: "We offer flexible working hours with coverage across US, UK, EU, and Australian business hours. Our average response time is under 2 hours and all specialists provide daily progress updates.",
  },
  {
    q: "How does pricing work?",
    a: "Pricing is based on the role, hours, and service level you need. We offer both hourly and fixed-rate arrangements with no hidden fees. Reach out for a free, no-obligation quote and we'll find a plan that fits your budget.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#05091A" }}>
      <div className="absolute inset-0 grid-bg-sm opacity-20" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(22,102,204,0.3), transparent)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(22,102,204,0.08)", border: "1px solid rgba(22,102,204,0.2)", color: "#60A5FA" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#1666CC" }} />
            Common Questions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Everything you need to know before getting started.
          </motion.p>
        </div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: isOpen ? "rgba(10,16,36,0.98)" : "rgba(8,13,30,0.85)",
                  border: isOpen
                    ? "1px solid rgba(240,101,41,0.25)"
                    : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="text-base font-semibold transition-colors duration-200"
                    style={{ color: isOpen ? "#F1F5F9" : "#CBD5E1" }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: isOpen ? "#F06529" : "#475569",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? "300px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.32s ease",
                  }}
                >
                  <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-4">Still have questions?</p>
          <a
            href="mailto:hello@babartechsolutions.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #F06529, #f97316)",
              boxShadow: "0 0 24px rgba(240,101,41,0.3)",
            }}
          >
            Ask Us Directly
          </a>
        </motion.div>

      </div>
    </section>
  );
}
