"use client";

import React, { useState } from "react";

// Initial Dummy Data for Philatelic Materials
const initialPhilatelicItems = [
  {
    id: 1,
    name: "Rare 1953 Telegraph Centenary Stamp",
    image: "/images/stamps/1.jpg",
    description:
      "Commemorates the centenary of the telegraph service in India.",
    price: 2500,
    condition: "Mint",
    country: "India",
    year: 1953,
    theme: "Historical Events",
    owner: "John Doe",
  },
  {
    id: 2,
    name: "Limited Edition 1973 Indipex Miniature Sheet",
    image: "/images/stamps/2.jpg",
    description:
      "A special miniature sheet released during the Indipex 1973 exhibition.",
    price: 1800,
    condition: "Used",
    country: "India",
    year: 1973,
    theme: "Exhibition",
    owner: "Jane Smith",
  },
  {
    id: 3,
    name: "Gandhi 1948 Commemorative Stamp",
    image: "/images/stamps/3.jpg",
    description: "Issued in memory of Mahatma Gandhi after his assassination.",
    price: 3000,
    condition: "Mint",
    country: "India",
    year: 1948,
    theme: "Famous Personalities",
    owner: "Rajesh Kumar",
  },
  {
    id: 4,
    name: "Indian Independence 1947 Stamp",
    image: "/images/stamps/4.jpg",
    description: "Celebrating India's independence from British rule.",
    price: 3200,
    condition: "Mint",
    country: "India",
    year: 1947,
    theme: "Historical Events",
    owner: "Asha Mehta",
  },
  {
    id: 5,
    name: "World Philatelic Exhibition 1985 Stamp",
    image: "/images/stamps/5.jpg",
    description:
      "Issued for the World Philatelic Exhibition held in New Delhi.",
    price: 2000,
    condition: "Used",
    country: "India",
    year: 1985,
    theme: "Exhibition",
    owner: "Kiran Verma",
  },
];

export default function ExchangePage() {
  const [philatelicItems, setPhilatelicItems] = useState(
    initialPhilatelicItems
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [uploadFormVisible, setUploadFormVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    image: null,
    description: "",
    price: "",
    condition: "",
    year: "",
    theme: "",
    owner: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const filteredItems = philatelicItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedTheme ? item.theme === selectedTheme : true) &&
      (selectedCondition ? item.condition === selectedCondition : true)
    );
  });

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const placeOrder = (item) => {
    alert(`Order placed successfully for: ${item.name}`);
  };

  const toggleUploadForm = () => {
    setUploadFormVisible((prev) => !prev);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewItem((prevState) => ({
          ...prevState,
          image: reader.result, // Store the base64 image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setPhilatelicItems((prevItems) => [
      ...prevItems,
      { id: prevItems.length + 1, ...newItem },
    ]);
    setNewItem({
      name: "",
      image: null,
      description: "",
      price: "",
      condition: "",
      year: "",
      theme: "",
      owner: "",
    });
    setImagePreview(null);
    setUploadFormVisible(false);
    alert("Philatelic material uploaded successfully!");
  };

  return (
    <div className="min-h-screen bg-[#fff8e8]">
      {/* Hero Section */}
      <div className="relative h-[50vh] mb-12 overflow-hidden ">
        {/* Background Pattern */}
        
        
        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center animate-fadeIn text-[#342f2f] ">
            Philatelic Exchange
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl mx-auto mb-8 animate-fadeIn animation-delay-200 text-[#342f2f]">
            Discover rare and unique stamps from collectors around the world
          </p>
            <div className="flex gap-4 animate-fadeIn animation-delay-400">
            <button 
              onClick={() => document.getElementById('marketplace').scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#8B4513] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              Explore Collection
            </button>
            <button 
              onClick={toggleUploadForm}
              className="bg-transparent border-2 border-[#8B4513] text-[#8B4513] px-8 py-3 rounded-full hover:bg-[#8B4513] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Sell Stamps
            </button>
          </div>
        </div>

        {/* Animated Stamp Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="stamp-1 absolute w-16 h-16 opacity-40 animate-float">
            <img src="/collage.png" alt="" className="w-full h-full" />
          </div>
          <div className="stamp-2 absolute w-20 h-20 opacity-40 animate-float animation-delay-1000">
            <img src="/collage.png" alt="" className="w-full h-full" />
          </div>
          <div className="stamp-3 absolute w-24 h-24 opacity-40 animate-float animation-delay-2000">
            <img src="/collage.png" alt="" className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8" id="marketplace">
        {/* Upload Form - Updated styling */}
        {uploadFormVisible && (
          <form
            className="bg-white p-8 rounded-lg shadow-lg mb-8 max-w-2xl mx-auto"
            onSubmit={handleUpload}
          >
            <div className="grid gap-6">
              <input
                type="text"
                placeholder="Name"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
              {/* Image Upload Input */}
              <input
                type="file"
                className="p-2 border border-gray-300 rounded-md"
                onChange={handleImageUpload}
                accept="image/*"
                required
              />
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <textarea
                placeholder="Description"
                className="p-2 border border-gray-300 rounded-md"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                required
              ></textarea>
              <input
                type="number"
                placeholder="Price"
                className="p-2 border border-gray-300 rounded-md"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Condition (e.g., Mint, Used)"
                className="p-2 border border-gray-300 rounded-md"
                value={newItem.condition}
                onChange={(e) =>
                  setNewItem({ ...newItem, condition: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Year"
                className="p-2 border border-gray-300 rounded-md"
                value={newItem.year}
                onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Theme"
                className="p-2 border border-gray-300 rounded-md"
                value={newItem.theme}
                onChange={(e) =>
                  setNewItem({ ...newItem, theme: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Owner"
                className="p-2 border border-gray-300 rounded-md"
                value={newItem.owner}
                onChange={(e) =>
                  setNewItem({ ...newItem, owner: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-green-600 transition-colors duration-200 w-full"
            >
              Upload
            </button>
          </form>
        )}

        {/* Filters Section - Updated styling */}
        <div className="mb-8 flex flex-wrap gap-4 max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white min-w-[200px]"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option value="">Select Theme</option>
            <option value="Historical Events">Historical Events</option>
            <option value="Exhibition">Exhibition</option>
            <option value="Famous Personalities">Famous Personalities</option>
          </select>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white min-w-[200px]"
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
          >
            <option value="">Select Condition</option>
            <option value="Mint">Mint</option>
            <option value="Used">Used</option>
          </select>
        </div>

        {/* Display Philatelic Items - Enhanced styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group relative"
              onClick={() => handleItemClick(item)}
            >
              {/* Image Container with Hover Effect */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-64 w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* Condition Badge */}
                <span className="absolute top-4 right-4 bg-[#8B4513] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.condition}
                </span>
                {/* Year Badge */}
                <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {item.year}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title and Price */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#8B4513] transition-colors duration-300 mb-2">
                    {item.name}
                  </h2>
                  <p className="text-2xl font-bold text-[#8B4513]">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>

                {/* Description with Gradient */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Footer Info */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="px-3 py-1 bg-[#8B4513]/10 text-[#8B4513] rounded-full text-sm font-medium">
                    {item.theme}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Owner: {item.owner}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B4513]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* No Results - Enhanced styling */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Items Found
            </h3>
            <p className="text-gray-500 text-lg">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}

        {/* Modal - Updated styling */}
        {selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedItem.name}</h2>
              <p className="text-gray-700 mb-4 text-lg">{selectedItem.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <p className="text-gray-600"><strong>Theme:</strong> {selectedItem.theme}</p>
                <p className="text-gray-600"><strong>Condition:</strong> {selectedItem.condition}</p>
                <p className="text-gray-600"><strong>Year:</strong> {selectedItem.year}</p>
                <p className="text-gray-600"><strong>Owner:</strong> {selectedItem.owner}</p>
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200"
                  onClick={() => placeOrder(selectedItem)}
                >
                  Place Order
                </button>
                <button
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
