"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { useEffect } from "react";
import { categorySchema, CategorySchema } from "@/schemas/category-schema";
import { createCategoryAction } from "@/app/(Actions)/categories/createCategoryAction";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function CreateCategoryForm() {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "" },
  });

  const name = form.watch("name");
  useEffect(() => {
    if (name) {
      form.setValue(
        "slug",
        slugify(name, { lower: true, strict: true, locale: "tr" })
      );
    }
  }, [name, form]);

  async function onSubmit(values: CategorySchema) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("slug", values.slug);

    const result = await createCategoryAction(formData);
    if (result.error) toast.error(result.error);
    else {
      toast.success("Category added successfully!");
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 border rounded-lg"
      >
        <h3 className="font-bold">Add New Category</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} readOnly className="bg-muted text-xs" />
              </FormControl>
            </FormItem>
          )}
        /> */}
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}
