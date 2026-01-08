import React from "react";
import AddPricePlanForm from "./_components/AddPricePlanForm";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function PricePlansCreate() {
  return (
    <div className="max-w-6xl mx-auto">
      <AddPricePlanForm />
    </div>
  );
}
