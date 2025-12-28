import React from "react";
import { CategoryDeleteForm } from "./_components/CategoryDeleteForm";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function CategoryDeletePage() {
  const supabase = await createServerSupabase();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (error) {
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  }
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold ">Delete Category</h1>
      <CategoryDeleteForm categories={categories} />
    </div>
  );
}
