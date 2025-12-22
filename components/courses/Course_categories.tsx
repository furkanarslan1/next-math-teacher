"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryType {
  id: number;
  name: string;
  slug: string;
}

const categories = [
  { id: "1", name: "math elementary", slug: "math-elementary" },
  { id: "2", name: "math middle", slug: "math-middle" },
  { id: "3", name: "math high", slug: "math-high" },
];

export default function Course_categories({
  categories,
}: {
  categories: CategoryType[];
}) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (value: string | null) => {
    //URL de ki mevcut query i alma
    //Get existing quearies in the URL
    const params = new URLSearchParams(searchParams);

    //category parametresini ayarlama
    //set the category parameter
    params.set("category", value || "all");

    //URL i güncelleme
    //Update the URL
    router.push(`${pathname} ?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-4 text-sm">
      <Swiper spaceBetween={9} slidesPerView={"auto"} freeMode>
        {/* ALL */}
        <SwiperSlide style={{ width: "auto" }}>
          <div
            onClick={() => handleChange("all")}
            className={`px-4 py-2 rounded-md cursor-pointer text-sm ${
              !selectedCategory || selectedCategory === "all"
                ? "bg-white"
                : "bg-gray-200"
            }`}
          >
            All
          </div>
        </SwiperSlide>
        {categories.map((cat) => (
          <SwiperSlide key={cat.id} style={{ width: "auto" }}>
            <div
              onClick={() => handleChange(cat.slug)}
              className={`px-4 py-2 rounded-md cursor-pointer text-sm ${
                cat.slug === selectedCategory ? "bg-white" : "bg-gray-200"
              }`}
            >
              {cat.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
