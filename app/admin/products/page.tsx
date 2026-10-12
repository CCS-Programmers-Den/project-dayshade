import { getProducts } from "@/lib/products/queries";
import ProductsAdmin from "@/components/sections/admin/products/ProductsAdmin";

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsAdmin products={products} />;
}
