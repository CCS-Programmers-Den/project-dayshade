"use server";

import { createClient } from "@/lib/supabase/server";

export async function addMember(formData: FormData) {
  const supabase = await createClient();

  // Extract form fields
  const name = formData.get("name") as string;
  const student_number = formData.get("studentNumber") as string;
  const course = formData.get("course") as string;
  const year = formData.get("yearLevel") as string;
  const student_email = formData.get("studentEmail") as string;
  const facebook_link = formData.get("fbLink") as string;
  const team = formData.get("team") as string; // Comma-separated string (e.g., "WADT, GDT")

  // Check if email already exists
  const { data: existing } = await supabase
    .from("members")
    .select("id")
    .eq("student_email", student_email)
    .maybeSingle();

  if (existing) {
    throw new Error("This email has already submitted an application.");
  }

  // Insert member record
  const { error: insertError, data: inserted } = await supabase
    .from("members")
    .insert({
      name,
      student_number,
      course,
      year,
      student_email,
      facebook_link,
      team,
      status: "pending",
      member_type: "applicant", // Default to applicant for new submissions
    })
    .select();

  if (insertError) {
    console.error("Insert failed:", insertError.message);
    throw new Error("Failed to submit application");
  }

  return inserted;
}
