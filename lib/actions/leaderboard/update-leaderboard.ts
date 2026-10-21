"use server";

import { LeaderboardEntrySchema } from "@/lib/validation/leaderboard-entries";
import { parse } from "csv-parse/sync";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface LeaderboardCheckResult {
  success: boolean;
  count: number;
  data: any[];
  errors?: string[];
}

const checkCSV = async (file: File): Promise<LeaderboardCheckResult> => {
  if (!file) throw new Error("No file uploaded");

  // Check MIME type for CSV
  if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
    throw new Error("Only CSV files are accepted.");
  }

  const text = await file.text();

  let records: any[];
  try {
    records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  } catch (err) {
    throw new Error("CSV parsing failed: " + (err as Error).message);
  }

  const validated: any[] = [];
  const errors: string[] = [];

  records.forEach((row: any, i: number) => {
    const result = LeaderboardEntrySchema.safeParse(row);
    if (result.success) {
      validated.push(result.data);
    } else {
      errors.push(
        `Row ${i + 1} invalid: ${result.error.issues
          .map((issue) => issue.message)
          .join(", ")}`
      );
    }
  });

  return {
    success: errors.length === 0,
    count: validated.length,
    data: validated,
    errors: errors.length > 0 ? errors : undefined,
  };
};

const updateLeaderboards = async (
  file: File
): Promise<{ validation: LeaderboardCheckResult; db: any }> => {
  const result = await checkCSV(file);

  if (!result.success) {
    throw new Error(
      `Invalid CSV file. Errors:\n${result.errors?.join("\n") ?? ""}`
    );
  }

  const supabase = await createClient();

  // Delete all existing records first
  const { error: deleteError } = await supabase
    .from("leaderboard_entries")
    .delete()
    .not("id", "is", null);

  if (deleteError) {
    throw new Error("Failed to clear leaderboard: " + deleteError.message);
  }

  // Insert new records
  const { data, error } = await supabase
    .from("leaderboard_entries")
    .insert(result.data);

  if (error) {
    throw new Error("Database update failed: " + error.message);
  }

  revalidatePath("admin/leaderboards");
  return { validation: result, db: data };
};

export { updateLeaderboards };
