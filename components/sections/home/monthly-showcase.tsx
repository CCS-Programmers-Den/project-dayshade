"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export type ShowcaseProject = {
  title: string;
  description: string;
  devs: string[];
  tags: string[];
  embed_url: string | null;
};

export function MonthlyShowcase({ project }: { project: ShowcaseProject }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".showcase-frame",
          { clipPath: "inset(10% 8% 10% 8% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            ease: "none",
            scrollTrigger: { trigger: ".showcase-frame", start: "top 90%", end: "top 30%", scrub: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-page py-24 md:py-32">
      <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-lg font-semibold text-pd-green">Project of the month</p>
          <h2 className="max-w-[16ch] text-display text-pd-bone">
            {project.title}
          </h2>
        </div>
        <p className="max-w-md text-lg leading-snug text-pd-bone/70">{project.description}</p>
      </div>

      {project.embed_url && (
        <div className="showcase-frame mx-auto aspect-video w-full max-w-[calc(80svh*16/9)] overflow-hidden rounded-[28px] bg-pd-banner-mid">
          <iframe
            src={project.embed_url}
            title={project.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-lg text-pd-bone/70">
          Built by <span className="text-pd-bone">{project.devs.join(", ")}</span>
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-pd-purple/15 px-3 py-1 text-sm font-semibold text-[#d49cf0]">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
