import React from "react";
import AddPricePlanForm from "./_components/AddPricePlanForm";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function PricePlansCreate() {
  const supabase = await createServerSupabase();

  const categories = await supabase.from("price_plans").select("category");
  return (
    <div className="max-w-6xl mx-auto">
      <AddPricePlanForm categories={categories} />
    </div>
  );
}
