"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

// Add this new component for the comment section
const CommentSection = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-12 border-t border-gray-200">
      {/* Publication info */}
      <div className="mt-8 mb-12">
        <div className="flex items-center mb-4">
          <img
            src="/postaloffice.png"
            alt="Publication logo"
            className="w-10 h-10 rounded mr-3"
          />
          <div>
            <h3 className="font-medium text-lg">
              Published in Practice in Public
            </h3>
            <p className="text-gray-600 text-sm">
              16.8K Followers · Last published 2 hours ago
            </p>
          </div>
          <button className="ml-auto bg-black text-white px-4 py-1 rounded-full hover:bg-gray-800">
            Follow
          </button>
        </div>
        <p className="text-gray-700">
          If you want to become a better writer, you have to hit the publish
          button. Notes and drafts don't count. Practice in public helps writers
          get off the sidelines and turn pro.
        </p>
      </div>

      {/* Author info */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center">
          <img
            src="/postaloffice.png"
            alt="Author avatar"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">Written by Victor Zexi He</h3>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span>1.3K Followers</span>
              <span className="mx-1">·</span>
              <span>69 Following</span>
            </div>
            <p className="text-sm text-gray-700 mt-1">
              Aspiring Writer. Medical Student. Life-Long Learner. Support me
              here!
            </p>
            <Link
              href="https://www.buymeacoffee.com/victorzexihe"
              className="text-green-600 text-sm hover:text-green-700"
              target="_blank"
            >
              https://www.buymeacoffee.com/victorzexihe
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-800">
            Follow
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
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
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Update the main BlogPost component to include the comment section
export default function BlogPost() {
  const { slug } = useParams();

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose lg:prose-xl">
          {/* Author info */}
          <div className="flex items-center mb-8">
            <img
              src="/postaloffice.png"
              alt="Author"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-medium">Author Name</h3>
              <div className="text-gray-600">
                <span>May 20th · 5 min read</span>
              </div>
            </div>
          </div>

          {/* Article content */}
          <h1 className="text-4xl font-bold mb-4">Long Established {slug}</h1>

          <div className="mb-8">
            <img
              src="/collage.png"
              alt="Article hero image"
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          <div className="text-gray-800">
            <p className="mb-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters.
            </p>

            <p className="mb-4">
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy.
            </p>

            <h2 className="text-2xl font-bold my-4">
              The standard Lorem Ipsum passage
            </h2>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Interaction buttons */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <svg
                  className="w-6 h-6"
                  fill="none"
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
                <span>2.4K</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <svg
                  className="w-6 h-6"
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
                <span>125</span>
              </button>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              <svg
                className="w-6 h-6"
                fill="none"
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
        </article>
      </div>
      <CommentSection />
    </>
  );
}
