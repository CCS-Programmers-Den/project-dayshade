import { GlassContainer } from "@/components/shared/glass-container";
import ProductsClient from "./products-client";
import type { Product } from "@/lib/products/queries";
import { CartProvider } from "./cart-context";
import CheckoutSheet from "./checkout-sheet";
import type { PaymentDetails } from "@/lib/orders/queries";

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
    payment?: PaymentDetails | null;
}

export default function Products({
    products,
    payment,
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
        <CartProvider>
            <GlassContainer className="p-4 sm:p-6 md:p-10 w-full overflow-hidden">
                <div className="w-full flex flex-col items-center">
                    {/* Section Header */}
                    <div className="flex flex-col items-center mb-6 md:mb-10">
                        <h1 className="text-white font-bold text-2xl md:text-4xl leading-tight text-center">
                            All Products
                        </h1>
                        <p className="text-white/60 text-sm mt-2 text-center">
                            Tap a product to add it to your cart, then pay via GCash.
                        </p>
                    </div>

                    {/* Interactive section — client boundary */}
                    <ProductsClient
                        featuredProducts={featuredProducts}
                        catalogProducts={catalogProducts}
                    />
                </div>
            </GlassContainer>
            <CheckoutSheet payment={payment ?? null} />
        </CartProvider>
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