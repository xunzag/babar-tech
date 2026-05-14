import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import SkillsMarquee from "@/components/common/SkillsMarquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import UpworkCredibility from "@/components/sections/UpworkCredibility";
import HowItWorks from "@/components/sections/HowItWorks";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <About />
      <Services />
      <WhyChooseUs />
      <UpworkCredibility />
      <HowItWorks />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
