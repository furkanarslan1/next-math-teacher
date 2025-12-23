import Courses_list from "@/components/courses/Courses_list";
import Image from "next/image";
import React from "react";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  return (
    <div>
      <div className=" relative h-26 w-ful mb-8 ">
        <Image
          src="/math-hero.jpg"
          alt="course-hero"
          className="object-cover"
          fill
        />
        <div className="absolute inset-0 bg-black/40 "></div>
      </div>
      <section className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Courses_list category={category} params="courses" />
      </section>
    </div>
  );
}
