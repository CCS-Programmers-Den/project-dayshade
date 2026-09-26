
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EVENTS_DATA, getVisibleEventsData } from "@/data/events-data";
import EventsTimelineView from "./events-timeline-view";
import EventsYearOverview from "./events-year-overview";

export default function EventsMain() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Only show years and months that contain actual data
  const visibleYears = getVisibleEventsData(EVENTS_DATA);

  const selectedYearData = selectedYear
    ? visibleYears.find((y) => y.year === selectedYear) ?? null
    : null;

  // Select a year and scroll back to the top of the page
  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Return to the year selection and scroll back to the top
  const handleBack = () => {
    setSelectedYear(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Deep base under glass */}
      <div className="absolute inset-0 bg-[#101012] -z-30 pointer-events-none" />

      {/* Soft glow at the top of the page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-white/[0.05] blur-[120px] rounded-full pointer-events-none -z-20" />

      {/* Main glass background layer */}
      <div className="absolute inset-0 events-main-glass -z-10 pointer-events-none" />

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
                allYears={visibleYears}
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
                years={visibleYears}
                onSelectYear={handleSelectYear}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
