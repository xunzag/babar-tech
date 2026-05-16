import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeamPage from "@/components/team/TeamPage";

export const metadata: Metadata = {
  title: "Meet the Team — Virtual Assistants, Customer Service & Dev Specialists",
  description:
    "Meet the elite remote professionals at Babar Tech Solutions — VAs, customer service leads, sales specialists, and developers with 5.0★ Upwork ratings and real verified reviews.",
  alternates: { canonical: "https://babartechsolutions.com/team" },
  openGraph: {
    title: "Meet the Team — Babar Tech Solutions",
    description: "Six pre-vetted specialists. VA, customer service, sales & web dev. All 5.0★ rated on Upwork.",
    url: "https://babartechsolutions.com/team",
    images: [{ url: "/logo-final.jpg", width: 800, height: 800, alt: "Babar Tech Solutions Team" }],
  },
};

export default function Team() {
  return (
    <main>
      <Navbar />
      <TeamPage />
      <Footer />
    </main>
  );
}
