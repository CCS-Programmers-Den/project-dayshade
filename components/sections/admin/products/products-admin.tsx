"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createProduct,
  deleteProduct,
  type Product,
  type ProductCategory,
  updateProduct,
} from "@/lib/actions/products/queries";

const categories: ProductCategory[] = ["shirts", "hoodies", "lanyards"];

type ProductForm = {
  title: string;
  description: string;
  category: ProductCategory;
  price: string;
  featured_order: string;
};

const emptyForm: ProductForm = {
  title: "",
  description: "",
  category: "shirts",
  price: "",
  featured_order: "",
};

export default function ProductsAdmin({ products }: { products: Product[] }) {
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const updateField = (name: keyof ProductForm, value: string) =>
    setForm((current) => ({ ...current, [name]: value }));

  const resetForm = () => {
    setEditingId(null);
    setCurrentImage(null);
    setForm(emptyForm);
    setFileInputKey((key) => key + 1);
  };

  const edit = (product: Product) => {
    setEditingId(product.id);
    setCurrentImage(product.image_url);
    setFileInputKey((key) => key + 1);
    setForm({
      title: product.title,
      description: product.description ?? "",
      category: product.category,
      price: product.price?.toString() ?? "",
      featured_order: product.featured_order?.toString() ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (editingId) data.set("id", editingId);

    startTransition(async () => {
      const result = editingId ? await updateProduct(data) : await createProduct(data);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(editingId ? "Product updated" : "Product created");
      resetForm();
      router.refresh();
    });
  };

  const remove = (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    const data = new FormData();
    data.set("id", id);
    startTransition(async () => {
      const result = await deleteProduct(data);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Product deleted");
      if (id === editingId) resetForm();
      router.refresh();
    });
  };

  return (
    <section className="space-y-8 p-6">
      <header>
        <h1 className="text-3xl font-bold text-primary">Shop Products</h1>
        <p className="text-sm text-muted-foreground">
          Manage the products displayed on the public Shop page.
        </p>
      </header>

      <form onSubmit={submit} className="grid max-w-3xl gap-4 rounded-xl border bg-card p-6">
        <h2 className="text-xl font-semibold">{editingId ? "Edit product" : "Add product"}</h2>
        <Input name="title" value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Product title" required />
        <Textarea name="description" value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Description" />
        <div className="grid gap-4 sm:grid-cols-3">
          <select name="category" value={form.category} onChange={(e) => updateField("category", e.target.value)} className="h-10 rounded-md border bg-background px-3 text-sm">
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <Input name="price" type="number" min="0" step="0.01" value={form.price} onChange={(e) => updateField("price", e.target.value)} placeholder="Price" />
          <Input name="featured_order" type="number" min="1" step="1" value={form.featured_order} onChange={(e) => updateField("featured_order", e.target.value)} placeholder="Featured order" />
        </div>
        <div className="grid gap-2">
          {currentImage && (
            <Image src={currentImage} alt="Current product image" width={640} height={360} className="aspect-video w-full max-w-xs rounded-md object-cover" />
          )}
          <Input key={fileInputKey} name="image" type="file" accept="image/*" />
          <p className="text-xs text-muted-foreground">
            {currentImage ? "Choose a new image to replace the current one (max 5MB)." : "Product image (max 5MB)."}
          </p>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : editingId ? "Update product" : "Add product"}</Button>
          {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>}
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="rounded-xl border bg-card p-4">
            {product.image_url && <Image src={product.image_url} alt="" width={640} height={360} className="mb-4 aspect-video w-full rounded-md object-cover" />}
            <div className="space-y-1">
              <h2 className="font-semibold">{product.title}</h2>
              <p className="text-sm capitalize text-muted-foreground">{product.category}{product.price !== null ? ` · ${product.price}` : ""}</p>
              {product.description && <p className="text-sm">{product.description}</p>}
            </div>
            <div className="mt-4 flex gap-2">
              <Button type="button" variant="outline" onClick={() => edit(product)}>Edit</Button>
              <Button type="button" variant="destructive" onClick={() => remove(product.id)} disabled={isPending}>Delete</Button>
            </div>
          </article>
        ))}
        {products.length === 0 && <p className="text-muted-foreground">No products yet.</p>}
      </div>
    </section>
  );
}
