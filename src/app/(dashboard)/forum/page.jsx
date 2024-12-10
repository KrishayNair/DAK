"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { fetchFromAPI } from "@/lib/api";
import CreateForumModal from "./components/CreateForumModal";
import { buildImageUrl } from "@/lib/utils";

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {{id: string, name: string, avatar: string}} author
 * @property {string} content
 * @property {{id: number, image: string}[]} post_images
 * @property {number} likes
 * @property {number} comments
 * @property {string} timeAgo
 * @property {string[]} hashtags
 */

/**
 * @typedef {Object} Hashtag
 * @property {string} id
 * @property {string} tag
 * @property {number} postCount
 */

/**
 * @typedef {Object} FilterOption
 * @property {string} id
 * @property {string} icon
 * @property {string} iconBg
 * @property {string} iconColor
 * @property {string} label
 * @property {string} subtext
 */

// Mock Data (can be replaced with API calls)
const MOCK_FILTERS = [
  {
    id: "newest",
    icon: "✨",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    label: "Newest and recent post",
    subtext: "Find the latest update",
  },
  {
    id: "popular",
    icon: "❤️",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    label: "Popular of the day",
    subtext: "Most liked posts",
  },
  {
    id: "recommended",
    icon: "⭐",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    label: "Recommended for you",
    subtext: "Personalized posts based on your interest",
  },
];

const MOCK_HASHTAGS = [
  { id: "1", tag: "sigma", postCount: 250 },
  { id: "2", tag: "Cooked", postCount: 180 },
  { id: "3", tag: "Gooning", postCount: 120 },
  { id: "4", tag: "Mewing", postCount: 90 },
];

// Hooks
const useHashtags = () => {
  const [hashtags, setHashtags] = React.useState(MOCK_HASHTAGS);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchHashtags = async () => {
    setLoading(true);
    try {
      // Replace this with actual API call
      // const response = await fetch('/api/hashtags');
      // const data = await response.json();
      // setHashtags(data);
      setHashtags(MOCK_HASHTAGS); // Using mock data for now
    } catch (err) {
      setError("Failed to fetch hashtags");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchHashtags();
  }, []);

  return { hashtags, loading, error };
};

// Components
const PopularHashtags = () => {
  const { hashtags, loading, error } = useHashtags();

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-4">
        <p className="text-red-500">Error loading hashtags</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className="font-semibold mb-4">Popular hashtags of the day</h3>
      <div className="h-px bg-gray-200 -mx-4 mb-4"></div>
      <div className="space-y-4">
        {hashtags.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-600">#{item.tag}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {item.postCount} Posts
              </span>
              <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                ⋯
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedFilter = () => {
  const [activeFilter, setActiveFilter] = React.useState("newest");

  return (
    <div className="space-y-2 mb-6">
      {MOCK_FILTERS.map((filter) => (
        <FilterButton
          key={filter.id}
          icon={
            <div
              className={`w-8 h-8 ${filter.iconBg} rounded-lg flex items-center justify-center ${filter.iconColor}`}
            >
              {filter.icon}
            </div>
          }
          label={filter.label}
          subtext={filter.subtext}
          active={activeFilter === filter.id}
          onClick={() => setActiveFilter(filter.id)}
        />
      ))}
    </div>
  );
};

const FilterButton = ({ icon, label, subtext, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
        active ? "bg-white shadow-sm" : "hover:bg-white"
      }`}
    >
      {icon}
      <div className="text-left">
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-gray-500">{subtext}</div>
      </div>
    </button>
  );
};

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Update the endpoint to match your backend API
      const response = await fetchFromAPI("/forum"); // or whatever your actual endpoint is
      if (response?.data) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load forum posts");
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
    setIsCreateModalOpen(false);
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-6xl mx-auto p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Forum Discussions</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create New Post
            </button>
          </div>

          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </main>

        <aside className="w-full lg:w-80">
          <SearchBar />
          <FeedFilter />
          <PopularHashtags />
        </aside>
      </div>

      <CreateForumModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

const CreatePost = ({ onPostCreate }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prev) => [...prev, ...imageFiles]);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
    }
  };

  const handleEmojiClick = (emoji) => {
    setContent((prev) => prev + emoji);
  };

  const handleCreatePost = () => {
    if (!content.trim() && images.length === 0 && !video) return;

    const newPost = {
      id: Date.now(),
      author: "John Doe", // Replace with actual user
      content: content,
      images: images.map((image) => URL.createObjectURL(image)),
      video: video ? URL.createObjectURL(video) : null,
      likes: 0,
      timeAgo: "Just now",
      comments: [],
    };

    onPostCreate(newPost);
    setContent("");
    setImages([]);
    setVideo(null);
    setShowEmojis(false);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideo(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 font-primary">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Let's share what's on your mind..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <button
          onClick={handleCreatePost}
          className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
        >
          Create post
        </button>
      </div>

      {/* Preview Area */}
      {(images.length > 0 || video) && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {video && (
            <div className="relative">
              <video
                src={URL.createObjectURL(video)}
                className="w-full rounded-lg"
                controls
              />
              <button
                onClick={removeVideo}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 mt-4 border-t pt-4">
        <input
          type="file"
          accept="video/*"
          ref={videoInputRef}
          onChange={handleVideoUpload}
          className="hidden"
        />
        <button
          onClick={() => videoInputRef.current?.click()}
          className="flex items-center gap-2 text-gray-500 text-sm hover:text-blue-500"
          disabled={images.length > 0}
        >
          <span>🎥</span> Video
        </button>

        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-gray-500 text-sm hover:text-blue-500"
          disabled={video !== null}
        >
          <span>📷</span> Images
        </button>

        <button
          onClick={() => setShowEmojis(!showEmojis)}
          className="flex items-center gap-2 text-gray-500 text-sm hover:text-blue-500"
        >
          <span>😊</span> Emoji
        </button>
      </div>

      {/* Emoji Picker */}
      {showEmojis && (
        <div className="mt-4 p-2 border rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-8 gap-2">
            {[
              "😊",
              "😂",
              "🥰",
              "😎",
              "🤔",
              "😅",
              "😍",
              "🤩",
              "😢",
              "😤",
              "🥺",
              "😴",
              "🤯",
              "🤪",
              "😇",
              "😈",
            ].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:bg-gray-100 p-2 rounded"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="mb-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-3 bg-white rounded-full border focus:outline-none"
        />
      </div>
    </div>
  );
};

const PostList = () => {
  const posts = [
    {
      id: 1,
      author: "Jons Sena",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
      image: "/path-to-post-image.jpg",
      likes: 45,
      comments: 45,
      timeAgo: "2 days ago",
    },
    // ... more posts
  ];

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

const CommentModal = ({ post, onClose, isLiked, onLike }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "Lorem ipsum dolor sit amet.",
      likes: 1001,
      replies: [],
      likedBy: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const currentUserId = "current-user-id";

  // Renamed from isLiked to checkIsLiked to avoid conflict
  const checkIsLiked = (item) => item.likedBy.includes(currentUserId);

  const handleAddComment = () => {
    if (newComment.trim()) {
      if (replyingTo) {
        setComments(
          comments.map((comment) => {
            if (comment.id === replyingTo.commentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now(),
                    author: "You",
                    content: newComment,
                    likes: 0,
                    likedBy: [],
                    replyingTo: replyingTo.author,
                  },
                ],
              };
            }
            return comment;
          })
        );
        setReplyingTo(null);
      } else {
        setComments([
          ...comments,
          {
            id: Date.now(),
            author: "You",
            content: newComment,
            likes: 0,
            replies: [],
            likedBy: [],
          },
        ]);
      }
      setNewComment("");
    }
  };

  const handleLikeComment = (commentId, isReply, parentCommentId) => {
    setComments(
      comments.map((comment) => {
        if (isReply && comment.id === parentCommentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                const isLiked = reply.likedBy.includes(currentUserId);
                return {
                  ...reply,
                  likes: isLiked ? reply.likes - 1 : reply.likes + 1,
                  likedBy: isLiked
                    ? reply.likedBy.filter((userId) => userId !== currentUserId)
                    : [...reply.likedBy, currentUserId],
                };
              }
              return reply;
            }),
          };
        } else if (comment.id === commentId) {
          const isLiked = comment.likedBy.includes(currentUserId);
          return {
            ...comment,
            likes: isLiked ? comment.likes - 1 : comment.likes + 1,
            likedBy: isLiked
              ? comment.likedBy.filter((userId) => userId !== currentUserId)
              : [...comment.likedBy, currentUserId],
          };
        }
        return comment;
      })
    );
  };

  const handleReply = (commentId, author) => {
    setReplyingTo({ commentId, author });
    setNewComment(`@${author} `);
  };

  const handleLikePost = () => {
    if (postLiked) {
      setPostLikes(postLikes - 1);
    } else {
      setPostLikes(postLikes + 1);
    }
    setPostLiked(!postLiked);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-4xl flex relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-500 hover:text-gray-700 hover:border-gray-500 transition-colors"
        >
          ✖️
        </button>

        {/* Left side - Post Images/Video */}
        <div className="w-1/2 pr-4">
          {post.video ? (
            <video
              src={post.video}
              className="w-full h-full rounded-lg"
              controls
            />
          ) : post.images && post.images.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              No media
            </div>
          )}
        </div>

        {/* Right side - Comments Section */}
        <div className="w-1/2 pl-4 flex flex-col">
          {/* Profile Info and Caption */}
          <div className="border-b pb-3 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.author}</span>
                <span className="text-gray-400 text-sm">�� {post.timeAgo}</span>
              </div>
            </div>
            <p className="text-gray-800 mb-2">{post.content}</p>
            <div className="text-gray-400 text-sm">
              #Loremipsum #dolorsitamet, #consectetur
            </div>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <span className="font-semibold text-sm">
                      {comment.author}
                    </span>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                  </div>
                </div>
                <div className="flex gap-4 ml-10 text-xs text-gray-500">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`hover:text-blue-500 ${
                      checkIsLiked(comment) ? "text-blue-500" : ""
                    }`}
                  >
                    {checkIsLiked(comment) ? "❤️" : "🤍"} {comment.likes}
                  </button>
                  <button
                    onClick={() => handleReply(comment.id, comment.author)}
                    className="hover:text-blue-500"
                  >
                    Reply
                  </button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-10 mt-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                          <div>
                            <span className="font-semibold text-sm">
                              {reply.author}
                            </span>
                            <p className="text-gray-700 text-sm">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4 ml-8 text-xs text-gray-500">
                          <button
                            onClick={() =>
                              handleLikeComment(reply.id, true, comment.id)
                            }
                            className={`hover:text-blue-500 ${
                              checkIsLiked(reply) ? "text-blue-500" : ""
                            }`}
                          >
                            {checkIsLiked(reply) ? "❤️" : "🤍"} {reply.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Like, Comment, Share Buttons */}
          <div className="flex gap-6 text-gray-500 text-sm mb-2 pt-4 border-t">
            <button
              onClick={onLike}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? "text-blue-500" : "hover:text-blue-500"
              }`}
            >
              {isLiked ? "❤️" : "🤍"} {post.likes} Like
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600">
              <span>💬</span> Comment
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600">
              <span>↗️</span> Share
            </button>
          </div>

          {/* Comment Input */}
          <div className="flex items-center gap-2 pt-2">
            <span>😊</span>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyingTo ? "Write a reply..." : "Add your comment"}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              {replyingTo ? "Reply" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostItem = ({ post, onLikeChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;
    setLikeCount(newLikeCount);
    onLikeChange?.(post.id, newIsLiked, newLikeCount);
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4 mb-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.author}</span>
            <span className="text-gray-400 text-sm">• {post.timeAgo}</span>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-800 mb-2">{post.content}</p>

        {/* Images */}
        {post.post_images && post.post_images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {post.post_images.map((image, index) => (
              <img
                key={index}
                src={buildImageUrl(image.image)}
                alt={`Post image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-6 text-gray-500">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 ${
              isLiked ? "text-blue-500" : "hover:text-gray-700"
            }`}
          >
            <span>{isLiked ? "❤️" : "🤍"}</span> {likeCount} Like
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 hover:text-gray-700"
          >
            <span>💬</span> Comment
          </button>
          <button className="flex items-center gap-2 hover:text-gray-700">
            <span>↗️</span> Share
          </button>
        </div>
      </div>

      {showModal && (
        <CommentModal
          post={{ ...post, likes: likeCount }}
          onClose={() => setShowModal(false)}
          isLiked={isLiked}
          onLike={handleLike}
        />
      )}
    </>
  );
};

const CategoryList = () => {
  const categories = [
    { icon: "��", label: "Feed", count: 12 },
    { icon: "📅", label: "Events", count: 3 },
    { icon: "📢", label: "Announcement", count: 2 },
  ];

  return (
    <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      {categories.map((item) => (
        <button
          key={item.label}
          className={`w-full flex items-center gap-3 py-3 px-4 hover:bg-gray-50 rounded-lg mb-2 last:mb-0 transition-colors duration-200 ${
            item.label === "Feed" ? "bg-blue-50 text-blue-700" : "text-gray-700"
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="font-medium">{item.label}</span>
          <span className="ml-auto text-sm bg-gray-100 px-2 py-0.5 rounded-full">
            {item.count}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default ForumPage;
