"use client";

import { ArrowRight } from "lucide-react";
import type { YearMilestones } from "@/lib/constants/events-data";

interface EventsYearOverviewProps {
  years: YearMilestones[];
  onSelectYear: (year: number) => void;
}

export default function EventsYearOverview({ years, onSelectYear }: EventsYearOverviewProps) {
  // Only show years that have at least one milestone
  const displayYears = years.filter((y) => Array.isArray(y.milestones) && y.milestones.length > 0);

  return (
    <>
      <header className="px-page pb-16 pt-36 md:pb-24 md:pt-48">
        <h1 className="text-[clamp(3.25rem,7vw,7rem)] font-black leading-[0.85] tracking-[-0.045em]">
          Events and achievements
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-snug text-pd-bone/70">
          A celebration of our milestones and proudest moments. Pick a year to see what happened.
        </p>
      </header>

      <ul className="border-t border-white/10">
        {displayYears.map((y) => (
          <li key={y.year} className="border-b border-white/10">
            <button
              type="button"
              onClick={() => onSelectYear(y.year)}
              className="group flex w-full items-center justify-between gap-6 px-page py-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-pd-green md:py-8"
            >
              <span className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.85] tracking-[-0.045em] transition-colors duration-200 group-hover:text-pd-green">
                {y.label}
              </span>
              <span className="flex items-center gap-4 text-pd-bone/60">
                <span className="hidden text-lg sm:inline">
                  {y.milestones.length} {y.milestones.length === 1 ? "milestone" : "milestones"}
                </span>
                <ArrowRight className="size-7 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-pd-green" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="px-page py-24 text-2xl font-bold md:text-3xl">
        More events and achievements are yet to come.
      </p>
    </>
  );
}
