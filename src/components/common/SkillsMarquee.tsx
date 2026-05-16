"use client";

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
  { text: "HubSpot & GoHighLevel", accent: true },
  { text: "Lead Generation" },
  { text: "Project Management", accent: true },
  { text: "Agile · Scrum · Jira" },
  { text: "Social Media Mgmt", accent: true },
  { text: "Business Strategy" },
];

function Tag({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 mx-2"
      style={accent
        ? { background: "rgba(240,101,41,0.08)", border: "1px solid rgba(240,101,41,0.16)", color: "var(--accent)" }
        : { background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-subtle)" }
      }
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: accent ? "var(--accent)" : "var(--text-subtle)" }} />
      {text}
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <section className="relative py-8 overflow-hidden" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="absolute top-0 left-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--bg-surface), transparent)" }} />
      <div className="absolute top-0 right-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, var(--bg-surface), transparent)" }} />
      <div className="space-y-3">
        <div className="overflow-hidden">
          <div className="marquee-slow flex w-max">
            {[...ROW_1, ...ROW_1].map((item, i) => <Tag key={i} {...item} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-slow-right flex w-max">
            {[...ROW_2, ...ROW_2].map((item, i) => <Tag key={i} {...item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
