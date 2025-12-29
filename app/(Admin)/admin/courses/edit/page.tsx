import { createServerSupabase } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function CourseEditPage() {
  const supabase = await createServerSupabase();
  const { data: courses } = await supabase
    .from("courses")
    .select("id,title,image_url")
    .order("created_at", { ascending: false });
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-4 gap-4">
        {courses &&
          courses.map((course) => (
            <Link href={`/admin/courses/edit${course.id}`} key={course.id}>
              <div className="h-20 w-full">
                <Image
                  src={course.image_url}
                  alt={course.title}
                  className="object-cover"
                  fill
                />
              </div>
              <h3>{course.title}</h3>
            </Link>
          ))}
      </div>
    </div>
  );
}
