"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

// API service for marketplace
const api = {
  getProducts: async (filters = {}) => {
    // Temporary: using static data for demo
    return initialPhilatelicItems;
    
    // TODO: Replace with actual API call
    // const queryString = new URLSearchParams(filters).toString();
    // return await fetch(`/api/products?${queryString}`).then(res => res.json());
  },

  uploadProduct: async (productData) => {
    // TODO: Implement product upload API
    // return await fetch('/api/products', {
    //   method: 'POST',
    //   body: JSON.stringify(productData),
    // }).then(res => res.json());
  },

  searchProducts: async (query) => {
    // TODO: Implement search API
    // return await fetch(`/api/products/search?q=${query}`).then(res => res.json());
  }
};

// Initial data (will be replaced with API data)
export const initialPhilatelicItems = [
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
  const router = useRouter();

  // States
  const [philatelicItems, setPhilatelicItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [uploadFormVisible, setUploadFormVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, [selectedTheme, selectedCondition]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const filters = {
        theme: selectedTheme,
        condition: selectedCondition,
      };
      
      const products = await api.getProducts(filters);
      setPhilatelicItems(products);
    } catch (err) {
      setError('Failed to fetch products: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Search products
  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchQuery) {
        try {
          setIsLoading(true);
          const results = await api.searchProducts(searchQuery);
          setPhilatelicItems(results);
        } catch (err) {
          setError('Search failed: ' + err.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        fetchProducts();
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

  // Handlers
  const handleItemClick = (item) => {
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    router.push(`/dak-exchange/${slug}?id=${item.id}`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('File size too large. Please choose a file under 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewItem(prev => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      
      // Validation
      if (!newItem.name || !newItem.image || !newItem.price) {
        throw new Error('Please fill in all required fields');
      }

      // Upload product
      await api.uploadProduct(newItem);
      
      // Reset form
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
      
      // Refresh products
      fetchProducts();
      
      alert('Product uploaded successfully!');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Loading state
  if (isLoading && philatelicItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff8e8] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-[#8B4513]">Loading Products...</h1>
        </div>
      </div>
    );
  }

  // Error state
  if (error && philatelicItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff8e8] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-[#8B4513] mb-2">Oops! Something went wrong</h1>
          <p className="text-[#8B4513]/70 mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="text-[#8B4513] hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8e8]">
      {/* Your existing JSX remains the same, but update the handlers and add loading states */}
      {/* Example of updated upload form button: */}
      <button
        type="submit"
        disabled={isUploading}
        className="bg-green-500 text-white px-6 py-3 rounded-lg mt-6 
                 hover:bg-green-600 transition-colors duration-200 w-full
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>

      {/* Add loading overlay for search */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
        </div>
      )}

      {/* Rest of your components... */}
    </div>
  );
}
