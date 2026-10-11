"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type ProductCategory = "shirts" | "hoodies" | "lanyards";

export interface Product {
  id: string;
  title: string;
  description: string | null;
  category: ProductCategory;
  price: number | null;
  image_url: string | null;
  featured_order: number | null;
  created_at: string;
  updated_at: string;
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("featured_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Failed to fetch products");
  }
  return data ?? [];
}

export type ProductActionResult = { error?: string };

export async function createProduct(formData: FormData): Promise<ProductActionResult> {
  try {
    const supabase = await createClient();
    const product = parseProductForm(formData);
    const { error } = await supabase.from("products").insert(product);

    if (error) {
      console.error("Error creating product:", error.message);
      return { error: "Failed to create product" };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to create product" };
  }
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return {};
}

export async function updateProduct(formData: FormData): Promise<ProductActionResult> {
  try {
    const supabase = await createClient();
    const id = requiredText(formData, "id");
    const product = parseProductForm(formData);
    const { error } = await supabase.from("products").update(product).eq("id", id);

    if (error) {
      console.error("Error updating product:", error.message);
      return { error: "Failed to update product" };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update product" };
  }
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return {};
}

export async function deleteProduct(formData: FormData): Promise<ProductActionResult> {
  try {
    const supabase = await createClient();
    const id = requiredText(formData, "id");
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error.message);
      return { error: "Failed to delete product" };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to delete product" };
  }
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return {};
}

function parseProductForm(formData: FormData) {
  const title = requiredText(formData, "title");
  const category = requiredText(formData, "category") as ProductCategory;
  if (!["shirts", "hoodies", "lanyards"].includes(category)) {
    throw new Error("Invalid product category");
  }

  const priceValue = optionalText(formData, "price");
  const featuredValue = optionalText(formData, "featured_order");
  const price = priceValue ? Number(priceValue) : null;
  const featured_order = featuredValue ? Number(featuredValue) : null;

  if (price !== null && (!Number.isFinite(price) || price < 0)) {
    throw new Error("Price must be a positive number");
  }
  if (featured_order !== null && (!Number.isInteger(featured_order) || featured_order < 1)) {
    throw new Error("Featured order must be a positive whole number");
  }

  const image_url = optionalText(formData, "image_url");
  if (image_url && !/^(https?:\/\/|\/)/.test(image_url)) {
    throw new Error("Image URL must start with http://, https:// or /");
  }

  return {
    title,
    description: optionalText(formData, "description"),
    category,
    price,
    image_url,
    featured_order,
  };
}

function requiredText(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${name} is required`);
  }
  return value.trim();
}

function optionalText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
