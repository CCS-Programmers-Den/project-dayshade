"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";
import { GlassContainer } from "@/components/shared/glass-container";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const DEFAULT_IMAGES = [
    "/assets/600x400.png",
    "/assets/600x400.png",
    "/assets/600x400.png",
];

/** Aspect ratio of the decorative frame art. */
const FRAME_RATIO = "aspect-[1219/487]";

interface FeaturedCardProps {
    images?: string[];
}

interface FeaturedCarouselProps {
    images: string[];
    idPrefix: string;
    /** Must resolve to a definite height — slides size themselves from it. */
    className?: string;
}

function FeaturedCarousel({ images, idPrefix, className }: FeaturedCarouselProps) {
    const autoplay = useRef<ReturnType<typeof Autoplay> | null>(null);
    if (!autoplay.current) {
        autoplay.current = Autoplay({ delay: 5000, stopOnInteraction: true });
    }

    const [api, setApi] = useState<CarouselApi>();
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!api) return;
        const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
        onSelect();
        api.on("select", onSelect);
        api.on("reInit", onSelect);
        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api]);

    const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

    return (
        <div
            className={cn(
                "relative",
                // CarouselContent's scroll wrapper has no height of its own, so push
                // the container height down to the slides.
                "[&_[data-slot=carousel-content]]:h-full",
                className
            )}
        >
            <Carousel
                className="w-full h-full"
                setApi={setApi}
                plugins={autoplay.current ? [autoplay.current] : []}
                opts={{ loop: true }}
            >
                <CarouselContent className="h-full ml-0">
                    {images.map((src, index) => (
                        <CarouselItem
                            key={`${src}-${idPrefix}-${index}`}
                            className="relative h-full w-full pl-0"
                            aria-label={`Featured item ${index + 1} of ${images.length}`}
                        >
                            <Image
                                src={src}
                                alt={`Featured item ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 1219px"
                                className="object-cover"
                                priority={index === 0}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Slide Indicators */}
            {images.length > 1 ? (
                <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#0A0F0C]/60 px-3 py-2 backdrop-blur-sm">
                    {images.map((_, index) => (
                        <button
                            key={`${idPrefix}-dot-${index}`}
                            type="button"
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to featured item ${index + 1}`}
                            aria-current={selectedIndex === index}
                            className={cn(
                                "h-2 cursor-pointer rounded-full transition-all duration-300 ease-out",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pd-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F0C]",
                                selectedIndex === index
                                    ? "w-6 bg-pd-green"
                                    : "w-2 bg-white/40 hover:bg-white/70"
                            )}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default function FeaturedCard({ images = DEFAULT_IMAGES }: FeaturedCardProps) {
    return (
        <GlassContainer className="relative w-full overflow-hidden p-4 md:p-4">
            {/* Mobile: no frame art — it needs too much width to read */}
            <div className="md:hidden">
                <FeaturedCarousel
                    images={images}
                    idPrefix="mobile"
                    className="w-full aspect-[3/2] overflow-hidden rounded-xl"
                />
            </div>

            {/* Desktop: inside the frame art */}
            <div className="hidden md:flex justify-center">
                <div className={cn("relative w-full max-w-[1219px]", FRAME_RATIO)}>
                    <Image
                        src="/assets/borders/border-featured.png"
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 1280px) 100vw, 1219px"
                        priority
                        className="pointer-events-none z-20 object-fill"
                    />
                    <FeaturedCarousel
                        images={images}
                        idPrefix="desktop"
                        className="absolute inset-x-[1%] inset-y-[2%] z-10 overflow-hidden rounded-lg"
                    />
                </div>
            </div>
        </GlassContainer>
    );
}
