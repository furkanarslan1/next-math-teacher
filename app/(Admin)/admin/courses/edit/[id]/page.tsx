import { createServerSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import React from "react";
import { EditCourseForm } from "./_components/EditCourseForm";

export default async function CourseEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  //get course category and details

  const { data: course } = await supabase
    .from("courses")
    .select("*,course_categories(category_id),course_features(feature)")
    .eq("id", id)
    .single();

  if (!course) return notFound();

  //get categories
  const { data: categories } = await supabase.from("categories").select("*");
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Course: {course.title}</h1>
      <EditCourseForm course={course} categories={categories || []} />
    </div>
  );
}
