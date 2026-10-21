"use client";

import { motion } from "framer-motion";
import { Jost } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { YearMilestones, hasMilestoneValue } from "@/lib/constants/events-data";

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
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0b0c0e] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(74,238,152,0.18),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(179,81,227,0.12),_transparent_30%)]" />
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: "url(/assets/pattern.png)",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundSize: "clamp(600px, 85vw, 1200px) auto",
          opacity: 0.03,
          filter: "brightness(0.6)",
          maskImage: "linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`font-jost ${jost.className} inline-block bg-gradient-to-r from-pd-green via-white to-pd-purple bg-clip-text text-[22px] font-bold uppercase tracking-tight text-transparent sm:text-3xl md:text-5xl lg:text-[70px] xl:text-[82px]`}
          >
            EVENTS &amp; ACHIEVEMENTS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
            className="mt-4 text-xs text-zinc-300 sm:text-sm md:text-xl lg:text-[30px] xl:text-[34px]"
          >
            A celebration of our milestones and proudest moments.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
          className="w-full max-w-[280px] overflow-hidden rounded-[10px] border border-white/10 bg-[#101112] px-3 py-1 shadow-[0_0_30px_rgba(0,0,0,0.35)] sm:max-w-[360px] sm:p-4 md:max-w-[1050px] md:min-h-[450px] md:p-6"
        >
          <div className="flex h-full flex-col">
            {displayYears.map((yearData, idx) => {
              const isSelected = activeYear === yearData.year;
              return (
                <motion.button
                  key={yearData.year}
                  onClick={() => handleYearClick(yearData.year)}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group/item relative flex-1 cursor-pointer touch-manipulation select-none px-2 py-2 text-center transition-all duration-200 hover:bg-pd-green/5 active:bg-pd-green/10 sm:py-3.5 md:py-6 ${
                    idx < displayYears.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <span
                    className={`font-jost ${jost.className} text-base font-bold tracking-wider transition-colors duration-150 sm:text-2xl md:text-4xl lg:text-[48px] md:leading-[53px] ${
                      isSelected
                        ? "text-pd-green"
                        : "text-white group-hover/item:text-pd-green group-active/item:text-pd-green group-focus-visible/item:text-pd-green"
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18, ease: "easeOut" }}
        className="relative mt-4 flex h-[140px] w-full items-center justify-center overflow-hidden border-t border-white/10 bg-gradient-to-r from-pd-purple/10 via-[#121315] to-pd-green/10 sm:h-[180px] md:mt-10 md:h-[240px] lg:h-[300px] xl:h-[340px]"
      >
        <div className="absolute left-0 top-1/2 z-10 h-9 w-[50px] -translate-y-1/2 sm:h-14 sm:w-[90px] md:h-20 md:w-[150px] lg:h-[95px] lg:w-[210px] xl:h-[115px] xl:w-[260px] 2xl:h-[130px] 2xl:w-[310px] pointer-events-none">
          <Image src="/assets/events/banner_holder_left.png" alt="Banner Holder Left" fill className="object-fill object-left" priority />
        </div>

        <div className="absolute right-0 top-1/2 z-10 h-9 w-[50px] -translate-y-1/2 sm:h-14 sm:w-[90px] md:h-20 md:w-[150px] lg:h-[95px] lg:w-[210px] xl:h-[115px] xl:w-[260px] 2xl:h-[130px] 2xl:w-[310px] pointer-events-none">
          <Image src="/assets/events/banner_holder_right.png" alt="Banner Holder Right" fill className="object-fill object-right" priority />
        </div>

        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/pattern.png)",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "clamp(260px, 45vw, 750px) auto",
            opacity: 0.08,
          }}
        />

        <div className="relative z-30 mx-auto flex w-full max-w-[760px] flex-col items-center justify-center px-3 text-center sm:px-6">
          <h3 className={`font-jost ${jost.className} text-xs font-bold uppercase tracking-normal text-white sm:text-base md:text-2xl lg:text-[34px] xl:text-[40px]`}>
            <span className="block whitespace-nowrap text-pd-green">
              MORE EVENTS AND ACHIEVEMENTS
            </span>
            <span className="mt-1 block whitespace-nowrap sm:mt-1.5 md:mt-2">
              ARE YET TO COME!
            </span>
          </h3>
        </div>
      </motion.div>
    </section>
  );
}
