"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/lib/api";

const ForumPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchFromAPI(`services/forums/${slug}/`);
        if (data.success) {
          setPost(data.data);
          setComments(data.data.comments || []);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>;
  }

  if (!post) {
    return <div className="max-w-4xl mx-auto px-4 py-8">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Author info */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
          <div>
            <h3 className="font-medium">Author #{post.user}</h3>
            <div className="text-gray-600 text-sm">
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Post content */}
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-800 mb-4">{post.content}</p>

        {post.image && (
          <img
            src={post.image}
            alt="Post image"
            className="w-full rounded-lg mb-4"
          />
        )}

        {/* Hashtags */}
        {post.hashtags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.hashtags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Comments section */}
        <div className="mt-8 border-t pt-4">
          <h3 className="font-medium mb-4">Comments</h3>
          {comments.map((comment, index) => (
            <div key={index} className="mb-4 pl-4 border-l-2">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-2" />
                <div>
                  <div className="font-medium text-sm">
                    User #{comment.user}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumPost;
