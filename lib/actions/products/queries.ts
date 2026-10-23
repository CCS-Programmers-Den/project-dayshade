"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";

const IMAGE_BUCKET = "projects-image";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

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
    const image_url = await uploadProductImage(supabase, formData);
    const { error } = await supabase.from("products").insert({ ...product, image_url });

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
    const newImageUrl = await uploadProductImage(supabase, formData);

    const { data: existing } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", id)
      .single();

    const { error } = await supabase
      .from("products")
      .update(newImageUrl ? { ...product, image_url: newImageUrl } : product)
      .eq("id", id);

    if (error) {
      console.error("Error updating product:", error.message);
      return { error: "Failed to update product" };
    }
    if (newImageUrl && existing?.image_url) {
      await removeProductImage(supabase, existing.image_url);
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
    const { data: existing } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", id)
      .single();

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error.message);
      return { error: "Failed to delete product" };
    }
    if (existing?.image_url) await removeProductImage(supabase, existing.image_url);
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

  return {
    title,
    description: optionalText(formData, "description"),
    category,
    price,
    featured_order,
  };
}

async function uploadProductImage(supabase: SupabaseClient, formData: FormData) {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return null;

  if (!file.type.startsWith("image/")) throw new Error("File must be an image");
  if (file.size > MAX_IMAGE_SIZE) throw new Error("Image must be 5MB or smaller");

  const filePath = `products/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (error) {
    console.error("Error uploading product image:", error.message);
    throw new Error("Image upload failed");
  }
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(filePath).data.publicUrl;
}

async function removeProductImage(supabase: SupabaseClient, imageUrl: string) {
  const path = imageUrl.split(`/${IMAGE_BUCKET}/`)[1];
  if (!path) return;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([path]);
  if (error) console.error("Error removing product image:", error.message);
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
