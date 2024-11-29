"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IndianRupee, ShoppingCart } from "lucide-react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const filterArray = ["Product Details", "About Artisan"];

// Sample product data
const product = {
  title: "India 1953 Telegraph Centenary MNH Miniature Sheet",
  description:
    "A beautiful and rare miniature sheet from 1953 commemorating the Telegraph Centenary. This piece features intricate designs and historical significance, making it a valuable addition to any stamp collection.",
  price: 2200,
  originalPrice: 2500,
  rating: 4.5,
  ratingCount: "15 Ratings",
  artisan: {
    name: "Maharashtra Postal Circle",
    profileImage: "/postaloffice.png",
    about:
      "Maharashtra Postal Circle is one of the largest postal circles in India, known for its extensive collection of rare and historical stamps.",
    otherArtisans: [
      "/postaloffice.png",
      "/postaloffice.png",
      "/postaloffice.png",
    ],
  },
  details: [
    { label: "Year", value: "1953" },
    { label: "Condition", value: "MNH (Mint Never Hinged)" },
    { label: "Type", value: "Miniature Sheet" },
    { label: "Theme", value: "Telegraph Centenary" },
    { label: "Rarity", value: "Rare" },
    { label: "Care", value: "Store in protective sleeve" },
  ],
  imageUrl: "/images/stamps/1.jpg",
};

// Helper function to truncate description
const truncateDescription = (description, maxLength = 300) => {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength) + "...";
};

// ProductCarousel component
function ProductCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  return (
    <Carousel className="w-full lg:w-[48vw] lg:h-[50vh]">
      <CarouselContent className="space-x-4 py-4 px-5">
        {[images].map((image, index) => (
          <Card
            key={index}
            className="h-[35vh] lg:h-[50vh] w-[75vw] lg:w-[47vw] shrink-0 border-none shadow-none relative"
          >
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              fill={true}
              className="object-contain rounded-xl"
            />
          </Card>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

// Main Page component
export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <main>
      <center className="h-fit w-full text-gray-900">
        <section className="flex flex-col lg:flex-row w-full lg:pb-16 space-y-4 lg:space-x-4 items-start lg:items-start justify-center lg:justify-start">
          <ProductCarousel images={product.imageUrl} />

          <div className="flex justify-center flex-col space-y-4 w-full lg:w-1/2 px-4">
            <h2 className="scroll-m-20 text-3xl lg:text-4xl font-semibold tracking-tight text-left w-full text-[#604234]">
              {product.title}
            </h2>

            <p className="text-sm text-gray-600 text-left h-20 overflow-hidden">
              {truncateDescription(product.description)}
            </p>

            <div className="flex items-center">
              <span className="text-yellow-400 text-2xl mr-2">★</span>
              <span className="font-bold">{product.rating}</span>
              <span className="text-gray-500 ml-2">{product.ratingCount}</span>
            </div>

            <div className="flex items-center">
              <span className="text-base font-bold text-gray-500">
                Sold By:
              </span>
              <span className="ml-2 text-sm font-semibold">
                {product.artisan.name}
              </span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#604234]/10 text-[#604234]">
                ✓
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex justify-start items-center space-x-2">
                <span className="text-3xl font-bold">₹ {product.price}</span>
                <span className="text-xl text-gray-500 line-through">
                  ₹ {product.originalPrice}
                </span>
              </div>
              <p className="text-sm text-left text-green-600">
                Inclusive of all taxes
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span>Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                >
                  -
                </Button>
                <span className="font-semibold w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1 text-white bg-[#604234] hover:bg-[#604234]/90">
                Buy Now
              </Button>
              <Button variant="outline" className="flex-1">
                Add to cart
              </Button>
            </div>
          </div>
        </section>

        <section className="flex flex-col w-full space-y-4 mb-20">
          <h1 className="text-start text-lg lg:text-2xl text-[#604234] lg:font-semibold font-medium tracking-tight">
            User Reviews
          </h1>
          <Carousel opts={{ dragFree: true }}>
            <CarouselContent className="w-full flex space-x-4 p-2 justify-start items-center">
              {[...Array(4)].map((_, index) => (
                <div
                  className="flex flex-col w-[80vw] lg:w-[32vw] h-fit rounded-xl bg-white p-6 border-2 space-y-4 border-gray-300 shrink-0"
                  key={index}
                >
                  <div className="w-full h-fit flex justify-start items-center space-x-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={product.artisan.profileImage} />
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-700">
                        {product.artisan.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          3 days ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm lg:text-base md:text-sm w-full text-justify text-gray-500">
                    The quality and authenticity of this stamp is exceptional.
                    The historical significance and preservation make it a
                    valuable addition to any collection.
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1">
                      <span>Helpful</span>
                      <span>(10)</span>
                    </button>
                    <button>Reply</button>
                  </div>
                </div>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex flex-col w-full space-y-4 mt-8">
            <h1 className="text-start text-lg lg:text-2xl text-[#604234] lg:font-semibold font-medium tracking-tight">
              Similar Products
            </h1>
            <Carousel opts={{ dragFree: true }}>
              <CarouselContent className="w-full flex space-x-6 p-2 justify-start items-center">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-[250px] h-fit rounded-xl bg-white p-4 border border-gray-300 shrink-0"
                  >
                    <div className="w-full h-[250px] mb-2 overflow-hidden rounded-lg group cursor-pointer">
                      <Image
                        src={`/images/stamps/${(index % 5) + 1}.jpg`}
                        alt={`Similar product ${index + 1}`}
                        width={250}
                        height={250}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-base text-left font-semibold">
                      Vintage Stamp Collection
                    </h3>
                    <p className="text-sm text-left text-gray-500">
                      Maharashtra Postal Circle
                    </p>
                    <p className="text-lg text-left font-bold mt-1">₹2,000</p>
                  </div>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      </center>

      {/* Mobile Footer */}
      <footer className="lg:hidden fixed bottom-0 w-full h-fit flex justify-between left-0 items-center bg-[#604234] p-5 text-white rounded-t-3xl">
        <span className="flex text-2xl font-bold items-center w-fit">
          <IndianRupee />
          {product.price}
        </span>
        <span className="flex text-2xl font-bold items-center space-x-2">
          <Button className="bg-white rounded-3xl p-2">
            <ShoppingCart color="#604234" />
          </Button>
          <Button className="bg-white rounded-3xl px-6 text-blue-950 text-sm font-bold">
            Buy Now
          </Button>
        </span>
      </footer>
    </main>
  );
}
