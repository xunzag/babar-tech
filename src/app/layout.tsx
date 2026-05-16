import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Dancing_Script } from "next/font/google";
import { ThemeProvider } from "next-themes";
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

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const BASE_URL = "https://babartechsolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: [
      { url: "/logo-final.jpg", type: "image/jpeg" },
    ],
    apple: "/logo-final.jpg",
    shortcut: "/logo-final.jpg",
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
        url: "/logo-final.jpg",
        width: 800,
        height: 800,
        alt: "Babar Tech Solutions — Top Rated Upwork Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Babar Tech Solutions — Top Rated Upwork Agency",
    description: "100% JSS · Top Rated · 5.0★. Expert VAs, customer service, sales support & web dev. Live within 24 hours.",
    images: ["/logo-final.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: BASE_URL },
  verification: { google: "MTsCUahIvhCfrmxCiVffsg2isT9pWtdtCHGJToUIW_I" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Babar Tech Solutions",
  url: BASE_URL,
  logo: `${BASE_URL}/logo-final.jpg`,
  image: `${BASE_URL}/logo-final.jpg`,
  description: "Top Rated Upwork agency providing virtual assistants, customer service teams, sales support, and web development for global businesses.",
  email: "hello@babartechsolutions.com",
  foundingDate: "2024",
  founder: { "@type": "Person", name: "Fahad Ali" },
  areaServed: "Worldwide",
  serviceType: ["Virtual Assistant", "Customer Service", "Sales Support", "Web Development", "Lead Generation", "Customer Success"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5", worstRating: "1", reviewCount: "14" },
  sameAs: [
    "https://www.upwork.com/agencies/babartechsolutions/",
    "https://www.linkedin.com/company/babartechsolutions/",
    "https://www.instagram.com/babartechsolutions/",
    "https://www.facebook.com/profile.php?id=61576992675253",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geistMono.variable} ${dancingScript.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} themes={["dark", "light"]}>
          <SmoothScroll>
            <ScrollProgress />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
