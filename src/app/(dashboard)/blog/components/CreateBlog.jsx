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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postDataToAPI } from "@/lib/api";
import { toFormData } from "axios";

const blogSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must be less than 200 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    content: z.string().min(1, "Content is required"),
    read_time: z.number().min(0, "Read time cannot be negative"),
    image: z
        .instanceof(File)
        .refine(
            (file) => file?.size <= 5000000,
            "File size should be less than 5MB"
        )
        .refine(
            (file) =>
                ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                    file?.type
                ),
            "Only .jpg, .jpeg, .png and .webp formats are supported"
        )
        .optional()
        .nullable(),
});

export default function CreateBlog() {

    const form = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            read_time: 0,
            image: null,
        },
    });

    async function onSubmit(data) {

        data["slug"] = data.title.toLowerCase().replace(/ /g, "-");

        const formData = toFormData(data);
        const res = await postDataToAPI("services/blogs/", formData, true);

        if (res.success) {
            alert("Blog created successfully");
        } else {
            alert("Failed to create blog : " + res.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Blog title" {...field} />
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Blog description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Write your blog content here..."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="read_time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Read Time (minutes)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Estimated read time"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cover Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Create Blog</Button>
            </form>
        </Form>
    )

}