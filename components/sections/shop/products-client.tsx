"use client";

import { motion, type Variants } from "framer-motion";
import ProductCard from "./product-card";
import CatalogCarousel from "./catalog-carousel";
import type { ProductItem } from "./products";
import { useCart } from "./cart-context";

export interface ProductsClientProps {
    featuredProducts: ProductItem[];
    catalogProducts: ProductItem[];
}

const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function ProductsClient({
    featuredProducts,
    catalogProducts,
}: ProductsClientProps) {
    const { add, qtyOf } = useCart();
    const allProducts = [...featuredProducts, ...catalogProducts];
    const cartProps = (product: ProductItem) => ({
        // Products without a price can't be bought.
        onClick: product.price != null ? () => add(product) : undefined,
        inCart: qtyOf(product.id),
    });

    if (allProducts.length === 0) {
        return <p className="text-white/60">No products yet.</p>;
    }

    return (
        <div className="flex flex-col items-center w-full gap-6 md:gap-16 lg:gap-24">
            {/* Desktop View */}
            <div className="hidden md:flex flex-col items-center w-full gap-16 lg:gap-24">
                <div className="w-full max-w-[1320px]">
                    <motion.div
                        variants={gridVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full justify-items-center"
                    >
                        {featuredProducts.slice(0, 4).map((product) => (
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
                                    {...cartProps(product)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <CatalogCarousel products={catalogProducts} />
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden w-full">
                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4 gap-y-6 sm:gap-y-10 sm:gap-5 w-full"
                >
                    {allProducts.map((product) => (
                        <motion.div key={product.id} variants={cardVariants}>
                            <ProductCard
                                variant="mobile"
                                title={product.title}
                                imageSrc={product.imageSrc}
                                price={product.price}
                                {...cartProps(product)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
