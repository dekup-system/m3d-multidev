import React from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntegratedFlowSection } from "@/components/sections/IntegratedFlowSection";
import { BentoSystemsSection } from "@/components/sections/BentoSystemsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { SecuritySlaSection } from "@/components/sections/SecuritySlaSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#FAFAFA] text-[#131316]">
      <Header />
      <main id="conteudo-principal" className="flex-1">
        <HeroSection />
        <IntegratedFlowSection />
        <BentoSystemsSection />
        <PortfolioSection />
        <MissionSection />
        <SecuritySlaSection />
      </main>
      <Footer />
    </div>
  );
}
