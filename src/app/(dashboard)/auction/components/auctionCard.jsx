import React from "react";
import { Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuctionCard({ item, onItemClick }) {
  const router = useRouter();

  // Function to calculate time remaining
  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleClick = () => {
    if (item.status === 'ongoing') {
      router.push(`/auction/live/${item.id}`);
    } else {
      onItemClick(item);
    }
  };

  return (
    <div
      className={`group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl 
                 transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1
                 border border-[#8B4513]/10 ${item.status === 'ended' ? 'opacity-90' : ''}`}
      onClick={handleClick}
    >
      <div className="relative">
        {item.status === 'ended' && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10" />
        )}
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-64 object-cover ${
            item.status === 'ended' 
              ? 'filter grayscale group-hover:grayscale-0 transition-all duration-300'
              : 'group-hover:scale-105 transition-transform duration-300'
          }`}
        />
        <div className="absolute top-4 right-4 z-20">
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
            <span className="text-[#A0522D]">
              {item.status === 'ended' ? 'Final Bid' : 'Current Bid'}
            </span>
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
  );
}
