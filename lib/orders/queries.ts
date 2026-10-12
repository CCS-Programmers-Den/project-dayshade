"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const RECEIPT_BUCKET = "shop-receipts";
const MAX_RECEIPT_SIZE = 5 * 1024 * 1024;
const MAX_QTY_PER_ITEM = 20;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type OrderStatus = "pending" | "approved" | "rejected";

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  created_at: string;
  buyer_name: string;
  contact: string;
  reference_no: string | null;
  items: OrderItem[];
  total: number;
  receipt_path: string;
  status: OrderStatus;
  reviewed_at: string | null;
}

export type OrderWithReceipt = Order & {
  receipt_url: string | null;
  /** Same receipt, served with a Content-Disposition that forces a download. */
  receipt_download_url: string | null;
};

export type OrderActionResult = { error?: string };

export interface PaymentDetails {
  number: string;
  accountName: string;
}

/** The GCash account buyers pay to, or null until an admin sets it up. */
export async function getPaymentDetails(): Promise<PaymentDetails | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("settings")
    .select("gcash_number, gcash_account_name")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching payment details:", error.message);
    return null;
  }
  if (!data?.gcash_number || !data.gcash_account_name) return null;
  return { number: data.gcash_number, accountName: data.gcash_account_name };
}

/** Admin: set the GCash number and account name shown at checkout. */
export async function updatePaymentDetails(formData: FormData): Promise<OrderActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("You must be signed in");

    const number = requiredText(formData, "gcash_number");
    const accountName = requiredText(formData, "gcash_account_name");
    if (!/^[0-9+\s-]{10,20}$/.test(number)) {
      throw new Error("Enter a valid GCash number, e.g. 0917 123 4567");
    }

    const { data, error } = await supabase
      .from("settings")
      .update({ gcash_number: number, gcash_account_name: accountName })
      .eq("id", 1)
      .select("id");

    if (error) {
      console.error("Error updating payment details:", error.message);
      return { error: "Failed to save payment details. Has orders.sql been run?" };
    }
    if (!data?.length) return { error: "Settings row not found" };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to save payment details" };
  }
  revalidatePath("/shop");
  revalidatePath("/admin/orders");
  return {};
}

/** Public: a buyer submits their cart plus proof of GCash payment. */
export async function createOrder(
  formData: FormData
): Promise<OrderActionResult & { orderId?: string }> {
  const supabase = await createClient();
  const orderId = crypto.randomUUID();
  let receiptPath: string | null = null;

  try {
    const buyer_name = requiredText(formData, "buyer_name");
    const contact = requiredText(formData, "contact");
    const reference_no = optionalText(formData, "reference_no");
    const requested = parseCart(formData.get("items"));

    // Never trust client-side prices: rebuild the order from the products table.
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, title, price")
      .in("id", requested.map((r) => r.id));

    if (productsError) {
      console.error("Error fetching products for order:", productsError.message);
      throw new Error("Could not verify your cart. Please try again.");
    }

    const items: OrderItem[] = requested.map(({ id, qty }) => {
      const product = products?.find((p) => p.id === id);
      if (!product || product.price == null) {
        throw new Error("An item in your cart is no longer available.");
      }
      return { id, title: product.title, price: Number(product.price), qty };
    });
    // Sum in whole centavos so float rounding can never skew the total.
    const totalCents = items.reduce((sum, item) => sum + Math.round(item.price * 100) * item.qty, 0);
    const total = totalCents / 100;

    // The buyer paid the total they were shown. If prices changed since, don't record a different amount.
    const expectedCents = Number(formData.get("expected_total_cents"));
    if (!Number.isInteger(expectedCents) || expectedCents !== totalCents) {
      throw new Error(
        "Prices have changed since you added these items. Please refresh the page and review your cart before paying."
      );
    }

    receiptPath = await uploadReceipt(supabase, orderId, formData);

    const { error } = await supabase.from("orders").insert({
      id: orderId,
      buyer_name,
      contact,
      reference_no,
      items,
      total,
      receipt_path: receiptPath,
    });

    if (error) {
      console.error("Error creating order:", error.message);
      throw new Error("Failed to submit your order. Please try again.");
    }
  } catch (e) {
    if (receiptPath) await supabase.storage.from(RECEIPT_BUCKET).remove([receiptPath]);
    return { error: e instanceof Error ? e.message : "Failed to submit your order" };
  }

  revalidatePath("/admin/orders");
  return { orderId };
}

/** Admin: all orders, newest first, with a short-lived link to each receipt. */
export async function getOrders(): Promise<OrderWithReceipt[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error("Failed to fetch orders");
  }

  const orders = (data ?? []) as Order[];
  if (orders.length === 0) return [];

  const { data: signed } = await supabase.storage
    .from(RECEIPT_BUCKET)
    .createSignedUrls(orders.map((o) => o.receipt_path), 60 * 60);

  return orders.map((order) => {
    const receipt_url = signed?.find((s) => s.path === order.receipt_path)?.signedUrl ?? null;
    const extension = order.receipt_path.split(".").pop() ?? "jpg";
    const fileName = `receipt-${order.buyer_name.replace(/[^a-zA-Z0-9]+/g, "-")}-${order.created_at.slice(0, 10)}.${extension}`;
    return {
      ...order,
      receipt_url,
      receipt_download_url: receipt_url
        ? `${receipt_url}&download=${encodeURIComponent(fileName)}`
        : null,
    };
  });
}

/** Admin (finance): approve or reject a submitted payment. */
export async function reviewOrder(formData: FormData): Promise<OrderActionResult> {
  try {
    const supabase = await createClient();
    const id = requiredText(formData, "id");
    const status = requiredText(formData, "status");
    if (status !== "approved" && status !== "rejected" && status !== "pending") {
      throw new Error("Invalid status");
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("You must be signed in");

    const { data, error } = await supabase
      .from("orders")
      .update(
        status === "pending"
          ? { status, reviewed_by: null, reviewed_at: null }
          : { status, reviewed_by: user.id, reviewed_at: new Date().toISOString() }
      )
      .eq("id", id)
      .select("id");

    if (error) {
      console.error("Error reviewing order:", error.message);
      return { error: "Failed to update order" };
    }
    // RLS can silently block an update (0 rows, no error), so confirm something changed.
    if (!data?.length) return { error: "Order not found or you don't have permission to update it" };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update order" };
  }
  revalidatePath("/admin/orders");
  return {};
}

/** Admin: permanently delete an order and its receipt image. */
export async function deleteOrder(formData: FormData): Promise<OrderActionResult> {
  try {
    const supabase = await createClient();
    const id = requiredText(formData, "id");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("You must be signed in");

    const { data: existing } = await supabase
      .from("orders")
      .select("receipt_path")
      .eq("id", id)
      .maybeSingle();

    const { data, error } = await supabase.from("orders").delete().eq("id", id).select("id");

    if (error) {
      console.error("Error deleting order:", error.message);
      return { error: "Failed to delete order" };
    }
    // RLS can silently block a delete (0 rows, no error), so confirm something was removed.
    if (!data?.length) return { error: "Order not found or you don't have permission to delete it" };

    if (existing?.receipt_path) {
      const { error: removeError } = await supabase.storage
        .from(RECEIPT_BUCKET)
        .remove([existing.receipt_path]);
      if (removeError) console.error("Error removing receipt image:", removeError.message);
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to delete order" };
  }
  revalidatePath("/admin/orders");
  return {};
}

function parseCart(raw: FormDataEntryValue | null) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(typeof raw === "string" ? raw : "");
  } catch {
    throw new Error("Your cart is invalid");
  }
  if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Your cart is empty");

  const merged = new Map<string, number>();
  for (const entry of parsed) {
    const id = entry?.id;
    const qty = entry?.qty;
    if (
      typeof id !== "string" ||
      !UUID_PATTERN.test(id) ||
      !Number.isInteger(qty) ||
      qty < 1 ||
      qty > MAX_QTY_PER_ITEM
    ) {
      throw new Error("Your cart is invalid");
    }
    merged.set(id, Math.min((merged.get(id) ?? 0) + qty, MAX_QTY_PER_ITEM));
  }
  return [...merged].map(([id, qty]) => ({ id, qty }));
}

async function uploadReceipt(
  supabase: Awaited<ReturnType<typeof createClient>>,
  orderId: string,
  formData: FormData
) {
  const file = formData.get("receipt");
  if (!(file instanceof File) || file.size === 0) throw new Error("Please attach your payment receipt");
  if (!file.type.startsWith("image/")) throw new Error("Receipt must be an image");
  if (file.size > MAX_RECEIPT_SIZE) throw new Error("Receipt must be 5MB or smaller");

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${orderId}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage
    .from(RECEIPT_BUCKET)
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (error) {
    console.error("Error uploading receipt:", error.message);
    throw new Error("Receipt upload failed. Please try again.");
  }
  return filePath;
}

function requiredText(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${name.replace(/_/g, " ")} is required`);
  }
  return value.trim();
}

function optionalText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
