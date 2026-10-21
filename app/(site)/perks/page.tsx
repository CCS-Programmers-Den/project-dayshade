import React from "react";
import PerksHero from "@/components/sections/perks/perks-hero";
import PerksBento from "@/components/sections/perks/perks-bento";
import PerksWorkHard from "@/components/sections/perks/perks-work-hard";
import PerksMember from "@/components/sections/perks/perks-member";

export default function PerksPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
      <div className="absolute inset-0 bg-[url(/assets/pattern.png)] bg-cover bg-center opacity-5" />

      <div className="absolute -right-10 top-20 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] bg-[url('/assets/star-1.png')] bg-contain bg-no-repeat bg-center opacity-60 blur-sm">
        <div className="absolute inset-0 bg-pd-purple/20 mix-blend-overlay filter blur-3xl" />
      </div>

      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[url('/assets/star-2.png')] bg-contain bg-no-repeat bg-center opacity-50 blur-sm">
        <div className="absolute inset-0 bg-pd-green/20 mix-blend-overlay filter blur-3xl" />
      </div>

      <div className="absolute -right-20 bottom-20 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-[url('/assets/circle-purple.png')] bg-contain bg-no-repeat bg-center opacity-60 blur-sm">
        <div className="absolute inset-0 bg-pd-purple/30 mix-blend-overlay filter blur-3xl" />
      </div>

      <div className="relative z-10 pt-12 md:pt-16 pb-20 ">
        <div className="pt-12">
          <PerksHero />
        </div>
        <div className="max-w-7xl mx-auto">
          <PerksBento />
        </div>
        <PerksWorkHard />
        <PerksMember />
      </div>
    </div>
  );
}
