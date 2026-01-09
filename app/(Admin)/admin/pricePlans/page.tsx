import { createServerSupabase } from "@/lib/supabase/server";
import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";
import DeletePlanButton from "./_components/DeletePlanButton";

export default async function AdminPricePlansPage() {
  const supabase = await createServerSupabase();

  const { data: plans } = await supabase.from("price_plans").select("*");

  return (
    <div className="max-w-6xl p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Price Plans</h1>
        <Link
          href="/admin/pricePlans/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Plan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <div
            key={plan.id}
            className="border p-6 rounded-3xl shadow-sm bg-white flex flex-col justify-between"
          >
            <div>
              <p className="font-bold text-xl mb-4">{plan.title}</p>
              <div className="space-y-2 mb-6">
                {plan.features?.map((feat: string, index: number) => (
                  <p
                    key={index}
                    className="text-gray-600 text-sm flex items-center gap-2"
                  >
                    • {feat}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-bold text-lg">{plan.price} TL</span>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/pricePlans/${plan.id}/edit`}
                  className="hover:scale-110 transition"
                >
                  <Edit size={20} className="text-gray-500" />
                </Link>
                <DeletePlanButton id={plan.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
