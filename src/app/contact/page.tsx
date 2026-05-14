import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "Contact — Babar Tech Solutions",
  description: "Get in touch with Babar Tech Solutions. Tell us what you need and we'll match you with the right specialist within hours.",
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
