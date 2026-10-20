import Hero from "@/components/home/Hero";
import TechMarquee from "@/components/home/TechMarquee";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedWork from "@/components/home/FeaturedWork";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Quvora",
    description: "Freelance software studio building websites, web apps and software for businesses.",
    email: "quvoradev12@gmail.com",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://quvora.dev",
    sameAs: ["https://instagram.com/quvoradev"],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <TechMarquee />
      <ServicesPreview />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <CTASection />
    </>
  );
}
