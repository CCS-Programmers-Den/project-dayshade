"use client";

import { useRef } from "react";
import { PillLink } from "@/components/shared/pill-link";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { PDLogo } from "@/components/shared/pd-logo";
import { gsap, useGSAP } from "@/lib/gsap";

const LINES = ["pushing the limits", "and committing", "to improvement."];

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The one load moment: the tagline "compiles" out of noise.
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-logo", { autoAlpha: 0, scale: 0.9, duration: 1.4 }, 0);
        gsap.utils.toArray<HTMLElement>(".hero-line").forEach((line, i) => {
          tl.to(
            line,
            {
              duration: 1.1,
              scrambleText: {
                text: line.dataset.text ?? "",
                chars: "01{}[]<>/=;_",
                speed: 0.5,
                revealDelay: 0.25,
              },
            },
            0.15 + i * 0.25
          );
        });
        tl.from(".hero-fade", { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.9);

        // Leaving the hero: copy drifts up, logo sinks slower.
        gsap.to(".hero-copy", {
          yPercent: -18,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-logo", {
          yPercent: 25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-page pb-12 pt-32 md:pb-16"
    >
      <div className="hero-logo pointer-events-none absolute -right-[20%] top-[6%] aspect-square w-[95vw] opacity-90 md:pointer-events-auto md:right-[calc(var(--gutter)_-_4vw)] md:top-[4%] md:w-[52vw] lg:w-[min(46vw,760px)]">
        <Canvas className="h-full w-full">
          <OrthographicCamera makeDefault position={[0, 5, 120]} zoom={56} near={0.1} far={1000} />
          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset="forest" />
          <PDLogo />
        </Canvas>
      </div>

      <div className="hero-copy relative">
        <p className="hero-fade mb-6 text-lg text-pd-bone/70 md:text-xl">
          CCS Programmers&apos; Den, Tarlac State University
        </p>

        <h1 className="text-[clamp(2.6rem,6.75vw,8.5rem)] font-black lowercase leading-[0.84] tracking-[-0.045em] text-pd-bone">
          <span className="sr-only">{LINES.join(" ")}</span>
          {LINES.map((line, i) => (
            <span key={line} aria-hidden="true" className="block">
              <span className="hero-line" data-text={line}>
                {line}
              </span>
              {i === LINES.length - 1 && (
                <span className="ml-[0.06em] inline-block h-[0.62em] w-[0.3em] translate-y-[0.02em] animate-blink bg-pd-green motion-reduce:animate-none" />
              )}
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col items-start gap-8 md:mt-12">
          <p className="hero-fade max-w-md text-lg leading-snug text-pd-bone/70 md:text-xl">
            The computer technology-focused college organization preparing students for industry
            practices in design and development.
          </p>
          <div className="hero-fade flex flex-wrap gap-3">
            <PillLink href="/join">Join the Den</PillLink>
            <PillLink href="#projects" variant="secondary">See member projects</PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
