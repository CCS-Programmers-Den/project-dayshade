"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { Jost } from "next/font/google";
import Image from "next/image";
import { YearMilestones, hasMilestoneValue } from "@/lib/constants/events-data";

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

  // Only show milestones that contain actual data
  const visibleMilestones = yearData.milestones.filter(hasMilestoneValue);

  return (
    <div className="w-full bg-[#0b0c0e] pb-24 pt-24 text-white sm:pt-28 md:pt-32 lg:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(74,238,152,0.16),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(179,81,227,0.1),_transparent_30%)]" />

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full overflow-hidden border-b border-white/10 bg-gradient-to-r from-pd-green/20 via-[#101112] to-pd-purple/15 py-3 px-4 shadow-[0_0_30px_rgba(74,238,152,0.08)] sm:px-8 sm:py-5 md:px-16 md:py-6"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/pattern.png)",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "clamp(300px, 50vw, 750px) auto",
            opacity: 0.08,
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to all years"
            className="-ml-1 flex cursor-pointer items-center justify-center p-1 text-white transition-opacity hover:opacity-75 sm:-ml-2 sm:p-2"
          >
            <ChevronLeft className="h-8 w-8 stroke-[3.5] text-pd-green transition-transform sm:h-10 sm:w-10 md:h-12 md:w-12" />
          </motion.button>

          <div className="text-right">
            <h2 className={`${jost.className} text-3xl font-black tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-7xl lg:text-8xl`}>
              {yearData.label}
            </h2>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 md:px-8 md:pt-14">
        <div className="relative w-full">
          <div className="absolute bottom-4 left-[150px] top-4 hidden w-[1px] bg-white/20 md:block" />

          <div className="space-y-6 md:space-y-16">
            {visibleMilestones.map((milestone, idx) => (
              <div key={milestone.id} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.05 }}
                  className="relative mx-auto flex w-full max-w-[340px] flex-col items-center gap-3 md:max-w-none md:flex-row md:items-start md:gap-8 lg:gap-10"
                >
                  <div className="mb-1 w-full text-center md:hidden">
                    <span
                      className={`${jost.className} bg-gradient-to-r from-pd-green via-white to-pd-purple bg-clip-text text-base font-bold uppercase tracking-wider text-transparent sm:text-lg`}
                    >
                      {milestone.fullMonth}
                    </span>
                  </div>

                  <div className="hidden shrink-0 pr-2 text-right md:block md:w-[140px] md:pr-4">
                    <span className={`${jost.className} block bg-gradient-to-r from-pd-green via-white to-pd-purple bg-clip-text text-3xl font-black uppercase tracking-tight text-transparent leading-tight sm:text-4xl md:text-5xl`}>
                      {milestone.month}
                    </span>
                    <span className="mt-1 block text-xs font-semibold uppercase tracking-widest text-zinc-400 sm:text-sm">
                      {milestone.fullMonth}
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.25 } }}
                    className="w-full flex-1 rounded-[12px] border border-white/10 bg-[#101112]/80 p-4 shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-300 hover:border-pd-green/30 sm:rounded-[14px] sm:p-7 lg:p-8"
                  >
                    <div className="flex flex-col items-start gap-5 lg:flex-row lg:gap-8">
                      <div className="group relative h-[160px] w-full shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:h-[220px] lg:h-[280px] lg:w-[320px]">
                        {milestone.image ? (
                          <Image
                            src={milestone.image}
                            alt={milestone.title || `${milestone.month} Milestone`}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1a1d1f] to-[#0f1012] p-4 text-center text-zinc-400">
                            <Calendar className="mb-2 h-10 w-10 text-pd-green" />
                            <span className="text-sm font-semibold">
                              {milestone.title || `${milestone.fullMonth || milestone.month} Milestone`}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 text-sm font-bold text-white drop-shadow sm:text-base lg:text-lg">
                          {milestone.title || `${milestone.fullMonth || milestone.month} Milestone`}
                        </div>
                      </div>

                      <div className="w-full flex-1 space-y-4 sm:space-y-6">
                        {milestone.events && milestone.events.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-pd-green sm:h-5 sm:w-5" />
                              <h3 className={`${jost.className} bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-lg font-extrabold uppercase tracking-wide text-transparent sm:text-xl lg:text-2xl`}>
                                Events:
                              </h3>
                            </div>
                            <ul className="space-y-1.5 pl-1 text-xs leading-relaxed text-zinc-300 sm:space-y-2 sm:pl-2 sm:text-sm lg:text-base">
                              {milestone.events.map((eventText, eIdx) => (
                                <li key={eIdx} className="flex items-start gap-2">
                                  <span className="mt-0.5 text-xs font-bold text-pd-green">•</span>
                                  <span>{eventText}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {milestone.achievements && milestone.achievements.length > 0 && (
                          <div className={`space-y-2 ${milestone.events && milestone.events.length > 0 ? "border-t border-white/10 pt-2" : ""}`}>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-pd-purple sm:h-5 sm:w-5" />
                              <h3 className={`${jost.className} bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-lg font-extrabold uppercase tracking-wide text-transparent sm:text-xl lg:text-2xl`}>
                                Achievements:
                              </h3>
                            </div>
                            <ul className="space-y-1.5 pl-1 text-xs leading-relaxed text-zinc-300 sm:space-y-2 sm:pl-2 sm:text-sm lg:text-base">
                              {milestone.achievements.map((achText, aIdx) => (
                                <li key={aIdx} className="flex items-start gap-2">
                                  <span className="mt-0.5 text-xs font-bold text-pd-green">•</span>
                                  <span>{achText}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
          {prevYear ? (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectYear(prevYear)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
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
              className="flex items-center gap-2 rounded-full border border-pd-green/30 bg-pd-green/10 px-5 py-2.5 text-pd-green transition hover:bg-pd-green/20 hover:text-white"
            >
              <span>Next Year ({nextYear})</span>
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
