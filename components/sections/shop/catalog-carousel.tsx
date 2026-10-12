"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./product-card";
import type { ProductItem } from "./products";

const CARD_GAP = 24; // matches gap-6 on the track

export interface CatalogCarouselProps {
    products: ProductItem[];
}

export default function CatalogCarousel({ products }: CatalogCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft: sLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(sLeft > 10);
        setCanScrollRight(sLeft < scrollWidth - clientWidth - 10);
    }, []);

    useEffect(() => {
        const node = scrollContainerRef.current;
        if (!node) return;

        checkScroll();

        // Track both viewport resizes and container/content size changes.
        const observer = new ResizeObserver(checkScroll);
        observer.observe(node);
        const track = node.firstElementChild;
        if (track) observer.observe(track);

        return () => observer.disconnect();
    }, [checkScroll, products.length]);

    /** One card plus its gap, so arrows always land on a card boundary. */
    const getScrollStep = () => {
        const card = scrollContainerRef.current?.querySelector<HTMLElement>("[data-catalog-card]");
        return card ? card.offsetWidth + CARD_GAP : 244;
    };

    const scrollByStep = (direction: -1 | 1) => {
        scrollContainerRef.current?.scrollBy({
            left: direction * getScrollStep(),
            behavior: "smooth",
        });
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        // Let touch devices use native momentum scrolling.
        if (e.pointerType !== "mouse" || !scrollContainerRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.2;
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
        checkScroll();
    };

    const handlePointerUpOrLeave = () => {
        isDragging.current = false;
        checkScroll();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByStep(-1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByStep(1);
        }
    };

    const navButtonClasses =
        "absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer transition-all duration-200 motion-safe:hover:scale-110 active:scale-95 bg-[#141c16] border-2 border-pd-green shadow-[0_0_15px_rgba(74,238,152,0.2)] hover:shadow-[0_0_22px_rgba(74,238,152,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pd-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#141c16]";

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Product catalog"
            className="relative w-full overflow-hidden"
        >
            {/* Scrollable Track */}
            <div
                ref={scrollContainerRef}
                tabIndex={0}
                aria-label="Product catalog items, use arrow keys to scroll"
                onScroll={checkScroll}
                onKeyDown={handleKeyDown}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUpOrLeave}
                onPointerLeave={handlePointerUpOrLeave}
                onPointerCancel={handlePointerUpOrLeave}
                className="overflow-x-auto overflow-y-visible no-scrollbar scroll-smooth px-2 py-1 cursor-grab active:cursor-grabbing select-none touch-pan-x focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pd-green/40 focus-visible:ring-inset rounded-[10px]"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <div className="flex items-stretch gap-6 w-fit mx-auto">
                    {products.map((product) => (
                        <div key={product.id} data-catalog-card className="flex-shrink-0">
                            <ProductCard
                                variant="small"
                                title={product.title}
                                imageSrc={product.imageSrc}
                                price={product.price}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Left Gradient Fade Overlay */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 top-0 bottom-0 w-[100px] sm:w-[150px] z-10 transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background:
                        "linear-gradient(270deg, rgba(20, 28, 22, 0) 0%, rgba(20, 28, 22, 0.75) 50%, rgba(20, 28, 22, 0.98) 100%)",
                }}
            />

            {/* Left Navigation Button */}
            <button
                type="button"
                onClick={() => scrollByStep(-1)}
                aria-label="Scroll products left"
                tabIndex={canScrollLeft ? 0 : -1}
                className={`${navButtonClasses} left-2 sm:left-4 ${canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <ArrowLeft className="w-5 h-5 text-pd-green stroke-[2]" aria-hidden="true" />
            </button>

            {/* Right Gradient Fade Overlay */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute right-0 top-0 bottom-0 w-[100px] sm:w-[150px] z-10 transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background:
                        "linear-gradient(90deg, rgba(20, 28, 22, 0) 0%, rgba(20, 28, 22, 0.75) 50%, rgba(20, 28, 22, 0.98) 100%)",
                }}
            />

            {/* Right Navigation Button */}
            <button
                type="button"
                onClick={() => scrollByStep(1)}
                aria-label="Scroll products right"
                tabIndex={canScrollRight ? 0 : -1}
                className={`${navButtonClasses} right-2 sm:right-4 ${canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <ArrowRight className="w-5 h-5 text-pd-green stroke-[2]" aria-hidden="true" />
            </button>
        </div>
    );
}
