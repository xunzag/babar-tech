"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2,
  UserCog,
  Headphones,
  ClipboardList,
  Wrench,
  Palette,
  Bot,
  Building2,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const SERVICES_DETAIL = [
  {
    id: "web",
    icon: Code2,
    title: "Web Development",
    subtitle: "Full-stack solutions that perform",
    desc: "We engineer performant, scalable web applications using cutting-edge technology. Every line of code is written with quality, maintainability, and your users' experience in mind.",
    color: "#3B82F6",
    features: [
      "Next.js & React applications",
      "Full-stack Node.js & Python backends",
      "TypeScript-first codebase",
      "REST & GraphQL APIs",
      "Performance optimization & Core Web Vitals",
      "CI/CD pipeline setup",
      "Cloud deployment (AWS, Vercel, GCP)",
      "Database design & management",
    ],
    process: [
      { step: "Discovery", desc: "Requirements gathering and technical scoping" },
      { step: "Architecture", desc: "System design and technology selection" },
      { step: "Development", desc: "Agile sprints with regular demos" },
      { step: "QA & Launch", desc: "Thorough testing, deployment, and handoff" },
    ],
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    subtitle: "Interfaces that convert and delight",
    desc: "We design digital experiences that feel premium and drive results. From user research to high-fidelity prototypes, every pixel is intentional.",
    color: "#EC4899",
    features: [
      "User research & competitive analysis",
      "Wireframing & information architecture",
      "High-fidelity Figma prototypes",
      "Design system creation",
      "Responsive & mobile-first design",
      "Interaction design & micro-animations",
      "Usability testing",
      "Design handoff to development",
    ],
    process: [
      { step: "Research", desc: "User interviews and competitor analysis" },
      { step: "Wireframes", desc: "Low-fidelity flows and layout exploration" },
      { step: "Design", desc: "High-fidelity screens with design system" },
      { step: "Prototype", desc: "Interactive prototype and user testing" },
    ],
  },
  {
    id: "va",
    icon: UserCog,
    title: "Virtual Assistant",
    subtitle: "Reliable support for your daily operations",
    desc: "Dedicated VAs that handle your operational workload with care and precision — so you can focus on what matters most.",
    color: "#FF6B35",
    features: [
      "Executive calendar management",
      "Email inbox management & filtering",
      "Research and data compilation",
      "CRM data entry & management",
      "Travel booking & coordination",
      "Document preparation & formatting",
      "Social media scheduling",
      "Supplier & vendor coordination",
    ],
    process: [
      { step: "Briefing", desc: "Understand your tasks and workflow preferences" },
      { step: "Onboarding", desc: "System access and process documentation" },
      { step: "Execution", desc: "Daily task completion with daily check-ins" },
      { step: "Reporting", desc: "Weekly summaries and optimization suggestions" },
    ],
  },
  {
    id: "csr",
    icon: Headphones,
    title: "Customer Service",
    subtitle: "Premium support that retains customers",
    desc: "Professional CSR teams delivering exceptional customer experiences across all channels and time zones — building loyalty one interaction at a time.",
    color: "#10B981",
    features: [
      "Multi-channel support (email, chat, phone)",
      "24/7 coverage options",
      "Ticket management (Zendesk, Freshdesk)",
      "Live chat support",
      "Returns & refunds handling",
      "Escalation management",
      "Customer feedback collection",
      "SLA compliance",
    ],
    process: [
      { step: "Training", desc: "Learn your products and support policies" },
      { step: "Setup", desc: "Configure helpdesk and communication tools" },
      { step: "Launch", desc: "Begin handling tickets with quality monitoring" },
      { step: "Optimize", desc: "Monthly CSAT reviews and process refinement" },
    ],
  },
  {
    id: "admin",
    icon: ClipboardList,
    title: "Admin Support",
    subtitle: "Operational backbone for your business",
    desc: "Comprehensive administrative support that keeps your backend running smoothly — from data management to process documentation.",
    color: "#8B5CF6",
    features: [
      "Data entry and cleansing",
      "Document management & filing",
      "Process documentation & SOPs",
      "Spreadsheet management",
      "Bookkeeping support",
      "Report preparation",
      "Vendor communication",
      "Office administration",
    ],
    process: [
      { step: "Audit", desc: "Review current admin workflows and gaps" },
      { step: "Setup", desc: "Implement tools and establish processes" },
      { step: "Execution", desc: "Daily admin tasks with accuracy checks" },
      { step: "Review", desc: "Regular process improvements and reporting" },
    ],
  },
  {
    id: "technical",
    icon: Wrench,
    title: "Technical Support",
    subtitle: "Fast resolution, zero downtime",
    desc: "Tier 1 through Tier 3 technical support that resolves issues quickly and keeps your customers and systems running optimally.",
    color: "#F59E0B",
    features: [
      "Level 1–3 technical support",
      "SaaS product support",
      "IT helpdesk management",
      "Network & connectivity troubleshooting",
      "Software installation & configuration",
      "Bug triage & reproduction",
      "KB article creation",
      "User training & onboarding",
    ],
    process: [
      { step: "Triage", desc: "Classify and prioritize incoming issues" },
      { step: "Resolve", desc: "Systematic troubleshooting and resolution" },
      { step: "Document", desc: "Create KB articles for recurring issues" },
      { step: "Escalate", desc: "Seamless escalation when needed" },
    ],
  },
  {
    id: "automation",
    icon: Bot,
    title: "Automation Solutions",
    subtitle: "Eliminate repetitive work at scale",
    desc: "We automate your business processes using no-code/low-code tools and custom scripting — freeing your team to focus on high-value work.",
    color: "#06B6D4",
    features: [
      "Zapier & Make (Integromat) workflows",
      "n8n self-hosted automation",
      "CRM & lead management automation",
      "Email & notification workflows",
      "Data sync between platforms",
      "Report generation automation",
      "Custom Python/JS scripts",
      "API integration & webhooks",
    ],
    process: [
      { step: "Discovery", desc: "Map manual processes and identify automations" },
      { step: "Design", desc: "Architect automation workflows" },
      { step: "Build", desc: "Build and test automation pipelines" },
      { step: "Monitor", desc: "Deploy with monitoring and error alerting" },
    ],
  },
  {
    id: "business",
    icon: Building2,
    title: "Business Support",
    subtitle: "Strategy and execution at every stage",
    desc: "Holistic business support services including project management, consulting, and operational guidance to help your company grow.",
    color: "#84CC16",
    features: [
      "Project management (Agile/Scrum)",
      "Business process consulting",
      "Growth strategy development",
      "Team coordination & communication",
      "KPI tracking & reporting",
      "Vendor management",
      "Market research",
      "Business plan development",
    ],
    process: [
      { step: "Assessment", desc: "Understand your business goals and gaps" },
      { step: "Strategy", desc: "Develop a clear action plan" },
      { step: "Execution", desc: "Implement with your team as active partners" },
      { step: "Measure", desc: "Track KPIs and iterate for growth" },
    ],
  },
];

function ServiceSection({ svc, index }: { svc: (typeof SERVICES_DETAIL)[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div
      id={svc.id}
      ref={ref}
      className="py-16"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? "lg:grid-flow-dense" : ""}`}>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className={isEven ? "" : "lg:col-start-2"}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold mb-5"
            style={{
              background: `${svc.color}12`,
              border: `1px solid ${svc.color}25`,
              color: svc.color,
            }}
          >
            <svc.icon className="w-3.5 h-3.5" />
            {svc.title}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{svc.title}</h2>
          <p className="text-lg mb-4" style={{ color: svc.color }}>{svc.subtitle}</p>
          <p className="text-slate-400 leading-relaxed mb-6">{svc.desc}</p>

          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: `${svc.color}20`,
              border: `1px solid ${svc.color}30`,
              color: svc.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = svc.color;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${svc.color}20`;
              e.currentTarget.style.color = svc.color;
            }}
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Features card */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className={`p-6 rounded-2xl ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}
          style={{
            background: "rgba(13,22,40,0.9)",
            border: `1px solid ${svc.color}20`,
          }}
        >
          {/* Features list */}
          <div className="mb-5">
            <div className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">What's Included</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {svc.features.slice(0, expanded ? undefined : 6).map((feat) => (
                <div key={feat} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: svc.color }} />
                  <span className="text-slate-300 text-sm">{feat}</span>
                </div>
              ))}
            </div>
            {svc.features.length > 6 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1 mt-3 text-sm transition-colors duration-200"
                style={{ color: svc.color }}
              >
                {expanded ? "Show less" : `+${svc.features.length - 6} more`}
                <ChevronDown
                  className="w-3.5 h-3.5 transition-transform duration-200"
                  style={{ transform: expanded ? "rotate(180deg)" : "none" }}
                />
              </button>
            )}
          </div>

          {/* Process */}
          <div>
            <div className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Our Process</div>
            <div className="flex gap-2">
              {svc.process.map((step, i) => (
                <div
                  key={i}
                  className="flex-1 p-3 rounded-xl text-center"
                  style={{ background: `${svc.color}08`, border: `1px solid ${svc.color}15` }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1.5"
                    style={{ background: `${svc.color}20`, color: svc.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="text-white text-xs font-semibold mb-0.5">{step.step}</div>
                  <div className="text-slate-600 text-xs leading-tight hidden sm:block">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function ServicesPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div className="min-h-screen" style={{ background: "#05091A" }}>

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 800px 400px at 50% 70%, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
          style={{ background: "linear-gradient(180deg, rgba(59,130,246,0.6), transparent)" }}
        />

        <div ref={headerRef} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#60A5FA",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Full Service Suite
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Premium Solutions,{" "}
            <span className="text-gradient-cool">Every Vertical</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto mb-8"
          >
            Eight specialized service verticals, each backed by deep expertise and an
            uncompromising commitment to quality.
          </motion.p>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {SERVICES_DETAIL.map((svc) => (
              <a
                key={svc.id}
                href={`#${svc.id}`}
                className="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: `${svc.color}10`,
                  border: `1px solid ${svc.color}20`,
                  color: `${svc.color}cc`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${svc.color}20`;
                  e.currentTarget.style.color = svc.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${svc.color}10`;
                  e.currentTarget.style.color = `${svc.color}cc`;
                }}
              >
                {svc.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service sections */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {SERVICES_DETAIL.map((svc, i) => (
            <ServiceSection key={svc.id} svc={svc} index={i} />
          ))}
        </div>
      </section>

    </div>
  );
}
