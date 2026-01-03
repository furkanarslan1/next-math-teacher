import Link from "next/link";
import React from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HowLearn_banner({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const activeStep = (await resolvedSearchParams?.step) || "1";

  return (
    <div className="bg-gray-400 p-4 space-y-4 max-w-6xl mx-auto md:rounded-md">
      <h1 className="text-white font-bold text-3xl">
        How should you learn mathematics?{" "}
      </h1>
      <div className="flex items-center gap-2">
        <Link
          href="?step=1"
          scroll={false}
          className={` text-sm  px-2 py-1 rounded-md font-bold ${
            activeStep === "1" ? "bg-gray-200 text-black" : "text-white"
          }`}
        >
          {" "}
          Step 1
        </Link>
        <Link
          href="?step=2"
          scroll={false}
          className={` text-sm px-2 py-1 rounded-md font-bold ${
            activeStep === "2" ? "bg-gray-200 text-black" : "text-white"
          }`}
        >
          {" "}
          Step 2
        </Link>
        <Link
          href="?step=3"
          scroll={false}
          className={` text-sm  px-2 py-1 rounded-md font-bold ${
            activeStep === "3" ? "bg-gray-200 text-black" : "text-white"
          }`}
        >
          {" "}
          Step 3
        </Link>
      </div>
      <div className="p-4 bg-white/80 rounded-md shadow-md">
        {activeStep === "1" && <StepOne />}
        {activeStep === "2" && <StepTwo />}
        {activeStep === "3" && <StepThree />}
      </div>
    </div>
  );
}
