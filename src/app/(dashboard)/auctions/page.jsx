"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Auction items array
const auctionItems = [
  {
    id: 1,
    name: "Rare 1953 Telegraph Centenary Stamp",
    image: "/images/stamps/1.jpg",
    currentBid: 2200,
    backstory:
      "This stamp commemorates the centenary of the telegraph service in India.",
  },
  {
    id: 2,
    name: "Limited Edition 1973 Indipex Miniature Sheet",
    image: "/images/stamps/2.jpg",
    currentBid: 1800,
    backstory:
      "A special miniature sheet released during the Indipex 1973 exhibition.",
  },
  {
    id: 3,
    name: "Gandhi 1948 Commemorative Stamp",
    image: "/images/stamps/3.jpg",
    currentBid: 2500,
    backstory:
      "This stamp was issued in memory of Mahatma Gandhi after his assassination.",
  },
  {
    id: 4,
    name: "Indian Independence 1947 Stamp",
    image: "/images/stamps/4.jpg",
    currentBid: 3000,
    backstory: "Celebrating India's independence from British rule.",
  },
  {
    id: 5,
    name: "World Philatelic Exhibition 1985 Stamp",
    image: "/images/stamps/5.jpg",
    currentBid: 1500,
    backstory: "Issued for the World Philatelic Exhibition held in New Delhi.",
  },
  {
    id: 6,
    name: "Rare 1960s Wildlife Stamp",
    image: "/images/stamps/6.jpg",
    currentBid: 2000,
    backstory: "A rare stamp featuring India's diverse wildlife.",
  },
  {
    id: 7,
    name: "Heritage Sites of India Stamp",
    image: "/images/stamps/7.jpg",
    currentBid: 1700,
    backstory: "Showcasing India's UNESCO World Heritage Sites.",
  },
  {
    id: 8,
    name: "Indian Railways Commemorative Stamp",
    image: "/images/stamps/8.jpg",
    currentBid: 1900,
    backstory: "Celebrating the rich history of Indian Railways.",
  },
  {
    id: 9,
    name: "Famous Personalities Stamp Series",
    image: "/images/stamps/9.jpg",
    currentBid: 2100,
    backstory: "A series featuring famous personalities from Indian history.",
  },
  {
    id: 10,
    name: "Cultural Heritage of India Stamp",
    image: "/images/stamps/10.jpg",
    currentBid: 2300,
    backstory: "Highlighting the cultural heritage of India through stamps.",
  },
];

export default function AuctionPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [quantity, setQuantity] = useState(1); // New state for quantity

  const handleBid = (itemId) => {
    const item = auctionItems.find((i) => i.id === itemId);
    if (item && bidAmount > item.currentBid) {
      item.currentBid = bidAmount; // Update the current bid
      setBidAmount("");
      setQuantity(1); // Reset quantity after placing a bid
      alert("Bid placed successfully!");
    } else {
      alert("Please enter a valid bid amount.");
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setBidAmount(""); // Reset bid amount when closing modal
    setQuantity(1); // Reset quantity when closing modal
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Philatelic Auction</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {auctionItems.map((item) => (
          <div
            key={item.id}
            className="shadow-lg cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <div className="p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-600">Current Bid: ₹{item.currentBid}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying item details */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <p className="text-gray-700 mb-4">{selectedItem.backstory}</p>
            <Input
              type="number"
              placeholder="Enter your bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="mb-2"
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mb-2"
              min="1"
            />
            <Button onClick={() => handleBid(selectedItem.id)} className="mt-2">
              Place Bid
            </Button>
            <Button onClick={closeModal} className="bg-red-500 text-white mt-2">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
