"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Heart } from "lucide-react";

const carouselItems = [
  { id: 1, image: "/shop.png" },
  { id: 2, image: "/shop.png" },
  { id: 3, image: "/shop.png" },
];

const products = [
  { id: 1, name: "Product 1", price: "₹19.99", image: "images/stamps/1.jpg" },
  { id: 2, name: "Product 2", price: "₹24.99", image: "images/stamps/2.jpg" },
  { id: 3, name: "Product 3", price: "₹14.99", image: "images/stamps/3.jpg" },
  { id: 4, name: "Product 4", price: "₹29.99", image: "images/stamps/4.jpg" },
  { id: 5, name: "Product 5", price: "₹39.99", image: "images/stamps/5.jpg" },
];

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState({});

  // Generate random heights once and memoize them
  const randomHeights = useMemo(() => {
    return products.reduce((acc, product) => {
      acc[product.id] = Math.floor(Math.random() * (300 - 120 + 1)) + 120; // Random height between 120px and 300px
      return acc;
    }, {});
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Carousel Banner */}
      <div className="relative mb-8 bg-gray-100 rounded-lg overflow-hidden h-64">
        <div
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselItems.map((item) => (
            <div 
              key={item.id} 
              className="w-full flex-shrink-0 h-full"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative bg-white rounded-3xl shadow-md">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full py-2 pl-10 pr-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-3xl shadow-md relative flex flex-col"
          >
            <div
              className="mb-4 rounded-2xl overflow-hidden"
              style={{ 
                height: `${randomHeights[product.id]}px`,
                maxHeight: '300px',
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
            </div>
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-600 font-bold mb-4">{product.price}</p>
            <div className="flex justify-between items-center">
              <button className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm">
                Add to Cart
              </button>
              <div className="absolute bottom-0 right-0 bg-[#FFF8E8] p-1 border-[10px] border-[#FFF8E8] rounded-tl-xl rounded-bl-xl ">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="p-2 rounded-xl bg-red-200 "
                >
                  <Heart
                    size={20}
                    className={
                      favorites[product.id]
                        ? "text-red-500 fill-current"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
