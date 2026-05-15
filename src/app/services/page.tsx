import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesPage from "@/components/sections/ServicesPage";

export const metadata: Metadata = {
  title: "Services — Virtual Assistant, Customer Service & Web Development",
  description:
    "Hire expert virtual assistants, customer service teams, sales support specialists, and web developers from Babar Tech Solutions. Top Rated Upwork agency · 100% Job Success Score.",
  alternates: { canonical: "https://babartechsolutions.com/services" },
  openGraph: {
    title: "Services — Babar Tech Solutions",
    description: "VA, customer service, sales support & web development. Top Rated Upwork agency ready to start within 24 hours.",
    url: "https://babartechsolutions.com/services",
    images: [{ url: "/logo.jpg", width: 800, height: 800, alt: "Babar Tech Solutions Services" }],
  },
};

export default function Services() {
  return (
    <main>
      <Navbar />
      <ServicesPage />
      <Footer />
    </main>
  );
}
