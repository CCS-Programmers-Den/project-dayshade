"use client"

import React, {useState, useEffect, useRef} from "react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getFeatured } from "@/lib/actions/projects/get-featured"
import { getProjectImageUrl } from "@/lib/project-utils"

const MotionGlassContainer = motion.div

export function FeaturedProjects() {
  const [api, setApi] = useState<CarouselApi>()
  const [featuredProjects,setFeaturedProjects] = useState<any[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getFeatured();
        setFeaturedProjects(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    if (!api || featuredProjects.length <= 1) return

    const play = () => {
      stop()
      timeoutRef.current = setTimeout(() => {
        api.scrollNext()
      }, 10000) // 10 seconds for longer auto-play
    }

    const stop = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    play()
    api.on("pointerDown", stop)
    api.on("pointerUp", play)
    api.on("select", play)

    return () => {
      stop()
      api.off("pointerDown", stop)
      api.off("pointerUp", play)
      api.off("select", play)
    }
  }, [api, featuredProjects.length])

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <MotionGlassContainer
        className={cn("backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg w-full py-12 px-4")}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="w-full mx-auto">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="px-6 py-2">
              <h2 className="text-3xl lg:text-5xl italic font-bold text-pd-green">Featured Projects</h2>
            </div>
          </motion.div>
          <Carousel
            opts={{
              align: "start",
              loop: featuredProjects.length > 1,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {featuredProjects.map((project, index) => (
                <CarouselItem key={project.id}>
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="overflow-hidden max-w-7xl w-full shadow-2xl flex flex-col md:flex-row">
                      {/* YouTube Thumbnail */}
                      {/* <pre>{JSON.stringify(featuredProjects, null, 2)}</pre> */}
                      <div className="relative h-[280px] md:h-[400px] md:w-1/2 overflow-hidden">
                          <Image
                            src={getProjectImageUrl(project.embed_link, project.image_url)}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                      </div>

                      <div className="px-8 py-8 text-center md:w-1/2 md:flex md:flex-col md:justify-center">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{project.title}</h3>

                        <p className="text-white/90 mb-6 leading-relaxed text-left text-base md:text-lg lg:text-xl line-clamp-3">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4 justify-start">
                          {project.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="bg-pd-purple/20 text-pd-purple px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-4 gap-2 justify-between">
                          <p className="text-white/80 text-sm md:text-base lg:text-lg mb-2 text-left md:mb-0">
                            <span className="font-medium">
                              {project.devs.length === 1 ? "Developer:" : "Developers:"} {" "}
                            </span>
                            {project.devs.join(", ")}
                          </p>
                          <Button
                            className="font-medium w-min px-6 py-2 rounded-lg transition-colors"
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <Link
                              href={
                                project.site_link ? project.site_link : project.embed_link
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="max-h-min">
                              View Project
                              <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </MotionGlassContainer>
    </div>
  )
}
