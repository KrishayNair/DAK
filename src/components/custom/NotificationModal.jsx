"use client";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { BsReply } from "react-icons/bs";

export default function NotificationModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("View all");

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications"); // Adjust the endpoint
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-10" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl w-full max-w-md mx-4 overflow-hidden shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white-400 hover:text-gray-600"
        >
          <IoMdClose className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-4">
          <h2 className="text-lg mb-4">Notifications</h2>

          {/* Tabs */}
          <div className="flex space-x-8 border-b text-sm">
            {["View all", "Personal", "Government"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 ${
                  activeTab === tab
                    ? "border-b-2 border-gray-900 text-gray-900"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[800px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-2 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    {!notification.read && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    {notification.image && (
                      <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                        <img
                          src={notification.image}
                          alt=""
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="text-sm font-medium">
                          {notification.price}
                        </span>
                      </div>
                    )}
                    {notification.subMessage && (
                      <p className="text-sm text-blue-600 mt-1 cursor-pointer">
                        {notification.subMessage}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        {notification.time}
                      </span>
                      {notification.hasReply && (
                        <button className="text-sm text-gray-500 flex items-center gap-1">
                          <BsReply className="w-4 h-4" />
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
