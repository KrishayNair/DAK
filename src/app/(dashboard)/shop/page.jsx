"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronRight, Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Elsie_Swash_Caps } from "next/font/google";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import CollectionGrid from "./components/CollectionGrid";
import ProductsGrid from "./components/ProductGrid";
import ProductCard from "./components/ProductCard";

import { fetchFromAPI } from "@/lib/api";

// import { useCart } from "@/contexts/CartContext";
// Data
const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

// Components
const HeroSection = () => (
  <section className="relative w-full bg-gradient-to-b from-[#fff7e5] to-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 ${elsieSwashCaps.className}`}>
            Discover Rare Philatelic Treasures
          </h2>
          <p className="text-lg text-gray-600">
            Explore our curated collection of unique stamps, first day covers, and miniature sheets from around the world.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            <Button className="bg-[#8B6E5B] hover:bg-[#7D6352] text-white px-8 py-6 rounded-full text-lg">
              Start Collecting
            </Button>
            <Button variant="outline" className="px-8 py-6 rounded-full text-lg">
              View Catalog
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square relative w-[400px] h-[400px] mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#8B6E5B] opacity-40"
            />
            <div className="absolute inset-0 rounded-full overflow-hidden cover-fit p-2">
              <img
                src="/shophead.jpg"
                alt="Featured Stamp Collection"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Decorative elements */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ delay: 1 }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute top-1/4 left-4 w-24 h-24 border border-[#8B6E5B] rounded-lg rotate-12" />
      <div className="absolute bottom-1/4 right-4 w-32 h-32 border border-[#8B6E5B] rounded-lg -rotate-12" />
    </motion.div>
  </section>
);

const SearchSection = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search function
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchQuery !== undefined) {  // Check if searchQuery is defined
        setIsLoading(true);
        
        try {
          if (searchQuery.trim()) {
            const response = await fetchFromAPI('/product/');
            
            if (response.success) {
              const filteredProducts = response.data.filter(product => 
                product.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
              );
              onSearch(filteredProducts);
            } else {
              console.error("Search failed:", response.message);
              onSearch([]);
            }
          } else {
            // If search is empty, reset to show all products
            onSearch([]);
          }
        } catch (error) {
          console.error("Search failed:", error);
          onSearch([]);
        } finally {
          setIsLoading(false);
        }
      }
    }, 300); // 300ms delay before searching

    // Cleanup timeout on component unmount or when searchQuery changes
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, onSearch]);

  return (
    <section className="w-full bg-[#FFFFF] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-100 pl-12 h-14 rounded-full text-lg border-none"
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#8B6E5B]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ item, className = "" }) => {
  const router = useRouter();

  const handleClick = () => {
    if (item.title) {
      const slug = item.title.toLowerCase().replace(/\s+/g, "-");
      router.push(`/shop/${slug}`);
    } else if (item.id) {
      // Handle product navigation if needed
      router.push(`/shop/product/${item.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer group rounded-3xl ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${item.image})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute bottom-8 left-6 text-white">
        <h3 className="text-xl font-semibold mb-2">
          {item.title || item.name}
        </h3>
        <p className="text-sm text-gray-200 line-clamp-2">
          {item.description || item.price}
        </p>
      </div>
    </div>
  );
};

// Add this new component for the side navigation
const SideNavigation = ({ onProductsFiltered }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategoryParam = (categoryName) => {
    // Map category names to their exact URL parameters
    const categoryMap = {
      'Sheetlet': 'sheetlet',
      'Unique Stamp': 'unique-stamp',
      'Block of 4 stamps': 'block-of-4-stamps',
      // Add other categories as needed
    };

    // Return the mapped value if it exists, otherwise format the category name
    return categoryMap[categoryName] || (categoryName ? categoryName.toLowerCase().replace(/\s+/g, '-') : '');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetchFromAPI('collection/');
        if (response.success) {
          // Add static categories if they don't exist in the API response
          const staticCategories = [
            { id: 'single-stamp', name: 'Single Stamp' },
            { id: 'first-day-cover', name: 'first day cover' },
            { id: 'unique-stamp', name: 'Unique Stamp' },
            { id: 'block-of-4-stamps', name: 'Block of 4 stamps' },
            
            { id: 'sheetlet', name: 'Sheetlet' },
            // Add more categories here as needed
          ];
          
          // Combine API categories with static categories
          const allCategories = [...staticCategories, ...response.data];
          
          // Remove duplicates while preserving order
          const seen = new Set();
          const uniqueCategories = allCategories.filter(category => {
            const duplicate = seen.has(category.name);
            seen.add(category.name);
            return !duplicate;
          });
          
          setCategories(uniqueCategories);
          console.log('Fetched categories:', uniqueCategories);
        } else {
          console.error('Unexpected API response format:', response);
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = async (categoryId) => {
    console.log('Previous selected categories:', selectedCategories);
    
    // Find the category object
    const category = categories.find(c => c.id === categoryId || c._id === categoryId);
    
    if (!category) {
      console.error('Category not found:', categoryId);
      return;
    }

    console.log('Found category:', category);

    // Get the category parameter string
    const categoryParam = getCategoryParam(category.name || category.title);
    
    console.log('Category param generated:', categoryParam);
    
    // If category param is already selected, unselect it
    const newSelectedCategories = selectedCategories.includes(categoryParam)
      ? []  // Clear selection
      : [categoryParam];  // Select new category param
    
    console.log('Category being toggled:', {
      categoryId,
      categoryName: category.name || category.title,
      categoryParam,
      newSelection: newSelectedCategories
    });
    
    setSelectedCategories(newSelectedCategories);
    
    // Apply filters immediately after category selection
    await applyFilters();
  };

  const applyFilters = async (e) => {
    if (e) e.preventDefault();
    
    try {
      // Build the URL string directly to ensure exact format
      let url = `product/?min_price=${minPrice}&max_price=${maxPrice}`;
      
      // Add collection parameter if we have a selected category
      if (selectedCategories.length > 0 && selectedCategories[0]) {
        url += `&collection=${selectedCategories[0]}`;
        console.log('Applied category filter:', {
          selectedCategory: selectedCategories[0]
        });
      }

      console.log('Requesting URL:', url);

      const response = await fetchFromAPI(url);
      if (response.success) {
        onProductsFiltered(response.data);
      } else {
        console.error('Failed to filter products:', response.message);
        onProductsFiltered([]);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
      onProductsFiltered([]);
    }
  };

  // Update price handlers to use async/await
  const handleMinChange = async (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100);
    setMinPrice(value);
    await applyFilters(); // Wait for state to update and then apply filters
  };

  const handleMaxChange = async (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 100);
    setMaxPrice(value);
    await applyFilters(); // Wait for state to update and then apply filters
  };

  useEffect(() => {
    // Apply filters whenever price range or selected categories change
    applyFilters();
  }, [minPrice, maxPrice, selectedCategories]);

  // Add useEffect to log state changes
  useEffect(() => {
    console.log('Selected categories updated:', selectedCategories);
  }, [selectedCategories]);

  const isSelected = (categoryId) => {
    const category = categories.find(c => c.id === categoryId || c._id === categoryId);
    if (!category) return false;
    
    const categoryParam = getCategoryParam(category.name || category.title);
    return selectedCategories.includes(categoryParam);
  };

  return (
    <div className="w-full md:w-[380px] bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col h-[calc(100vh-120px)] sticky top-24">
      {/* Price Range Filter - Fixed at top */}
      <div className="flex-shrink-0 mb-6 bg-gray-50 p-4 rounded-xl">
        <h4 className="text-lg font-semibold mb-4 text-[#8B6E5B] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.94a7 7 0 119.9 9.9 7 7 0 01-9.9-9.9zM10 4a6 6 0 100 12 6 6 0 000-12zm0 2a1 1 0 011 1v2.586l1.707 1.707a1 1 0 01-1.414 1.414l-2-2A1 1 0 019 10V7a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Price Range
        </h4>
        
        {/* Price display */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-xs text-gray-500 mb-1">Min Price</span>
            <span className="text-sm font-semibold text-[#8B6E5B]">₹{minPrice.toLocaleString()}</span>
          </div>
          <div className="h-[2px] w-8 bg-gray-300"></div>
          <div className="flex flex-col items-center bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-xs text-gray-500 mb-1">Max Price</span>
            <span className="text-sm font-semibold text-[#8B6E5B]">₹{maxPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Slider container */}
        <div className="relative h-2 mt-4">
          {/* Track background */}
          <div className="absolute inset-0 h-1.5 mt-0.5 w-full bg-gray-200 rounded-full"></div>
          
          {/* Active track */}
          <div
            className="absolute inset-0 h-1.5 mt-0.5 bg-gradient-to-r from-[#8B6E5B] to-[#A68977] rounded-full"
            style={{
              left: `${(minPrice / 5000) * 100}%`,
              right: `${100 - (maxPrice / 5000) * 100}%`,
            }}
          ></div>

          {/* Range inputs */}
          <input
            type="range"
            min="0"
            max="5000"
            value={minPrice}
            step="100"
            onChange={handleMinChange}
            className="absolute inset-0 w-full appearance-none pointer-events-none bg-transparent z-20
              [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer 
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#8B6E5B] 
              [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(139,110,91,0.1)] 
              [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:shadow-[0_0_0_6px_rgba(139,110,91,0.2)]
              [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white 
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer 
              [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#8B6E5B] 
              [&::-moz-range-thumb]:shadow-[0_0_0_4px_rgba(139,110,91,0.1)]
              [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
              [&::-moz-range-thumb]:hover:shadow-[0_0_0_6px_rgba(139,110,91,0.2)]"
          />
          <input
            type="range"
            min="0"
            max="5000"
            value={maxPrice}
            step="100"
            onChange={handleMaxChange}
            className="absolute inset-0 w-full appearance-none pointer-events-none bg-transparent z-20
              [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer 
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#8B6E5B] 
              [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(139,110,91,0.1)] 
              [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:shadow-[0_0_0_6px_rgba(139,110,91,0.2)]
              [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white 
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer 
              [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#8B6E5B] 
              [&::-moz-range-thumb]:shadow-[0_0_0_4px_rgba(139,110,91,0.1)]
              [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
              [&::-moz-range-thumb]:hover:shadow-[0_0_0_6px_rgba(139,110,91,0.2)]"
          />
        </div>
      </div>

      {/* Categories Header - Fixed */}
      <h3 className="flex-shrink-0 text-xl md:text-2xl font-semibold mb-4 text-[#8B6E5B] border-b pb-4 text-center">
        Categories {isLoading && <span className="text-sm text-gray-500">(Loading...)</span>}
      </h3>
      
      {/* Two-column Categories Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-2 -mr-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B6E5B]"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : categories.length === 0 ? (
          <div className="text-gray-500 text-center py-4">No categories found</div>
        ) : (
          <div className="grid grid-cols-2 gap-2 pb-4 px-2">
            {categories.map((category) => (
              <button
                key={category.id || category._id}
                onClick={() => toggleCategory(category.id || category._id)}
                className={`flex items-center justify-center text-center p-2 rounded-lg transition-all duration-200 font-medium text-sm
                  ${isSelected(category.id || category._id)
                    ? 'bg-[#8B6E5B] text-white'
                    : 'text-gray-600 hover:text-[#8B6E5B] hover:bg-[#fff7e5]'
                  }`}
              >
                <div className={`flex-shrink-0 w-4 h-4 border-2 rounded mr-2 flex items-center justify-center
                  ${isSelected(category.id || category._id)
                    ? 'border-white bg-white'
                    : 'border-[#8B6E5B]'
                  }`}
                >
                  {isSelected(category.id || category._id) && (
                    <svg className="w-3 h-3 text-[#8B6E5B]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  )}
                </div>
                <span className="truncate text-xs">{category.name || category.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Apply Filters Button - Fixed at bottom */}
      <button
        onClick={applyFilters}
        disabled={isLoading}
        className={`flex-shrink-0 mt-4 w-full py-2 rounded-lg transition-colors duration-200 text-center
          ${isLoading 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-[#8B6E5B] hover:bg-[#7D6352] text-white'
          }`}
      >
        {isLoading ? 'Loading...' : 'Apply Filters'}
      </button>
    </div>
  );
};

// Update the Page component to control when ProductsGrid should render
export default function Page() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  // Update handleProductsFiltered to store filtered data
  const handleProductsFiltered = (products) => {
    setFilteredProducts(products); // Store the filtered products
    setSearchResults([]);
    setIsFiltered(true);
    setSearchQuery("");
  };

  const handleSearch = (results) => {
    if (!isFiltered) { // Only allow search if not in filtered state
      setSearchResults(results);
      setFilteredProducts([]);
    }
  };

  const displayProducts = () => {
    if (isFiltered) {
      return (
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <CardTitle className="text-3xl mb-2">Filtered Products</CardTitle>
            <CardDescription className="text-lg">
              Showing {filteredProducts.length} filtered results
            </CardDescription>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        </div>
      );
    } else if (!isFiltered) {
      return <ProductsGrid />;
    }
  };

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-full">
        <HeroSection />
        <SearchSection 
          onSearch={handleSearch} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <div className="max-w-[1920px] mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 relative">
            <aside className="md:w-[380px] flex-shrink-0 relative">
              <SideNavigation onProductsFiltered={handleProductsFiltered} />
            </aside>
            
            <div className="flex-1 max-w-[1540px]">
              {displayProducts()}
              {!isFiltered && !searchResults.length && <CollectionGrid />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

