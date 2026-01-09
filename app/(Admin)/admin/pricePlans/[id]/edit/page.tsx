import { supabase } from "@/lib/supabase/client";
import { createServerSupabase } from "@/lib/supabase/server";
import { id } from "date-fns/locale";
import React from "react";
import AddPricePlanForm from "../../create/_components/AddPricePlanForm";

export default async function PricePlanEditPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerSupabase();

  const { data: plan } = await supabase
    .from("price_plans")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!plan) return <div className="max-w-6xl mx-auto">Plan not found</div>;
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Price Plan</h1>
      <AddPricePlanForm initialData={plan} />
    </div>
  );
}
