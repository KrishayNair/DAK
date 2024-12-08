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
import { Elsie_Swash_Caps } from "next/font/google";
import { Button } from "@/components/ui/button";
import { postDataToAPI } from "@/lib/api";

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

const carouselItems = [
  {
    image: "/catalog.png",
    text: "Explore our rare stamp collection",
  },
  {
    image: "/catalog.png",
    text: "Discover philately treasures",
  },
  {
    image: "/catalog.png",
    text: "Join our stamp collecting community",
  },
];

const stampImages = [
  "images/stamps/1.jpg",
  "images/stamps/2.jpg",
  "images/stamps/3.jpg",
  "images/stamps/8.png",
  "images/stamps/9.jpg",
  "images/stamps/4.jpg",
  "images/stamps/7.jpg",
  "images/stamps/5.jpg",
  "images/stamps/6.jpg",
  "images/stamps/10.jpg",
];

const stampDetails = [
  {
    name: "'75' and Flag",
    caption: "This is a rare stamp from 1975.",
    time: "Posted 2 hours ago",
    comments: ["Amazing!", "Love this one!", "Such a classic."],
  },
  {
    name: "'The Three Musicians', 1921",
    caption: "A stamp based on Picasso's famous painting.",
    time: "Posted 5 hours ago",
    comments: ["Stunning artwork!", "Great history!", "Iconic design."],
  },
  {
    name: "Family Planning",
    caption: "Promoting awareness through stamps.",
    time: "Posted 1 day ago",
    comments: ["Important message!", "Beautiful concept."],
  },
  // Add more stamp details as needed...
];

export default function StampCollection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleImageClick = (index) => {
    setSelectedStamp(stampDetails[index]);
    setSelectedImage(stampImages[index]);
  };

  const closeModal = () => {
    setSelectedStamp(null);
    setSelectedImage(null);
  };

  async function exploreStampVision(formData) {
    const res = await postDataToAPI("philatelist/stampVision/", formData, true);
    
    if (res.success) {
      alert(res.data);
    } else {
      alert(res.error);
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      console.log(file)
      const formData = new FormData();
      formData.append('image', file);
      await exploreStampVision(formData);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFF" }}>
      <div className="container mx-auto p-4 space-y-8">
        {/* Carousel */}
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
                    <h2
                      className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-black text-center px-4 ${elsieSwashCaps.className}`}
                    >
                      {item.text}
                    </h2>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Search Bar */}
        <div className="w-full flex justify-center items-center gap-4">
          <div className="w-full relative">
            <Input type="text" placeholder="Search stamps..." className="pl-10" />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            name="image"
            id="file-upload"
          />
          <Button onClick={() => document.getElementById('file-upload').click()}>
            Explore Stamp Vision
          </Button>
        </div>

        {/* Section Header */}
        <h2 className="text-xl font-semibold">Trending this year</h2>
        <p className="text-gray-600 mb-8">
          Explore facts about popular stamps this year and stay updated.
        </p>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {stampImages.map((src, index) => (
            <Card
              key={index}
              onClick={() => handleImageClick(index)}
              className="overflow-hidden break-inside-avoid transition-transform duration-300 hover:scale-105 shadow-lg bg-white cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="w-full overflow-hidden rounded-md">
                  <img
                    src={src}
                    alt={`Stamp ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-center text-black">
                  {stampDetails[index]?.name || `Stamp ${index + 1}`}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for Stamp Details */}
      {selectedStamp && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Image */}
              <div className="w-full md:w-1/2 p-4">
                <img
                  src={selectedImage}
                  alt={selectedStamp.name}
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>

              {/* Right Side - Details */}
              <div className="w-full md:w-1/2 p-6 space-y-6">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>

                <h2 className="text-xl md:text-2xl font-bold">{selectedStamp.name}</h2>

                {/* Comments Section */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Comments</h3>
                  {selectedStamp.comments.map((comment, index) => (
                    <p key={index} className="text-gray-600">
                      - {comment}
                    </p>
                  ))}
                </div>

                {/* Additional Details */}
                <p className="text-gray-700 mb-4">{selectedStamp.caption}</p>
                <p className="text-gray-500 text-sm mb-4">{selectedStamp.time}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
