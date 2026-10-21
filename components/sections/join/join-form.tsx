"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addMember } from "@/lib/actions/members/add-member";

import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  studentNumber: z.string()
    .min(10, { message: "Student number must be at least 10 digits." })
    .regex(/^\d+$/, { message: "Student number must contain only numbers." }),
  course: z.enum(["BSCS", "BSIT", "BSIS"], {
    message: "Please select a valid course",
  }),
  yearLevel: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year"], {
    message: "Please select a valid year level",
  }),
  studentEmail: z.string()
    .email({ message: "Invalid email address." })
    .refine(
      (email) => email.endsWith("@student.tsu.edu.ph"),
      { message: "Email must be a valid TSU student email (@student.tsu.edu.ph)" }
    ),
  fbLink: z.string().url({
    message: "Invalid Facebook link.",
  }),
  team: z.array(z.enum(["WADT", "GDT", "CPT", "MMT"]))
    .min(1, { message: "Please select at least one team." }),
});

const checkboxItems = [
  {
    id: "WADT",
    label: "Web and App Development Team",
  },
  {
    id: "GDT",
    label: "Game Development Team",
  },
  {
    id: "CPT",
    label: "Competitive Programming Team",
  },
  {
    id: "MMT",
    label: "Multimedia Team",
  },
] as const;

export function JoinForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      studentNumber: "",
      course: undefined, 
      yearLevel: undefined, 
      studentEmail: "",
      fbLink: "",
      team: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("studentNumber", values.studentNumber);
      formData.append("course", values.course);
      formData.append("yearLevel", values.yearLevel);
      formData.append("studentEmail", values.studentEmail);
      formData.append("fbLink", values.fbLink);
      // Convert array to comma-separated string for database
      formData.append("team", values.team.join(", "));

      await addMember(formData);

      toast.success("Application submitted successfully! We'll contact you soon.");
      form.reset();
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} autoComplete="off" className="placeholder:text-gray-400" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. 20256xxxxx"
                  {...field}
                  autoComplete="off"
                  className="placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BSCS">BS in Computer Science</SelectItem>
                    <SelectItem value="BSIT">
                      BS in Information Technology
                    </SelectItem>
                    <SelectItem value="BSIS">
                      BS in Information Systems
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your year level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. j.doe00001@student.tsu.edu.ph"
                  {...field}
                  autoComplete="off"
                  className="placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fbLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://facebook.com/johndoe"
                  {...field}
                  autoComplete="off"
                  className="placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <FormDescription>
                Choose Your Preferred Team (Select all that interest you)
              </FormDescription>
              {checkboxItems.map((item) => (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-center gap-2"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, item.id]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== item.id)
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}