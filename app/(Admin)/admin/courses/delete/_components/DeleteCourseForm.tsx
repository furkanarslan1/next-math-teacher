"use client";

import { deleteCourseAction } from "@/app/(Actions)/courses/deleteCourseAction";
import { toast } from "sonner";
import { Trash2, Edit } from "lucide-react";
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

interface Course {
  id: string;
  title: string;
  price: number;
  image_url: string;
}

export function DeleteCourseForm({ courses }: { courses: Course[] }) {
  const handleDelete = async (id: string) => {
    const result = await deleteCourseAction(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Course deleted.");
    }
  };

  return (
    <div className="grid gap-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-center gap-4">
            <img
              src={course.image_url}
              alt={course.title}
              className="w-16 h-10 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.price} TL</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Edit className="w-4 h-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Course</AlertDialogTitle>
                  <AlertDialogDescription>
                    <strong>{course.title}</strong> Are you sure you want to
                    delete the course?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(course.id)}
                    className="bg-red-600"
                  >
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
