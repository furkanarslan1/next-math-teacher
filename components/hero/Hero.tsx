import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="relative h-150 lg:h-200">
      <Image
        src="/math-hero-2.jpg"
        alt="math-hero"
        className="object-cover "
        fill
      />
      <div className="absolute inset-0 bg-black/40 "></div>
      <div className="absolute h-full w-full flex  items-center ps-6 ">
        <div className="flex flex-col items-center gap-4">
          {/* <div className="relative h-80  w-80 border-6 border-white rounded-full shadow-lg">
            <Image
              src="/math-teacher-hero.jpg"
              alt="math-teacher"
              className="object-cover object-left rounded-full"
              fill
            />
          </div> */}
          <div className="relative h-60 w-60 md:h-100 md:w-140">
            <Image
              src="/removed-teacher.png"
              alt="teacher"
              className="object-cover"
              fill
            />
          </div>
          <p className="text-2xl text-white bg-red-600 p-4 rounded-md font-bold">
            Personal Lessons to Help You Master Math!
          </p>
        </div>
      </div>
      <div className="absolute h-full w-full md:flex justify-end items-center pe-8 hidden">
        <div className="flex flex-col gap-8 items-center">
          <div className="border border-slate-300 rounded-lg  px-6 py-2 backdrop-blur-sm text-white ">
            <h3 className="text-center mb-4 border-b-2 border-gray-800">
              Personal Course
            </h3>
            <ul className="list-disc text-sm space-y-4">
              <li className=" ">Personalized Study Plans</li>
              <li className=" ">Focus on New Generation Questions</li>
              <li className=" ">Flexible Scheduling</li>
              <li className=" ">Progress Tracking</li>
              <li className=" ">Exam Strategies & Motivation</li>
            </ul>
          </div>
          <p className="text-4xl text-white font-bold">
            Don't miss out on{" "}
            <span className="bg-red-600 px-4 py-2 rounded-md"> 25%</span> off
            all courses!
          </p>
          <Link
            href="/courses"
            className="px-4 py-2 bg-white rounded-sm shadow-lg text-gray-800 hover:scale-105 transition-all duration-300"
          >
            Register Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
