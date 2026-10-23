"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STATS = [
  { value: 100, suffix: "+", label: "Active members" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 12, suffix: "", label: "Years running" },
];

export function ImpactStats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
          const target = Number(el.dataset.value);
          const counter = { n: 0 };
          gsap.to(counter, {
            n: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.n));
            },
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-page py-24 md:py-32">
      <h2 className="text-display">Our impact</h2>
      <p className="mt-4 text-lg text-pd-bone/65">Growing stronger every year.</p>
      <dl className="mt-14 grid gap-10 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="border-t border-white/10 pt-6">
            <dt className="text-lg text-pd-light-grey">{s.label}</dt>
            <dd className="mt-2 text-[clamp(3.5rem,7vw,6rem)] font-black leading-none tracking-[-0.04em] text-pd-bone">
              <span className="stat-num" data-value={s.value}>
                {s.value}
              </span>
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
