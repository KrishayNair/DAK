"use client";
import React, { useState } from "react";

const ordersData = [
  {
    id: "#12345",
    items: [
      {
        name: "India 1973 Indipex MNH Miniature Sheet",
        price: "₹2,200.00",
        quantity: 1,
        image: "/images/stamps/1.jpg", // Updated image path
      },
    ],
    total: "₹4,400.00",
    status: "On Shipping",
    estimatedDelivery: "Estimated delivery: 5 Dec, 2024",
    shippingFrom: "Mumbai, India",
    shippingTo: "Gujarat, India",
  },
  {
    id: "#12346",
    items: [
      {
        name: "India 1973 Indipex MNH Miniature Sheet",
        price: "₹2,200.00",
        quantity: 1,
        image: "/images/stamps/2.jpg", // Updated image path
      },
    ],
    total: "₹4,400.00",
    status: "Delivered",
    estimatedDelivery: "Estimated delivery: 2 Dec, 2024",
    shippingFrom: "Delhi, India",
    shippingTo: "Maharashtra, India",
  },
  {
    id: "#20567",
    items: [
      {
        name: "Rise of ChandraGupta",
        price: "₹2,200.00",
        quantity: 1,
        image: "/images/stamps/3.jpg", // Updated image path
      },
    ],
    total: "₹4,400.00",
    status: "Returned",
    estimatedDelivery: "Estimated delivery: 2 Dec, 2024",
    shippingFrom: "Delhi, India",
    shippingTo: "Maharashtra, India",
  },
  // Add more orders as needed
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("On Shipping");

  const filteredOrders = ordersData.filter(
    (order) => order.status === activeTab
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      <div className="flex space-x-4 mb-6 justify-center">
        {["Delivered", "On Shipping", "Cancelled", "Returned"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 text-lg rounded-lg transition duration-300 ${
              activeTab === status
                ? "bg-brown-600 text-white shadow-lg"
                : "bg-white-300 text-whiet-700 hover:bg-white-200"
            }`}
            onClick={() => setActiveTab(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 shadow-md bg-white transition-transform transform hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg">
                  Order ID: {order.id}
                </span>
                <span
                  className={`text-sm font-medium ${
                    order.status === "On Shipping"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">{order.shippingFrom}</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-600">{order.shippingTo}</span>
              </div>
              <div className="space-y-4 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <span className="block text-gray-800 font-medium">
                        {item.name}
                      </span>
                      <span className="block text-gray-700">
                        {item.price} ({item.quantity}x)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <span className="font-semibold text-lg">
                  Total: {order.total}
                </span>
                <div className="text-sm text-gray-500">
                  {order.estimatedDelivery}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center col-span-full">
            No orders found. Please check back later!
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
