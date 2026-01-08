import z from "zod";

export const pricePlansSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.enum(["single", "group_4", "group_6"]),
  price: z.coerce.number().min(0, "Price mst be positive"),
  discount_rate: z.coerce.number().min(0).max(100),
  features: z
    .array(z.string().min(1, "Feature cannot be empty"))
    .min(1, "At least one feature required "),
  is_active: z.boolean().default(true),
});

export type PricePlanFormValues = z.infer<typeof pricePlansSchema>;
