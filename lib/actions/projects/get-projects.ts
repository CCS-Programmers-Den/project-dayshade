"use server";

import { createClient } from "@/lib/supabase/server";

export async function getProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("published_date", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error.message);
    throw new Error("Failed to fetch projects");
  }

  return data;
}

export async function getProjectsStats() {
  const supabase = await createClient();

  // Get total projects count
  const { count: totalProjects, error: countError } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  // Get featured projects (top 3 for dashboard display)
  const { data: featuredProjects, error: featuredError } = await supabase
    .from("projects")
    .select("title, devs")
    .eq("is_featured", true)
    .order("featured_order", { ascending: true })
    .limit(3);

  // Get total showcases count
  const { count: showcasesCount, error: showcaseCountError } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("is_showcase", true);

  // Get current showcase project
  const { data: currentShowcase, error: showcaseError } = await supabase
    .from("projects")
    .select("title, devs")
    .eq("is_showcase", true)
    .limit(1)
    .single();

  if (countError || featuredError || showcaseCountError || showcaseError) {
    console.error("Error fetching projects stats:", { 
      countError, 
      featuredError, 
      showcaseCountError, 
      showcaseError 
    });
    return {
      totalProjects: 0,
      featuredProjects: [],
      showcasesCount: 0,
      currentShowcase: null,
    };
  }

  return {
    totalProjects: totalProjects || 0,
    featuredProjects: featuredProjects || [],
    showcasesCount: showcasesCount || 0,
    currentShowcase: currentShowcase || null,
  };
}
