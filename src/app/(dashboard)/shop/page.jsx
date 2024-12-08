"use client";

import React, { useState } from "react";
import { Search, ChevronRight, Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Elsie_Swash_Caps } from "next/font/google";
import { useRouter } from "next/navigation";

import ProductsGrid from "./components/ProductGrid";
import CollectionGrid from "./components/CollectionGrid";

// import { useCart } from "@/contexts/CartContext";
// Data
const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
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
  <section className="w-full bg-[#FFFFF] py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search"
            className="w-full bg-gray-100 pl-12 h-14 rounded-full text-lg border-none"
          />
        </div>

        {/* Filter Options */}
        <div className="flex flex-col sm:flex-row items-center gap-4 overflow-x-auto pb-2">
          <Button
            variant="outline"
            className="bg-white/80 hover:bg-white/90 whitespace-nowrap px-4 py-2 rounded-2xl text-sm sm:text-base border border-gray-100 w-full sm:w-auto"
          >
            Recents
          </Button>
          <div className="flex items-center gap-2 whitespace-nowrap px-4 py-2 text-gray-600 bg-white rounded-xl hover:bg-white/90 cursor-pointer w-full sm:w-auto">
            Popular Items
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/80 flex items-center justify-center border border-gray-100">
              <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap px-4 py-2 text-gray-600 bg-white rounded-xl hover:bg-white/90 cursor-pointer w-full sm:w-auto">
            Special Offers for you
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/80 flex items-center justify-center border border-gray-100">
              <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-[#8B6E5B] hover:bg-[#7D6352] text-white px-2 sm:px-4 py-1 sm:py-3 rounded-2xl cursor-pointer">
            Show All
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BentoCard = ({ item, className = "" }) => {
  const router = useRouter();

  const handleClick = () => {
    if (item.title) {
      const slug = item.title.toLowerCase().replace(/\s+/g, "-");
      router.push(`/shop/${slug}`);
    } else if (item.id) {
      // Handle product navigation if needed
      router.push(`/shop/product/${item.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer group rounded-3xl ${className}`}
    >
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
};

const CategoryGrid = () => (
  <section className="w-full bg-white py-8 px-4 sm:px-6 rounded-none sm:rounded-[12rem] sm:rounded-b-none ">
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-10">
        <CardTitle className="text-3xl mb-2">Explore by Products</CardTitle>
        <CardDescription className="text-lg">
          Explore our Philatelic Treasures | Rare Stamps | Special Editions
        </CardDescription>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-4">
        {/* First row */}
        <BentoCard
          item={categories[0]}
          className="col-span-2 h-full bg-[#FFE4E1]"
        />
        <BentoCard
          item={categories[0]}
          className="col-span-1 h-full bg-[#E6E6FA]"
        />
        <BentoCard
          item={categories[1]}
          className="col-span-1 h-full bg-[#FFFFE0]"
        />

        {/* Second row */}
        <BentoCard
          item={categories[1]}
          className="col-span-1 row-span-2 h-full bg-[#E6E6FA]"
        />
        <BentoCard
          item={categories[2]}
          className="col-span-2 row-span-2 h-full bg-[#F0F8FF]"
        />
        <BentoCard
          item={categories[2]}
          className="col-span-1 row-span-1 h-full bg-[#87CEEB]"
        />

        {/* Third row */}
        <BentoCard
          item={categories[3]}
          className="col-span-1 h-full bg-[#98FB98]"
        />
        <BentoCard
          item={categories[3]}
          className="col-span-1 h-full bg-[#4169E1]"
        />
        <BentoCard
          item={categories[4]}
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
          <BentoCard item={categories[0]} className="h-[400px] bg-[#FFE4E1]" />
          <BentoCard item={categories[1]} className="h-[280px] bg-[#E6E6FA]" />
          <BentoCard item={categories[2]} className="h-[320px] bg-[#F0F8FF]" />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <BentoCard item={categories[2]} className="h-[280px] bg-[#87CEEB]" />
          <BentoCard item={categories[3]} className="h-[400px] bg-[#98FB98]" />
          <BentoCard item={categories[3]} className="h-[320px] bg-[#4169E1]" />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <BentoCard item={categories[4]} className="h-[320px] bg-[#FFA500]" />
          <BentoCard item={categories[4]} className="h-[400px] bg-[#90EE90]" />
          <BentoCard item={categories[1]} className="h-[280px] bg-[#FFB6C1]" />
        </div>
      </div>
    </div>
  </section>
);

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-full w-full max-h-[90vh] overflow-y-auto p-4 sm:max-w-4xl">
        <div className="flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 p-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 p-2 space-y-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.ratingCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-gray-900">
              {product.price}
            </div>

            {/* Backstory */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Stamp History</h3>
              <p className="text-gray-600">{product.backstory}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-[#8B6E5B] hover:bg-[#7D6352] text-white"
              onClick={() => handleAddToCart(product, quantity)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
export default function Page() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-full">
        <h1
          className={`text-black text-4xl sm:text-6xl font-bold text-center px-4 py-2 rounded ${elsieSwashCaps.className}`}
        >
          SHOP
        </h1>
        <SearchSection />

        {/* TODO: Add the products grid here */}
        <ProductsGrid />

        {/* TODO: Add the collection grid here */}
        <CollectionGrid />
      </div>
    </main>
  );
}
