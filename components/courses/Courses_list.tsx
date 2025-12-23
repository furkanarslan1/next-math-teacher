import React from "react";
import Course_categories from "./Course_categories";
import { CategoryType } from "@/types/CategoryType";
import Link from "next/link";
import Course_card from "./Course_card";
import { CourseType } from "@/types/CourseType";

const categories: CategoryType[] = [
  { id: 1, name: "math elementary", slug: "math-elementary" },
  { id: 2, name: "math middle", slug: "math-middle" },
  { id: 3, name: "math high", slug: "math-high" },
];

const courses: CourseType[] = [
  {
    id: 1,
    title: "Math LGS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 199,
    image: "/hero-image.jpg",
    slug: "lorem1",
  },
  {
    id: 2,
    title: "Math SBS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 139,
    image: "/hero-1.jpg",
    slug: "lorem2",
  },
  {
    id: 3,
    title: "Math YKS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 169,
    image: "/hero-last.jpg",
    slug: "lorem3",
  },
  {
    id: 4,
    title: "Math OSS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 299,
    image: "/math-hero.jpg",
    slug: "lorem4",
  },
];

export default function Courses_list({
  category,
  params,
}: {
  category: string;
  params: "home" | "courses";
}) {
  return (
    <div className="max-w-6xl mx-auto ">
      <Course_categories categories={categories} />
      {/* {params === "courses" && <Filter />} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 ">
        {courses.map((course) => (
          <Course_card key={course.id} course={course} />
        ))}
      </div>
      <Link
        href={category ? `/courses/?category=${category}` : "/courses"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        View All Courses
      </Link>
    </div>
  );
}
