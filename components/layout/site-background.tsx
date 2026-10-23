"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// How far (px) the pattern drifts over a full page scroll; it never shows a tile seam.
const TRAVEL = 600;

/**
 * Site-wide background: the PD monogram pattern, barely visible over Den black.
 * It drifts slower than the page, and on mouse devices a soft green light follows the cursor.
 */
export function SiteBackground() {
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = layer.current!;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { "--py": 0 },
        { "--py": -TRAVEL, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } }
      );
    });

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { "--glow": 1 });
      const toX = gsap.quickTo(el, "--mx", { duration: 0.6, ease: "power3" });
      const toY = gsap.quickTo(el, "--my", { duration: 0.6, ease: "power3" });
      const move = (e: PointerEvent) => {
        toX(e.clientX);
        toY(e.clientY);
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    });
  });

  return <div ref={layer} aria-hidden="true" className="site-pattern pointer-events-none fixed inset-0 -z-10" />;
}
