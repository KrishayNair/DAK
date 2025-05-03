import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { BsX } from "react-icons/bs";
import { useRouter } from "next/navigation";

const NotificationModal = ({ isOpen, onClose, anchorRef }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const modalRef = useRef(null);
  const router = useRouter();

  // Calculate position based on bell icon
  useLayoutEffect(() => {
    if (isOpen && anchorRef?.current && modalRef?.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();
      
      // Position the modal below the bell icon
      const top = anchorRect.bottom + 8; // 8px gap
      const right = window.innerWidth - anchorRect.right;

      setPosition({ top, right });
    }
  }, [isOpen, anchorRef]);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const dummyNotifications = [
        {
          id: 1,
          type: "postal",
          title: "Postal circle",
          message: 'Hi John!, do you still remember the &quot;India 1953 Telegraph Centenary MNH Miniature Sheet&quot; you want, Now it&apos;s in stock !!',
          time: "3m",
          read: false,
          product: {
            id: "123",
            image: "/images/stamps/1.jpg",
            name: "India 1953 Telegraph Centenary MNH Miniature Sheet",
            price: "₹2,200.00",
            status: "Ready in stock!"
          }
        },
        {
          id: 2,
          type: "delivery",
          title: "Delivery service",
          message: "Hi John!, your order with #order_id is on the way !",
          time: "1hr",
          read: false,
          orderId: "ORDER123",
          actionLink: "Track your order"
        },
        {
          id: 3,
          type: "personal",
          title: "Adish Gotekar",
          message: 'replied to your review of product &quot;India 1953 Telegraph Centenary MNH Miniature Sheet&quot;',
          time: "11 : 05",
          read: true,
          comment: "Can you tell me more about this product?",
          replyAction: true
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

  // Handle mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      // API call would go here
      setNotifications(notifications.map(notif => ({
        ...notif,
        read: true
      })));
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  // Handle single notification read
  const handleMarkAsRead = async (notificationId) => {
    try {
      // API call would go here
      setNotifications(notifications.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Handle product click
  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
    onClose();
  };

  // Handle track order
  const handleTrackOrder = (orderId) => {
    router.push(`/orders/track/${orderId}`);
    onClose();
  };

  // Handle reply
  const handleReply = async (notificationId) => {
    if (replyingTo === notificationId) {
      try {
        if (replyText.trim()) {
          // API call would go here
          console.log(`Sending reply for notification ${notificationId}: ${replyText}`);
          setReplyText("");
          setReplyingTo(null);
        }
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    } else {
      setReplyingTo(notificationId);
    }
  };

  if (!isOpen) return null;

  const filteredNotifications = activeTab === "all" 
    ? notifications
    : notifications.filter(n => n.type === activeTab.toLowerCase());

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
        }}
        className="fixed z-50 bg-white rounded-xl shadow-lg w-[500px] max-h-[75vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <BsX className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b px-5">
          {[
            { id: "all", label: "View all" },
            { id: "personal", label: "Personal" },
            { id: "government", label: "Government" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 px-4 relative transition-colors text-sm ${
                activeTab === tab.id
                  ? "text-black border-b-2 border-black font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button 
            onClick={handleMarkAllAsRead}
            className="ml-auto text-gray-500 hover:text-gray-700 text-xs transition-colors"
          >
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[55vh]">
          {loading ? (
            <div className="p-4 text-center text-sm">Loading notifications...</div>
          ) : (
            <div className="divide-y">
              {/* Today Section */}
              <div className="p-4">
                <h3 className="text-xs text-gray-500 mb-3 px-1">TODAY</h3>
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`mb-4 ${notification.read ? 'opacity-75' : ''}`}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-0.5">{notification.message}</p>
                        
                        {/* Product Card */}
                        {notification.product && (
                          <div 
                            onClick={() => handleProductClick(notification.product.id)}
                            className="mt-2 border rounded-xl p-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <img src={notification.product.image} alt="" className="w-14 h-14 object-cover rounded-lg" />
                            <div className="flex-1">
                              <p className="text-red-500 text-xs">{notification.product.status}</p>
                              <p className="font-medium text-sm">{notification.product.name}</p>
                              <p className="font-bold text-sm">{notification.product.price}</p>
                            </div>
                            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        )}

                        {/* Action Link */}
                        {notification.actionLink && (
                          <button 
                            onClick={() => handleTrackOrder(notification.orderId)}
                            className="text-gray-600 underline block mt-2 text-sm hover:text-gray-800 transition-colors"
                          >
                            {notification.actionLink}
                          </button>
                        )}

                        {/* Reply Section */}
                        {notification.comment && (
                          <div className="mt-2 bg-gray-50 p-2.5 rounded-xl">
                            <p className="text-gray-600 text-sm">{notification.comment}</p>
                            {notification.replyAction && (
                              <div className="mt-1.5">
                                {replyingTo === notification.id ? (
                                  <div className="space-y-2">
                                    <textarea
                                      value={replyText}
                                      onChange={(e) => setReplyText(e.target.value)}
                                      placeholder="Write your reply..."
                                      className="w-full p-2 border rounded-xl text-sm"
                                      rows="2"
                                    />
                                    <div className="flex justify-end gap-2">
                                      <button
                                        onClick={() => setReplyingTo(null)}
                                        className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={() => handleReply(notification.id)}
                                        className="px-3 py-1 text-xs bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                                      >
                                        Send
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => handleReply(notification.id)}
                                    className="text-gray-600 text-sm font-medium flex items-center gap-1 hover:text-gray-800 transition-colors"
                                  >
                                    Reply
                                    <svg className="w-3.5 h-3.5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Yesterday Section */}
              <div className="p-4">
                <h3 className="text-xs text-gray-500 mb-3 px-1">YESTERDAY</h3>
                {/* Add yesterday's notifications here */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
