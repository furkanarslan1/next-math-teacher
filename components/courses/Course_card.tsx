import { CourseType } from "@/types/CourseType";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Course_card({ course }: { course: CourseType }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="flex flex-col w-full   gap-2 border border-gray-200 bg-gray-200 shadow-md rounded-2xl pb-2 hover:scale-105 transition-all duration-300"
    >
      <div className="relative h-46 w-full">
        <Image
          src={course.image_url}
          alt={course.title}
          fill
          className="object-cover object-center rounded-t-2xl "
        />
      </div>
      <div className="flex flex-col gap-2 items-center px-2">
        <h1 className="font-bold ">{course.title}</h1>
        <p className="text-sm text-gray-500 ">
          {course.short_description.length > 60
            ? course.short_description.slice(0, 60) + "..."
            : course.short_description}
        </p>
        <div className="flex items-center justify-between w-full px-4">
          <p className="text-sm bg-green-500 rounded-lg px-2 font-bold text-white">
            ${course.price}
          </p>
          <ArrowRight />
        </div>
      </div>
    </Link>
  );
}
