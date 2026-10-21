"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { addProject } from "@/lib/actions/projects/add-project"
import { getProjects } from "@/lib/actions/projects/get-projects"

type AddProjectMenuProps = {
  onSuccess?: () => void;
}

const ProjectSchema = z.object({
  Title: z.string().min(2, { message: "Title is required" }),
  Image: z.any().optional(),
  Developers: z.string().min(2, { message: "Developers are required" }),
  YTLinks: z.union([z.url({ message: "Enter a valid YouTube URL" }), z.literal("")]).optional(),
  SiteURL: z.union([z.url({ message: "Enter a valid URL" }), z.literal("")]).optional(),
  PublishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "PublishedDate must be in YYYY-MM-DD format",
  }),
  Tags: z.string().min(2, { message: "Tags are required" }),
  Description: z.string().min(5, { message: "Description is required" }),
  MonthlyShowcase: z.boolean().optional(),
  FeaturedShowcase: z.boolean().optional(),
  CurrentShowcase: z.boolean().optional(),
  FeaturedOrder: z.string().refine(
    (val) => !val || (Number(val) >= 1 && Number(val) <= 3),
    { message: "Featured order must be 1, 2, or 3" }
  ).optional(),
})

const AddProjectMenu = ({ onSuccess }: AddProjectMenuProps = {}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([])
  const [usedOrders, setUsedOrders] = useState<number[]>([])

  // Load featured projects when dialog opens
  useEffect(() => {
    if (open) {
      loadFeaturedProjects()
    }
  }, [open])

  async function loadFeaturedProjects() {
    try {
      const data = await getProjects()
      const featured = data.filter((p: any) => p.is_featured)
      setFeaturedProjects(featured)
      setUsedOrders(featured.map((p: any) => p.featured_order).filter(Boolean))
    } catch (error) {
      console.error(error)
    }
  }

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      Title: "",
      Developers: "",
      YTLinks: "",
      SiteURL: "",
      PublishedDate: "",
      Tags: "",
      Description: "",
      Image: "",
      MonthlyShowcase: false,
      FeaturedShowcase: false,
      CurrentShowcase: false,
      FeaturedOrder: "",
    },
    mode: "onChange",
  })

  async function onSubmit(values: any) {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const result = await addProject(formData);
      console.log("Inserted:", result);

      toast.success("Project added successfully!");
      form.reset();
      setOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-xl">
          Add Project +
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-primary font-bold">
            ADD PROJECT
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                {/* First Row: Title + Published Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="Title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-bold">
                          Title*
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project title" {...field} className="placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="PublishedDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-bold">
                          Published Date*
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Second Row: Tags + Developers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="Tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-bold">
                          Tags*
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tags" {...field} className="placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Developers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-bold">
                          Developers*
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter developer names" {...field} className="placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Third Row: Image Upload */}
                <FormField
                  control={form.control}
                  name="Image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">
                        Project Image
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Fourth Row: Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="SiteURL"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-bold">
                          Site Link
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter site link" {...field} className="placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="YTLinks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-bold">
                          YouTube Embed Link
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter YouTube embed link" {...field} className="placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Fifth Row: Description */}
                <FormField
                  control={form.control}
                  name="Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">
                        Description*
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
                          className="resize-y min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Showcase Options */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="CurrentShowcase"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-md border p-3">
                        <FormLabel className="text-primary font-bold">
                          Current Showcase
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="MonthlyShowcase"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-md border p-3">
                        <FormLabel className="text-primary font-bold">
                          Monthly Showcase
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="FeaturedShowcase"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-md border p-3">
                        <FormLabel className="text-primary font-bold">
                          Featured Showcase
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={featuredProjects.length >= 3 && !field.value}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </section>

                {/* Featured Order */}
                <FormField
                  control={form.control}
                  name="FeaturedOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">
                        Featured Order (1, 2, or 3)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="3"
                          placeholder="e.g., 1, 2, or 3"
                          disabled={
                            !form.watch("FeaturedShowcase") ||
                            (featuredProjects.length >= 3 && !form.getValues("FeaturedShowcase"))
                          }
                          className="placeholder:text-muted-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {usedOrders.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Orders in use: {usedOrders.join(", ")}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Footer */}
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={!form.formState.isValid || loading}
                  >
                    {loading ? "Saving..." : "Add Project"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

export default AddProjectMenu
