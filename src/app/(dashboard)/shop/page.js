"use client";

import React, { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Filter,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/custom/Footer";
import Link from "next/link";

const carouselItems = [
  { id: 1, image: "/shop.png" },
  { id: 2, image: "/shop.png" },
  { id: 3, image: "/shop.png" },
];

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

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const lenisRef = useRef();
  const shopRef = useRef(null);
  const bestSellersRef = useRef(null);
  const categoriesContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: shopRef,
    offset: ["start start", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = (e) => {
      setScrollY(e.scroll);
    };

    lenisRef.current.on("scroll", handleScroll);

    return () => {
      lenisRef.current.destroy();
    };
  }, []);

  const scrollCategories = (direction) => {
    const container = categoriesContainerRef.current;
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="relative">
        {/* First Animation Group: Search + Categories */}
        <motion.div ref={shopRef} className="relative z-0" style={{ opacity }}>
          {/* Search Section */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-[#FDF6EC] rounded-[32px] p-8">
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search"
                    className="w-full bg-white/90 pl-12 h-14 rounded-full text-lg"
                  />
                </div>

                {/* Filter Options */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="rounded-full bg-white hover:bg-white/90"
                  >
                    Recents
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full bg-white hover:bg-white/90 flex items-center gap-2"
                  >
                    Popular Items
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full bg-white hover:bg-white/90 flex items-center gap-2"
                  >
                    Special Offers for you
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-full ml-auto flex items-center gap-2"
                  >
                    Show All
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="relative mb-[-6rem]">
            <div className=" mx-auto px-4">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                  <CardDescription>
                    Explore the Philatelic Splendor | Category | Rating Stars
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <button
                      onClick={() => scrollCategories("left")}
                      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div
                      ref={categoriesContainerRef}
                      className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar"
                    >
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex-shrink-0 w-[280px] h-[320px] relative rounded-2xl overflow-hidden cursor-pointer group"
                        >
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                            style={{
                              backgroundImage: `url(${category.image})`,
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                          <div className="absolute bottom-8 left-6 text-white">
                            <h3 className="text-xl font-semibold mb-2">
                              {category.title}
                            </h3>
                            <p className="text-sm text-gray-200 line-clamp-2">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => scrollCategories("right")}
                      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Second Animation Group: Best Sellers + Footer */}
        <div className="relative z-10">
          <motion.div
            className="parallax-section"
            style={{
              y: useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"]),
            }}
          >
            {/* Best Sellers Section */}
            <div
              ref={bestSellersRef}
              className="bg-[#E7D4B5] py-24 w-full mt-12 rounded-t-[10rem]"
            >
              <div className=" mx-auto px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16">
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-3">
                      Best Sellers
                    </h2>
                    <p className="text-gray-700 text-lg">
                      Our most popular stamps and collections
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="px-8 mt-4 sm:mt-0"
                  >
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
                  {products.map((product) => (
                    <Link
                      href={`/shop/${product.id}`}
                      key={product.id}
                      className="block group"
                    >
                      <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none bg-white/90 backdrop-blur-sm">
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                          />
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                            onClick={(e) => {
                              e.preventDefault(); // Prevent navigation when clicking the heart
                              // Add wishlist functionality here
                            }}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-2xl font-bold text-primary-foreground">
                            {product.price}
                          </p>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                          <Button
                            className="w-full h-12 text-lg flex items-center gap-2"
                            onClick={(e) => {
                              e.preventDefault(); // Prevent navigation when clicking add to cart
                              // Add to cart functionality here
                            }}
                          >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
