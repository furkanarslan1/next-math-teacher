import Hero from "@/components/hero/Hero";
import Image from "next/image";
import Discount_banner from "./_components/Discount_banner";

export default function Home() {
  return (
    <main className="space-y-6">
      <Hero />
      <Discount_banner />
    </main>
  );
}
