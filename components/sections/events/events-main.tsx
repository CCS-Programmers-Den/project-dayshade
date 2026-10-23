"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EVENTS_DATA, getVisibleEventsData } from "@/lib/constants/events-data";
import { scrollToTop } from "@/components/providers/smooth-scroll";
import EventsTimelineView from "./events-timeline-view";
import EventsYearOverview from "./events-year-overview";

export default function EventsMain() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Only show years and months that contain actual data
  const visibleYears = getVisibleEventsData(EVENTS_DATA);
  const selectedYearData = selectedYear ? visibleYears.find((y) => y.year === selectedYear) ?? null : null;

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    scrollToTop();
  };

  const handleBack = () => {
    setSelectedYear(null);
    scrollToTop();
  };

  return (
    <div className="min-h-screen text-pd-bone">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedYearData ? `timeline-${selectedYear}` : "overview"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {selectedYearData ? (
            <EventsTimelineView
              yearData={selectedYearData}
              allYears={visibleYears}
              onBack={handleBack}
              onSelectYear={handleSelectYear}
            />
          ) : (
            <EventsYearOverview years={visibleYears} onSelectYear={handleSelectYear} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
