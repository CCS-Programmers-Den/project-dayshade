"use server";

import { createClient } from "@/lib/supabase/server";

function extractPathFromUrl(url: string) {
  const parts = url.split("/projects-image/");
  return parts.length > 1 ? parts[1] : null;
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();

  const { data: existing, error: fetchError } = await supabase
    .from("projects")
    .select("image_url, is_featured, featured_order")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching existing project:", fetchError.message);
  }

  const file = formData.get("Image") as File | null;
  let image_url = formData.get("ImageURL") as string | null;

  if (file && file.size > 0) {
    const filePath = `projects/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("projects-image")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw new Error("File upload failed");

    const { data } = supabase.storage.from("projects-image").getPublicUrl(filePath);
    image_url = data.publicUrl;

    if (existing?.image_url) {
      const oldPath = extractPathFromUrl(existing.image_url);
      if (oldPath) {
        await supabase.storage.from("projects-image").remove([oldPath]);
      }
    }
  }

  const is_featured = formData.get("FeaturedShowcase") === "true";
  const featured_order = formData.get("FeaturedOrder") ? Number(formData.get("FeaturedOrder")) : null;

  // Validate featured order
  if (is_featured && featured_order) {
    if (featured_order < 1 || featured_order > 3) {
      throw new Error("Featured order must be 1, 2, or 3");
    }

    // Check for duplicate featured_order (excluding current project)
    const { data: existingOrder } = await supabase
      .from("projects")
      .select("id")
      .eq("featured_order", featured_order)
      .eq("is_featured", true)
      .neq("id", id);

    if (existingOrder && existingOrder.length > 0) {
      throw new Error(`Featured order ${featured_order} is already taken by another project`);
    }
  }

  // Check if trying to add featured when already 3 exist
  if (is_featured && !existing?.is_featured) {
    const { count } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true);

    if (count && count >= 3) {
      throw new Error("Maximum of 3 featured projects allowed. Please unfeature another project first.");
    }
  }

  const is_showcase = formData.get("CurrentShowcase") === "true";

  // If setting as current showcase, unset all other showcases
  if (is_showcase) {
    await supabase
      .from("projects")
      .update({ is_showcase: false })
      .eq("is_showcase", true)
      .neq("id", id);
  }

  const payload = {
    title: formData.get("Title"),
    image_url,
    devs: formData.get("Developers")
      ? (formData.get("Developers") as string).split(",").map(d => d.trim())
      : [],
    tags: formData.get("Tags")
      ? (formData.get("Tags") as string).split(",").map(t => t.trim())
      : [],
    embed_link: formData.get("YTLinks"),
    site_link: formData.get("SiteURL"),
    published_date: formData.get("PublishedDate"),
    description: formData.get("Description"),
    is_monthly: formData.get("MonthlyShowcase") === "true",
    is_featured,
    is_showcase,
    featured_order,
  };

  const { data: updated, error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return updated;
}