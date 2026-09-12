
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EVENTS_DATA } from "./events-data";
import EventsTimelineView from "./events-timeline-view";
import EventsYearOverview from "./events-year-overview";

export default function EventsMain() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const selectedYearData = selectedYear
    ? EVENTS_DATA.find((y) => y.year === selectedYear) ?? null
    : null;

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedYear(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Base background gradient  Top white/light gradient smoothly fading to deep charcoal/black */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#55555C] via-[#232326] via-30% to-[#101012] -z-20" />
      {/* Top soft ambient light glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-white/[0.04] blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-0">
        <AnimatePresence mode="wait">
          {selectedYearData ? (
            <motion.div
              key={`timeline-${selectedYear}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <EventsTimelineView
                yearData={selectedYearData}
                allYears={EVENTS_DATA}
                onBack={handleBack}
                onSelectYear={handleSelectYear}
              />
            </motion.div>
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <EventsYearOverview
                years={EVENTS_DATA}
                onSelectYear={handleSelectYear}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
