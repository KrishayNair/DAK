"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Search } from "lucide-react";
import { Elsie_Swash_Caps } from 'next/font/google';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

const carouselItems = [
  {
    image: "/catalog.png",
    text: "Explore our rare stamp collection"
  },
  {
    image: "/catalog.png",
    text: "Discover philately treasures"
  },
  {
    image: "/catalog.png",
    text: "Join our stamp collecting community"
  },
];

const stampImages = [
  "images/stamps/1.jpg?height=200&width=200",
  "images/stamps/2.jpg?height=200&width=200",
  "images/stamps/3.jpg?height=200&width=200",
  "images/stamps/8.png?height=200&width=200",
  "images/stamps/9.jpg?height=200&width=200",
  "images/stamps/4.jpg?height=200&width=200",
  "images/stamps/7.jpg?height=200&width=200",
  "images/stamps/5.jpg?height=200&width=200",
  "images/stamps/6.jpg?height=200&width=200",
  "images/stamps/10.jpg?height=200&width=200",
];

const stampNames = [
  "'75' and Flag",
  "'The Three Musicians', 1921",
  "Family Planning",
  "Treskilling Yellow",
  "'Head' (Rabindranath Tagore)",
  "Benjamin Franklin Z Grill",
  "'Hemant' (Winter) (Pausha)",
  "Justice for All",
  "'Cats' (Nikur Dilipbhai Mody)",
  "Jagadguru Sri Shivarathri Rajendra Swamy",
];

export default function StampCollection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E8" }}>
      <div className="container mx-auto p-4 space-y-8">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem
                key={index}
                className={index === activeIndex ? "" : "hidden"}
              >
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-black text-center px-4 ${elsieSwashCaps.className}`}>
                      {item.text}
                    </h2>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="relative">
          <Input type="text" placeholder="Search stamps..." className="pl-10" />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stampImages.map((src, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg bg-white"
            >
              <CardContent className="p-4 flex flex-col justify-between h-[300px]">
                <div className="w-full h-[400px] overflow-hidden rounded-md">
                  <img
                    src={src}
                    alt={`Stamp ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-center text-black">
                  {/* Stamp {index + 1} */}
                  {stampNames[index]}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
