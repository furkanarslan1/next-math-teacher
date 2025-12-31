import Features_banner from "@/app/(Main)/_components/Features_banner";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BookOpen, Lightbulb, Award } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative h-150 lg:h-200">
      <Image
        src="/deneme.jpg"
        alt="math-hero"
        className="object-cover object-center "
        fill
      />
      <div className="absolute inset-0 bg-black/50 "></div>
      {/* SLOGAN */}
      <div className="absolute h-full w-full flex items-end px-2 pb-4 md:pb-0 lg:items-center    lg:ms-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl font-bold">
            How about learning math easily together with me?
          </h1>
          <div className="bg-white/40 p-4 rounded-lg backdrop-blur-sm flex flex-col gap-2 w-fit px-4">
            <p className="border-b-2 border-gray-800 w-fit">
              {" "}
              My super methods
            </p>
            <ul className="list-disc ">
              <li className="flex items-center gap-2">
                <BookOpen />
                <span> Fun and easy-to-understand explanation.</span>
              </li>
              <li className="flex items-center gap-2">
                <Lightbulb />
                <span> No memorization — real learning</span>
              </li>
              <li className="flex items-center gap-2">
                <Award />
                <span> You’ll succeed in exams in a short time.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* FEATURES */}
      <div className="md:absolute h-full w-full flex items-end pb-4">
        <Features_banner />
      </div>
    </div>
  );
}
