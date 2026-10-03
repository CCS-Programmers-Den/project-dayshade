"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./product-card";
import type { ProductItem } from "./products";

export interface CatalogCarouselProps {
    products: ProductItem[];
}

export default function CatalogCarousel({ products }: CatalogCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft: sLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(sLeft > 10);
        setCanScrollRight(sLeft < scrollWidth - clientWidth - 10);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll, { passive: true });
        return () => window.removeEventListener("resize", checkScroll);
    }, [checkScroll, products.length]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.2;
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
        checkScroll();
    };

    const handleMouseUpOrLeave = () => {
        isDragging.current = false;
        checkScroll();
    };

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -312,
                behavior: "smooth",
            });
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 312,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full overflow-hidden">
            {/* Scrollable Track */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className="overflow-x-auto overflow-y-visible no-scrollbar scroll-smooth px-2 py-1 cursor-grab active:cursor-grabbing select-none touch-pan-x"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <div className="flex items-center gap-8 w-fit mx-auto">
                    {products.map((product) => (
                        <div key={product.id} className="flex-shrink-0">
                            <ProductCard
                                variant="small"
                                title={product.title}
                                imageSrc={product.imageSrc}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Left Gradient Fade Overlay */}
            <div
                className={`pointer-events-none absolute left-0 top-0 bottom-0 w-[140px] sm:w-[180px] z-10 transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background:
                        "linear-gradient(270deg, rgba(20, 28, 22, 0) 0%, rgba(20, 28, 22, 0.75) 50%, rgba(20, 28, 22, 0.98) 100%)",
                }}
            />

            {/* Left Navigation Button */}
            <button
                onClick={handleScrollLeft}
                aria-label="Scroll products left"
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 bg-[#141c16] border-2 border-pd-green shadow-[0_0_15px_rgba(74,238,152,0.2)] ${canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <ArrowLeft className="w-5 h-5 text-pd-green stroke-[2]" />
            </button>

            {/* Right Gradient Fade Overlay */}
            <div
                className={`pointer-events-none absolute right-0 top-0 bottom-0 w-[140px] sm:w-[180px] z-10 transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background:
                        "linear-gradient(90deg, rgba(20, 28, 22, 0) 0%, rgba(20, 28, 22, 0.75) 50%, rgba(20, 28, 22, 0.98) 100%)",
                }}
            />

            {/* Right Navigation Button */}
            <button
                onClick={handleScrollRight}
                aria-label="Scroll products right"
                className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 bg-[#141c16] border-2 border-pd-green shadow-[0_0_15px_rgba(74,238,152,0.2)] ${canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <ArrowRight className="w-5 h-5 text-pd-green stroke-[2]" />
            </button>
        </div>
    );
}

