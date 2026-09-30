import Image from "next/image";
import { GlassContainer } from "@/components/shared/glass-container";
import ProductCard from "./product-card";
import CatalogCarousel from "./catalog-carousel";

export interface ProductItem {
    id: string;
    title: string;
    description?: string;
    imageSrc?: string;
    price?: string | number;
    featuredOrder?: number | null; // If null, it's not featured
}

// Sample Data / Fallback Data
const DEFAULT_PRODUCTS: ProductItem[] = [
    {
        id: "feat-1",
        title: "PROGDEN TSHIRT",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        imageSrc: "/assets/600x400.png",
        featuredOrder: 1,
    },
    {
        id: "feat-2",
        title: "PROGDEN TSHIRT",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        imageSrc: "/assets/600x400.png",
        featuredOrder: 2,
    },
    {
        id: "feat-3",
        title: "PROGDEN TSHIRT",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        imageSrc: "/assets/600x400.png",
        featuredOrder: 3,
    },
    {
        id: "feat-4",
        title: "PROGDEN TSHIRT",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        imageSrc: "/assets/600x400.png",
        featuredOrder: 4,
    },
    { id: "cat-1", title: "PROGDEN TSHIRT", imageSrc: "/assets/400x400.png" },
    { id: "cat-2", title: "PROGDEN TSHIRT", imageSrc: "/assets/400x400.png" },
    { id: "cat-3", title: "PROGDEN TSHIRT", imageSrc: "/assets/400x400.png" },
    { id: "cat-4", title: "PROGDEN TSHIRT", imageSrc: "/assets/400x400.png" },
    { id: "cat-5", title: "PROGDEN TSHIRT", imageSrc: "/assets/400x400.png" },
    { id: "cat-6", title: "PROGDEN TSHIRT", imageSrc: "/assets/400x400.png" },
];

export interface ProductsProps {
    products?: ProductItem[];
}

export default function Products({
    products = DEFAULT_PRODUCTS,
}: ProductsProps) {
    const featuredProducts: ProductItem[] = [];
    const catalogProducts: ProductItem[] = [];

    for (const p of products) {
        if (p.featuredOrder != null) {
            featuredProducts.push(p);
        } else {
            catalogProducts.push(p);
        }
    }

    featuredProducts.sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
    const allProductsSorted = [...featuredProducts, ...catalogProducts];

    return (
        <GlassContainer className="p-4 sm:p-6 md:p-10 w-full overflow-hidden">
            <div className="w-full flex flex-col items-center">
                {/* Desktop View */}
                <div className="hidden md:flex flex-col items-center w-full gap-16 md:gap-24">
                    <div className="flex flex-col items-center gap-4">
                        <Image src="/assets/pd-logo.png" alt="PD Logo" width={200} height={200} />
                        <h1 className="text-4xl font-bold">All Products</h1>
                    </div>

                    {/* Featured Products Grid */}
                    <div className="w-full max-w-[1204px]">
                        <div className="grid grid-cols-2 gap-8 lg:gap-x-[68px] lg:gap-y-[88px] w-full justify-items-center">
                            {featuredProducts.slice(0, 4).map((product) => (
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

                    {/* Catalog Carousel (Client Component) */}
                    <CatalogCarousel products={catalogProducts} />
                </div>

                {/* Mobile View */}
                <div className="flex md:hidden flex-col items-center w-full gap-6">
                    {/* Section Header */}
                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="relative w-[62px] h-[62px]">
                            <Image
                                src="/assets/pd-logo.png"
                                alt="Programmers' Den Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-white font-bold text-2xl leading-[22px]">
                            All Products
                        </h1>
                    </div>

                    {/* Products List */}
                    <div className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-4 gap-y-6 sm:gap-y-10 sm:gap-5 w-full">
                        {allProductsSorted.map((product) => (
                            <ProductCard
                                key={product.id}
                                variant="mobile"
                                title={product.title}
                                imageSrc={product.imageSrc}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </GlassContainer>
    );
}