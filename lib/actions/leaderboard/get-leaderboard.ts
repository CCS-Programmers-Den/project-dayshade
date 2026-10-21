"use server"

import { LeaderboardEntry } from "@/lib/validation/leaderboard-entries";
import { createClient } from "@/lib/supabase/server";


async function getEntries(): Promise<LeaderboardEntry[]> {
  try {
    const supabase = await createClient();
    const { data: leaderboard_entries, error } = await supabase
      .from("leaderboard_entries")
      .select("*");

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    // console.log("Fetched entries:", leaderboard_entries);
    return leaderboard_entries || [];
  } catch (e) {
    console.error("Failed to fetch leaderboard entries:", e);
    throw e;
  }
}

async function getLeaderboardStats() {
  const supabase = await createClient();

  // Get last update date (date_uploaded from any entry)
  const { data: dateData, error: dateError } = await supabase
    .from("leaderboard_entries")
    .select("date_uploaded")
    .limit(1)
    .single();

  // Get top 3 entries by rank
  const { data: topEntries, error: entriesError } = await supabase
    .from("leaderboard_entries")
    .select("rank, name, points")
    .order("rank", { ascending: true })
    .limit(3);

  if (dateError || entriesError) {
    console.error("Error fetching leaderboard stats:", { dateError, entriesError });
    return {
      lastUpdate: null,
      topEntries: [],
    };
  }

  return {
    lastUpdate: dateData?.date_uploaded || null,
    topEntries: topEntries || [],
  };
}

export { getEntries, getLeaderboardStats };
