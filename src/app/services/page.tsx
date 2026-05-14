import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesPage from "@/components/sections/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the full range of premium services from Babar Tech Solutions — web development, UI/UX design, virtual assistance, automation, customer service, and more.",
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
