"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Users, Award } from "lucide-react";
import { Search } from "lucide-react";

// Updated auction items array with more auction-specific details
const auctionItems = [
  {
    id: 1,
    name: "Rare 1953 Telegraph Centenary Stamp",
    image: "/images/stamps/1.jpg",
    currentBid: 2200,
    startingBid: 1500,
    numberOfBids: 12,
    endTime: "2024-03-20T15:00:00", // Add actual timestamps
    status: "ongoing", // ongoing, ended, upcoming
    bidHistory: [],
    backstory: "This stamp commemorates the centenary of the telegraph service in India.",
  },
  {
    id: 2,
    name: "Limited Edition 1973 Indipex Miniature Sheet",
    image: "/images/stamps/2.jpg",
    currentBid: 1800,
    startingBid: 1200,
    numberOfBids: 8,
    endTime: "2024-04-15T15:00:00",
    status: "upcoming",
    bidHistory: [],
    backstory: "A special miniature sheet released during the Indipex 1973 exhibition.",
  },
  {
    id: 3,
    name: "Gandhi 1948 Commemorative Stamp",
    image: "/images/stamps/3.jpg",
    currentBid: 2500,
    startingBid: 1800,
    numberOfBids: 10,
    endTime: "2024-05-01T15:00:00",
    status: "ended",
    bidHistory: [],
    backstory: "This stamp was issued in memory of Mahatma Gandhi after his assassination.",
  },
  {
    id: 4,
    name: "Indian Independence 1947 Stamp",
    image: "/images/stamps/4.jpg",
    currentBid: 3000,
    startingBid: 2000,
    numberOfBids: 15,
    endTime: "2024-06-15T15:00:00",
    status: "upcoming",
    bidHistory: [],
    backstory: "Celebrating India's independence from British rule.",
  },
  {
    id: 5,
    name: "World Philatelic Exhibition 1985 Stamp",
    image: "/images/stamps/5.jpg",
    currentBid: 1500,
    startingBid: 1000,
    numberOfBids: 7,
    endTime: "2024-07-01T15:00:00",
    status: "ongoing",
    bidHistory: [],
    backstory: "Issued for the World Philatelic Exhibition held in New Delhi.",
  },
  {
    id: 6,
    name: "Rare 1960s Wildlife Stamp",
    image: "/images/stamps/6.jpg",
    currentBid: 2000,
    startingBid: 1200,
    numberOfBids: 9,
    endTime: "2024-08-15T15:00:00",
    status: "ended",
    bidHistory: [],
    backstory: "A rare stamp featuring India's diverse wildlife.",
  },
  {
    id: 7,
    name: "Heritage Sites of India Stamp",
    image: "/images/stamps/7.jpg",
    currentBid: 1700,
    startingBid: 1000,
    numberOfBids: 6,
    endTime: "2024-09-01T15:00:00",
    status: "upcoming",
    bidHistory: [],
    backstory: "Showcasing India's UNESCO World Heritage Sites.",
  },
  {
    id: 8,
    name: "Indian Railways Commemorative Stamp",
    image: "/images/stamps/8.jpg",
    currentBid: 1900,
    startingBid: 1100,
    numberOfBids: 8,
    endTime: "2024-10-15T15:00:00",
    status: "ended",
    bidHistory: [],
    backstory: "Celebrating the rich history of Indian Railways.",
  },
  {
    id: 9,
    name: "Famous Personalities Stamp Series",
    image: "/images/stamps/9.jpg",
    currentBid: 2100,
    startingBid: 1400,
    numberOfBids: 10,
    endTime: "2024-11-01T15:00:00",
    status: "upcoming",
    bidHistory: [],
    backstory: "A series featuring famous personalities from Indian history.",
  },
  {
    id: 10,
    name: "Cultural Heritage of India Stamp",
    image: "/images/stamps/10.jpg",
    currentBid: 2300,
    startingBid: 1600,
    numberOfBids: 12,
    endTime: "2024-12-15T15:00:00",
    status: "ended",
    bidHistory: [],
    backstory: "Highlighting the cultural heritage of India through stamps.",
  },
];

export default function AuctionPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all"); // new state for filtering

  // Function to calculate time remaining
  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Filter auctions based on status
  const filteredAuctions = auctionItems.filter(item => {
    if (filterStatus === "all") return true;
    return item.status === filterStatus;
  });

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
    <div className="min-h-screen bg-[#fff8e8]">
      {/* Hero Section with Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Updated Hero Section */}
      <div className="bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#D2691E] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-in">
              <h1 className="text-5xl font-bold leading-tight">
                Discover Rare Stamps <br />
                <span className="text-[#FFE4B5] animate-pulse inline-block">
                  Bid with Confidence
                </span>
              </h1>
              
              <p className="text-lg text-[#FFE4B5] max-w-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Explore our curated collection of rare and valuable stamps. 
                Join thousands of collectors in the world's premier philatelic marketplace.
              </p>
              
              {/* Search Bar with Animation */}
              <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for stamps..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-[#FFE4B5]/20 
                             focus:outline-none focus:ring-2 focus:ring-[#FFE4B5] focus:border-transparent
                             placeholder-[#FFE4B5] text-white transition-all duration-300 hover:bg-white/20"
                  />
                </div>
                <Button className="px-8 bg-[#D2691E] hover:bg-[#A0522D] text-white rounded-lg 
                                 transition-all duration-300 transform hover:scale-105">
                  Search
                </Button>
              </div>

              {/* Stats with Staggered Animation */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                {[
                  { icon: Clock, label: "Live Auctions", value: "24/7" },
                  { icon: Users, label: "Active Bidders", value: "10K+" },
                  { icon: Award, label: "Rare Stamps", value: "5K+" }
                ].map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="text-center animate-fade-in"
                    style={{ animationDelay: `${0.9 + index * 0.2}s` }}
                  >
                    <div className="flex justify-center mb-2">
                      <stat.icon className="text-[#FFE4B5] animate-float" />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-[#FFE4B5] text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content with Floating Animation */}
            <div className="hidden lg:block relative animate-float">
              {/* Gentler Animated Blobs */}
              <div className="absolute -top-8 -left-8 w-96 h-96 bg-[#FFE4B5] rounded-full 
                            mix-blend-soft-light filter blur-3xl opacity-40 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-96 h-96 bg-[#FFDAB9] rounded-full 
                            mix-blend-soft-light filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#DEB887] rounded-full 
                            mix-blend-soft-light filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
              
              {/* Hero Image */}
              <div className="relative z-10">
                <img
                  src="/collage.png"
                  alt="Rare Stamp Collection"
                  className="rounded-2xl shadow-2xl border-4 border-[#FFE4B5]/20 backdrop-blur-sm 
                           transform transition-transform duration-500 hover:scale-105"
                />
                
                {/* Featured Auction Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 
                              backdrop-blur-sm animate-pulse z-20">
                  <div className="text-[#8B4513] font-semibold">Featured Auction</div>
                  <div className="text-[#D2691E] font-bold">Starting at ₹1,500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        {/* Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-[#8B4513]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-[#8B4513]">
              Current Auctions
            </h1>
            <div className="flex gap-3">
              <Button 
                onClick={() => setFilterStatus("all")}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filterStatus === "all" 
                    ? "bg-[#8B4513] text-white shadow-lg" 
                    : "bg-[#fff8e8] text-[#8B4513] hover:bg-[#FFE4B5]"
                }`}
              >
                All Auctions
              </Button>
              <Button 
                onClick={() => setFilterStatus("ongoing")}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filterStatus === "ongoing" 
                    ? "bg-[#D2691E] text-white shadow-lg" 
                    : "bg-[#fff8e8] text-[#8B4513] hover:bg-[#FFE4B5]"
                }`}
              >
                Ongoing
              </Button>
              <Button 
                onClick={() => setFilterStatus("upcoming")}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filterStatus === "upcoming" 
                    ? "bg-[#A0522D] text-white shadow-lg" 
                    : "bg-[#fff8e8] text-[#8B4513] hover:bg-[#FFE4B5]"
                }`}
              >
                Upcoming
              </Button>
            </div>
          </div>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAuctions.map((item) => (
            <div
              key={item.id}
              className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl 
                       transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1
                       border border-[#8B4513]/10"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    item.status === 'ongoing' ? 'bg-[#D2691E] text-white' :
                    item.status === 'ended' ? 'bg-[#8B4513] text-white' :
                    'bg-[#A0522D] text-white'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#8B4513] mb-3 line-clamp-2">
                  {item.name}
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#A0522D]">Current Bid</span>
                    <span className="text-xl font-bold text-[#D2691E]">₹{item.currentBid}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#A0522D]">Starting Bid</span>
                    <span className="text-[#8B4513]">₹{item.startingBid}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#A0522D]">Total Bids</span>
                    <span className="bg-[#fff8e8] text-[#8B4513] px-3 py-1 rounded-full font-medium">
                      {item.numberOfBids} bids
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t border-[#8B4513]/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#A0522D]">Time Remaining</span>
                      <span className="text-sm font-medium text-[#D2691E]">
                        {getTimeRemaining(item.endTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Updated to match theme */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-[#fff8e8] rounded-2xl shadow-2xl max-w-2xl w-full m-4 overflow-hidden border border-[#8B4513]/10">
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-72 object-cover"
              />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg 
                         hover:bg-white transition-colors duration-200"
              >
                <span className="text-[#8B4513]">×</span>
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-4">{selectedItem.name}</h2>
              <p className="text-[#A0522D] mb-6">{selectedItem.backstory}</p>
              
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Enter your bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full rounded-lg border-[#8B4513]/20 focus:border-[#D2691E] focus:ring-[#D2691E] bg-white"
                />
                
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="w-full rounded-lg border-[#8B4513]/20 focus:border-[#D2691E] focus:ring-[#D2691E] bg-white"
                />
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleBid(selectedItem.id)}
                    className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 rounded-lg transition-colors duration-200"
                  >
                    Place Bid
                  </Button>
                  <Button 
                    onClick={closeModal}
                    className="flex-1 bg-[#fff8e8] hover:bg-[#FFE4B5] text-[#8B4513] py-2 rounded-lg 
                             transition-colors duration-200 border border-[#8B4513]/20"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
