"use client";
import {
  createPricePlan,
  updatePricePlan,
} from "@/app/(Actions)/pricePlan/pricePlansAction";
import {
  PricePlanFormValues,
  pricePlansSchema,
} from "@/schemas/pricePlansSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "single", label: "Individual (1 Person)" },
  { id: "group_4", label: "Small Group (4 People)" },
  { id: "group_6", label: "Large Group (6 People)" },
];

interface AddPricePlanFormProps {
  initialData?: PricePlanFormValues & { id: string }; // Edit için opsiyonel veri
}

export default function AddPricePlanForm({
  initialData,
}: AddPricePlanFormProps) {
  const isEditMode = !!initialData; // If initial data exists, we are in editing mode. // initialData varsa edit modundayız
  const router = useRouter();
  const form = useForm<PricePlanFormValues>({
    resolver: zodResolver(pricePlansSchema) as any,
    defaultValues: initialData || {
      title: "",
      category: "single",
      price: 0,
      discount_rate: 0,
      features: [""],
      is_active: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features" as never,
  });

  const onSubmit = async (data: PricePlanFormValues) => {
    if (isEditMode) {
      await updatePricePlan(initialData.id, data);
      toast.success("Plan updated!");
    } else {
      try {
        const result = await createPricePlan(data);

        if (result.success) {
          toast.success("Plan created successfully!");
          router.push("/admin/pricePlans");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {}
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 bg-white p-8 rounded-[32px] shadow-sm border"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-700">Plan Title</label>
          <input
            {...form.register("title")}
            className="p-3 border rounded-xl outline-none focus:ring-2 ring-blue-500"
            placeholder="e.g., Premium Math Pack"
          />
          {form.formState.errors.title && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.title.message}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-700">Class Type</label>
          <select {...form.register("category")}>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-700">Base Price ($)</label>
          <input
            type="number"
            {...form.register("price")}
            className="p-3 border rounded-xl outline-none focus:ring-2 ring-blue-500"
          />
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-700">
            Discount Rate (%)
          </label>
          <input
            type="number"
            {...form.register("discount_rate")}
            className="p-3 border rounded-xl outline-none focus:ring-2 ring-blue-500"
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="font-semibold text-slate-700">Plan Features</label>
          <button
            type="button"
            onClick={() => append("")}
            className="flex items-center gap-2 text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition"
          >
            <Plus size={16} /> Add Feature
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...form.register(`features.${index}` as const)}
                className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 ring-blue-500"
                placeholder={`Feature ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          {form.formState.errors.features && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.features.message}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition"
      >
        {isEditMode ? "Update Plan" : "Create Plan"}
      </button>
    </form>
  );
}
