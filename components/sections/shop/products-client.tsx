"use client";

import { useState } from "react";
import CategoryFilter, { type ProductCategory } from "./category-filter";
import ProductCard from "./product-card";
import CatalogCarousel from "./catalog-carousel";
import type { ProductItem } from "./products";

export interface ProductsClientProps {
    featuredProducts: ProductItem[];
    catalogProducts: ProductItem[];
}

export default function ProductsClient({
    featuredProducts,
    catalogProducts,
}: ProductsClientProps) {
    const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");

    const allProducts = [...featuredProducts, ...catalogProducts];
    const isFiltered = activeCategory !== "all";

    const filteredProducts = isFiltered
        ? allProducts.filter((p) => p.category === activeCategory)
        : [];

    const displayedFeatured = isFiltered ? filteredProducts : featuredProducts;

    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:flex flex-col items-center w-full gap-16 md:gap-24">
                {/* Filter Bar */}
                <CategoryFilter
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    featuredCount={featuredProducts.length}
                    filteredCount={filteredProducts.length}
                />

                {/* Products Grid — expands when filtered */}
                <div className="w-full max-w-[1204px]">
                    <div className="grid grid-cols-2 gap-8 lg:gap-x-[68px] lg:gap-y-[88px] w-full justify-items-center">
                        {displayedFeatured.slice(0, isFiltered ? undefined : 4).map((product) => (
                            <ProductCard
                                key={product.id}
                                variant="large"
                                title={product.title}
                                description={product.description}
                                imageSrc={product.imageSrc}
                            />
                        ))}
                    </div>
                </div>

                {/* Catalog Carousel — hidden when filtered */}
                {!isFiltered ? (
                    <CatalogCarousel products={catalogProducts} />
                ) : null}
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden flex-col items-center w-full gap-6">
                {/* Filter Bar */}
                <CategoryFilter
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    featuredCount={featuredProducts.length}
                    filteredCount={isFiltered ? filteredProducts.length : allProducts.length}
                />

                {/* Products List */}
                <div className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-4 gap-y-6 sm:gap-y-10 sm:gap-5 w-full">
                    {(isFiltered ? filteredProducts : allProducts).map((product) => (
                        <ProductCard
                            key={product.id}
                            variant="mobile"
                            title={product.title}
                            imageSrc={product.imageSrc}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
