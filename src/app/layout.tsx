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

export const metadata: Metadata = {
  metadataBase: new URL("https://babartechsolutions.com"),
  title: {
    default: "Babar Tech Solutions — Premium Software & Remote Workforce",
    template: "%s | Babar Tech Solutions",
  },
  description:
    "Elite freelancing and software solutions agency. We deliver world-class web development, UI/UX design, automation, and remote workforce solutions for global businesses.",
  keywords: [
    "software solutions",
    "web development",
    "UI/UX design",
    "remote workforce",
    "automation",
    "Upwork",
    "freelancing agency",
    "virtual assistant",
    "technical support",
    "Babar Tech Solutions",
  ],
  authors: [{ name: "Fahad Ali", url: "https://babartechsolutions.com" }],
  creator: "Babar Tech Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://babartechsolutions.com",
    siteName: "Babar Tech Solutions",
    title: "Babar Tech Solutions — Premium Software & Remote Workforce",
    description:
      "Elite freelancing and software solutions agency delivering world-class digital services globally.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Babar Tech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Babar Tech Solutions — Premium Software & Remote Workforce",
    description:
      "Elite freelancing and software solutions agency delivering world-class digital services globally.",
    images: ["/og-image.png"],
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
      <body className="min-h-screen bg-[#05091A] text-slate-100 antialiased overflow-x-hidden">
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
