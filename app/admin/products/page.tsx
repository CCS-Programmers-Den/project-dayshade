import { getProducts } from "@/lib/actions/products/queries";
import ProductsAdmin from "@/components/sections/admin/products/products-admin";

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsAdmin products={products} />;
}
