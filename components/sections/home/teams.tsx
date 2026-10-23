"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const TEAMS = [
  "Competitive Programming",
  "Multimedia",
  "Web and App Development",
  "Game Development",
];

export default function Teams() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Each team name lights up as it reaches the middle of the screen.
        gsap.utils.toArray<HTMLElement>(".team-row").forEach((row) => {
          gsap.fromTo(
            row,
            { color: "#787878" },
            {
              color: "#ececec",
              ease: "none",
              scrollTrigger: { trigger: row, start: "top 75%", end: "top 45%", scrub: true },
            }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grid gap-10 px-page py-24 md:grid-cols-12 md:py-40"
    >
      <p className="text-2xl font-semibold leading-tight text-pd-bone md:sticky md:top-32 md:col-span-4 md:self-start md:text-3xl">
        Four teams under one roof. Pick the one that fits how you like to build.
      </p>
      <ul className="md:col-span-8">
        {TEAMS.map((team) => (
          <li
            key={team}
            className="team-row border-b border-white/10 py-4 text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-pd-bone first:pt-0"
          >
            {team}
          </li>
        ))}
      </ul>
    </section>
  );
}
