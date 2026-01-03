import Hero from "@/components/hero/Hero";

import Discount_banner from "./_components/Discount_banner";
import Features_banner from "./_components/Features_banner";
import Courses_list from "@/components/courses/Courses_list";
import Popular_courses from "./_components/Popular_courses";
import Home_comments from "@/components/comments/Home_comments";
import HowLearn_banner from "./_components/howLearn_banner/HowLearn_banner";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; step?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  return (
    <main className="space-y-6">
      <Hero />
      <div className="md:hidden">
        <Features_banner />
      </div>
      <Popular_courses />
      <Discount_banner />
      <Courses_list key={category} category={category} params="home" />
      <HowLearn_banner searchParams={searchParams} />
      <Home_comments />
    </main>
  );
}
