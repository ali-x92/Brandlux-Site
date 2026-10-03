import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Platforms } from "@/components/Platforms";
import { Features } from "@/components/Features";
import { Problem } from "@/components/Problem";
import { UseCases } from "@/components/UseCases";
import { Workspace } from "@/components/Workspace";

import { Stats } from "@/components/Stats";
import { Bento } from "@/components/Bento";
import { Comparison } from "@/components/Comparison";
import { HowItWorks } from "@/components/HowItWorks";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BrandLux — Your Brand, Radiant." },
      {
        name: "description",
        content:
          "BrandLux is an AI brand studio: one workspace for your logo, website, print, packaging, social content and marketing copy. Join the wishlist for early access.",
      },
      { property: "og:title", content: "BrandLux — Your Brand, Radiant." },
      {
        property: "og:description",
        content:
          "One workspace. A complete, consistent brand identity. Join the BrandLux wishlist for early access.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Platforms />
        <Problem />
        <Features />
        <Stats />
        <Bento />
        <UseCases />
        <HowItWorks />
        <About />
        <Comparison />
        <Workspace />
        <Pricing />
        <Faq />
        <Contact />
        <CtaSection />
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
