import React from "react";
import { DeleteCourseForm } from "./_components/DeleteCourseForm";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function DeleteCoursePage() {
  const supabase = await createServerSupabase();
  const { data: courses } = await supabase
    .from("courses")
    .select("id,title,price,image_url")
    .order("created_at", { ascending: false });
  return (
    <div>
      <DeleteCourseForm courses={courses || []} />
    </div>
  );
}
