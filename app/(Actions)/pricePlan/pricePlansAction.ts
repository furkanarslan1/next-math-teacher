"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { PricePlanFormValues } from "@/schemas/pricePlansSchema";
import { revalidatePath } from "next/cache";

export async function createPricePlan(data: PricePlanFormValues) {
  const supabase = await createServerSupabase();

  const { data: result, error } = await supabase
    .from("price_plans")
    .insert([
      {
        title: data.title,
        category: data.category,
        price: data.price,
        discount_rate: data.discount_rate,
        features: data.features,
        is_active: data.is_active,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase Error:", error.message);
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/price-plans");
  return { success: true, data: result };
}
