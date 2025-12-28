"use client";

import { deleteCategoryAction } from "@/app/(Actions)/categories/deleteCategoryAction";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface CategorylistProps {
  categories: { id: string; name: string; slug: string }[];
}

export function CategoryDeleteForm({ categories }: CategorylistProps) {
  const handleDelete = async (id: string) => {
    const result = await deleteCategoryAction(id);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Category deleted");
    }
  };

  return (
    <div className="">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories?.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center gap-3 bg-gray-200 p-4 rounded-md"
          >
            <h3 className="font-bold ">{cat.name}</h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full bg-red-600 py-2 rounded-md cursor-pointer hover:bg-red-400 transition-all duration-300">
                  <Trash2 className=" h-4 w-full text-white" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action is irreversible. <strong>"{cat.name}"</strong>{" "}
                    Are you sure you want me to delete it?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(cat.id)}
                    className="bg-destructive cursor-pointer text-destructive-foreground hover:bg-destructive/90"
                  >
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </section>
    </div>
  );
}
