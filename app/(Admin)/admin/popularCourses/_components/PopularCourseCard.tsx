"use client";

import { Switch } from "@/components/ui/switch";

import { toast } from "sonner";
import { useState } from "react";
import { popularCourseAction } from "@/app/(Actions)/popularCourses/popularCoursesAction";

export function PopularCourseCard({ course, isPopular }: any) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setLoading(true);
    // Not: checked parametresi Switch'in yeni durumunu verir.
    // Bizim action'a mevcut durumu gönderiyoruz (isPopular).
    // Note: The `checked` parameter returns the new state of the Switch. // We send the current state to our action (isPopular).
    const result = await popularCourseAction(course.id, isPopular);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(isPopular ? "Removed from list" : "Added to list");
    }
    setLoading(false);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-xl transition-all ${
        isPopular ? "border-blue-500 bg-blue-50/30" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={course.image_url}
          alt=""
          className="w-16 h-10 object-cover rounded shadow-sm"
        />
        <span className="font-medium text-gray-700">{course.title}</span>
      </div>
      <Switch
        checked={isPopular}
        onCheckedChange={handleToggle}
        disabled={loading}
      />
    </div>
  );
}
