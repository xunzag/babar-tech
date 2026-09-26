/* Single source of truth for everything the site says.
   Every review below is quoted verbatim from the agency's public Upwork profile. */

export const SITE = {
  name: "Babar Tech Solutions",
  short: "Babar Tech",
  url: "https://babartechsolutions.com",
  email: "hello@babartechsolutions.com",
  calendly: "https://calendly.com/farhan-babar123/30min",
  upwork: "https://www.upwork.com/agencies/babartechsolutions/",
  linkedin: "https://www.linkedin.com/company/babartechsolutions/",
  instagram: "https://www.instagram.com/babartechsolutions/",
  facebook: "https://www.facebook.com/profile.php?id=61576992675253",
  teamTz: "Asia/Karachi",
  founded: 2024,
} as const;

export type VizKind = "support" | "assist" | "sales" | "success" | "ops" | "dev";

export type Service = {
  id: string;
  num: string;
  name: string;
  short: string;
  line: string;
  body: string;
  roles: string[];
  tools: string[];
  outcomes: string[];
  viz: VizKind;
};

export const SERVICES: Service[] = [
  {
    id: "customer-support",
    num: "01",
    name: "Customer Support",
    short: "Support",
    line: "Every ticket answered like it's the only one.",
    body: "Dedicated support reps who learn your product, your policies and your tone of voice, then work your inbox, chat and phone queue during your business hours or through the night.",
    roles: ["Email & chat support", "Phone support", "Returns & refunds", "Escalation handling", "Help-desk & ticketing"],
    tools: ["Gorgias", "Zendesk", "Freshdesk", "HubSpot", "Slack"],
    outcomes: ["Faster first response", "Fewer escalations reaching you", "Customers who stay"],
    viz: "support",
  },
  {
    id: "virtual-assistance",
    num: "02",
    name: "Virtual Assistance",
    short: "Assistants",
    line: "The work you keep pushing to tomorrow, done today.",
    body: "Executive and operations assistants who take the calendar, inbox, research, data entry and admin off your plate, and flag what needs you before you have to ask.",
    roles: ["Inbox & calendar", "Research & reporting", "CRM hygiene", "Travel & scheduling", "Document prep"],
    tools: ["Google Workspace", "Microsoft 365", "Notion", "Slack", "Asana"],
    outcomes: ["Hours back every week", "Inbox under control", "Nothing slips"],
    viz: "assist",
  },
  {
    id: "sales-lead-generation",
    num: "03",
    name: "Sales & Lead Generation",
    short: "Sales",
    line: "A pipeline that fills itself while you close.",
    body: "Cold callers, appointment setters and SDRs who work your list, qualify the conversation and put booked meetings on your calendar, with notes in your CRM.",
    roles: ["Outbound cold calling", "Appointment setting", "Lead research & list building", "Follow-up sequences", "CRM updates"],
    tools: ["GoHighLevel", "HubSpot", "Google Sheets", "Slack", "Calendly"],
    outcomes: ["Booked meetings, not just dials", "Clean pipeline data", "Consistent follow-up"],
    viz: "sales",
  },
  {
    id: "customer-success",
    num: "04",
    name: "Customer Success",
    short: "Success",
    line: "Keep the customers you already worked hard to win.",
    body: "Onboarding, check-ins and retention playbooks run by people who notice when an account goes quiet and do something about it before it churns.",
    roles: ["Client onboarding", "Health checks & QBR prep", "Renewals support", "Churn-risk outreach", "Feedback loops"],
    tools: ["HubSpot", "Gorgias", "Freshdesk", "Notion", "Google Sheets"],
    outcomes: ["Lower churn", "Smoother onboarding", "Higher lifetime value"],
    viz: "success",
  },
  {
    id: "operations",
    num: "05",
    name: "Operations & Projects",
    short: "Operations",
    line: "Someone who owns the timeline, so you don't have to.",
    body: "Project coordinators and operations support who run the board, chase the blockers, document the process and keep every workstream moving toward the same date.",
    roles: ["Project coordination", "SOPs & documentation", "E-commerce operations", "Vendor coordination", "Finance & payroll support"],
    tools: ["Asana", "Trello", "Notion", "Slack", "Google Workspace"],
    outcomes: ["Deadlines that hold", "Documented processes", "Fewer status meetings"],
    viz: "ops",
  },
  {
    id: "web-development",
    num: "06",
    name: "Web & Software",
    short: "Development",
    line: "Websites, apps and automations that just work.",
    body: "Full-stack development for marketing sites, web apps and internal tools, plus the automations that connect your stack so your team stops copy-pasting between tabs.",
    roles: ["Marketing websites", "Web applications", "Internal tools & dashboards", "API integrations", "Workflow automation"],
    tools: ["Next.js", "React", "Laravel", "Node.js", "Zapier / Make"],
    outcomes: ["Shipped, not stuck in dev", "Clean, maintainable code", "Hours of manual work automated"],
    viz: "dev",
  },
];

export type Member = {
  slug: string;
  name: string;
  role: string;
  line: string;
  bio: string;
  skills: string[];
  photo: string;
  photoLarge?: string;
  focus: string;
};

export const TEAM: Member[] = [
  {
    slug: "fahad",
    name: "Fahad Ali",
    role: "Founder & CEO",
    line: "Personally accountable for every engagement.",
    bio: "Fahad spent 7+ years in customer experience leadership, including supervising CX teams across three locations at Allstate, before going independent on Upwork. Babar Tech grew out of that work: the same standards, applied by a team he hires and manages himself.",
    skills: ["CX leadership", "Project management", "Software sales", "Development"],
    photo: "/img/team/fahad-400.webp",
    focus: "Leadership",
  },
  {
    slug: "ryan",
    name: "Ryan",
    role: "Head of Customer Service",
    line: "Turns high-volume queues into calm ones.",
    bio: "8+ years building and leading customer service teams across industries. Ryan specialises in turning high-volume support queues into smooth client experiences through team leadership, CRM strategy and escalation management.",
    skills: ["Team leadership", "Quality assurance", "Escalations", "CRM strategy"],
    photo: "/img/team/ryan-400.webp",
    photoLarge: "/img/team/ryan-720.webp",
    focus: "Support",
  },
  {
    slug: "izma",
    name: "Izma Hussain",
    role: "Sales Support & VA Lead",
    line: "Makes sure there are deals to close.",
    bio: "Handles outreach, lead nurturing, inbox management and social media for founders, so their time goes into closing instead of chasing.",
    skills: ["Appointment setting", "Lead generation", "Inbox & calendar", "Social media"],
    photo: "/img/team/izma-400.webp",
    photoLarge: "/img/team/izma-720.webp",
    focus: "Sales",
  },
  {
    slug: "ria",
    name: "Ria K.",
    role: "Virtual Assistant Specialist",
    line: "Already handled it before you asked.",
    bio: "Calendars, CRM pipelines, research, admin and cold calling. Clients describe her tonality on the phone as the thing they didn't know they were missing.",
    skills: ["Virtual assistance", "Cold calling", "CRM", "Business development"],
    photo: "/img/team/ria-400.webp",
    focus: "Assistance",
  },
  {
    slug: "hooria",
    name: "Hooria Aslam",
    role: "Customer Success Specialist",
    line: "Treats retention as a system, not a rescue.",
    bio: "Builds onboarding flows, customer success playbooks and loyalty systems for SMEs and growth-stage startups, then runs them.",
    skills: ["Customer success", "Onboarding", "Churn reduction", "CS playbooks"],
    photo: "/img/team/hooria-400.webp",
    photoLarge: "/img/team/hooria-720.webp",
    focus: "Success",
  },
  {
    slug: "samra",
    name: "Samra",
    role: "Customer & Operations Specialist",
    line: "Five tools, four years, zero dropped balls.",
    bio: "4+ years across customer service, finance and project coordination. Fluent in Gorgias, HubSpot, Freshdesk and GoHighLevel, and just as comfortable with payroll.",
    skills: ["Customer support", "HubSpot", "Finance & payroll", "Project coordination"],
    photo: "/img/team/samra-400.webp",
    focus: "Operations",
  },
];

export type Review = {
  quote: string;
  project: string;
  who: string;
  hours: number | null;
  period: string;
  service: VizKind;
};

export const REVIEWS: Review[] = [
  {
    quote: "Fahad is excellent and really good at customer service. He helped our business tremendously by retaining our customers. His retention rate was close to 98%.",
    project: "Customer service rep, patient retention in medical supply",
    who: "Fahad",
    hours: 406,
    period: "Mar – May 2025",
    service: "support",
  },
  {
    quote: "Ria was really great to work with! She is professional, eager to help and a great addition to my company. It's been great having such reliable help.",
    project: "Virtual assistant for a cleaning business",
    who: "Ria",
    hours: 40,
    period: "Sep – Oct 2025",
    service: "assist",
  },
  {
    quote: "Sterling work on a speaking app for high school English learners in Slovakia. Easy to communicate with. The final iteration surpassed my expectations.",
    project: "Online speaking app for English learners",
    who: "Fahad",
    hours: 120,
    period: "Mar – May 2025",
    service: "dev",
  },
  {
    quote: "Hired Ria to do some cold calling. Not only does she read the script with fluent English, but has great tonality and pacing, which is hard to find sometimes.",
    project: "Outbound cold caller, sales lead generation",
    who: "Ria",
    hours: 7,
    period: "Jul 2025",
    service: "sales",
  },
  {
    quote: "Working with Fahad has been nothing short of amazing! He stepped in as our temporary project manager and instantly became an invaluable member of our team.",
    project: "E-commerce coordinator & project manager",
    who: "Fahad",
    hours: 83,
    period: "Mar 2025",
    service: "ops",
  },
  {
    quote: "Izma is an amazing worker. She works very hard, has excellent communication and is extremely dependable. I would like to work with her again in the future.",
    project: "Appointment setter for roofing inspections",
    who: "Izma",
    hours: null,
    period: "Oct – Nov 2025",
    service: "sales",
  },
  {
    quote: "Super helpful, great learner and speaks & types excellent English. He has always been proactive and organised. I'd highly recommend.",
    project: "Virtual executive assistant",
    who: "Fahad",
    hours: 355,
    period: "Mar – May 2025",
    service: "assist",
  },
  {
    quote: "She was amazing, very effective for the company. We are very proud on her.",
    project: "Executive personal assistant, client onboarding & operations",
    who: "Team",
    hours: 237,
    period: "Feb – May 2026",
    service: "success",
  },
  {
    quote: "Great, I recommend her, she was much better than most people we've hired on Upwork.",
    project: "Cold caller, outbound sales",
    who: "Ria",
    hours: 25,
    period: "Aug – Oct 2025",
    service: "sales",
  },
  {
    quote: "Fahad is incredible! Voice and communication are perfect. He completed his task with ease and helped us convert new clients.",
    project: "Dental appointment setter & lead closer",
    who: "Fahad",
    hours: 25,
    period: "Mar – Apr 2025",
    service: "sales",
  },
  {
    quote: "Amazing assistant, fluent in English, very friendly to work with and learns fast. Got the job done perfectly without any issues.",
    project: "Discord & email assistant for customer support",
    who: "Team",
    hours: null,
    period: "Nov – Dec 2025",
    service: "support",
  },
  {
    quote: "His expertise in PHP/Laravel, React, and MongoDB was evident in the seamless functionality and clean code.",
    project: "School lunch ordering system",
    who: "Fahad",
    hours: 8,
    period: "Feb 2025",
    service: "dev",
  },
  {
    quote: "Ria is fantastic, understood the project and delivered as required.",
    project: "Remote business development assistant (UK)",
    who: "Ria",
    hours: 119,
    period: "Sep – Nov 2025",
    service: "assist",
  },
];

/* Totals from the public review record (15 reviews, including two not quoted above). */
export const RECORD = {
  reviews: 15,
  rating: "5.0",
  jss: "100%",
  hours: "1,500+",
  badge: "Top Rated",
};

export const FAQ: { q: string; a: string }[] = [
  {
    q: "How fast can someone actually start?",
    a: "Usually within 24 hours of our first call. We match you with a specialist the same day, they get access to your tools and a walkthrough, and they start on real work the next business day. Complex roles, such as a support team that needs product training, can take a few days to ramp up fully.",
  },
  {
    q: "Will they work my hours?",
    a: "Yes. The team is based in Pakistan (UTC+5) and routinely works US, UK, EU and Australian business hours. For many clients we also run an overnight shift, so work you hand over at the end of your day is done when you wake up.",
  },
  {
    q: "How is this different from hiring a freelancer myself?",
    a: "You skip the job post, the proposals and the interviews. Every specialist is vetted and managed by us. If someone is out sick, you have cover. If the fit isn't right, we replace them. And you have one person, Fahad, who is accountable for the result.",
  },
  {
    q: "Do I need to sign a long contract?",
    a: "No. There's no lock-in. Start with a trial week or a small scope, scale up when it's working, and stop whenever you need to.",
  },
  {
    q: "Can we work through Upwork?",
    a: "Yes. Many clients hire us through our Top Rated agency profile on Upwork, which gives you their payment protection and time tracking. We can also contract directly if you prefer.",
  },
  {
    q: "How does pricing work?",
    a: "It depends on the role, hours and seniority. Most roles are billed hourly or as a monthly retainer, and development projects can be fixed-price. Book a call and you'll have a clear quote the same day, with no obligation.",
  },
  {
    q: "What tools does the team know?",
    a: "HubSpot, GoHighLevel, Gorgias, Zendesk, Freshdesk, Asana, Trello, Notion, Slack, Google Workspace and Microsoft 365, among others. If you use something else, we learn it. You don't change your stack for us.",
  },
];

export const NAV = [
  { href: "/services/", label: "Services" },
  { href: "/team/", label: "Team" },
  { href: "/#process", label: "Process" },
  { href: "/#reviews", label: "Reviews" },
];
