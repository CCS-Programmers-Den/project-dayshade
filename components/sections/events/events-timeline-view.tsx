"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { Jost } from "next/font/google";
import Image from "next/image";
import { YearMilestones } from "./events-data";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

interface EventsTimelineViewProps {
  yearData: YearMilestones;
  allYears: YearMilestones[];
  onBack: () => void;
  onSelectYear: (year: number) => void;
}

export default function EventsTimelineView({
  yearData,
  allYears,
  onBack,
  onSelectYear,
}: EventsTimelineViewProps) {
  const currentIndex = allYears.findIndex((y) => y.year === yearData.year);
  const prevYear = currentIndex > 0 ? allYears[currentIndex - 1].year : null;
  const nextYear =
    currentIndex < allYears.length - 1 ? allYears[currentIndex + 1].year : null;

  return (
    <div className="w-full pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
      {/* Top Emerald Header Banner Bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full bg-gradient-to-r from-[#67FFAF] via-[#38C682] to-[#0D4D2C] py-3 sm:py-5 md:py-6 px-4 sm:px-8 md:px-16 shadow-xl relative overflow-hidden"
      >
        {/* Geometric pattern on top green div with 10% opacity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/pattern.png)",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "clamp(300px, 50vw, 750px) auto",
            opacity: 0.1,
          }}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          {/* Back Navigation Chevron (1:1 Figma) */}
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to all years"
            className="flex items-center justify-center p-1 sm:p-2 -ml-1 sm:-ml-2 text-black hover:opacity-75 transition-opacity cursor-pointer group"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black stroke-[3.5] transition-transform" />
          </motion.button>

          {/* Large Year Display (Right Aligned) */}
          <div className="text-right">
            <h2 className={`${jost.className} text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-black drop-shadow-sm`}>
              {yearData.label}
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area: Vertical Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-14">
        {/* Timeline Items */}
        <div className="relative w-full">
          {/* Desktop Central/Left Vertical Line (Line 18 in Figma) */}
          <div className="hidden md:block absolute left-[150px] top-4 bottom-4 w-[1px] bg-white/20" />

          <div className="space-y-6 md:space-y-16">
            {yearData.milestones.map((milestone, idx) => (
              <div key={milestone.id} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.05 }}
                  className="relative flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-8 lg:gap-10 w-full max-w-[340px] sm:max-w-[440px] md:max-w-none mx-auto"
                >
                  {/* Mobile Centered Month Heading (1:1 iPhone 16 - 9 in Figma) */}
                  <div className="md:hidden text-center w-full mb-1">
                    <span
                      className={`${jost.className} text-base sm:text-lg font-bold uppercase tracking-wider bg-gradient-to-r from-[#67FFAF] via-[#38C682] to-[#125A34] bg-clip-text text-transparent`}
                    >
                      {milestone.fullMonth}
                    </span>
                  </div>

                  {/* Desktop Month Label (Left Column on Desktop) */}
                  <div className="hidden md:block md:w-[140px] shrink-0 text-right pr-2 md:pr-4">
                    <span className={`${jost.className} text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight bg-gradient-to-br from-[#67FFAF] via-[#38C682] to-[#0D4D2C] bg-clip-text text-transparent block leading-tight`}>
                      {milestone.month}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-widest block md:mt-1">
                      {milestone.fullMonth}
                    </span>
                  </div>

                  {/* Milestone Content Card (Figma Frame 91-94) */}
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.25 } }}
                    className="flex-1 w-full bg-black/30 backdrop-blur-xl border border-white/15 rounded-[12px] sm:rounded-[14px] p-4 sm:p-7 lg:p-8 shadow-2xl hover:border-white/25 transition-colors duration-300"
                  >
                    <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 items-start">
                      {/* Media Thumbnail Container (Frame 78) */}
                      <div className="w-full lg:w-[320px] h-[160px] sm:h-[220px] lg:h-[280px] shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10 relative group">
                        {milestone.image ? (
                          <Image
                            src={milestone.image}
                            alt={milestone.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-400 p-4 text-center">
                            <Calendar className="w-10 h-10 mb-2 text-[#67FFAF]" />
                            <span className="text-sm font-semibold">{milestone.title}</span>
                          </div>
                        )}
                        {/* Gradient bottom overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm sm:text-base lg:text-lg drop-shadow">
                          {milestone.title}
                        </div>
                      </div>

                      {/* Text Details Breakdown */}
                      <div className="flex-1 w-full space-y-4 sm:space-y-6">
                        {/* Events Section */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#67FFAF]" />
                            <h3 className={`${jost.className} text-lg sm:text-xl lg:text-2xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent`}>
                              Events:
                            </h3>
                          </div>
                          <ul className="space-y-1.5 sm:space-y-2 text-zinc-300 text-xs sm:text-sm lg:text-base leading-relaxed pl-1 sm:pl-2">
                            {milestone.events.map((eventText, eIdx) => (
                              <li key={eIdx} className="flex items-start gap-2">
                                <span className="text-[#67FFAF] font-bold mt-0.5 text-xs">•</span>
                                <span>{eventText}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Achievements Section */}
                        <div className="space-y-2 pt-2 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                            <h3 className={`${jost.className} text-lg sm:text-xl lg:text-2xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent`}>
                              Achievements:
                            </h3>
                          </div>
                          <ul className="space-y-1.5 sm:space-y-2 text-zinc-300 text-xs sm:text-sm lg:text-base leading-relaxed pl-1 sm:pl-2">
                            {milestone.achievements.map((achText, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2">
                                <span className="text-[#67FFAF] font-bold mt-0.5 text-xs">•</span>
                                <span>{achText}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Controls between Years */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
          {prevYear ? (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectYear(prevYear)}
              className="flex items-center gap-2 text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous Year ({prevYear})</span>
            </motion.button>
          ) : (
            <div />
          )}

          {nextYear ? (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectYear(nextYear)}
              className="flex items-center gap-2 text-[#67FFAF] hover:text-white bg-[#67FFAF]/10 hover:bg-[#67FFAF]/20 px-5 py-2.5 rounded-full border border-[#67FFAF]/30 transition cursor-pointer"
            >
              <span>Next Year ({nextYear})</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
