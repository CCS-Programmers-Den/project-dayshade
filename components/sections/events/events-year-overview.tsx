"use client";

import { motion } from "framer-motion";
import { Jost } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { YearMilestones } from "@/lib/constants/events-data";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

interface EventsYearOverviewProps {
  years: YearMilestones[];
  onSelectYear: (year: number) => void;
}

export default function EventsYearOverview({
  years,
  onSelectYear,
}: EventsYearOverviewProps) {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  // Only show years that have at least one milestone
  const displayYears = years.filter(
    (y) => Array.isArray(y.milestones) && y.milestones.length > 0
  );

  // Handle year selection and update the active year state
  const handleYearClick = (year: number) => {
    setActiveYear(year);
    onSelectYear(year);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-20 sm:pt-24 md:pt-12 pb-0">
      {/* Background pattern with low opacity for a subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: "url(/assets/pattern.png)",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundSize: "clamp(600px, 85vw, 1200px) auto",
          opacity: 0.015,
          filter: "brightness(0.5)",
          maskImage: "linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Main content containing the title, description, and year list */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center flex-1 justify-center py-4 sm:py-6 md:py-10">
        {/* Page title and description */}
        <div className="text-center w-full max-w-6xl mx-auto space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8 md:mb-12 overflow-visible">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`font-jost ${jost.className} text-[22px] sm:text-3xl md:text-5xl lg:text-[70px] xl:text-[82px] font-bold uppercase tracking-tight events-title-gradient drop-shadow-sm whitespace-normal md:whitespace-nowrap leading-tight lg:leading-[98px] px-2 sm:px-4 inline-block`}
          >
            EVENTS &amp; ACHIEVEMENTS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
            className="text-xs sm:text-sm md:text-xl lg:text-[30px] xl:text-[34px] leading-relaxed lg:leading-[37px] text-white font-normal max-w-5xl mx-auto whitespace-normal md:whitespace-nowrap px-2"
          >
            A celebration of our milestones and proudest moments.
          </motion.p>
        </div>

        {/* Year Selection Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
          className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[1050px] min-h-[170px] sm:min-h-[220px] md:min-h-[450px] bg-black/20 border border-white/10 rounded-[10px] px-3 py-1 sm:p-4 md:p-6 overflow-hidden relative flex flex-col justify-center"
        >
          <div className="flex flex-col h-full">
            {displayYears.map((yearData, idx) => {
              const isSelected = activeYear === yearData.year;
              return (
                <motion.button
                  key={yearData.year}
                  onClick={() => handleYearClick(yearData.year)}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group/item relative flex-1 py-2 sm:py-3.5 md:py-6 px-2 flex items-center justify-center text-center transition-all duration-200 hover:bg-white/[0.04] active:bg-white/[0.08] cursor-pointer touch-manipulation select-none ${
                    idx < displayYears.length - 1 ? "border-b border-white/20" : ""
                  }`}
                >
                  {/* Year text changes to green when selected or hovered */}
                  <span
                    className={`font-jost ${jost.className} text-base sm:text-2xl md:text-4xl lg:text-[48px] md:leading-[53px] font-bold tracking-wider transition-colors duration-150 ${
                      isSelected
                        ? "text-events-green"
                        : "text-white group-hover/item:text-events-green group-active/item:text-events-green group-focus-visible/item:text-events-green active:text-events-green"
                    }`}
                  >
                    {yearData.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18, ease: "easeOut" }}
        className="w-full relative mt-10 sm:mt-14 md:mt-20 h-[140px] sm:h-[180px] md:h-[240px] lg:h-[300px] xl:h-[340px] events-banner-gradient border-t border-white/10 overflow-hidden flex items-center justify-center z-10"
      >
        {/* Decorative holder attached to the left side of the banner */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-9 sm:h-14 md:h-20 lg:h-[95px] xl:h-[115px] 2xl:h-[130px] w-[50px] sm:w-[90px] md:w-[150px] lg:w-[210px] xl:w-[260px] 2xl:w-[310px] pointer-events-none z-10">
          <Image
            src="/assets/events/banner_holder_left.png"
            alt="Banner Holder Left"
            fill
            className="object-fill object-left"
            priority
          />
        </div>

        {/* Decorative holder attached to the right side of the banner  */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-9 sm:h-14 md:h-20 lg:h-[95px] xl:h-[115px] 2xl:h-[130px] w-[50px] sm:w-[90px] md:w-[150px] lg:w-[210px] xl:w-[260px] 2xl:w-[310px] pointer-events-none z-10">
          <Image
            src="/assets/events/banner_holder_right.png"
            alt="Banner Holder Right"
            fill
            className="object-fill object-right"
            priority
          />
        </div>

        {/* Decorative pattern layered over the banner with 10% opacity */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage: "url(/assets/pattern.png)",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "clamp(260px, 45vw, 750px) auto",
            opacity: 0.1,
          }}
        />

        {/* Main message displayed in the center of the banner */}
        <div className="relative z-30 w-full max-w-[760px] px-3 sm:px-6 text-center mx-auto flex flex-col items-center justify-center">
          <h3
            className={`font-jost ${jost.className} text-white font-bold uppercase tracking-normal text-xs sm:text-base md:text-2xl lg:text-[34px] xl:text-[40px] leading-[1.109] drop-shadow-2xl`}
          >
            <span className="block whitespace-nowrap">
              MORE EVENTS AND ACHIEVEMENTS
            </span>
            <span className="block whitespace-nowrap mt-1 sm:mt-1.5 md:mt-2">
              ARE YET TO COME!
            </span>
          </h3>
        </div>
      </motion.div>
    </section>
  );
}
