import { createServerSupabase } from "@/lib/supabase/server";
import React from "react";
import HomeworkForm from "../_components/HomeworkForm";

export default async function page() {
  const supabase = await createServerSupabase();

  //get profile list for special students section
  const { data: students } = await supabase
    .from("profiles")
    .select("id,full_name")
    .eq("role", "user")
    .order("full_name");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Create New Homework
        </h1>
        <p className="text-slate-500">
          Assign specific tasks to students or classes.
        </p>
      </div>

      <HomeworkForm students={students || []} />
    </div>
  );
}
