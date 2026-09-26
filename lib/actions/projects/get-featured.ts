"use server";

import { createClient } from "@/lib/supabase/server";

export async function getFeatured() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("featured_order", { ascending: true });

  if (error) {
    console.error("Error fetching featured projects:", error.message);
    throw new Error("Failed to fetch featured projects");
  }

  return data;
}
