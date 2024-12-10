"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Elsie_Swash_Caps } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postDataToAPI } from "@/lib/api";
import Link from 'next/link';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

export const stampImages = [
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

export const stampDetails = [
  {
    name: "'75' and Flag",
    caption: "A commemorative stamp celebrating India's 75th year of independence",
    year: 1975,
    postalCircle: "Delhi Postal Circle",
    unitsProduced: "1.5 million",
    printingMethod: "Photogravure",
    denomination: "₹2",
    designer: "National Design Studio",
    paperType: "Watermarked stamp paper",
    perforations: "14 x 14.5",
    printingHouse: "India Security Press, Nashik",
    color: "Tricolor (Saffron, White, and Green)",
    backstory: "This stamp was issued to commemorate India's 75th year of independence. The design incorporates the national flag and the numeral '75', symbolizing the years of freedom. The stamp was part of a special series that celebrated India's progress since independence.",
    historicalContext: "The mid-1970s were a significant period in Indian postal history, with several commemorative stamps being issued to celebrate national achievements.",
    rarity: "Common",
    condition: "Mint",
    dimensions: "3.5 × 2.5 cm",
    marketValue: "₹1,200",
    certificateOfAuthenticity: "Yes"
  },
  {
    name: "'The Three Musicians', 1921",
    caption: "A cultural stamp featuring traditional Indian musicians",
    year: 1921,
    postalCircle: "Mumbai Postal Circle",
    unitsProduced: "500,000",
    printingMethod: "Lithography",
    denomination: "₹1",
    designer: "Ram Kumar",
    paperType: "Handmade Indian paper",
    perforations: "12 x 12",
    printingHouse: "British India Press, Bombay",
    color: "Sepia and Gold",
    backstory: "This stamp depicts three classical Indian musicians playing the sitar, tabla, and tambura. It was part of a series celebrating India's rich musical heritage and was designed by renowned artist Ram Kumar.",
    historicalContext: "During the 1920s, the Indian postal service began incorporating more cultural and artistic elements in stamp designs, moving away from purely administrative designs.",
    rarity: "Rare",
    condition: "Fine",
    dimensions: "4.0 × 3.0 cm",
    marketValue: "₹45,000",
    certificateOfAuthenticity: "Yes"
  },
  {
    name: "Taj Mahal Architectural Series",
    caption: "Part of the Indian Architectural Heritage series",
    year: 1949,
    postalCircle: "Agra Postal Circle",
    unitsProduced: "750,000",
    printingMethod: "Intaglio",
    denomination: "₹5",
    designer: "Archaeological Survey of India",
    paperType: "Cotton-based security paper",
    perforations: "13 x 13",
    printingHouse: "India Security Press, Nashik",
    color: "Deep Blue and Silver",
    backstory: "This stamp showcases the iconic Taj Mahal in its full glory. It was part of the first series of architectural monuments issued after independence, highlighting India's rich architectural heritage.",
    historicalContext: "Post-independence India sought to showcase its cultural monuments through postal stamps, making this series particularly significant.",
    rarity: "Uncommon",
    condition: "Very Fine",
    dimensions: "3.8 × 2.8 cm",
    marketValue: "₹25,000",
    certificateOfAuthenticity: "Yes"
  },
  {
    name: "First Indian Airmail",
    caption: "Commemorating India's first airmail service",
    year: 1911,
    postalCircle: "Allahabad Postal Circle",
    unitsProduced: "100,000",
    printingMethod: "Typography",
    denomination: "₹6 annas",
    designer: "British Post Office",
    paperType: "Wove paper",
    perforations: "14",
    printingHouse: "Survey of India Press",
    color: "Carmine Red",
    backstory: "This historic stamp marks the world's first official airmail service, which carried mail between Allahabad and Naini. The flight was piloted by Henri Pequet.",
    historicalContext: "The introduction of airmail service represented a significant advancement in India's postal system and marked the beginning of aviation history in India.",
    rarity: "Very Rare",
    condition: "Good",
    dimensions: "3.2 × 2.4 cm",
    marketValue: "₹150,000",
    certificateOfAuthenticity: "Yes"
  },
  {
    name: "Gandhi Centenary Issue",
    caption: "Commemorating Mahatma Gandhi's 100th birth anniversary",
    year: 1969,
    postalCircle: "National Issue",
    unitsProduced: "2 million",
    printingMethod: "Photogravure",
    denomination: "₹1",
    designer: "India Post Design Cell",
    paperType: "Unwatermarked paper",
    perforations: "13.5",
    printingHouse: "India Security Press",
    color: "Brown and Sepia",
    backstory: "This commemorative stamp was issued as part of Gandhi's centenary celebrations, featuring his iconic portrait and the spinning wheel symbol.",
    historicalContext: "1969 marked worldwide celebrations of Gandhi's centenary, with this stamp being one of India's contributions to the global commemoration.",
    rarity: "Common",
    condition: "Mint",
    dimensions: "3.6 × 2.6 cm",
    marketValue: "₹500",
    certificateOfAuthenticity: "Yes"
  },
  // Fill remaining with placeholder data but maintaining structure
  ...Array(5).fill({
    name: "Sample Stamp",
    caption: "Sample description",
    year: 2000,
    postalCircle: "Sample Circle",
    unitsProduced: "Sample quantity",
    printingMethod: "Sample method",
    denomination: "Sample value",
    designer: "Sample designer",
    paperType: "Sample paper",
    perforations: "Sample perforations",
    printingHouse: "Sample press",
    color: "Sample color",
    backstory: "Sample backstory text",
    historicalContext: "Sample historical context",
    rarity: "Sample rarity",
    condition: "Sample condition",
    dimensions: "Sample dimensions",
    marketValue: "Sample value",
    certificateOfAuthenticity: "Sample"
  })
];

const InfoCard = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

const StampDetailSection = ({ title, children }) => (
  <div className="mb-6">
    <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export default function StampCollection() {
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

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

  useEffect(() => {
    if (selectedStamp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedStamp]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full relative h-[70vh] bg-gradient-to-br from-white via-[#fff7e5] to-[#fff7e5]/70 overflow-hidden">
        {/* Floating Background Stamps */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{
                opacity: 0.1,
                x: Math.random() * 100,
                y: Math.random() * 100,
              }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [0.6, 0.8, 0.6],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
              }}
            >
              <img
                src={stampImages[index % stampImages.length]}
                alt=""
                className="w-16 h-16 object-cover rounded-md opacity-20"
              />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="container mx-auto h-full relative">
          <div className="flex flex-col md:flex-row h-full items-center justify-between px-4 md:px-8">
            {/* Left Content */}
            <div className="md:w-1/2 space-y-8 relative z-10">
              <h1 className={`text-5xl md:text-7xl font-bold text-gray-800 leading-tight ${elsieSwashCaps.className}`}>
                Discover the Art of
                <span className="block text-[#b39656]">Philately</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-xl">
                Explore our extensive collection of rare and historic stamps, each telling a unique story of cultural heritage.
              </p>

              {/* Stats */}
              <div className="flex gap-8">
                {[
                  { value: "10K+", label: "Stamps" },
                  { value: "150+", label: "Countries" },
                  { value: "200+", label: "Years" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-[#b39656]">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Search and Upload */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Input 
                    type="text" 
                    placeholder="Search stamps..." 
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-[#e6d5b0] focus:border-[#b39656] bg-white" 
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button 
                  onClick={() => document.getElementById('file-upload').click()}
                  className="bg-[#b39656] hover:bg-[#997f48] text-white px-6"
                >
                  Upload
                </Button>
              </div>
            </div>

            {/* Right Content - Static Images */}
            <div className="md:w-1/2 relative hidden md:block h-[400px]">
              <div className="relative w-full h-[400px]">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      top: `${index * 40}px`,
                      right: `${index * 40}px`,
                      zIndex: 3 - index,
                    }}
                  >
                    <img
                      src={stampImages[index]}
                      alt={`Featured Stamp ${index + 1}`}
                      className="w-64 h-64 object-cover rounded-lg shadow-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Stamp Gallery Section with Flex Layout */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Featured Stamps</h2>
        <div className="flex flex-wrap gap-6">
          {stampImages.map((image, index) => (
            <Link key={index} href={`/catalog/${index}`}>
              <div 
                className="w-[300px] h-[400px] relative group cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                {/* Card Container */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Image Section */}
                  <div className="h-[65%] overflow-hidden">
                    <img
                      src={image}
                      alt={`Stamp ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Rarity Badge */}
                    {stampDetails[index] && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                        <span className="text-sm font-semibold text-gray-900">
                          {stampDetails[index].rarity}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="absolute bottom-0 w-full h-[35%] p-4 bg-white">
                    {stampDetails[index] && (
                      <>
                        {/* Title and Year */}
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                            {stampDetails[index].name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {stampDetails[index].year}
                          </p>
                        </div>

                        {/* Quick Info */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-amber-50 text-amber-800 text-xs font-medium rounded-md">
                            {stampDetails[index].condition}
                          </span>
                          <span className="px-2 py-1 bg-blue-50 text-blue-800 text-xs font-medium rounded-md">
                            {stampDetails[index].printingMethod}
                          </span>
                        </div>

                        {/* Price and Details */}
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-[#b39656]">
                            {stampDetails[index].marketValue}
                          </span>
                          <button 
                            className="px-3 py-1 text-sm text-[#b39656] border border-[#b39656] rounded-full 
                                     hover:bg-[#b39656] hover:text-white transition-colors duration-300"
                          >
                            View Details
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedStamp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-5xl h-[90vh] flex flex-col">
              {/* Header - Fixed */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedStamp.name}</h3>
                    <p className="text-gray-600">{selectedStamp.caption}</p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm font-medium">
                        {selectedStamp.rarity}
                      </span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm font-medium">
                        {selectedStamp.condition}
                      </span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium">
                        Year: {selectedStamp.year}
                      </span>
                      <span className="px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm font-medium">
                        Value: {selectedStamp.marketValue}
                      </span>
                    </div>
                    
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Area - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex h-full">
                  {/* Left Column - Image */}
                  <div className="w-1/2 p-6 border-r border-gray-100">
                    <div className="relative h-full">
                      <img
                        src={selectedImage}
                        alt={selectedStamp.name}
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                        <p className="text-sm font-medium text-gray-800">
                          Dimensions: {selectedStamp.dimensions}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="w-1/2 p-6">
                    <StampDetailSection title="Basic Information">
                      <div className="grid grid-cols-2 gap-4">
                        <InfoCard label="Denomination" value={selectedStamp.denomination} />
                        <InfoCard label="Color" value={selectedStamp.color} />
                        <InfoCard label="Postal Circle" value={selectedStamp.postalCircle} />
                        <InfoCard label="Units Produced" value={selectedStamp.unitsProduced} />
                      </div>
                    </StampDetailSection>

                    <StampDetailSection title="Historical Context">
                      <p className="text-gray-600">{selectedStamp.historicalContext}</p>
                    </StampDetailSection>

                    <StampDetailSection title="Backstory">
                      <p className="text-gray-600">{selectedStamp.backstory}</p>
                    </StampDetailSection>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}