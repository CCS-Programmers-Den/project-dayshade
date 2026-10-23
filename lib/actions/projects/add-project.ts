"use server";

import { createClient } from "@/lib/supabase/server";

export async function addProject(formData: FormData) {
  const supabase = await createClient();

  // Extract form fields
  const title = formData.get("Title") as string;
  const description = formData.get("Description") as string;
  const devs = (formData.get("Developers") as string).split(",").map(d => d.trim());
  const tags = (formData.get("Tags") as string).split(",").map(t => t.trim());
  const embed_link = formData.get("YTLinks") as string;
  const site_link = formData.get("SiteURL") as string;
  const published_date = formData.get("PublishedDate") as string;
  const is_monthly = formData.get("MonthlyShowcase") === "true";
  const is_featured = formData.get("FeaturedShowcase") === "true";
  const is_showcase = formData.get("CurrentShowcase") === "true";
  const featured_order = formData.get("FeaturedOrder") ? Number(formData.get("FeaturedOrder")) : null;

  // Validate featured order
  if (is_featured && featured_order) {
    if (featured_order < 1 || featured_order > 3) {
      throw new Error("Featured order must be 1, 2, or 3");
    }

    // Check for duplicate featured_order
    const { data: existingOrder } = await supabase
      .from("projects")
      .select("id")
      .eq("featured_order", featured_order)
      .eq("is_featured", true);

    if (existingOrder && existingOrder.length > 0) {
      throw new Error(`Featured order ${featured_order} is already taken by another project`);
    }
  }

  // Check if already 3 featured projects
  if (is_featured) {
    const { count } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true);

    if (count && count >= 3) {
      throw new Error("Maximum of 3 featured projects allowed. Please unfeature another project first.");
    }
  }

  // If setting as current showcase, unset all other showcases
  if (is_showcase) {
    await supabase
      .from("projects")
      .update({ is_showcase: false })
      .eq("is_showcase", true);
  }

  // Handle file
  const file = formData.get("Image") as File | null;
  let image_url: string | null = null;

  if (file) {
    const filePath = `projects/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("projects-image")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
      throw new Error("File upload failed");
    }

    const { data } = supabase.storage.from("projects-image").getPublicUrl(filePath);
    image_url = data.publicUrl;
  }

  // Insert project record
  const { error: insertError, data: inserted } = await supabase
    .from("projects")
    .insert({
      title,
      description,
      devs,
      tags,
      embed_link,
      site_link,
      published_date,
      image_url,
      is_monthly,
      is_featured,
      is_showcase,
      featured_order,
    })
    .select();

  if (insertError) {
    console.error("Insert failed:", insertError.message);
    throw new Error("Database insert failed: " + insertError.message);
  }

  return inserted;
}
