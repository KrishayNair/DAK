"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ChevronDown, ArrowUpRight } from "lucide-react";
import { auctionItems } from "../../page";

export default function LiveAuctionDetails() {
  const params = useParams();
  const router = useRouter();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState(1900);
  const [timeLeft, setTimeLeft] = useState({ days: '01', hours: '02', minutes: '03' });
  const [searchCategory, setSearchCategory] = useState("Business");
  const [searchType, setSearchType] = useState("Miniature Sheets");
  const [publishedYear, setPublishedYear] = useState("1947 - 1956");
  const [priceRange, setPriceRange] = useState("₹1000.00 - ₹2000.00");
  const [similarAuctions, setSimilarAuctions] = useState([]);
  const [isSearchCategoryOpen, setIsSearchCategoryOpen] = useState(false);
  const searchCategories = ["Business", "History", "Culture", "Sports"];

  useEffect(() => {
    // Fetch auction details based on slug
    const currentAuction = {
      id: params.slug,
      name: "India 1953 Telegraph Centenary MNH Miniature Sheet",
      image: "/images/stamps/1.jpg",
      startingBid: 200,
      currentBid: 900,
      seller: "John Doe",
      description: "We'll help you bid rare philatelic treasure here easily and quickly that is relaible"
    };
    setAuction(currentAuction);
  }, [params.slug]);

  useEffect(() => {
    // Get similar auctions (for example, same category or type)
    const similar = auctionItems.filter(item => 
      item.id !== params.slug && item.status === 'ongoing'
    ).slice(0, 3);
    setSimilarAuctions(similar);
  }, [params.slug]);

  const handleBid = (e) => {
    e.preventDefault();
    // Add bid submission logic here
    console.log("Bid submitted:", bidAmount);
  };

  const adjustBid = (amount) => {
    setBidAmount(prev => Math.max(0, prev + amount));
  };

  if (!auction) return null;

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-bold">Best</h1>
            <h1 className="text-3xl font-bold text-[#8B4513]">philately</h1>
            <h1 className="text-3xl font-bold">marketplace</h1>
          </div>
          
          <div className="mt-8">
            <h2 className="text-4xl font-bold mb-4">Find your best philately<br />material Easily & Trusted</h2>
            <p className="text-gray-600 mb-4">{auction.description}</p>
            <button className="text-[#8B4513] border border-[#8B4513] rounded-full px-6 py-2 hover:bg-[#8B4513] hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div className="bg-gray-200 rounded-3xl overflow-hidden">
            <img
              src={auction.image}
              alt={auction.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Right: Auction Details */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <span className="text-lg">{auction.seller}</span>
            </div>

            <h2 className="text-2xl font-bold">{auction.name}</h2>

            {/* Timer */}
            <div>
              <p className="text-gray-600 mb-4">Bid ends in</p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold border rounded-xl p-4">{timeLeft.days}</div>
                  <p className="mt-2">Days</p>
                </div>
                <div className="text-4xl font-bold self-center">:</div>
                <div className="text-center">
                  <div className="text-4xl font-bold border rounded-xl p-4">{timeLeft.hours}</div>
                  <p className="mt-2">Hours</p>
                </div>
                <div className="text-4xl font-bold self-center">:</div>
                <div className="text-center">
                  <div className="text-4xl font-bold border rounded-xl p-4">{timeLeft.minutes}</div>
                  <p className="mt-2">Minutes</p>
                </div>
              </div>
            </div>

            {/* Bid Section */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Starting Bid</span>
                <span className="font-bold">₹{auction.startingBid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Bid</span>
                <span className="font-bold">₹{auction.currentBid.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => adjustBid(-100)}
                  className="p-3 border rounded-lg hover:bg-gray-100"
                >
                  <Minus size={20} />
                </button>
                <div className="flex-1 text-center border rounded-lg p-3">
                  ₹{bidAmount.toFixed(2)}
                </div>
                <button 
                  onClick={() => adjustBid(100)}
                  className="p-3 border rounded-lg hover:bg-gray-100"
                >
                  <Plus size={20} />
                </button>
                <button 
                  onClick={handleBid}
                  className="bg-[#8B4513] text-white px-6 py-3 rounded-lg hover:bg-[#A0522D] transition-colors"
                >
                  Post Bid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Let's help you find your favorite material
          </h2>

          <div className="flex gap-4 items-center mb-12">
            {/* Search Category */}
            <div className="flex-1 relative">
              <label className="text-sm text-gray-500 mb-1 block">Search Category</label>
              <button
                onClick={() => {/* Add dropdown logic */}}
                className="w-full p-4 rounded-2xl bg-white flex items-center justify-between"
              >
                <span className="text-gray-700">{searchCategory}</span>
                <ChevronDown className="text-gray-400" />
              </button>
              {isSearchCategoryOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-10">
                  {searchCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSearchCategory(category);
                        setIsSearchCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type */}
            <div className="flex-1 relative">
              <label className="text-sm text-gray-500 mb-1 block">Type</label>
              <button
                onClick={() => {/* Add dropdown logic */}}
                className="w-full p-4 rounded-2xl bg-white flex items-center justify-between"
              >
                <span className="text-gray-700">{searchType}</span>
                <ChevronDown className="text-gray-400" />
              </button>
            </div>

            {/* Published Year */}
            <div className="flex-1 relative">
              <label className="text-sm text-gray-500 mb-1 block">Published year</label>
              <button
                onClick={() => {/* Add dropdown logic */}}
                className="w-full p-4 rounded-2xl bg-white flex items-center justify-between"
              >
                <span className="text-gray-700">{publishedYear}</span>
                <ChevronDown className="text-gray-400" />
              </button>
            </div>

            {/* Price Range */}
            <div className="flex-1 relative">
              <label className="text-sm text-gray-500 mb-1 block">Price Range</label>
              <button
                onClick={() => {/* Add dropdown logic */}}
                className="w-full p-4 rounded-2xl bg-white flex items-center justify-between"
              >
                <span className="text-gray-700">{priceRange}</span>
                <ChevronDown className="text-gray-400" />
              </button>
            </div>

            {/* Search Button */}
            <div className="self-end">
              <button className="bg-[#8B4513] text-white px-8 py-4 rounded-2xl hover:bg-[#A0522D] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Similar Auctions */}
          <div className="grid grid-cols-3 gap-6">
            {similarAuctions.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <button 
                    onClick={() => router.push(`/auction/live/${item.id}`)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Miniature Sheet</p>
                    <p className="text-xl font-bold">₹{item.currentBid.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 text-right">Bid ends in</p>
                    <div className="flex gap-2 text-sm">
                      <span>01</span>
                      <span>:</span>
                      <span>01</span>
                      <span>:</span>
                      <span>01</span>
                    </div>
                    <div className="flex gap-2 text-[10px] text-gray-500">
                      <span>Days</span>
                      <span>Hours</span>
                      <span>Minutes</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <span className="text-sm text-gray-600">John Doe</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
