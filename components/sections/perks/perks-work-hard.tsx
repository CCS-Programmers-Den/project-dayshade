"use client";

import * as React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

function PerksWorkHard() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [autoplay] = React.useState(() =>
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const images = [
    { src: "/assets/perks-pics/perks-6.png", alt: "Virtual Dive" },
    { src: "/assets/perks-pics/perks-7.png", alt: "Super Smash Bros." },
    { src: "/assets/perks-pics/perks-8.png", alt: "Tekken" },
    { src: "/assets/perks-pics/perks-5.png", alt: "PD Session" },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <Card className="w-full px-0 py-12 mt-40 bg-gradient-to-br from-background/95 to-background/50 border border-foreground/10 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-8 text-center"
        >
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-pd-green to-pd-purple bg-clip-text text-transparent">
              WORK HARD. PLAY HARD.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Celebrate gaming as a platform. Engage in exciting organization
              Team Building activities that sprout teamwork and healthy
              competition.
            </p>
          </div>
        </motion.div>
        <div className="container mx-auto px-4">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplay]}
            className="w-full max-w-5xl mx-auto mt-12"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                  <div className="relative aspect-video group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pd-green/20 to-pd-purple/20 rounded-xl blur-xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover rounded-xl shadow-xl 
                        transform transition-all duration-500 group-hover:scale-105"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </Card>
    </LazyMotion>
  );
}

export default PerksWorkHard;
