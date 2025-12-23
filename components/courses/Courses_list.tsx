import React from "react";
import Course_categories from "./Course_categories";
import { CategoryType } from "@/types/CategoryType";
import Link from "next/link";

const categories: CategoryType[] = [
  { id: 1, name: "math elementary", slug: "math-elementary" },
  { id: 2, name: "math middle", slug: "math-middle" },
  { id: 3, name: "math high", slug: "math-high" },
];

const courses = [
  {
    id: 1,
    title: "Math LGS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 199,
    image: "/hero-1.jpg",
  },
  {
    id: 2,
    title: "Math SBS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 139,
    image: "/hero-1.jpg",
  },
  {
    id: 3,
    title: "Math YKS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 169,
    image: "/hero-1.jpg",
  },
  {
    id: 4,
    title: "Math OSS Course",
    shortDescription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolores. Eaque consectetur eum impedit, nihil sunt consequuntur voluptate et quod. Ullam neque assumenda exercitationem ut eveniet labore reprehenderit incidunt.",
    price: 299,
    image: "/hero-1.jpg",
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
    <>
      <Course_categories categories={categories} />
      {/* {params === "courses" && <Filter />} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </>
  );
}
