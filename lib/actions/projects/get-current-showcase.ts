"use server";

import { createClient } from "@/lib/supabase/server";
import { extractYouTubeId } from "@/lib/project-utils";

export async function getCurrentShowcase() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_showcase", true)
    .limit(1);

  if (error) {
    console.error("Error fetching showcase:", error.message);
    throw new Error("Failed to fetch showcase project");
  }

  if (!data || data.length === 0) {
    return null;
  }

  const project = data[0];
  const ytId = extractYouTubeId(project.embed_link);

  return {
    ...project,
    youtubeId: ytId,
    embed_url: ytId ? `https://www.youtube.com/embed/${ytId}` : null,
  };
}
