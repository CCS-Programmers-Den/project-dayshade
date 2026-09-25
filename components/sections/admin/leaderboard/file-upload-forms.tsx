"use client";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { FileUploadSchema } from "@/lib/validation/file-upload";
import { useForm } from "react-hook-form";
import { updateLeaderboards } from "@/lib/actions/leaderboard/update-leaderboard";

export default function FileUploadForms() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const form = useForm<z.infer<typeof FileUploadSchema>>({
    resolver: zodResolver(FileUploadSchema),
    defaultValues: {
      file: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FileUploadSchema>) {
    try {
      setLoading(true);
      await updateLeaderboards(data.file);
      toast.success("File uploaded successfully");
      form.reset();
    } catch (error) {
      toast.error("File upload failed", {
        description: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose file</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".csv"
                  className="cursor-pointer"
                  aria-label="Upload CSV file"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormDescription>Supported formats: CSV, Excel</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!mounted || !form.watch("file") || loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
