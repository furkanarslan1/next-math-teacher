import * as z from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalı"),
  slug: z.string().min(3),
  category_id: z.string().uuid("Lütfen bir kategori seçin"),
  short_description: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Fiyat negatif olamaz"),
  features: z
    .array(z.object({ value: z.string().min(1, "Özellik boş olamaz") }))
    .default([]),
  discount_percentage: z.coerce.number().min(0).max(100).optional(),
  image_url: z.string().optional(),

  is_active: z.boolean().default(true),
});

export type CourseSchema = z.infer<typeof courseSchema>;
