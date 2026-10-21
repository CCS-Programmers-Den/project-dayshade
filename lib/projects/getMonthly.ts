"use server";

import { createClient } from "@/lib/supabase/server";

export async function getMonthly() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_monthly", true);

  if (error) {
    console.error("Error fetching monthly projects:", error.message);
    throw new Error("Failed to fetch monthly projects");
  }

  return data;
}
