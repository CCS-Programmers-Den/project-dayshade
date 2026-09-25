'use client'

import { useState, useEffect } from "react";
import { getCurrentShowcase } from "@/lib/actions/projects/get-current-showcase";
import * as React from "react";
import { motion } from "framer-motion";

export function MonthlyShowcase() {

    const [project, setProject] = useState<any | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      async function load() {
        try {
          const data = await getCurrentShowcase();
          setProject(data);
        } catch (e) {
          console.error(e);
        }
      }
      load();
    }, []);

    if (!mounted) {
      return null;
    }

    if (!project) {
      return (
        <section className="py-24 w-full text-center text-white/60">
          Loading project showcase...
        </section>
      );
    }

  const MotionGlassContainer = motion.div

  return (
    <section className="w-full h-full p-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl lg:text-5xl italic font-bold text-pd-green">
            Monthly Project Showcase
          </h2>
        </div>
        {/* Project Card */}
        <div className="bg-pd-black rounded-2xl p-6 md:p-8 border border-gray-800">
          <div className="text-center">
            <h3 className="text-xl md:text-3xl font-bold mb-4">
              {project.title}
            </h3>
          </div>
          {/* Project Youtube Embed */}
          <div className="relative w-full flex items-center justify-center mx-auto mb-6 rounded-lg overflow-hidden">
            <div className="md:w-[80%] h-[400px] md:h-[500px]">
              <iframe
                key={project.youtubeId}
                src={project.embed_url}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            </div>
          {/* Credits */}
          <p className="text-white text-sm text-left mb-4 leading-relaxed">
            <span className="font-medium">Developer:</span>{" "}
            {project.devs.join(", ")}
          </p>
          {/* Description */}
          <p className="text-white/90 mb-6 leading-relaxed text-left text-base md:text-lg lg:text-xl line-clamp-3">
            {project.description}
          </p>


          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-pd-purple/20 text-pd-purple px-3 py-1 rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}