"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Gavel } from "lucide-react";
import Link from "next/link";

// Use the same auction items array that's in the main auction page
const auctionItems = [
  {
      id: 1,
      name: "Rare 1953 Telegraph Centenary Stamp",
      image: "/images/stamps/1.jpg",
      currentBid: 2200,
      startingBid: 1500,
      numberOfBids: 12,
      endTime: "2024-03-20T15:00:00",
      status: "ongoing",
      bidHistory: [],
      backstory: "This stamp commemorates the centenary of the telegraph service in India.",
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
  // ... you can add more ongoing auctions as needed
];

export default function LiveAuctionDetails() {
  const params = useParams();
  const router = useRouter();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const currentAuction = auctionItems.find(
      item => item.id.toString() === params.slug && item.status === "ongoing"
    );
    
    if (!currentAuction) {
      router.push("/auction/live");
      return;
    }
    
    setAuction(currentAuction);
  }, [params.slug, router]);

  const handleBid = (e) => {
    e.preventDefault();
    if (bidAmount && auction && Number(bidAmount) > auction.currentBid) {
      // Handle bid logic here
      console.log(`Placing bid of ${bidAmount} on auction ${auction.id}`);
      alert("Bid placed successfully!");
      setBidAmount("");
    } else {
      alert("Please enter a valid bid amount higher than the current bid");
    }
  };

  if (!auction) return null;

  return (
    <div className="min-h-screen bg-[#fff8e8]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#8B4513] via-[#D2691E] to-[#A0522D]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/auction/live">
            <Button className="bg-white/10 hover:bg-white/20 text-white mb-8 rounded-full">
              <ArrowLeft className="mr-2" size={20} />
              Back to Live Auctions
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Image and Details */}
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={auction.image}
                  alt={auction.name}
                  className="w-full rounded-2xl shadow-lg h-[400px] object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full 
                               flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE NOW
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <h2 className="text-2xl font-bold text-[#8B4513]">{auction.name}</h2>
                <p className="text-[#A0522D]">{auction.backstory}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Clock className="mx-auto mb-2 text-[#D2691E]" />
                    <div className="text-sm text-[#8B4513]">Time Left</div>
                    <div className="font-semibold text-[#D2691E]">
                      {/* Add time remaining logic */}
                      2h 45m
                    </div>
                  </div>
                  <div className="text-center">
                    <Users className="mx-auto mb-2 text-[#D2691E]" />
                    <div className="text-sm text-[#8B4513]">Bidders</div>
                    <div className="font-semibold text-[#D2691E]">
                      {/* Add bidders count logic */}
                      123
                    </div>
                  </div>
                  <div className="text-center">
                    <Gavel className="mx-auto mb-2 text-[#D2691E]" />
                    <div className="text-sm text-[#8B4513]">Current Bid</div>
                    <div className="font-semibold text-[#D2691E]">
                      {/* Add current bid logic */}
                      $100
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bid Form */}
            <div className="space-y-6">
              <form onSubmit={handleBid}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="bidAmount" className="text-sm text-[#8B4513]">
                        Bid Amount
                      </label>
                      <input
                        type="number"
                        id="bidAmount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full mt-2 p-2 border border-[#D2691E] rounded-md"
                        placeholder="Enter your bid"
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-[#D2691E] text-white rounded-md">
                      Place Bid
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
