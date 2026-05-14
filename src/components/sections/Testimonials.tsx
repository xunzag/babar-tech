"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

/* Real quotes extracted directly from Upwork review screenshots */
const REVIEWS = [
  {
    quote: "Fahad is excellent and really good at customer service. He helped our business tremendously by retaining our customers. His retention rate was close to 98%. I would recommend him.",
    project: "Customer Service · Patient Retention",
    earned: "$3,248",
    hours: "406 hrs",
    member: "Fahad Ali",
    memberColor: "#FF6B35",
    flag: "🇺🇸",
  },
  {
    quote: "Super helpful, great learner and speaks & types excellent English. He has always been proactive and organised. I'd highly recommend.",
    project: "Virtual Executive Assistant",
    earned: "$3,550",
    hours: "355 hrs",
    member: "Fahad Ali",
    memberColor: "#FF6B35",
    flag: "🇬🇧",
  },
  {
    quote: "Sterling work on a speaking app for English learners. Easy to communicate with. The final iteration surpassed my expectations. Highly recommended.",
    project: "Speaking App Development",
    earned: "$1,901",
    hours: "120 hrs",
    member: "Fahad Ali",
    memberColor: "#FF6B35",
    flag: "🇸🇰",
  },
  {
    quote: "Working with Fahad has been nothing short of amazing! He stepped in as our temporary project manager and instantly became an invaluable member of our team. Fahad's professionalism is top-notch.",
    project: "Ecommerce Coordinator & Project Manager",
    earned: "$496",
    hours: "83 hrs",
    member: "Fahad Ali",
    memberColor: "#FF6B35",
    flag: "🇺🇸",
  },
  {
    quote: "Izma is an amazing worker. She works very hard, has excellent communication and is extremely dependable. I would like to work with her again in the future.",
    project: "Appointment Setter · Roofing Inspections",
    earned: "$70",
    hours: "Fixed Price",
    member: "Izma Hussain",
    memberColor: "#10B981",
    flag: "🇺🇸",
  },
  {
    quote: "Ria is fantastic — understood the project and delivered as required.",
    project: "Remote Business Development",
    earned: "$1,500",
    hours: "119 hrs",
    member: "Ria K.",
    memberColor: "#EC4899",
    flag: "🇬🇧",
  },
  {
    quote: "Ria was really great to work with! She is professional, eager to help and a great addition to my company. I would highly recommend her to anyone needing a dependable VA.",
    project: "Virtual Assistant · Cleaning Business",
    earned: "$484",
    hours: "40 hrs",
    member: "Ria K.",
    memberColor: "#EC4899",
    flag: "🇺🇸",
  },
  {
    quote: "Hired Ria to do cold calling. Not only does she read the script with fluent English, but has great tonality and pacing. Very reliable and easy to work with. I trust Ria with my leads and highly recommend her.",
    project: "Outbound Cold Caller · Sales Lead Gen",
    earned: "$100",
    hours: "7 hrs",
    member: "Ria K.",
    memberColor: "#EC4899",
    flag: "🇺🇸",
  },
  {
    quote: "Amazing assistant, fluent in English, very friendly to work with and learns fast. Got the job done perfectly without any issues.",
    project: "Discord & Email Virtual Assistant",
    earned: "$250",
    hours: "Fixed Price",
    member: "Team Member",
    memberColor: "#3B82F6",
    flag: "🇺🇸",
  },
  {
    quote: "Fahad is a dedicated professional with a great work ethic. I strongly recommend him.",
    project: "Online Sales VA · Commission",
    earned: "$514",
    hours: "86 hrs",
    member: "Fahad Ali",
    memberColor: "#FF6B35",
    flag: "🇺🇸",
  },
  {
    quote: "Fahad is an energetic developer to work with. His expertise in PHP/Laravel, React, and MongoDB was evident in the seamless functionality and clean code.",
    project: "School Lunch Ordering System",
    earned: "$160",
    hours: "8 hrs",
    member: "Fahad Ali",
    memberColor: "#FF6B35",
    flag: "🇺🇸",
  },
  {
    quote: "Great, I recommend her — she was much better than most people we've hired on Upwork.",
    project: "Cold Caller · Outbound Sales",
    earned: "$148",
    hours: "25 hrs",
    member: "Ria K.",
    memberColor: "#EC4899",
    flag: "🇦🇺",
  },
];

/* ── Upwork micro-logo ── */
function UpworkDot() {
  return (
    <svg width="12" height="12" viewBox="0 0 40 40" fill="none" className="flex-shrink-0">
      <path d="M30.3 22.3c-2.3 0-4.5-1-6.2-2.6l.9-4.4c.8-4.2 3.5-7 6.6-7 3.5 0 6.2 3.1 6.2 7.2 0 3.8-2.9 6.8-7.5 6.8zm0-19.5c-5.8 0-10.3 4.2-11.4 10.5l-1.3 6.8c-1.1 3.4-3.7 5.6-6.5 5.6-3.1 0-5.5-2.8-5.5-6.3 0-3.7 2.3-6.4 5.2-6.4.9 0 1.7.2 2.4.6l1.6-5.5c-1.1-.4-2.5-.7-3.9-.7C5 7.4.5 12.3.5 19.5c0 7 4.7 11.7 11.1 11.7 5.2 0 9.2-3.1 11.1-8.1l.8-2.3c1.5 5.2 6 9 11.4 9.1V37l6-3.5V19.5c0-9.2-4.6-16.7-10.6-16.7z" fill="#14a800"/>
    </svg>
  );
}

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <div
      className="flex-shrink-0 w-[320px] mx-2 flex flex-col p-5 rounded-2xl"
      style={{
        background: "rgba(8,13,32,0.97)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* Stars + flag */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
          ))}
        </div>
        <span className="text-base">{r.flag}</span>
      </div>

      {/* Quote */}
      <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-4">
        "{r.quote}"
      </p>

      {/* Bottom: verified badge + earned */}
      <div className="flex items-end justify-between gap-2 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <UpworkDot />
            <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wide">Verified</span>
          </div>
          <div className="text-[11px] text-slate-600 leading-tight line-clamp-1">{r.project}</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div
            className="text-sm font-bold"
            style={{ color: r.memberColor }}
          >
            {r.earned}
          </div>
          <div className="text-[10px] text-slate-600">{r.hours}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const row1 = [...REVIEWS.slice(0, 6), ...REVIEWS.slice(0, 6)];
  const row2 = [...REVIEWS.slice(6), ...REVIEWS.slice(6)];

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080D20, #05091A)" }}
    >
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.2), transparent)" }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)", color: "#FF8C42" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Client Love
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Words Straight{" "}
            <span className="text-gradient">From Our Clients</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 max-w-lg mx-auto text-sm"
          >
            Every review below is 100% real — pulled directly from verified Upwork contracts. No actors. No edits.
          </motion.p>
        </div>

        {/* Row 1 — left */}
        <div className="overflow-hidden mb-3">
          <div className="marquee-left flex w-max">
            {row1.map((r, i) => <ReviewCard key={i} r={r} />)}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="overflow-hidden">
          <div className="marquee-right flex w-max">
            {[...row2].reverse().map((r, i) => <ReviewCard key={i} r={r} />)}
          </div>
        </div>

        {/* Edge fades */}
        <div
          className="absolute top-0 left-0 bottom-0 w-28 pointer-events-none z-10"
          style={{ background: "linear-gradient(90deg, #05091A, transparent)" }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-28 pointer-events-none z-10"
          style={{ background: "linear-gradient(-90deg, #05091A, transparent)" }}
        />
      </div>
    </section>
  );
}
