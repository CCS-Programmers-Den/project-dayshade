"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import CategoryFilter, { type ProductCategory } from "./category-filter";
import ProductCard from "./product-card";
import CatalogCarousel from "./catalog-carousel";
import ShopEmptyState from "./empty-state";
import type { ProductItem } from "./products";

export interface ProductsClientProps {
    featuredProducts: ProductItem[];
    catalogProducts: ProductItem[];
}

const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

export default function ProductsClient({
    featuredProducts,
    catalogProducts,
}: ProductsClientProps) {
    const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");

    const allProducts = useMemo(
        () => [...featuredProducts, ...catalogProducts],
        [featuredProducts, catalogProducts]
    );

    // Per-category totals power both the tab badges and the status line.
    const counts = useMemo(() => {
        const totals: Record<ProductCategory, number> = {
            all: allProducts.length,
            shirts: 0,
            hoodies: 0,
            lanyards: 0,
        };
        for (const p of allProducts) {
            if (p.category) totals[p.category] += 1;
        }
        return totals;
    }, [allProducts]);

    const isFiltered = activeCategory !== "all";

    const filteredProducts = useMemo(
        () => (isFiltered ? allProducts.filter((p) => p.category === activeCategory) : []),
        [activeCategory, allProducts, isFiltered]
    );

    const desktopProducts = isFiltered ? filteredProducts : featuredProducts.slice(0, 4);
    const mobileProducts = isFiltered ? filteredProducts : allProducts;
    const isEmpty = isFiltered && filteredProducts.length === 0;
    const resetFilter = () => setActiveCategory("all");

    return (
        <div className="flex flex-col items-center w-full gap-6 md:gap-16 lg:gap-24">
            {/* Filter Bar */}
            <CategoryFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                counts={counts}
            />

            {isEmpty ? (
                <ShopEmptyState category={activeCategory} onReset={resetFilter} />
            ) : (
                <>
                    {/* Desktop View */}
                    <div className="hidden md:flex flex-col items-center w-full gap-16 lg:gap-24">
                        {/* Products Grid — expands when filtered */}
                        <div className="w-full max-w-[1204px]">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={activeCategory}
                                    variants={gridVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    className={
                                        isFiltered
                                            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-x-8 lg:gap-y-12 w-full justify-items-center"
                                            : "grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full justify-items-center"
                                    }
                                >
                                    {desktopProducts.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            variants={cardVariants}
                                            className="w-full flex justify-center"
                                        >
                                            <ProductCard
                                                variant="large"
                                                title={product.title}
                                                description={product.description}
                                                imageSrc={product.imageSrc}
                                                price={product.price}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Catalog Carousel — hidden when filtered */}
                        {!isFiltered ? <CatalogCarousel products={catalogProducts} /> : null}
                    </div>

                    {/* Mobile View */}
                    <div className="flex md:hidden w-full">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={activeCategory}
                                variants={gridVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-4 gap-y-6 sm:gap-y-10 sm:gap-5 w-full"
                            >
                                {mobileProducts.map((product) => (
                                    <motion.div key={product.id} variants={cardVariants}>
                                        <ProductCard
                                            variant="mobile"
                                            title={product.title}
                                            imageSrc={product.imageSrc}
                                            price={product.price}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </>
            )}
        </div>
    );
}
