"use client";

import { useMemo, useRef, useState } from "react";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { ProjectCard, type Project } from "./project-card";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const tags = useMemo(
    () => [...new Set(projects.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b)),
    [projects]
  );
  const visible = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;

  const chooseTag = (tag: string | null) => {
    // Remember where the cards are before React re-renders the grid.
    if (grid.current) flipState.current = Flip.getState(grid.current.children);
    setActiveTag(tag);
  };

  useGSAP(
    () => {
      const state = flipState.current;
      flipState.current = null;
      if (!state || !grid.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      Flip.from(state, {
        targets: grid.current.children,
        duration: 0.6,
        ease: "power3.inOut",
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.4 }),
      });
    },
    { dependencies: [activeTag], scope: grid }
  );

  return (
    <section className="px-page py-24 md:py-32">
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="text-display">All projects</h2>
        <p className="text-lg text-pd-bone/60" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {tags.length > 0 && (
        <div className="mb-14 flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
          {[null, ...tags].map((tag) => {
            const active = tag === activeTag;
            return (
              <button
                key={tag ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => chooseTag(tag)}
                className={cn(
                  "h-10 rounded-full border px-4 text-base font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pd-green",
                  active
                    ? "border-pd-green bg-pd-green text-pd-black"
                    : "border-white/20 text-pd-bone hover:border-pd-bone"
                )}
              >
                {tag ?? "All"}
              </button>
            );
          })}
        </div>
      )}

      {projects.length === 0 ? (
        <p className="max-w-md text-lg text-pd-bone/60">
          Projects show up here once they are published. Check back soon.
        </p>
      ) : (
        <div ref={grid} className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" />
          ))}
        </div>
      )}
    </section>
  );
}
