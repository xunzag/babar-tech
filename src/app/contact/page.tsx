import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "Contact — Get Started with Babar Tech Solutions",
  description: "Get in touch with Babar Tech Solutions. Tell us what you need and we'll match you with the right specialist same day — onboarded and working within 24 hours. No contracts.",
  alternates: { canonical: "https://babartechsolutions.com/contact" },
  openGraph: {
    title: "Contact Babar Tech Solutions",
    description: "Tell us what you need. We'll match you with a specialist same day and have them working within 24 hours.",
    url: "https://babartechsolutions.com/contact",
    images: [{ url: "/logo-final.jpg", width: 800, height: 800, alt: "Contact Babar Tech Solutions" }],
  },
};

export default function ContactPage() {
  return (
    <main className="relative">
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  );
}
