"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { YearMilestones, hasMilestoneValue } from "@/lib/constants/events-data";
import { gsap, useGSAP } from "@/lib/gsap";

interface EventsTimelineViewProps {
  yearData: YearMilestones;
  allYears: YearMilestones[];
  onBack: () => void;
  onSelectYear: (year: number) => void;
}

export default function EventsTimelineView({ yearData, allYears, onBack, onSelectYear }: EventsTimelineViewProps) {
  const root = useRef<HTMLDivElement>(null);
  const currentIndex = allYears.findIndex((y) => y.year === yearData.year);
  const prevYear = currentIndex > 0 ? allYears[currentIndex - 1].year : null;
  const nextYear = currentIndex < allYears.length - 1 ? allYears[currentIndex + 1].year : null;

  // Only show milestones that contain actual data
  const visibleMilestones = yearData.milestones.filter(hasMilestoneValue);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // The page's one scroll moment: the timeline rule draws down as you read.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".timeline-rule",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".timeline-list", start: "top 70%", end: "bottom 70%", scrub: true },
          }
        );
      });
    },
    { scope: root, dependencies: [yearData.year], revertOnUpdate: true }
  );

  return (
    <div ref={root}>
      <header className="px-page pb-16 pt-36 md:pb-20 md:pt-44">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-lg font-semibold text-pd-green underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-5" />
          All years
        </button>
        <h1 className="mt-6 text-[clamp(4rem,12vw,9.5rem)] font-black leading-[0.8] tracking-[-0.05em]">
          {yearData.label}
        </h1>
        {yearData.description && (
          <p className="mt-8 max-w-xl text-xl leading-snug text-pd-bone/70">{yearData.description}</p>
        )}
      </header>

      <div className="timeline-list relative px-page pb-24 pt-16">
        <div className="absolute bottom-24 left-5 top-16 w-px bg-white/10 md:left-[calc(3rem+11rem)]" aria-hidden="true">
          <div className="timeline-rule h-full w-full origin-top bg-pd-green" />
        </div>

        <ol className="space-y-20 md:space-y-28">
          {visibleMilestones.map((m) => (
            <li key={m.id} className="relative grid gap-6 pl-8 md:grid-cols-[11rem_1fr] md:gap-12 md:pl-0">
              <div className="md:pr-10 md:text-right">
                <p className="text-4xl font-black tracking-tight md:text-5xl">{m.month}</p>
                <p className="mt-1 text-pd-light-grey">{m.fullMonth}</p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_1fr]">
                {m.image && (
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] bg-pd-banner-mid">
                    <Image src={m.image} alt={m.title ?? ""} fill sizes="(min-width: 1024px) 26rem, 100vw" className="object-cover" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold leading-tight md:text-3xl">{m.title}</h2>
                  {m.events && m.events.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-pd-light-grey">Events</h3>
                      <ul className="mt-2 space-y-2 text-lg leading-snug text-pd-bone/80">
                        {m.events.map((text, i) => (
                          <li key={i}>{text}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {m.achievements && m.achievements.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-[#d49cf0]">Achievements</h3>
                      <ul className="mt-2 space-y-2 text-lg leading-snug text-pd-bone/80">
                        {m.achievements.map((text, i) => (
                          <li key={i}>{text}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <nav aria-label="Other years" className="flex items-center justify-between gap-4 px-page py-10">
        {prevYear ? (
          <button
            type="button"
            onClick={() => onSelectYear(prevYear)}
            className="inline-flex h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-lg font-semibold transition-colors hover:border-pd-bone"
          >
            <ChevronLeft className="size-5" />
            {prevYear}
          </button>
        ) : (
          <span />
        )}
        {nextYear ? (
          <button
            type="button"
            onClick={() => onSelectYear(nextYear)}
            className="inline-flex h-14 items-center gap-2 rounded-full bg-pd-green px-6 text-lg font-bold text-pd-black transition-colors hover:bg-pd-bone"
          >
            {nextYear}
            <ChevronRight className="size-5" />
          </button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
