"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const PHOTOS = [
  "/assets/about-pics/carousel-1.png",
  "/assets/about-pics/carousel-2.png",
  "/assets/about-pics/carousel-3.png",
  "/assets/about-pics/carousel-4.png",
  "/assets/about-pics/carousel-5.png",
];

export function PhotoStrip() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // The page's one scroll moment: the section pins and the photos slide past.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.set(root.current, { overflowX: "hidden" });
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            // The pin lasts 60% of the sideways distance (about two screens), so the photos move a little faster than the scroll.
            end: () => `+=${distance() * 0.6}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-label="Photos"
      className="snap-x snap-mandatory scroll-pl-5 overflow-x-auto py-16 [scrollbar-width:none] md:flex md:h-[100svh] md:snap-none md:items-center md:py-0"
    >
      <div ref={track} className="flex w-max items-center gap-6 px-page md:gap-8">
        <h2 className="w-[80vw] shrink-0 snap-start text-[clamp(3rem,6vw,6rem)] font-black leading-[0.9] tracking-[-0.035em] text-pd-bone md:w-[min(30vw,560px)]">
          Together, forever.
        </h2>
        {PHOTOS.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[3/2] w-[85vw] shrink-0 snap-start overflow-hidden rounded-[24px] bg-pd-banner-mid md:h-[min(60svh,560px)] md:w-auto"
          >
            <Image src={src} alt={`Den members together, photo ${i + 1}`} fill sizes="(min-width: 768px) 840px, 85vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
