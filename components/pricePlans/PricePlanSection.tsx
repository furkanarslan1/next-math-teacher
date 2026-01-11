"use client";
import { PricePlanFormValues } from "@/schemas/pricePlansSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function PricePlanSection({
  plans,
}: {
  plans: PricePlanFormValues[];
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  // URL'den kategoriyi oku, yoksa varsayılan 'single' yap
  // Read the category from the URL, otherwise set the default to 'single'.
  const currentCategory = searchParams.get("planCat") || "single";

  const handleTabChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("planCat", category);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredPlans = plans.filter((p) => p.category === currentCategory);
  return (
    <div className="">
      <div className="flex gap-4 justify-center mb-8">
        {["single", "group_4", "group_6"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleTabChange(cat)}
            className={`px-4 py-2 rounded-xl border ${
              currentCategory === cat
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {cat.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {filteredPlans.map((plan, index) => {
          const hasDiscount = plan.discount_rate > 0;
          const discountedPrice = hasDiscount
            ? plan.price - (plan.price * plan.discount_rate) / 100
            : plan.price;

          return (
            <div
              key={index}
              className="p-6 border rounded-3xl space-y-1 bg-linear-to-br from-gray-900 to-gray-600 relative"
            >
              {/* BADGE */}
              {hasDiscount && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-lg px-2 py-1 rounded-lg font-bold">
                  %{plan.discount_rate} OFF
                </div>
              )}

              {/* TITLE */}
              <h2 className="text-xl font-bold text-white border-b-2 border-white pb-1">
                {plan.title}
              </h2>

              {/* FEATURES */}
              <div className="p-4">
                <ul className="flex flex-col gap-2 list-disc text-sm text-slate-300">
                  {plan.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* PRICE AND BUY */}
              <div className="pt-2">
                {hasDiscount ? (
                  <div className="flex flex-col">
                    {/* Eski Fiyat  */}
                    {/* Old Price  */}
                    <span className="text-slate-400 line-through text-xs">
                      ${plan.price}
                    </span>
                    {/* Yeni Fiyat */}
                    {/*New Price */}
                    <p className="text-white font-bold text-2xl">
                      ${discountedPrice}
                    </p>
                  </div>
                ) : (
                  /* İndirim yoksa sadece normal fiyat */
                  /* No discount, only standard price */
                  <p className="text-white font-bold text-2xl">${plan.price}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
