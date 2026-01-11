import { createServerSupabase } from "@/lib/supabase/server";
import React from "react";
import PricePlanSection from "./PricePlanSection";

export default async function PricePlans() {
  const supabase = await createServerSupabase();

  const { data: plans, error } = await supabase.from("price_plans").select("*");
  return (
    <div className="max-w-6xl mx-auto ">
      <PricePlanSection plans={plans || []} />
    </div>
  );
}
