import * as z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "The category name must be at least 2 characters long."),
  slug: z.string().min(2),
});

export type CategorySchema = z.infer<typeof categorySchema>;
