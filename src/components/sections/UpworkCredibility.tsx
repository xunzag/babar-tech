"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";

const STATS = [
  { label: "Job Success Score", value: "100%", color: "#10B981" },
  { label: "Top Rated Badge", value: "Active", color: "#F06529" },
  { label: "5.0★ Rating", value: "All Reviews", color: "#1666CC" },
  { label: "Avg. Response Time", value: "< 2h", color: "#8B5CF6" },
];

/* Real reviews extracted directly from Upwork screenshots */
const REVIEWS = [
  {
    title: "Customer Service Representative for Patient Retention in Medical Supply",
    rating: "5.0",
    date: "Mar 19, 2025 – May 31, 2025",
    text: "Fahad is excellent and really good at customer service. He helped our business tremendously by retaining our customers. His retention rate was close to 98% — I would recommend him to anyone looking for a customer service professional.",
    tags: [],
    amount: "$3,248.00",
    rate: "$8.00 /hr",
    hours: "406 hours",
  },
  {
    title: "Virtual Executive Assistant – Organised, Proactive & Fluent in English",
    rating: "5.0",
    date: "Mar 20, 2025 – May 30, 2025",
    text: "Super helpful, great learner and speaks & types excellent English. He has always been proactive and organised. I'd highly recommend.",
    tags: ["Clear Communicator", "Solution Oriented", "Detail Oriented"],
    amount: "$3,550.00",
    rate: "$10.00 /hr",
    hours: "355 hours",
  },
  {
    title: "Online speaking app/website for English learners",
    rating: "5.0",
    date: "Mar 9, 2025 – May 13, 2025",
    text: "Sterling work on a speaking app for high school English learners in Slovakia. Easy to communicate with. The final iteration surpassed my expectations. Highly recommended.",
    tags: ["Clear Communicator", "Committed to Quality"],
    amount: "$1,901.33",
    rate: "$16.00 /hr",
    hours: "120 hours",
  },
  {
    title: "Dental Appointment Setter & Lead Closer",
    rating: "5.0",
    date: "Mar 10, 2025 – Apr 15, 2025",
    text: "Fahad is incredible! Voice and communication are perfect. He is a great person to work with. He completed his task with ease and helped us convert new clients.",
    tags: ["Clear Communicator", "Collaborative"],
    amount: "$285.00",
    rate: "$10.00 /hr",
    hours: "25 hours",
  },
  {
    title: "Online Sales Virtual Assistant with Commission Opportunity",
    rating: "5.0",
    date: "Feb 25, 2025 – Apr 8, 2025",
    text: "Fahad is a dedicated professional with a great work ethic. I strongly recommend him.",
    tags: ["Professional"],
    amount: "$514.00",
    rate: "$6.00 /hr",
    hours: "86 hours",
  },
  {
    title: "Ecommerce Coordinator / Project Manager – Join Our Fun Fast-Paced Team!",
    rating: "5.0",
    date: "Mar 3, 2025 – Mar 31, 2025",
    text: "Working with Fahad has been nothing short of amazing! He stepped in as our temporary project manager and instantly became an invaluable member of our team. Fahad's professionalism is top-notch.",
    tags: ["Clear Communicator", "Collaborative", "Professional", "Solution Oriented"],
    amount: "$496.00",
    rate: "$6.00 /hr",
    hours: "83 hours",
  },
  {
    title: "Executive Personal Assistant – Client Onboarding & Operations",
    rating: "5.0",
    date: "Feb 27, 2026 – May 3, 2026",
    text: "She was amazing, very effective for the company. We are very proud of her.",
    tags: [],
    amount: "$2,368.34",
    rate: "$10.00 /hr",
    hours: "237 hours",
  },
  {
    title: "Discord & Email Virtual Assistant for Customer Support",
    rating: "5.0",
    date: "Nov 4, 2025 – Dec 5, 2025",
    text: "Amazing assistant, fluent in English, very friendly to work with and learns fast. Got the job done perfectly without any issues.",
    tags: [],
    amount: "$250.00",
    rate: "Fixed Price",
    hours: null,
  },
  {
    title: "Appointment Setter for Roofing Inspections",
    rating: "5.0",
    date: "Oct 21, 2025 – Nov 4, 2025",
    text: "Izma is an amazing worker. She works very hard, has excellent communication and is extremely dependable. I would like to work with her again in the future.",
    tags: [],
    amount: "$70.00",
    rate: "Fixed Price",
    hours: null,
  },
  {
    title: "Remote Business Development Assistant (UK-Focused)",
    rating: "5.0",
    date: "Sep 4, 2025 – Nov 3, 2025",
    text: "Ria is fantastic — understood the project and delivered as required.",
    tags: [],
    amount: "$1,500.00",
    rate: "$10.00 /hr",
    hours: "119 hours",
  },
  {
    title: "Virtual Assistant Needed for Cleaning Business",
    rating: "5.0",
    date: "Sep 22, 2025 – Oct 29, 2025",
    text: "Ria was really great to work with! She is professional, eager to help and a great addition to my company. It's been great having such reliable help — I would highly recommend her to anyone needing a friendly, dependable VA!",
    tags: [],
    amount: "$484.00",
    rate: "$12.00 /hr",
    hours: "40 hours",
  },
  {
    title: "Cold Callers Needed: Intelligent and Organised",
    rating: "5.0",
    date: "Aug 28, 2025 – Oct 7, 2025",
    text: "Great, I recommend her — she was much better than most people we've hired on Upwork.",
    tags: [],
    amount: "$148.00",
    rate: "$6.00 /hr",
    hours: "25 hours",
  },
  {
    title: "Outbound Cold Caller for Sales Lead Generation",
    rating: "5.0",
    date: "Jul 16, 2025 – Jul 17, 2025",
    text: "Hired Ria to do some cold calling. Not only does she read the script with fluent English, but has great tonality and pacing which is hard to find sometimes. She handles conversation outside of a script very well. Very reliable and easy to work with. I trust Ria with my leads and highly recommend her.",
    tags: [],
    amount: "$99.97",
    rate: "$10.00 /hr",
    hours: "7 hours",
  },
  {
    title: "School Lunch Ordering System Development",
    rating: "5.0",
    date: "Feb 11, 2025 – Feb 15, 2025",
    text: "Fahad is an energetic developer to work with. I really enjoyed our conversation and his expertise in PHP/Laravel, React, and MongoDB was evident in the seamless functionality and clean code.",
    tags: ["Collaborative", "Committed to Quality"],
    amount: "$160.00",
    rate: "$20.00 /hr",
    hours: "8 hours",
  },
];

const ROW1 = [...REVIEWS.slice(0, 7), ...REVIEWS.slice(0, 7)];
const ROW2 = [...REVIEWS.slice(7), ...REVIEWS.slice(7)];

/* ── Upwork orange star ── */
function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#FF9900">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ── Exact Upwork dark-theme review card ── */
function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col"
      style={{
        width: "420px",
        background: "#111213",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "8px",
        padding: "20px 24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
      }}
    >
      {/* Title row + Upwork logo */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "14px", lineHeight: 1.45 }}>
          {review.title}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/upwork%20logo.png"
          alt="Upwork"
          width={22}
          height={22}
          style={{ borderRadius: "50%", flexShrink: 0, opacity: 0.75, marginTop: "2px" }}
        />
      </div>

      {/* Stars · rating · date */}
      <div className="flex items-center gap-2 mb-4" style={{ flexShrink: 0 }}>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
        </div>
        <span style={{ color: "#FF9900", fontWeight: 600, fontSize: "13px" }}>{review.rating}</span>
        <span style={{ color: "#6b7280", fontSize: "12px" }}>|&nbsp; {review.date}</span>
      </div>

      {/* Review text */}
      <p style={{ color: "#d1d5db", fontStyle: "italic", fontSize: "13px", lineHeight: 1.65, marginBottom: "14px", flex: 1 }}>
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Skill tags */}
      {review.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {review.tags.map(tag => (
            <span
              key={tag}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#9ca3af",
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "20px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Contract stats */}
      <div
        className="flex gap-6 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "#6b7280", fontSize: "12px" }}
      >
        <span>{review.rate}</span>
        {review.hours && <span>{review.hours}</span>}
      </div>
    </div>
  );
}

export default function UpworkCredibility() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "#05091A" }}>
      <div className="absolute inset-0 grid-bg-sm opacity-30" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)" }}
      />

      <div className="relative z-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold mb-5"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)", color: "#34D399" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/upwork%20logo.png" alt="Upwork" width={18} height={18} style={{ borderRadius: "50%" }} />
                Upwork Verified Agency
                <BadgeCheck className="w-4 h-4" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white leading-tight"
              >
                Real Clients.{" "}
                <span className="text-gradient">Real Reviews.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-4"
              >
                <a
                  href="https://www.upwork.com/agencies/babartechsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
                  style={{ color: "#34D399" }}
                >
                  Read all our reviews on Upwork
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                  style={{ background: `${s.color}0a`, border: `1px solid ${s.color}20` }}
                >
                  <span className="text-lg font-black" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-xs text-slate-500 leading-tight">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Scrolling review wall ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative space-y-4"
        >
          <div className="overflow-hidden">
            <div className="marquee-slow flex w-max gap-4 px-2 items-start">
              {ROW1.map((review, i) => <ReviewCard key={i} review={review} />)}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="marquee-slow-right flex w-max gap-4 px-2 items-start">
              {ROW2.map((review, i) => <ReviewCard key={i} review={review} />)}
            </div>
          </div>

          <div className="absolute top-0 left-0 bottom-0 w-20 pointer-events-none z-10"
            style={{ background: "linear-gradient(90deg, #05091A, transparent)" }} />
          <div className="absolute top-0 right-0 bottom-0 w-20 pointer-events-none z-10"
            style={{ background: "linear-gradient(-90deg, #05091A, transparent)" }} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 mt-10 flex items-center justify-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <p className="text-slate-600 text-sm">Every review shown is directly from Upwork — unedited.</p>
          <a
            href="https://www.upwork.com/agencies/babartechsolutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-green-400 text-sm transition-colors underline underline-offset-2"
          >
            View profile →
          </a>
        </div>
      </div>
    </section>
  );
}
