"use server";

import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { success } from "zod";

export async function createCategoryAction(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  const { error } = await supabase.from("categories").insert([{ name, slug }]);

  if (error) return { error: "Error while adding category:" + error.message };

  revalidatePath("/admin/courses/create");
  return { success: true };
}
