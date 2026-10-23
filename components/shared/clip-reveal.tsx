"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Reveals its child with a scrubbed clip-path as it scrolls into view. */
export function ClipReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current,
          { clipPath: "inset(12% 10% 12% 10% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 40%", scrub: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
