"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postDataToAPI } from "@/lib/api";
import { toFormData } from "axios";

const forumSchema = z.object({
  content: z.string().min(1, "Content is required"),
  uploaded_images: z
    .any()
    .refine((val) => {
      if (typeof window === 'undefined') return true;
      return val instanceof FileList;
    }, "Invalid file list")
    .transform((list) => {
      if (typeof window === 'undefined') return [];
      return Array.from(list);
    })
    .refine(
      (files) => files.every((file) => file.size <= 5000000),
      "Each file must be less than 5MB"
    )
    .refine(
      (files) =>
        files.every((file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          )
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
    .optional()
    .nullable(),
});

export default function CreateForum({ onSuccess }) {
  const form = useForm({
    resolver: zodResolver(forumSchema),
    defaultValues: {
      content: "",
      uploaded_images: null,
    },
  });

  async function onSubmit(data) {
    try {
      // Send the request with multipart/form-data
      const response = await postDataToAPI("forum/", toFormData(data), true);

      if (response?.success) {
        form.reset();
        // Clear image previews
        form.setValue("uploaded_images", null);
        onSuccess && onSuccess(response.data);
      } else {
        throw new Error(response?.message || "Failed to create forum post");
      }
    } catch (error) {
      console.error("Create forum error:", error);
      if (error.response?.data) {
        // Handle specific backend validation errors
        const backendErrors = error.response.data;
        Object.keys(backendErrors).forEach((key) => {
          form.setError(key, {
            type: "backend",
            message: backendErrors[key].join(", "),
          });
        });
      } else {
        alert(error.message || "Failed to create forum post");
      }
    }
  }

  // Function to handle image preview removal
  const handleRemoveImage = (index) => {
    const currentFiles = form.watch("uploaded_images");
    if (currentFiles) {
      const newFiles = Array.from(currentFiles).filter((_, i) => i !== index);

      // Create a new FileList-like object
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => {
        dataTransfer.items.add(file);
      });

      form.setValue("uploaded_images", dataTransfer.files);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What&apos;s on your mind?</FormLabel>
              <FormControl>
                <textarea
                  className="w-full p-4 border rounded-lg min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your thoughts about stamps, collections, or ask a question..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uploaded_images"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Images (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files?.length > 0) {
                      onChange(files);
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-500">
                You can upload multiple images. Each image must be less than
                5MB. Supported formats: JPG, PNG, WebP
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Preview Section */}
        {form.watch("uploaded_images") && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {Array.from(form.watch("uploaded_images") || []).map(
              (file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )
            )}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
