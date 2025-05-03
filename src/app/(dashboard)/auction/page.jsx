"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Users, Award, X } from "lucide-react";
import { Search } from "lucide-react";
import AuctionCard from "./components/auctionCard";
import Link from "next/link";

// Updated auction items array with more auction-specific details
export const auctionItems = [
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
    backstory: "Celebrating India&apos;s independence from British rule.",
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
    backstory: "A rare stamp featuring India&apos;s diverse wildlife.",
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
    backstory: "Showcasing India&apos;s UNESCO World Heritage Sites.",
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
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [auctionRequest, setAuctionRequest] = useState({
    phone: "",
    title: "",
    description: "",
    condition: "",
    stampPhoto: null,
    holdingPhoto: null,
    expectedDate: ""
  });
  const [showEndedAuctionModal, setShowEndedAuctionModal] = useState(false);
  const [selectedEndedAuction, setSelectedEndedAuction] = useState(null);
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);

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
    if (item.status === "ended") {
      setSelectedEndedAuction(item);
      setShowEndedAuctionModal(true);
    } else if (item.status === "upcoming") {
      setSelectedItem(item);
      setShowUpcomingModal(true);
    } else {
      setSelectedItem(item);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    setBidAmount(""); // Reset bid amount when closing modal
    setQuantity(1); // Reset quantity when closing modal
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    console.log("Auction request:", auctionRequest);
    setShowRequestModal(false);
    // Reset form
    setAuctionRequest({
      phone: "",
      title: "",
      description: "",
      condition: "",
      stampPhoto: null,
      holdingPhoto: null,
      expectedDate: ""
    });
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
                Join thousands of collectors in the world&apos;s premier philatelic marketplace.
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
            <div className="flex gap-3 flex-wrap justify-center">
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
              
              <Link href="/auction/live">
                <Button 
                  className="px-6 py-2 rounded-full transition-all duration-300 
                           bg-[#D2691E] text-white hover:bg-[#A0522D] shadow-lg"
                >
                  Live Auctions
                </Button>
              </Link>
              
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
              
              <Button 
                onClick={() => setShowRequestModal(true)}
                className="bg-[#D2691E] text-white px-6 py-2 rounded-full hover:bg-[#A0522D] transition-all duration-300"
              >
                Request Auction
              </Button>
            </div>
          </div>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAuctions.map((item) => (
            <AuctionCard
              key={item.id}
              item={item}
              onItemClick={handleItemClick}
            />
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

      {showRequestModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-[#fff8e8] rounded-2xl shadow-2xl max-w-2xl w-full m-4 overflow-hidden border border-[#8B4513]/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#8B4513]">Request Auction</h2>
                <button 
                  onClick={() => setShowRequestModal(false)}
                  className="text-[#8B4513] hover:text-[#A0522D]"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#8B4513] mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={auctionRequest.phone}
                    onChange={(e) => setAuctionRequest({...auctionRequest, phone: e.target.value})}
                    className="w-full rounded-lg border-[#8B4513]/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#8B4513] mb-2">Stamp Title</label>
                  <Input
                    type="text"
                    value={auctionRequest.title}
                    onChange={(e) => setAuctionRequest({...auctionRequest, title: e.target.value})}
                    className="w-full rounded-lg border-[#8B4513]/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#8B4513] mb-2">Description</label>
                  <textarea
                    value={auctionRequest.description}
                    onChange={(e) => setAuctionRequest({...auctionRequest, description: e.target.value})}
                    className="w-full rounded-lg border-[#8B4513]/20 min-h-[100px] p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#8B4513] mb-2">Condition</label>
                  <select
                    value={auctionRequest.condition}
                    onChange={(e) => setAuctionRequest({...auctionRequest, condition: e.target.value})}
                    className="w-full rounded-lg border-[#8B4513]/20 p-2"
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="mint">Mint</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8B4513] mb-2">Stamp Photo</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAuctionRequest({...auctionRequest, stampPhoto: e.target.files[0]})}
                    className="w-full rounded-lg border-[#8B4513]/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#8B4513] mb-2">Photo Holding the Stamp</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAuctionRequest({...auctionRequest, holdingPhoto: e.target.files[0]})}
                    className="w-full rounded-lg border-[#8B4513]/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#8B4513] mb-2">Expected Auction Date</label>
                  <Input
                    type="date"
                    value={auctionRequest.expectedDate}
                    onChange={(e) => setAuctionRequest({...auctionRequest, expectedDate: e.target.value})}
                    className="w-full rounded-lg border-[#8B4513]/20"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                  <span className="text-sm text-[#A0522D] mt-1">
                    Select your preferred date to host the auction
                  </span>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit"
                    className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 rounded-lg"
                  >
                    Submit Request
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 bg-[#fff8e8] hover:bg-[#FFE4B5] text-[#8B4513] py-2 rounded-lg border border-[#8B4513]/20"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showEndedAuctionModal && selectedEndedAuction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-[#fff8e8] rounded-2xl shadow-2xl max-w-2xl w-full m-4 overflow-hidden border border-[#8B4513]/10">
            <div className="relative">
              <img
                src={selectedEndedAuction.image}
                alt={selectedEndedAuction.name}
                className="w-full h-72 object-cover"
              />
              <button 
                onClick={() => {
                  setShowEndedAuctionModal(false);
                  setSelectedEndedAuction(null);
                }}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg 
                         hover:bg-white transition-colors duration-200"
              >
                <span className="text-[#8B4513]">×</span>
              </button>
              <div className="absolute top-4 left-4">
                <span className="bg-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium">
                  Auction Ended
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-4">
                {selectedEndedAuction.name}
              </h2>
              
              <div className="space-y-4">
                <p className="text-[#A0522D] mb-6">{selectedEndedAuction.backstory}</p>
                
                <div className="bg-white/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#A0522D]">Final Bid</span>
                    <span className="text-2xl font-bold text-[#D2691E]">
                      ₹{selectedEndedAuction.currentBid}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#A0522D]">Starting Price</span>
                    <span className="text-[#8B4513]">
                      ₹{selectedEndedAuction.startingBid}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#A0522D]">Total Bids</span>
                    <span className="bg-[#fff8e8] text-[#8B4513] px-3 py-1 rounded-full">
                      {selectedEndedAuction.numberOfBids} bids
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#8B4513] mb-2">
                    Looking for similar items?
                  </h3>
                  <p className="text-[#A0522D] mb-4">
                    Check out our upcoming auctions or request a specific item.
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => {
                        setShowEndedAuctionModal(false);
                        setFilterStatus("upcoming");
                      }}
                      className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 rounded-lg"
                    >
                      View Upcoming Auctions
                    </Button>
                    <Button 
                      onClick={() => {
                        setShowEndedAuctionModal(false);
                        setShowRequestModal(true);
                      }}
                      className="flex-1 bg-[#fff8e8] hover:bg-[#FFE4B5] text-[#8B4513] py-2 rounded-lg 
                               border border-[#8B4513]/20"
                    >
                      Request Similar Item
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Auction Modal */}
      {selectedItem && selectedItem.status === "upcoming" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-[#fff8e8] rounded-2xl shadow-2xl max-w-2xl w-full m-4 overflow-hidden">
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-72 object-cover"
              />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white/80 p-2 rounded-full 
                           hover:bg-white transition-all duration-300"
              >
                <X size={20} className="text-[#8B4513]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#8B4513] mb-2">
                  {selectedItem.name}
                </h2>
                <div className="flex items-center gap-2 text-[#A0522D]">
                  <Clock size={18} />
                  <span>Starts in: {getTimeRemaining(selectedItem.endTime)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#8B4513] mb-2">About this Auction</h3>
                  <p className="text-[#A0522D]">{selectedItem.backstory}</p>
                </div>

                <div className="bg-white/50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#8B4513]">Starting Bid</span>
                    <span className="font-semibold text-[#D2691E]">
                      ₹{selectedItem.startingBid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8B4513]">Expected Value</span>
                    <span className="font-semibold text-[#D2691E]">
                      ₹{(selectedItem.startingBid * 1.5).toLocaleString()} - 
                      ₹{(selectedItem.startingBid * 2).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#8B4513]">Get Notified</h3>
                  <p className="text-sm text-[#A0522D]">
                    Apply now to participate in this auction when it goes live.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      // Handle auction application
                      setSelectedItem(null);
                      alert("Your application has been submitted!");
                    }}
                    className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 rounded-lg"
                  >
                    Apply for Auction
                  </Button>
                  <Button 
                    onClick={() => {
                      // Add to calendar functionality
                      setSelectedItem(null);
                      alert("Added to calendar!");
                    }}
                    className="flex-1 bg-white hover:bg-[#FFE4B5] text-[#8B4513] py-2 rounded-lg 
                             border border-[#8B4513]/20"
                  >
                    Add to Calendar
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
