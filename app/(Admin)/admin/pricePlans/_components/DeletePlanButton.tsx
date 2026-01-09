"use client";
import { deletePricePlan } from "@/app/(Actions)/pricePlan/pricePlansAction";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default async function DeletePlanButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    setIsDeleting(true);
    try {
      const result = await deletePricePlan(id);
      if (result.success) {
        toast.success("Price Plan deleted");
      } else {
        toast.error("Hata: " + result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
    >
      <Trash2 size={20} />
    </button>
  );
}
