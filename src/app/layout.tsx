import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollProgress from "@/components/common/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://babartechsolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
    shortcut: "/logo.jpg",
  },
  title: {
    default: "Babar Tech Solutions — Top Rated Upwork Agency | Remote Workforce & Software",
    template: "%s | Babar Tech Solutions",
  },
  description:
    "Babar Tech Solutions is a Top Rated Upwork agency with 100% Job Success Score. We provide expert virtual assistants, customer service teams, sales support, and web development — ready to work within 24 hours.",
  keywords: [
    "Babar Tech Solutions",
    "Upwork agency",
    "top rated Upwork agency",
    "virtual assistant agency",
    "remote customer service",
    "sales support outsourcing",
    "web development agency",
    "customer success specialist",
    "remote workforce solutions",
    "lead generation agency",
    "hire virtual assistant",
    "outsourced customer support",
    "remote team Pakistan",
    "Fahad Ali",
    "freelance agency",
  ],
  authors: [{ name: "Fahad Ali", url: BASE_URL }],
  creator: "Babar Tech Solutions",
  publisher: "Babar Tech Solutions",
  category: "Business",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Babar Tech Solutions",
    title: "Babar Tech Solutions — Top Rated Upwork Agency",
    description:
      "100% Job Success Score · Top Rated · 5.0★. Expert virtual assistants, customer service, sales support & web development. Onboarded and working within 24 hours.",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Babar Tech Solutions — Top Rated Upwork Agency",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@babartechsol",
    title: "Babar Tech Solutions — Top Rated Upwork Agency",
    description:
      "100% Job Success · Top Rated · 5.0★. Expert VAs, customer service, sales support & web dev. Live within 24 hours.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "MTsCUahlvhCfrmxCiVffsg2isT9pWtdtCHGJTo",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Babar Tech Solutions",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.jpg`,
  image: `${BASE_URL}/logo.jpg`,
  description:
    "Top Rated Upwork agency providing virtual assistants, customer service teams, sales support, and web development for global businesses.",
  email: "hello@babartechsolutions.com",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Fahad Ali",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Virtual Assistant",
    "Customer Service",
    "Sales Support",
    "Web Development",
    "Lead Generation",
    "Customer Success",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "14",
  },
  sameAs: [
    "https://www.upwork.com/agencies/babartechsolutions/",
    "https://www.linkedin.com/company/babartechsolutions/",
    "https://www.instagram.com/babartechsolutions/",
    "https://www.facebook.com/profile.php?id=61576992675253",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#05091A] text-slate-100 antialiased overflow-x-hidden">
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
