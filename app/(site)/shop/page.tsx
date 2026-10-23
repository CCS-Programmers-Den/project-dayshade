import ShopLogo3D from "@/components/sections/shop/shop-logo-3d";
import { ShopCatalog } from "@/components/sections/shop/shop-catalog";
import { sortProducts, toProductItem } from "@/components/sections/shop/products";
import { getProducts } from "@/lib/actions/products/queries";

export const metadata = {
  title: "Shop | Programmers' Den",
  description: "Official Programmers' Den merch: shirts, hoodies and lanyards.",
};

export default async function ShopPage() {
  const products = await getProducts()
    .then((items) => items.map(toProductItem))
    .catch(() => []);

  return (
    <div className="text-pd-bone">
      <header className="grid gap-8 px-page pb-16 pt-36 md:grid-cols-12 md:items-end md:pb-24 md:pt-48">
        <div className="md:col-span-8">
          <h1 className="text-display-xl">Shop</h1>
          <p className="mt-8 max-w-lg text-xl leading-snug text-pd-bone/70">
            Official Programmers&apos; Den merch: shirts, hoodies and lanyards.
          </p>
        </div>
        <ShopLogo3D className="md:col-span-4 md:justify-self-end" />
      </header>
      <ShopCatalog products={sortProducts(products)} />
    </div>
  );
}
