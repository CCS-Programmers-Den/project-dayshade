"use client";

import { useRef } from "react";
import Link from "next/link";
import { ProjectCard, type Project } from "@/components/sections/projects/project-card";
import { gsap, useGSAP } from "@/lib/gsap";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!track.current) return; // no projects rendered
      const mm = gsap.matchMedia();
      // The one scroll moment: on wide screens the section pins and the cards slide sideways.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root, dependencies: [projects.length] }
  );

  if (projects.length === 0) return null;

  return (
    <section
      ref={root}
      id="projects"
      className="overflow-hidden py-24 md:flex md:h-[100svh] md:flex-col md:justify-center md:py-0"
    >
      <div className="mb-10 flex items-end justify-between gap-6 px-page">
        <h2 className="text-display text-pd-bone">
          Built by members
        </h2>
        <Link
          href="/projects"
          className="shrink-0 text-lg font-semibold text-pd-green underline-offset-4 hover:underline"
        >
          All projects
        </Link>
      </div>

      <div
        ref={track}
        className="flex flex-col gap-12 px-page md:w-max md:flex-row md:gap-8"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            className="md:w-[min(58vw,760px)]"
            imageClassName="md:aspect-auto md:h-[46svh]"
            sizes="(min-width: 768px) 58vw, 100vw"
          />
        ))}
      </div>
    </section>
  );
}
