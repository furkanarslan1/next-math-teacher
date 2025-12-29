"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import slugify from "slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema, CourseSchema } from "@/schemas/course-schema";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editCourseAction } from "@/app/(Actions)/courses/editCourseAction";

interface EditCourseFormProps {
  course: any;
  categories: { id: string; name: string }[];
}

export function EditCourseForm({ course, categories }: EditCourseFormProps) {
  const router = useRouter();

  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: {
      title: course?.title || "",
      slug: course?.slug || "",
      price: course?.price || 0,
      is_active: course?.is_active ?? true,
      description: course?.description || "",
      short_description: course?.short_description || "",
      discount_percentage: course?.discount_percentage || 0,
      category_id: course?.course_categories?.[0]?.category_id || "",
      features:
        course?.course_features?.length > 0
          ? course.course_features.map((f: any) => ({ value: f.feature }))
          : [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  // Başlık değişince slug üretmek için olan useEffect
  const title = form.watch("title");
  useEffect(() => {
    if (title && title !== course.title) {
      const slug = slugify(title, { lower: true, strict: true, locale: "tr" });
      form.setValue("slug", slug);
    }
  }, [title, form, course.title]);

  async function onSubmit(values: CourseSchema) {
    const formData = new FormData();
    const fileInput = document.getElementById(
      "course-image-edit"
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) formData.append("image", file);

    formData.append("current_image_url", course.image_url || "");
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("price", values.price.toString());
    formData.append(
      "discount_percentage",
      (values.discount_percentage || 0).toString()
    );
    formData.append("description", values.description || "");
    formData.append("short_description", values.short_description || "");
    formData.append("is_active", values.is_active.toString());
    formData.append("category_id", values.category_id);

    const featuresArray = values.features
      .map((f) => f.value.trim())
      .filter((v) => v !== "");
    formData.append("features", JSON.stringify(featuresArray));

    const result = await editCourseAction(formData, course.id);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("The course has been successfully updated!");
      router.push("/admin/courses");
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 border rounded-xl bg-white shadow-sm"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Course Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-muted" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4 items-end">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount (%)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0 rounded-md border p-2 h-10">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-xs">Active</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>Course Image</FormLabel>
          {course.image_url && (
            <img
              src={course.image_url}
              alt="Current"
              className="mb-2 w-24 h-16 object-cover rounded border"
            />
          )}
          <Input id="course-image-edit" type="file" accept="image/*" />
        </FormItem>

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Description</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Course Features</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ value: "" })}
            >
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`features.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Updating..." : "Update Course"}
        </Button>
      </form>
    </Form>
  );
}
