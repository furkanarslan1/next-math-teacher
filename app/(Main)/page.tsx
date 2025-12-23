import Hero from "@/components/hero/Hero";

import Discount_banner from "./_components/Discount_banner";
import Features_banner from "./_components/Features_banner";
import Courses_list from "@/components/courses/Courses_list";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  return (
    <main className="space-y-6">
      <Hero />
      <Features_banner />
      <Discount_banner />
      <Courses_list category={category} params="home" />
    </main>
  );
}
