import React from "react";
import Image from "next/image";

const ForumPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-primary min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">FORUM</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1">
          <PostForm />
          <PostList />
        </main>

        <aside className="w-full lg:w-72">
          <SidebarMenu />
        </aside>
      </div>
    </div>
  );
};

const PostForm = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/path-to-avatar.jpg"
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="font-semibold text-gray-700">Jake William</span>
      </div>
      <textarea
        placeholder="Add your thought"
        className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="flex justify-between items-center">
        <div className="space-x-3">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            📷
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            📎
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            😊
          </button>
        </div>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          POST
        </button>
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

const PostItem = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/path-to-avatar.jpg"
          alt={post.author}
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="font-semibold text-gray-800">{post.author}</span>
        <span className="text-sm text-gray-500 ml-auto">{post.timeAgo}</span>
      </div>
      <p className="mb-4">{post.content}</p>
      {post.image && (
        <Image
          src={post.image}
          alt="Post image"
          width={500}
          height={300}
          className="w-full h-auto rounded-md mb-4"
        />
      )}
      <div className="flex gap-4 text-sm text-gray-500">
        <span>👁 {post.likes}</span>
        <span>💬 {post.comments}</span>
        <span>↗️</span>
      </div>
    </div>
  );
};

const SidebarMenu = () => {
  const menuItems = [
    { icon: "📰", label: "Feed" },
    { icon: "📅", label: "Events" },
    { icon: "📢", label: "Announcement" },
  ];

  return (
    <nav className="bg-white rounded-xl p-4">
      {menuItems.map((item, index) => (
        <button
          key={item.label}
          className={`w-full flex items-center gap-3 py-3 px-4 hover:bg-blue-gray-50 rounded-lg mb-2 last:mb-0 transition text-gray-700 font-medium ${
            index === 0 ? "bg-white" : ""
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.label}</span>
          {index === 0 && (
            <div className="ml-auto w-1 h-6 bg-green-500 rounded-full"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default ForumPage;
