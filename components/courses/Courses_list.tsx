import React from "react";
import Course_categories from "./Course_categories";
import { CategoryType } from "@/types/CategoryType";
import Link from "next/link";
import Course_card from "./Course_card";
import { CourseType } from "@/types/CourseType";
import Filter from "./Filter";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function Courses_list({
  category,
  params,
}: {
  category: string;
  params: "home" | "courses";
}) {
  const supabase = await createServerSupabase();

  //get a categories from supabase
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id,name,slug");

  let query = supabase
    .from("courses")
    .select("*, course_categories!inner(categories!inner(slug))")
    .eq("is_active", true);

  // Eğer bir kategori filtresi varsa sorguya ekle
  // If there is a category filter, add it to the query.
  if (category && category !== "all") {
    query = query.eq("course_categories.categories.slug", category);
  }

  // Ana sayfadaysak sadece 4-6 tane göster, kurslar sayfasındaysak hepsini
  // Show only 4-6 if we're on the homepage, show all if we're on the courses page
  if (params === "home") {
    query = query.limit(6);
  }

  const { data: coursesData, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    console.error("Courses fetch error:", error.message);
  }
  return (
    <div className="max-w-6xl mx-auto ">
      <Course_categories categories={categoriesData || []} />
      {params === "courses" && <Filter />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 ">
        {coursesData && coursesData.length > 0 ? (
          coursesData.map((course: CourseType) => (
            <Course_card key={course.id} course={course} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No courses found in this category.
          </p>
        )}
      </div>
      {params === "home" && (
        <Link
          href={category ? `/courses/?category=${category}` : "/courses"}
          className="flex justify-end mt-4 underline text-sm text-gray-500"
        >
          View All Courses
        </Link>
      )}
    </div>
  );
}
