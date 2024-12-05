"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";

// First we'll create a header component similar to Medium's navigation

// Add this new component for the article card
const ArticleCard = ({ index, slug = `post-${index + 1}` }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(2400);
  const [commentCount, setCommentCount] = useState(125);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <article key={index} className="mb-8 border-b border-gray-200 pb-8">
      <div className="flex items-start mb-4">
        <img
          src="/postaloffice.png"
          alt="Author"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <p className="font-medium">Author Name</p>
          <p className="text-sm text-gray-600">May 20th · 5 min read</p>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Link href={`/blog/${slug}`} className="group">
            <h2 className="text-xl font-bold mb-2 group-hover:text-gray-700">
              Long Established
            </h2>
            <p className="text-gray-600 mb-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
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
                className="text-gray-600 hover:text-gray-900"
                title="More options"
              >
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
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </button>
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

        <Link href={`/blog/${slug}`}>
          <img
            src="/collage.png"
            alt="Article thumbnail"
            className="w-32 h-32 object-cover ml-4 cursor-pointer"
          />
        </Link>
      </div>
    </article>
  );
};

// Main blog listing component
const BlogListing = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex">
      {/* Main content area */}
      <div className="w-2/3 pr-8">
        {[...Array(6)].map((_, index) => (
          <ArticleCard key={index} index={index} />
        ))}
      </div>

      {/* Sidebar */}
      <div className="w-1/3">
        <div className="sticky top-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4 text-gray-800">Staff Picks</h2>
          {/* Add staff picks content */}
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
              <span className="px-4 py-2 rounded-full bg-gray-50 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-200 border border-gray-200">
                First Day Covers
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-50 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-200 border border-gray-200">
                Philatelic Literature
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-50 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-200 border border-gray-200">
                Postal Stationery
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPage = () => {
  return (
    <div>
      {/* Hero Section */}
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
      {/* Existing Blog Listing */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Rest of your existing content */}
        <BlogListing />
      </div>
    </div>
  );
};

export default BlogPage;
