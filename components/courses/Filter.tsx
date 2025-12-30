"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentSort = searchParams.get("sort") || "newest";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    router.refresh();
  };
  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 my-6">
      <span>Short by:</span>
      <select
        name="sort "
        id="sort"
        value={currentSort}
        className="border border-gray-200 rounded-md shadow-md p-1"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="desc">Price: High to Low</option>
        <option value="asc">Price: Low to High</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
