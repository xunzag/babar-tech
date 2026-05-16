"use client";

import { useState } from "react";
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

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

      <div className="relative z-10 w-full px-8 md:px-14 xl:px-20 py-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "2.5rem" }}>
          <div>
            <div className="section-label mb-4">FAQ</div>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--text)",
              }}
            >
              Common questions,<br />
              <span style={{ color: "var(--accent)" }}>honest answers.</span>
            </h2>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-subtle)", maxWidth: "260px", lineHeight: 1.65 }}>
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ list — two columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0"
          style={{ border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                style={{
                  background: isOpen ? "var(--bg-elevated)" : "var(--bg-surface)",
                  borderRight: isLeft ? "1px solid var(--border)" : undefined,
                  borderBottom: i < FAQS.length - (FAQS.length % 2 === 0 ? 2 : 1)
                    ? "1px solid var(--border)"
                    : undefined,
                  transition: "background 0.2s ease",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className="text-sm font-semibold leading-snug transition-colors duration-150"
                    style={{ color: isOpen ? "var(--text)" : "var(--text-muted)" }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-300"
                    style={{
                      color: isOpen ? "var(--accent)" : "var(--text-subtle)",
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
                  <p className="px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: "var(--text-subtle)" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm mb-4" style={{ color: "var(--text-subtle)" }}>Still have questions?</p>
          <a
            href="mailto:hello@babartechsolutions.com"
            className="btn-accent inline-flex items-center gap-2 text-sm"
          >
            Ask Us Directly
          </a>
        </div>

      </div>
    </section>
  );
}
