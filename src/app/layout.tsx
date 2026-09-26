import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/site/Analytics";
import CookieConsent from "@/site/CookieConsent";
import { SERVICES, SITE } from "@/site/content";
import Footer from "@/site/Footer";
import Motion from "@/site/Motion";
import { pageMeta } from "@/site/meta";
import Nav from "@/site/Nav";
import ScrollFx from "@/site/ScrollFx";
import WelcomeNote from "@/site/WelcomeNote";

const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "wdth"],
  display: "swap",
});
const body = Geist({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-mono-face", subsets: ["latin"], display: "swap", preload: false });

const TITLE = "Babar Tech Solutions: vetted remote teams for support, sales, admin and development";
const DESC =
  "Top Rated Upwork agency with a 100% Job Success Score. Vetted customer support reps, virtual assistants, sales callers, project coordinators and developers, matched the same day and working within 24 hours.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...pageMeta({
    title: "Babar Tech Solutions: your next hire starts tomorrow",
    description: DESC,
    path: "/",
    imageAlt: "Babar Tech Solutions: your next hire starts tomorrow. Top Rated on Upwork, 100% Job Success.",
  }),
  title: { default: TITLE, template: "%s · Babar Tech Solutions" },
  applicationName: SITE.name,
  authors: [{ name: "Fahad Ali" }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "business",
  keywords: [
    "remote staffing agency", "virtual assistant agency", "outsourced customer support", "cold calling agency",
    "appointment setters", "customer success outsourcing", "offshore developers Pakistan", "Top Rated Upwork agency",
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: { google: "MTsCUahIvhCfrmxCiVffsg2isT9pWtdtCHGJToUIW_I" },
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: { title: "Babar Tech", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#f2f0eb",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#org`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/img/mark.png`,
      image: `${SITE.url}/og/home.jpg`,
      email: SITE.email,
      description: DESC,
      foundingDate: String(SITE.founded),
      founder: { "@type": "Person", name: "Fahad Ali" },
      areaServed: ["US", "GB", "EU", "AU", "CA"],
      sameAs: [SITE.upwork, SITE.linkedin, SITE.instagram, SITE.facebook],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5", reviewCount: "15" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.body } })),
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs, so content is never hidden without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
        <ScrollFx />
        <CookieConsent />
        <WelcomeNote />
        <Analytics />
      </body>
    </html>
  );
}
