"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateMemberStatus(
  memberId: string,
  status: "pending" | "accepted" | "rejected"
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("members")
    .update({ status })
    .eq("id", memberId);

  if (error) {
    console.error("Failed to update member status:", error);
    throw new Error("Failed to update member status");
  }

  revalidatePath("/admin/recruitment");
  return { success: true };
}
