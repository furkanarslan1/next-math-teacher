"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { PricePlanFormValues } from "@/schemas/pricePlansSchema";
import { revalidatePath } from "next/cache";
import { success } from "zod";

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

export async function updatePricePlan(id: string, data: PricePlanFormValues) {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("price_plans")
    .update({
      title: data.title,
      category: data.category,
      price: data.price,
      discount_rate: data.discount_rate,
      features: data.features,
      is_active: data.is_active,
    })
    .eq("id", id); //sadece bu id li satırı güncelle // Update only the row with this ID
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/pricePlans");
  return { success: true };
}

export async function deletePricePlan(id: string) {
  const supabase = await createServerSupabase();

  const { error } = await supabase.from("price_plans").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/pricePlans");
  return { success: true };
}
