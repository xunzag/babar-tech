"use client";

import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    title: "Customer Service & Support",
    desc: "Dedicated CSR teams trained to handle inquiries, resolve issues, and build lasting customer relationships across all channels and time zones.",
    tags: ["Live Chat", "Email Support", "Ticketing"],
  },
  {
    num: "02",
    title: "Virtual Assistance",
    desc: "Professional VAs handling scheduling, research, inbox management, and administrative tasks with precision and reliability.",
    tags: ["Admin", "Research", "Scheduling"],
  },
  {
    num: "03",
    title: "Sales Support & Lead Generation",
    desc: "Outbound callers, appointment setters, and lead qualification specialists who fill your pipeline and convert prospects consistently.",
    tags: ["Cold Calling", "Appointment Setting", "CRM"],
  },
  {
    num: "04",
    title: "Web & Software Development",
    desc: "Full-stack applications built with Next.js, React, and modern tooling. Clean code, pixel-perfect design, delivered on time.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    num: "05",
    title: "Customer Success & Retention",
    desc: "Specialists focused on reducing churn, increasing LTV, and turning satisfied customers into loyal advocates for your brand.",
    tags: ["Onboarding", "Retention", "NPS"],
  },
  {
    num: "06",
    title: "Operations & Project Management",
    desc: "Operational support to streamline your workflows, manage timelines, and keep cross-functional teams moving toward the same goal.",
    tags: ["PM", "Workflow", "Coordination"],
  },
];

function ServiceRow({ svc, index }: { svc: typeof SERVICES[number]; index: number }) {
  return (
    <div
      className="group relative flex items-start gap-6 md:gap-10 py-7 px-8 md:px-14 xl:px-20 cursor-default transition-colors duration-150 hover-row"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Hover left accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-0.5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200"
        style={{ background: "var(--accent)" }}
      />

      {/* Number */}
      <div
        className="hidden sm:block flex-shrink-0 w-12 font-bold pt-1 transition-opacity duration-200 opacity-20 group-hover:opacity-60"
        style={{ fontSize: "0.8rem", letterSpacing: "0.05em", color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}
      >
        {svc.num}
      </div>

      {/* Title + desc */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-semibold mb-2 transition-colors duration-150"
          style={{ fontSize: "1.0625rem", color: "var(--text)", letterSpacing: "-0.01em" }}
        >
          {svc.title}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>
          {svc.desc}
        </p>
      </div>

      {/* Tags */}
      <div className="hidden lg:flex flex-wrap gap-1.5 justify-end max-w-[200px] pt-1">
        {svc.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-subtle)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <ArrowUpRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }} />

      {/* Header */}
      <div
        className="px-8 md:px-14 xl:px-20 py-14"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="section-label mb-6">What We Do</div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            Six disciplines.<br />
            <span style={{ color: "var(--accent)" }}>One accountable partner.</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-subtle)", maxWidth: "260px", lineHeight: 1.65 }}>
            Every service delivered by vetted specialists — no gig-economy guesswork.
          </p>
        </div>
      </div>

      {/* Rows */}
      <div>
        {SERVICES.map((svc, i) => (
          <ServiceRow key={i} svc={svc} index={i} />
        ))}
      </div>
    </section>
  );
}
