"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { fetchFromAPI, postDataToAPI } from "@/lib/api";
import { z } from "zod";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

// Add this schema near the top of the file
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

// Create Blog Modal Component
const CreateBlogModal = ({ isOpen, onClose, onBlogCreated }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    read_time: 0,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateForm = () => {
    try {
      blogSchema.parse({
        title: formData.title,
        description: formData.description,
        content: formData.content,
        read_time: Number(formData.read_time),
        image: formData.image,
      });
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("content", formData.content);
      formDataToSend.append("read_time", parseInt(formData.read_time) || 0);
      formDataToSend.append("slug", slug);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await postDataToAPI("services/blogs/", formDataToSend);
      console.log("Response:", response);
      if (response?.error) {
        throw new Error(response.error);
      }

      const blogData = response.data || response;
      setFormData({
        title: "",
        description: "",
        content: "",
        read_time: 0,
        image: null,
      });
      onBlogCreated(blogData);
      onClose();
    } catch (error) {
      console.error("Create blog error:", error);
      setError(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Failed to create blog. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header - fixed at top */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Create New Blog Post</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                required
                className={`mt-1 block w-full rounded-md border ${
                  validationErrors.title ? "border-red-500" : "border-gray-300"
                } px-3 py-2`}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <ValidationError error={validationErrors.title} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                required
                className={`mt-1 block w-full rounded-md border ${
                  validationErrors.description
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2`}
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <ValidationError error={validationErrors.description} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div
                className={`mt-1 ${
                  validationErrors.content
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, content }))
                  }
                  modules={modules}
                  formats={formats}
                  className="h-64 mb-12"
                />
              </div>
              <ValidationError error={validationErrors.content} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Read Time (minutes)
              </label>
              <input
                type="number"
                required
                min="0"
                className={`mt-1 block w-full rounded-md border ${
                  validationErrors.read_time
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2`}
                value={formData.read_time}
                onChange={(e) =>
                  setFormData({ ...formData, read_time: e.target.value })
                }
              />
              <ValidationError error={validationErrors.read_time} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </div>
          </div>
        </div>

        {/* Footer - fixed at bottom */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Creating..." : "Create Blog Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ArticleCard component
const ArticleCard = ({ blog = {} }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount] = useState(2400);
  const [commentCount] = useState(125);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Safely access blog properties with optional chaining
  const formattedDate = blog?.published_date
    ? new Date(blog.published_date).toLocaleDateString()
    : "Recently published";

  const authorName = blog?.user?.name || blog?.user?.username || "Anonymous";

  if (!blog) {
    return null;
  }

  return (
    <article className="mb-8 border-b border-gray-200 pb-8">
      <div className="flex items-start mb-4">
        <img
          src={blog?.user?.profile_image || "/postaloffice.png"}
          alt={authorName}
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <p className="font-medium">{authorName}</p>
          <p className="text-sm text-gray-600">
            {formattedDate} · {blog?.read_time || "5"} min read
          </p>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Link href={`/blog/${blog?.slug || "#"}`} className="group">
            <h2 className="text-xl font-bold mb-2 group-hover:text-gray-700">
              {blog?.title || "Untitled Post"}
            </h2>
            <p className="text-gray-600 mb-4">
              {blog?.description || "No description available"}
            </p>
          </Link>

          <div className="flex items-center justify-between mt-4 pr-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
              >
                <svg
                  className={`w-5 h-5 ${
                    isLiked ? "fill-current text-red-500" : ""
                  }`}
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{(likeCount / 1000).toFixed(1)}K</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <span>{commentCount}</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                className="text-gray-600 hover:text-gray-900"
                title={isSaved ? "Remove from saved" : "Save article"}
              >
                <svg
                  className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                  fill={isSaved ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <Link href={`/blog/${blog?.slug || "#"}`}>
          <img
            src={blog?.image || "/collage.png"}
            alt="Article thumbnail"
            className="w-32 h-32 object-cover ml-4 cursor-pointer"
          />
        </Link>
      </div>
    </article>
  );
};

// BlogListing component
const BlogListing = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetchFromAPI("services/blogs/");
      console.log("Fetched blogs:", response);

      if (response && Array.isArray(response)) {
        // Sort blogs by date, newest first
        const sortedBlogs = response.sort(
          (a, b) => new Date(b.published_date) - new Date(a.published_date)
        );
        setBlogs(sortedBlogs);
      } else if (response && Array.isArray(response.data)) {
        const sortedBlogs = response.data.sort(
          (a, b) => new Date(b.published_date) - new Date(a.published_date)
        );
        setBlogs(sortedBlogs);
      } else {
        console.error("Unexpected API response structure:", response);
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  const handleBlogCreated = (newBlog) => {
    // Only add the blog if it doesn't already exist
    setBlogs((prevBlogs) => {
      const exists = prevBlogs.some((blog) => blog.id === newBlog.id);
      if (exists) {
        return prevBlogs;
      }
      return [newBlog, ...prevBlogs];
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex">
      <div className="w-2/3 pr-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create New Post
          </button>
        </div>

        {blogs && blogs.length > 0 ? (
          blogs.map((blog, index) => <ArticleCard key={index} blog={blog} />)
        ) : (
          <p>No blogs found</p>
        )}
      </div>

      <div className="w-1/3">
        <div className="sticky top-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4 text-gray-800">Staff Picks</h2>
          <div className="mt-8">
            <h2 className="font-bold text-lg mb-4 text-gray-800">
              Recommended topics
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 rounded-full bg-gray-50 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-200 border border-gray-200">
                Stamp Collecting
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-50 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-200 border border-gray-200">
                Postal History
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-50 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-200 border border-gray-200">
                Rare Stamps
              </span>
            </div>
          </div>
        </div>
      </div>

      <CreateBlogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onBlogCreated={handleBlogCreated}
      />
    </div>
  );
};

// Main BlogPage component
const BlogPage = () => {
  return (
    <div>
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between p-8 max-w-7xl mx-auto">
          <div>
            <h1 className="text-6xl font-bold text-gray-800">
              Discover Rare Stamps
            </h1>
            <p className="mt-2 text-2xl text-gray-600">
              Explore the World of Philately
            </p>
          </div>
          <div className="flex-shrink-0">
            <img src="/blogbanner.png" alt="Stamp Illustration" className="" />
          </div>
        </div>
      </div>

      {/* Blog Listing */}
      <BlogListing />
    </div>
  );
};

// Reusable ValidationError component
const ValidationError = ({ error }) =>
  error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null;

export default BlogPage;
