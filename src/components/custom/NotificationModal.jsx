import React, { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";

const NotificationModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy notifications data
  const fetchNotifications = async () => {
    try {
      const dummyNotifications = [
        {
          id: 1,
          title: "Welcome to DAK!",
          message:
            "Thank you for joining our platform. Explore the features we offer.",
          time: "Just now",
          read: false,
        },
        {
          id: 2,
          title: "New Workshop Announced",
          message: "Join our latest workshop on Philately this weekend!",
          time: "1 hour ago",
          read: false,
        },
        {
          id: 3,
          title: "Limited-Time Offer!",
          message:
            "Enjoy a 20% discount on all Shop items. Hurry, offer ends soon.",
          time: "3 hours ago",
          read: true,
        },
      ];

      setNotifications(dummyNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-medium text-gray-800">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <BsX className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 max-h-80 overflow-y-auto">
          {loading ? (
            <p>Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-600 text-center">
              No notifications available.
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 mb-4 rounded-lg shadow ${
                  notification.read ? "bg-gray-100" : "bg-white"
                }`}
              >
                <h3 className="text-sm font-semibold">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {notification.time}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
