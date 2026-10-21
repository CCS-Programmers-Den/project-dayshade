import { GlassContainer } from "@/components/shared/glass-container";
import ShopLogo3D from "./shop-logo-3d";
import ProductsClient from "./products-client";
import type { Product } from "@/lib/actions/products/queries";

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

export interface ProductsProps {
    products: ProductItem[];
}

export default function Products({
    products,
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

export function toProductItem(product: Product): ProductItem {
    return {
        id: product.id,
        title: product.title,
        description: product.description ?? undefined,
        imageSrc: product.image_url ?? undefined,
        price: product.price ?? undefined,
        featuredOrder: product.featured_order,
        category: product.category,
    };
}