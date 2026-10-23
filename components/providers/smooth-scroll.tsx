"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let activeLenis: Lenis | null = null;

/** Smoothly scrolls to the top, through Lenis when it is running. */
export function scrollToTop() {
  if (activeLenis) activeLenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      anchors: true,
      // Let dialogs, sheets and opted-out areas scroll natively.
      prevent: (node) => !!node.closest('[role="dialog"], [role="listbox"], [role="menu"], [data-lenis-prevent]'),
    });
    lenisRef.current = lenis;
    activeLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Radix dialogs, selects and menus lock page scroll via body[data-scroll-locked]; respect it.
    const syncLock = () =>
      document.body.hasAttribute("data-scroll-locked") ? lenis.stop() : lenis.start();
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    return () => {
      lockObserver.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      activeLenis = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
