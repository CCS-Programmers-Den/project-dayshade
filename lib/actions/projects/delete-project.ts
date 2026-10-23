"use server";

import { createClient } from "@/lib/supabase/server";

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { data: existing, error: fetchError } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Fetch error:", fetchError.message);
    throw new Error("Project not found");
  }

  if (existing?.image_url) {
    try {
      const url = new URL(existing.image_url);
      const parts = url.pathname.split("/projects-image/");
      if (parts.length > 1) {
        const path = parts[1]; // file path in bucket
        const { error: deleteError } = await supabase.storage
          .from("projects-image")
          .remove([path]);

        if (deleteError) {
          console.error("Image delete failed:", deleteError.message);
        }
      }
    } catch (err) {
      console.error("Error parsing image_url:", err);
    }
  }

  const { error: deleteProjectError } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (deleteProjectError) {
    console.error("Delete project error:", deleteProjectError.message);
    throw new Error("Failed to delete project");
  }

  return { success: true, message: "Project deleted" };
}
