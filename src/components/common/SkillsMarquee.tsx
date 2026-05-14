"use client";

/* Pure CSS marquee — zero JS runtime cost */

const ROW_1 = [
  { text: "Web Development", accent: true },
  { text: "Next.js & React" },
  { text: "UI/UX Design", accent: true },
  { text: "Figma & Prototyping" },
  { text: "Automation & Zapier", accent: true },
  { text: "Python & Node.js" },
  { text: "Customer Service", accent: true },
  { text: "Zendesk · Freshdesk" },
  { text: "Virtual Assistance", accent: true },
  { text: "CRM Management" },
  { text: "TypeScript & APIs", accent: true },
  { text: "AWS · Vercel · GCP" },
];

const ROW_2 = [
  { text: "Upwork Top Rated", accent: true },
  { text: "100% Job Success" },
  { text: "Technical Support", accent: true },
  { text: "Admin Support" },
  { text: "Sales Support", accent: true },
  { text: "Make · n8n · Zapier" },
  { text: "Business Strategy", accent: true },
  { text: "HubSpot & GoHighLevel" },
  { text: "Lead Generation", accent: true },
  { text: "Social Media Mgmt" },
  { text: "Project Management", accent: true },
  { text: "Agile · Scrum · Jira" },
];

function MarqueeItem({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 mx-2"
      style={
        accent
          ? {
              background: "rgba(255,107,53,0.08)",
              border: "1px solid rgba(255,107,53,0.18)",
              color: "#FF8C42",
            }
          : {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#64748B",
            }
      }
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: accent ? "#FF6B35" : "#334155" }}
      />
      {text}
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <section
      className="relative py-10 overflow-hidden"
      style={{ background: "#04071A" }}
    >
      {/* Top & bottom separator lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.2), rgba(59,130,246,0.2), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.15), rgba(59,130,246,0.15), transparent)" }}
      />

      {/* Fade on left & right edges */}
      <div
        className="absolute top-0 left-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #04071A, transparent)" }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #04071A, transparent)" }}
      />

      <div className="space-y-3">
        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden">
          <div className="marquee-left flex w-max">
            {[...ROW_1, ...ROW_1].map((item, i) => (
              <MarqueeItem key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden">
          <div className="marquee-right flex w-max">
            {[...ROW_2, ...ROW_2].map((item, i) => (
              <MarqueeItem key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
