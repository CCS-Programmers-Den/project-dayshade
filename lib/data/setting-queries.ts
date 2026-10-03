"use server";

import { createClient } from "@/utils/supabase/server";
import { Settings } from "@/lib/validation/settings";
import { revalidatePath } from "next/cache";

async function isRecruitmentOpen(): Promise<Settings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("settings")
      .select("is_open_recruitment")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching recruitment status:", error);
      return { is_recruitment_open: false };
    }

    if (!data) {
      return { is_recruitment_open: false };
    }

    console.log("Recruitment status:", data.is_open_recruitment);

    return { is_recruitment_open: data.is_open_recruitment };
  } catch (error) {
    console.error("Error checking recruitment status:", error);
    return { is_recruitment_open: false };
  }
}

async function getRecruitmentStatus() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("settings")
    .select("is_open_recruitment")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching recruitment status:", error);
    return { is_open_recruitment: false };
  }

  if (!data) {
    return { is_open_recruitment: false };
  }

  return { is_open_recruitment: data.is_open_recruitment };
}

async function updateRecruitmentStatus(isOpen: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("settings")
    .update({ is_open_recruitment: isOpen })
    .eq("id", 1);

  if (error) {
    console.error("Error updating recruitment status:", error);
    throw new Error(`Failed to update recruitment status: ${error.message}`);
  }

  revalidatePath("/admin");
  return { success: true };
}

export { isRecruitmentOpen, getRecruitmentStatus, updateRecruitmentStatus };

