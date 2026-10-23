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

/** Featured products first (by their order), then everything else as given. */
export function sortProducts(products: ProductItem[]): ProductItem[] {
  const featured = products
    .filter((p) => p.featuredOrder != null)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
  const rest = products.filter((p) => p.featuredOrder == null);
  return [...featured, ...rest];
}
