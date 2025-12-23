import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Discount_banner() {
  return (
    <div className="relative h-120 lg:h-120">
      <Image
        src="/math-hero-2.jpg"
        alt="math-hero"
        className="object-cover "
        fill
      />
      <div className="absolute inset-0 bg-black/60 "></div>
      <div className="flex flex-col md:flex-row gap-8 items-center absolute ">
        <div className="relative h-60 w-60 md:h-110 lg:w-140">
          <Image
            src="/removed-teacher.png"
            alt="teacher"
            className="object-cover"
            fill
          />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center ">
          <p className="text-4xl text-white font-bold">
            Don't miss out on{" "}
            <span className="bg-red-600 px-4 py-0.5 md:py-2 rounded-md">
              {" "}
              25%
            </span>{" "}
            off all courses!
          </p>
          <Link
            href="/courses"
            className="px-4 py-2 bg-white rounded-sm shadow-lg text-gray-800 hover:scale-105 transition-all duration-300 w-fit "
          >
            Register Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
