"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/carousal1.jpg",
      title: "Welcome to Dak",
      description: "Your digital journey starts here",
    },
    {
      image: "/carousal1.jpg",
      title: "Connect & Collaborate",
      description: "Work together seamlessly",
    },
    {
      image: "/carousal1.jpg",
      title: "Secure & Reliable",
      description: "Your data is safe with us",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full relative overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500
            ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover h-full rounded-[50px]"
            />
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-2xl font-bold">{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300
              ${index === currentSlide ? "w-8 bg-black" : "w-2 bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
