"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { ProductCategoryType, ProductItem } from "./products";

type Category = "all" | ProductCategoryType;
const CATEGORIES: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Shirts", value: "shirts" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Lanyards", value: "lanyards" },
];

const formatPrice = (price: string | number) =>
  typeof price === "number" ? `₱${price.toLocaleString("en-PH")}` : price;

export function ShopCatalog({ products }: { products: ProductItem[] }) {
  const [category, setCategory] = useState<Category>("all");
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const counts = useMemo(() => {
    const totals: Record<Category, number> = { all: products.length, shirts: 0, hoodies: 0, lanyards: 0 };
    for (const p of products) if (p.category) totals[p.category] += 1;
    return totals;
  }, [products]);

  const visible = category === "all" ? products : products.filter((p) => p.category === category);
  // The lead featured product gets a wide slot on the unfiltered view.
  const leadId = category === "all" && products[0]?.featuredOrder != null ? products[0].id : null;

  const choose = (next: Category) => {
    if (grid.current) flipState.current = Flip.getState(grid.current.children);
    setCategory(next);
  };

  useGSAP(
    () => {
      const state = flipState.current;
      flipState.current = null;
      if (!state || !grid.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      Flip.from(state, {
        targets: grid.current.children,
        duration: 0.6,
        ease: "power3.inOut",
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.4 }),
      });
    },
    { dependencies: [category], scope: grid }
  );

  if (products.length === 0) {
    return (
      <section className="px-page py-24">
        <p className="max-w-md text-lg text-pd-bone/60">Products show up here once they are added. Check back soon.</p>
      </section>
    );
  }

  return (
    <section className="px-page py-16 md:py-24">
      <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => {
          const active = c.value === category;
          return (
            <button
              key={c.value}
              type="button"
              aria-pressed={active}
              onClick={() => choose(c.value)}
              className={cn(
                "h-11 rounded-full border px-5 text-base font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pd-green",
                active ? "border-pd-green bg-pd-green text-pd-black" : "border-white/20 text-pd-bone hover:border-pd-bone"
              )}
            >
              {c.label} <span className={active ? "text-pd-black/60" : "text-pd-bone/50"}>{counts[c.value]}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="py-16">
          <p className="text-2xl font-bold">No {category} yet.</p>
          <p className="mt-2 text-lg text-pd-bone/60">New items are added from time to time.</p>
          <button
            type="button"
            onClick={() => choose("all")}
            className="mt-8 inline-flex h-14 items-center rounded-full border border-white/25 px-8 text-lg font-semibold transition-colors hover:border-pd-bone"
          >
            Show all products
          </button>
        </div>
      ) : (
        <div ref={grid} className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {visible.map((p) => {
            const lead = p.id === leadId;
            return (
              <article key={p.id} className={cn(lead && "col-span-2")}>
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[24px] bg-pd-banner-mid",
                    lead ? "aspect-[2/1]" : "aspect-square"
                  )}
                >
                  {p.imageSrc ? (
                    <Image
                      src={p.imageSrc}
                      alt={p.title}
                      fill
                      sizes={lead ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-pd-light-grey">No photo yet</div>
                  )}
                  {p.featuredOrder != null && (
                    <span className="absolute left-4 top-4 rounded-full bg-pd-black/80 px-3 py-1 text-sm font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className={cn("font-bold leading-tight", lead ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>
                      {p.title}
                    </h3>
                    {p.description && (
                      <p className="mt-1 line-clamp-2 text-pd-bone/60">{p.description}</p>
                    )}
                  </div>
                  {p.price != null && (
                    <p className="shrink-0 text-lg font-bold text-pd-green md:text-xl">{formatPrice(p.price)}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
