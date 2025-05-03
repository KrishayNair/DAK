"use client";

import React, { useState } from "react";
import AuctionCard from "../components/auctionCard";
import { Search, Clock, Users, Gavel, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auctionItems } from "../page";

export default function LiveAuctionsPage() {
  const liveAuctions = auctionItems.filter(item => item.status === "ongoing");
  const highestBidAuction = liveAuctions.reduce((prev, current) => 
    prev.currentBid > current.currentBid ? prev : current
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    console.log("Selected item:", item);
  };

  const handleBid = () => {
    if (selectedItem && bidAmount > selectedItem.currentBid) {
      console.log(`Placing bid of ${bidAmount} on item ${selectedItem.id}`);
      setSelectedItem(null);
      setBidAmount("");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8e8]">
      {/* Animation Styles */}
      <style jsx>{`
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

        @keyframes slideRight {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes gentleFloat {
          0% { transform: translate(0, 0); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(0, -4px); }
          75% { transform: translate(-2px, -2px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes floatUpDown {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .slide-right {
          animation: slideRight 0.8s ease-out forwards;
        }

        .slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .glow {
          box-shadow: 0 0 20px rgba(210, 105, 30, 0.3);
          transition: box-shadow 0.3s ease-in-out;
        }

        .glow:hover {
          box-shadow: 0 0 30px rgba(210, 105, 30, 0.5);
        }

        .animate-gentle-float {
          animation: gentleFloat 6s ease-in-out infinite;
        }

        .animate-float-updown {
          animation: floatUpDown 4s ease-in-out infinite;
        }

        @keyframes floatUpDownSmall {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        .animate-float-updown-small {
          animation: floatUpDownSmall 3s ease-in-out infinite;
        }
      `}</style>

      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-[#8B4513] via-[#D2691E] to-[#A0522D] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-float" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" 
               style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" 
               style={{ animationDelay: '4s' }} />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Back Button */}
          <Link href="/auction" className="inline-block mb-8">
            <Button 
              className="bg-white/10 hover:bg-white/20 text-white rounded-full px-6 py-2.5 
                         flex items-center gap-2 backdrop-blur-sm transition-all duration-300
                         border border-white/20"
            >
              <ArrowLeft size={20} />
              Back to All Auctions
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="slide-right" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                  Live Auctions
                  <span className="block text-[#FFE4B5] animate-pulse-slow mt-2">
                    Happening Now
                  </span>
                </h1>
                <p className="text-lg text-[#FFE4B5]/90 max-w-xl leading-relaxed">
                  Join the excitement of real-time bidding on rare and valuable stamps.
                  Don&apos;t miss your chance to own a piece of history.
                </p>
              </div>

              {/* Search Bar */}
              <div className="slide-right" style={{ animationDelay: '0.4s' }}>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search live auctions..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm"
                    />
                  </div>
                  <Button className="bg-[#FFE4B5] text-[#8B4513] hover:bg-white px-6 py-3 rounded-xl text-base font-semibold glow">
                    Search
                  </Button>
                </div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-6 slide-right" style={{ animationDelay: '0.6s' }}>
                {[
                  { icon: Clock, label: "Active Auctions", value: liveAuctions.length },
                  { icon: Users, label: "Current Bidders", value: "50+" },
                  { icon: Gavel, label: "Total Bids", 
                    value: liveAuctions.reduce((total, item) => total + item.numberOfBids, 0) }
                ].map((stat, index) => (
                  <div key={stat.label} 
                       className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                  >
                    <div className="flex justify-center mb-2">
                      <stat.icon className="text-[#FFE4B5] " size={24} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-[#FFE4B5]/80 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Featured Auction */}
            <div className="hidden lg:block relative slide-up" style={{ animationDelay: '0.8s' }}>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20
                          animate-float-updown hover:shadow-2xl transition-shadow duration-300 pt-6">
                <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-0.5 rounded-full 
                            text-xs font-medium flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  Featured Live Auction
                </div>

                <div className="mt-3">
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden">
                        <img
                          src={highestBidAuction?.image || "/auction-live.png"}
                          alt={highestBidAuction?.title}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    
                    <div className="w-1/2 space-y-3">
                      <h3 className="text-lg font-bold text-white line-clamp-2">
                        {highestBidAuction?.title}
                      </h3>

                      <div className="space-y-2">
                        <div className="bg-white/5 rounded-md p-2">
                          <p className="text-[#FFE4B5] text-xs">Current Bid</p>
                          <p className="text-white text-base font-bold">
                            ₹{highestBidAuction?.currentBid.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-md p-2">
                          <p className="text-[#FFE4B5] text-xs">Ends In</p>
                          <p className="text-white text-base font-bold">2h 45m</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/80">
                        <span>{highestBidAuction?.numberOfBids} bids</span>
                        <span>4 watching</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-3 bg-[#FFE4B5] hover:bg-white text-[#8B4513] 
                             font-semibold py-2 rounded-md transition-all duration-300 text-sm"
                  >
                    Place Bid Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Auctions Stats */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-[#8B4513]/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D2691E]">{liveAuctions.length}</div>
              <div className="text-sm text-[#8B4513]">Active Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D2691E]">
                {liveAuctions.reduce((total, item) => total + item.numberOfBids, 0)}
              </div>
              <div className="text-sm text-[#8B4513]">Total Bids</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D2691E]">
                ₹{Math.max(...liveAuctions.map(item => item.currentBid)).toLocaleString()}
              </div>
              <div className="text-sm text-[#8B4513]">Highest Bid</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Auctions Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {liveAuctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveAuctions.map((item) => (
              <AuctionCard
                key={item.id}
                item={item}
                onItemClick={handleItemClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-2">
              No Live Auctions
            </h2>
            <p className="text-[#A0522D] mb-6">
              There are currently no ongoing auctions. Please check back later or view upcoming auctions.
            </p>
            <Button 
              onClick={() => window.location.href = '/auction'}
              className="bg-[#8B4513] text-white hover:bg-[#A0522D]"
            >
              View All Auctions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
