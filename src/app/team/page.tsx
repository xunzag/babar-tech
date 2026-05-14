import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeamPage from "@/components/team/TeamPage";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the elite professionals behind Babar Tech Solutions — developers, designers, VAs, and support specialists working together to deliver world-class results.",
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
