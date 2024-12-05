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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Philatelic Exchange</h1>

      {/* Upload Button */}
      <button
        className="bg-black text-white px-4 py-2 rounded-md mb-6 hover:bg-gray-800"
        onClick={toggleUploadForm}
      >
        {uploadFormVisible ? "Close Upload Form" : "Upload Your Material"}
      </button>

      {/* Upload Form */}
      {uploadFormVisible && (
        <form
          className="bg-white p-6 rounded-md shadow-md mb-6"
          onSubmit={handleUpload}
        >
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border border-gray-300 rounded-md"
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
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Upload
          </button>
        </form>
      )}

      {/* Filters Section */}
      <div className="mb-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-grow p-2 border border-gray-300 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          <option value="">Select Theme</option>
          <option value="Historical Events">Historical Events</option>
          <option value="Exhibition">Exhibition</option>
          <option value="Famous Personalities">Famous Personalities</option>
        </select>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
        >
          <option value="">Select Condition</option>
          <option value="Mint">Mint</option>
          <option value="Used">Used</option>
        </select>
      </div>

      {/* Display Philatelic Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-md shadow-lg"
            onClick={() => handleItemClick(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-4">{item.name}</h2>
            <p className="text-sm text-gray-500">₹{item.price}</p>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <p className="text-gray-500 mt-6 text-center">
          No items found. Try adjusting your filters.
        </p>
      )}

      {/* Modal for Item Details */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
            <p className="text-gray-700 mb-2">{selectedItem.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Theme:</strong> {selectedItem.theme}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Condition:</strong> {selectedItem.condition}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Year:</strong> {selectedItem.year}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Owner:</strong> {selectedItem.owner}
            </p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => placeOrder(selectedItem)}
            >
              Place Order
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
