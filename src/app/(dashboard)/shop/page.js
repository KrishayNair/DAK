"use client";

import React from "react";
import { Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Elsie_Swash_Caps } from 'next/font/google';
// Data
const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

const products = [
  {
    id: 1,
    name: "India 1973 Indipex Mini Miniature Sheet",
    price: "₹2,200.00",
    image: "images/stamps/1.jpg",
  },
  {
    id: 2,
    name: "India 1973 Indipex Mini Miniature Sheet",
    price: "₹2,200.00",
    image: "images/stamps/2.jpg",
  },
  {
    id: 3,
    name: "India 1973 Indipex Mini Miniature Sheet",
    price: "₹2,200.00",
    image: "images/stamps/3.jpg",
  },
  {
    id: 4,
    name: "India 1973 Indipex Mini Miniature Sheet",
    price: "₹2,200.00",
    image: "images/stamps/4.jpg",
  },
  {
    id: 5,
    name: "India 1973 Indipex Mini Miniature Sheet",
    price: "₹2,200.00",
    image: "images/stamps/5.jpg",
  },
];

const categories = [
  {
    id: 1,
    title: "Miniature Sheets",
    description: "A special page of stamps on a collectible theme",
    image: "/collage.png",
  },
  {
    id: 2,
    title: "Setenants",
    description: "Two or more attached stamps of different designs",
    image: "/collage.png",
  },
  {
    id: 3,
    title: "First Day Cover",
    description: "Special envelope for stamp's first day of issue",
    image: "/collage.png",
  },
  {
    id: 4,
    title: "Miniature Sheets",
    description: "A special page of stamps on a collectible theme",
    image: "/collage.png",
  },
  {
    id: 5,
    title: "Miniature Sheets",
    description: "A special page of stamps on a collectible theme",
    image: "/collage.png",
  },
];

// Components
const SearchSection = () => (
  <section className="w-full bg-[#FDF6EC] py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search"
            className="w-full bg-[#FFF5E7] pl-12 h-14 rounded-full text-lg border-none"
          />
        </div>

        {/* Filter Options */}
        <div className="flex items-center gap-6 overflow-x-auto pb-2">
          <Button
            variant="outline"
            className="bg-white/80 hover:bg-white/90 whitespace-nowrap px-4 py-2 h-auto rounded-2xl text-sm border border-gray-100"
          >
            Recents
          </Button>
          <div className="flex items-center gap-2 whitespace-nowrap px-6 py-4 text-gray-600 bg-white rounded-xl hover:bg-white/90 cursor-pointer">
            Popular Items
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center border border-gray-100">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap px-6 py-4 text-gray-600 bg-white rounded-xl hover:bg-white/90 cursor-pointer">
            Special Offers for you
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center border border-gray-100">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-[#8B6E5B] hover:bg-[#7D6352] text-white px-4 py-3 rounded-2xl cursor-pointer">
            Show All
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BentoCard = ({ item, className = "" }) => (
  <div className={`relative overflow-hidden cursor-pointer group rounded-3xl ${className}`}>
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
      style={{
        backgroundImage: `url(${item.image})`,
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
    <div className="absolute bottom-8 left-6 text-white">
      <h3 className="text-xl font-semibold mb-2">
        {item.title || item.name}
      </h3>
      <p className="text-sm text-gray-200 line-clamp-2">
        {item.description || item.price}
      </p>
    </div>
  </div>
);

const CategoryGrid = () => (
  <section className="w-full bg-white py-8 px-4 sm:px-6 rounded-none sm:rounded-[12rem] sm:rounded-b-none ">
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-10">
        <CardTitle className="text-3xl mb-2">Explore by Products</CardTitle>
        <CardDescription className="text-lg">
          Explore our Philatelic Treasures | Rare Stamps | Special Editions
        </CardDescription>
      </div>
      
      <div className="grid grid-cols-4 auto-rows-[240px] gap-4">
        {/* First row */}
        <BentoCard 
          item={categories[0]} 
          className="col-span-2 h-full bg-[#FFE4E1]"
        />
        <BentoCard 
          item={products[0]} 
          className="col-span-1 h-full bg-[#E6E6FA]"
        />
        <BentoCard 
          item={categories[1]} 
          className="col-span-1 h-full bg-[#FFFFE0]"
        />

        {/* Second row */}
        <BentoCard 
          item={products[1]} 
          className="col-span-1 row-span-2 h-full bg-[#E6E6FA]"
        />
        <BentoCard 
          item={categories[2]} 
          className="col-span-2 row-span-2 h-full bg-[#F0F8FF]"
        />
        <BentoCard 
          item={products[2]} 
          className="col-span-1 row-span-1 h-full bg-[#87CEEB]"
        />

        {/* Third row */}
        <BentoCard 
          item={products[3]} 
          className="col-span-1 h-full bg-[#98FB98]"
        />
        <BentoCard 
          item={categories[3]} 
          className="col-span-1 h-full bg-[#4169E1]"
        />
        <BentoCard 
          item={products[4]} 
          className="col-span-1 h-full bg-[#FFA500]"
        />
        <BentoCard 
          item={categories[4]} 
          className="col-span-1 h-full bg-[#90EE90]"
        />
        <BentoCard 
          item={categories[4]} 
          className="col-span-1 h-full bg-[#90EE90]"
        />
      </div>
    </div>
  </section>
);

const MasonryGrid = () => (
  <section className="w-full bg-white py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-10">
        <CardTitle className="text-3xl mb-2">Explore by Theme</CardTitle>
        <CardDescription className="text-lg">
          Explore our Philatelic Treasures | Rare Stamps | Special Editions
        </CardDescription>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <BentoCard 
            item={products[0]} 
            className="h-[400px] bg-[#FFE4E1]"
          />
          <BentoCard 
            item={categories[1]} 
            className="h-[280px] bg-[#E6E6FA]"
          />
          <BentoCard 
            item={products[2]} 
            className="h-[320px] bg-[#F0F8FF]"
          />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <BentoCard 
            item={categories[2]} 
            className="h-[280px] bg-[#87CEEB]"
          />
          <BentoCard 
            item={products[3]} 
            className="h-[400px] bg-[#98FB98]"
          />
          <BentoCard 
            item={categories[3]} 
            className="h-[320px] bg-[#4169E1]"
          />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <BentoCard 
            item={products[4]} 
            className="h-[320px] bg-[#FFA500]"
          />
          <BentoCard 
            item={categories[4]} 
            className="h-[400px] bg-[#90EE90]"
          />
          <BentoCard 
            item={products[1]} 
            className="h-[280px] bg-[#FFB6C1]"
          />
        </div>
      </div>
    </div>
  </section>
);

// Main Page Component
export default function Page() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-full">
        <h1 className={`text-black text-4xl sm:text-6xl font-bold text-center px-4 py-2 rounded ${elsieSwashCaps.className}`}>SHOP</h1>
        <SearchSection />
        <CategoryGrid />
        <MasonryGrid />
      </div>
    </main>
  );
}
