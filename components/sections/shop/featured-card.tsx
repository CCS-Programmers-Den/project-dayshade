"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { GlassContainer } from "@/components/shared/glass-container";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const DEFAULT_IMAGES = [
    "/assets/600x400.png",
    "/assets/600x400.png",
    "/assets/600x400.png",
];

interface FeaturedCardProps {
    images?: string[];
}

export default function FeaturedCard({ images = DEFAULT_IMAGES }: FeaturedCardProps) {
    const mobileAutoplay = useRef<ReturnType<typeof Autoplay> | null>(null);
    if (!mobileAutoplay.current) {
        mobileAutoplay.current = Autoplay({ delay: 5000, stopOnInteraction: true });
    }

    const desktopAutoplay = useRef<ReturnType<typeof Autoplay> | null>(null);
    if (!desktopAutoplay.current) {
        desktopAutoplay.current = Autoplay({ delay: 5000, stopOnInteraction: true });
    }

    return (
        <GlassContainer className="relative flex items-center justify-center h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] w-full overflow-hidden">
            {/* Mobile: No Border */}
            <div className="flex md:hidden w-full h-full p-6 items-center justify-center">
                <Carousel
                    className="w-full h-full rounded-lg overflow-hidden"
                    plugins={mobileAutoplay.current ? [mobileAutoplay.current] : []}
                    opts={{ loop: true }}
                >
                    <CarouselContent className="h-full ml-0">
                        {images.map((src, index) => (
                            <CarouselItem
                                key={`${src}-mobile-${index}`}
                                className="relative rounded-lg overflow-hidden h-[310px] w-full pl-0"
                            >
                                <Image
                                    src={src}
                                    alt={`Featured item ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Desktop: with border */}
            <div className="hidden md:flex items-center justify-center h-full w-full p-4 overflow-hidden">
                <div className="relative h-full w-auto max-w-full aspect-[1219/487]">
                    <img
                        src="/assets/borders/border-featured.png"
                        alt="Frame border"
                        className="absolute inset-0 h-full w-full object-fill pointer-events-none z-20"
                    />
                    <div className="absolute inset-x-[1%] inset-y-[2%] z-10 rounded-lg overflow-hidden">
                        <Carousel
                            className="w-full h-full"
                            plugins={desktopAutoplay.current ? [desktopAutoplay.current] : []}
                            opts={{ loop: true }}
                        >
                            <CarouselContent className="h-full ml-0">
                                {images.map((src, index) => (
                                    <CarouselItem
                                        key={`${src}-desktop-${index}`}
                                        className="relative h-[280px] md:h-[350px] lg:h-[400px] xl:h-[450px] 2xl:h-[545px] w-full pl-0"
                                    >
                                        <Image
                                            src={src}
                                            alt={`Featured item ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </div>
        </GlassContainer>
    );
}
