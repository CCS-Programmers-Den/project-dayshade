"use server";

import { createClient } from "@/lib/supabase/server";

export async function getMembers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch members:", error);
    throw new Error("Failed to fetch members");
  }

  return data;
}

export async function getMembersStats() {
  const supabase = await createClient();

  // Get total accepted members
  const { count: totalMembers, error: countError } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })
    .eq("status", "accepted");

  // Get pending applications count
  const { count: pendingCount, error: pendingError } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  // Get last application date
  const { data: lastApp, error: lastAppError } = await supabase
    .from("members")
    .select("created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (countError || pendingError || lastAppError) {
    console.error("Error fetching members stats:", { countError, pendingError, lastAppError });
    return {
      totalMembers: 0,
      pendingCount: 0,
      lastApplicationDate: null,
    };
  }

  return {
    totalMembers: totalMembers || 0,
    pendingCount: pendingCount || 0,
    lastApplicationDate: lastApp?.created_at || null,
  };
}
