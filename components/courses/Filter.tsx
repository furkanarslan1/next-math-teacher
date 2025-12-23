"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 my-6">
      <span>Short by:</span>
      <select
        name="sort "
        id="sort"
        className="border border-gray-200 rounded-md shadow-md p-1"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="asc">Price:High to Low</option>
        <option value="desc">Price:Low to High</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
