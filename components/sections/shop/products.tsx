import { GlassContainer } from "@/components/shared/glass-container";
import ShopLogo3D from "./shop-logo-3d";
import ProductsClient from "./products-client";

export type ProductCategoryType = "shirts" | "hoodies" | "lanyards";

export interface ProductItem {
    id: string;
    title: string;
    description?: string;
    imageSrc?: string;
    price?: string | number;
    featuredOrder?: number | null; // If null, it's not featured
    category?: ProductCategoryType;
}

// Sample Data / Fallback Data
const DEFAULT_PRODUCTS: ProductItem[] = [
    {
        id: "feat-1",
        title: "PROGDEN TSHIRT",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        imageSrc: "/assets/600x400.png",
        featuredOrder: 1,
        category: "shirts",
    },
    {
        id: "feat-2",
        title: "PROGDEN TSHIRT",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        imageSrc: "/assets/600x400.png",
        featuredOrder: 2,
        category: "shirts",
    },
    {
        id: "feat-3",
        title: "PROGDEN HOODIE",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        imageSrc: "/assets/600x400.png",
        featuredOrder: 3,
        category: "hoodies",
    },
    {
        id: "feat-4",
        title: "PROGDEN LANYARD",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
        imageSrc: "/assets/600x400.png",
        featuredOrder: 4,
        category: "lanyards",
    },
    { id: "cat-1", title: "PROGDEN TSHIRT", imageSrc: "/assets/400x400.png", category: "shirts" },
    { id: "cat-2", title: "PROGDEN TSHIRT", imageSrc: "/assets/400x400.png", category: "shirts" },
    { id: "cat-3", title: "PROGDEN HOODIE", imageSrc: "/assets/400x400.png", category: "hoodies" },
    { id: "cat-4", title: "PROGDEN HOODIE", imageSrc: "/assets/400x400.png", category: "hoodies" },
    { id: "cat-5", title: "PROGDEN LANYARD", imageSrc: "/assets/400x400.png", category: "lanyards" },
    { id: "cat-6", title: "PROGDEN LANYARD", imageSrc: "/assets/400x400.png", category: "lanyards" },
];

export interface ProductsProps {
    products?: ProductItem[];
}

export default function Products({
    products = DEFAULT_PRODUCTS,
}: ProductsProps) {
    // Single pass: split into featured and catalog (js-combine-iterations)
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

    return (
        <GlassContainer className="p-4 sm:p-6 md:p-10 w-full overflow-hidden">
            <div className="w-full flex flex-col items-center">
                {/* Section Header */}
                <div className="flex flex-col items-center gap-4 mb-6 md:mb-10">
                    <ShopLogo3D />
                    <h1 className="text-white font-bold text-2xl md:text-4xl leading-tight text-center">
                        All Products
                    </h1>
                </div>

                {/* Interactive section — client boundary */}
                <ProductsClient
                    featuredProducts={featuredProducts}
                    catalogProducts={catalogProducts}
                />
            </div>
        </GlassContainer>
    );
}