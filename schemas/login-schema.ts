import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir email gir"),
  password: z.string().min(1, "Şifre zorunlu"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
