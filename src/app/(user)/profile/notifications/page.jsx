// src/app/(profile)/notification/page.jsx
"use client";
import React, { useState } from "react";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    desktop: false,
    forum: false,
    taggedMessages: false,
    updates: false,
  });

  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Notification Settings
      </h1>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Pop up notification on desktop</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.desktop}
              onChange={() => handleToggle("desktop")}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                notifications.desktop ? "bg-brown-500" : "bg-gray-500"
              }`}
            ></div>
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                notifications.desktop ? "translate-x-5" : "translate-x-1"
              }`}
            ></div>
          </label>
        </div>

        <div className="flex justify-between items-center">
          <span>Turn on all forum notification</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.forum}
              onChange={() => handleToggle("forum")}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                notifications.forum ? "bg-brown-500" : "bg-gray-500"
              }`}
            ></div>
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                notifications.forum ? "translate-x-5" : "translate-x-1"
              }`}
            ></div>
          </label>
        </div>

        <div className="flex justify-between items-center">
          <span>Turn on all tagged messages notification</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.taggedMessages}
              onChange={() => handleToggle("taggedMessages")}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                notifications.taggedMessages ? "bg-brown-500" : "bg-gray-500"
              }`}
            ></div>
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                notifications.taggedMessages ? "translate-x-5" : "translate-x-1"
              }`}
            ></div>
          </label>
        </div>

        <div className="flex justify-between items-center">
          <span>Turn on all update notification</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.updates}
              onChange={() => handleToggle("updates")}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                notifications.updates ? "bg-brown-500" : "bg-gray-500"
              }`}
            ></div>
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                notifications.updates ? "translate-x-5" : "translate-x-1"
              }`}
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
