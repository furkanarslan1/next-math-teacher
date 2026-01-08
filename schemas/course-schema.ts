import * as z from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "The title must be at least 3 characters long."),
  slug: z.string().min(3),
  category_id: z.string().uuid("Please select a category"),
  short_description: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "The price cannot be negative"),
  features: z
    .array(
      z.object({ value: z.string().min(1, "The attribute cannot be empty") })
    )
    .default([]),
  discount_percentage: z.coerce.number().min(0).max(100).optional(),
  image_url: z.string().optional(),

  is_active: z.boolean().default(true),
});

export type CourseSchema = z.infer<typeof courseSchema>;
