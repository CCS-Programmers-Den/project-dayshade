'use client'

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ChevronRight } from "lucide-react";
import { getCurrentShowcase } from "@/lib/actions/projects/get-current-showcase";

export default function MonthlyProjectShowcase() {
  const [project, setProject] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const showcase = await getCurrentShowcase();
        setProject(showcase);
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

  return (
    <section className="py-24 w-full relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="purple" className="mb-4 md:text-2xl">
            Project of the Month
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Monthly Spotlight
          </h2>
          <div className="flex items-center justify-center gap-2 text-white/60">
            <CalendarDays className="w-5 h-5" />
            <span suppressHydrationWarning>
              {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
          </div>
        </div>

        <Card className="relative overflow-hidden bg-gradient-to-br from-black/50 via-pd-dark-grey/30 to-black/50 border-white/10">
          <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            {project.embed_url ? (
              <iframe
                key={project.youtubeId}
                src={project.embed_url}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60">
                Invalid or missing YouTube link
              </div>
            )}
          </div>

          <div className="relative p-8 md:p-12 bg-gradient-to-t from-black/90 to-black/20">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.map((tag: string) => (
                <Badge key={tag} variant="purple">
                  {tag}
                </Badge>
              ))}
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {project.title}
            </h3>

            <p className="text-white/80 text-lg md:text-xl mb-6 line-clamp-3">
              {project.description}
            </p>

            <div className="flex items-center gap-2 text-white/60 group cursor-pointer hover:text-white transition-colors">
              <Link
                href={project.embed_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex text-center items-center justify-center gap-2"
              >
                View Project Details
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
