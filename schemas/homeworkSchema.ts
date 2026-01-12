import z from "zod";

export const HomeworkSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters "),
  description: z.string().optional(),
  short_note: z.string().optional(),
  google_form_url: z
    .string()
    .url("Please enter a invalid URL")
    .or(z.literal("")),
  target_type: z.enum(["all", "grade", "student"]),
  target_grade: z.preprocess(
    (val) => (val === "" ? null : val),
    z.coerce.number().nullable().optional()
  ),
  target_student_id: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().nullable().optional()
  ),
});

export type HomeworkFormValues = z.infer<typeof HomeworkSchema>;
