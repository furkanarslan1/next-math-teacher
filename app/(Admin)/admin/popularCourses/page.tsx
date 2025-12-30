import { createServerSupabase } from "@/lib/supabase/server";
import React from "react";
import { PopularCourseCard } from "./_components/PopularCourseCard";

export default async function PopularCoursesPage() {
  const supabase = await createServerSupabase();

  //catch the courses

  const { data: allCourses } = await supabase
    .from("courses")
    .select("id,title,image_url")
    .order("created_at", { ascending: false });

  //Catch ID that popular courses
  const { data: popularCourses } = await supabase
    .from("popular_courses")
    .select("course_id");

  const popularIds = popularCourses?.map((p) => p.course_id) || [];
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Popular Courses</h1>
          <p className="text-muted-foreground">
            Manage the 4 courses that will appear on the homepage.
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold border border-blue-100">
          Selected: {popularIds.length} / 4
        </div>
      </div>

      <div className="grid gap-4">
        {allCourses?.map((course) => (
          <PopularCourseCard
            key={course.id}
            course={course}
            isPopular={popularIds.includes(course.id)}
          />
        ))}
      </div>
    </div>
  );
}
