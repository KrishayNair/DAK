// "use client";

// import React, { useState, useEffect } from "react";
// import { Search, ChevronRight, Star, ShoppingCart, Minus, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { CardTitle, CardDescription } from "@/components/ui/card";
// import { Elsie_Swash_Caps } from "next/font/google";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// import CollectionGrid from "./components/CollectionGrid";

// import { fetchFromAPI } from "@/lib/api";

// // import { useCart } from "@/contexts/CartContext";
// // Data
// const elsieSwashCaps = Elsie_Swash_Caps({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// const products = [
//   {
//     id: 1,
//     name: "India 1973 Indipex Mini Miniature Sheet",
//     price: "₹2,200.00",
//     image: "images/stamps/1.jpg",
//   },
//   {
//     id: 2,
//     name: "India 1973 Indipex Mini Miniature Sheet",
//     price: "₹2,200.00",
//     image: "images/stamps/2.jpg",
//   },
//   {
//     id: 3,
//     name: "India 1973 Indipex Mini Miniature Sheet",
//     price: "₹2,200.00",
//     image: "images/stamps/3.jpg",
//   },
//   {
//     id: 4,
//     name: "India 1973 Indipex Mini Miniature Sheet",
//     price: "₹2,200.00",
//     image: "images/stamps/4.jpg",
//   },
//   {
//     id: 5,
//     name: "India 1973 Indipex Mini Miniature Sheet",
//     price: "₹2,200.00",
//     image: "images/stamps/5.jpg",
//   },
// ];

// const categories = [
//   {
//     id: 1,
//     title: "Miniature Sheets",
//     description: "A special page of stamps on a collectible theme",
//     image: "/collage.png",
//   },
//   {
//     id: 2,
//     title: "Setenants",
//     description: "Two or more attached stamps of different designs",
//     image: "/collage.png",
//   },
//   {
//     id: 3,
//     title: "First Day Cover",
//     description: "Special envelope for stamp's first day of issue",
//     image: "/collage.png",
//   },
//   {
//     id: 4,
//     title: "Miniature Sheets",
//     description: "A special page of stamps on a collectible theme",
//     image: "/collage.png",
//   },
//   {
//     id: 5,
//     title: "Miniature Sheets",
//     description: "A special page of stamps on a collectible theme",
//     image: "/collage.png",
//   },
// ];

// // Components
// const HeroSection = () => (
//   <section className="relative w-full bg-gradient-to-b from-[#fff7e5] to-white py-16">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="space-y-6"
//         >
//           <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 ${elsieSwashCaps.className}`}>
//             Discover Rare Philatelic Treasures
//           </h2>
//           <p className="text-lg text-gray-600">
//             Explore our curated collection of unique stamps, first day covers, and miniature sheets from around the world.
//           </p>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="flex gap-4"
//           >
//             <Button className="bg-[#8B6E5B] hover:bg-[#7D6352] text-white px-8 py-6 rounded-full text-lg">
//               Start Collecting
//             </Button>
//             <Button variant="outline" className="px-8 py-6 rounded-full text-lg">
//               View Catalog
//             </Button>
//           </motion.div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           className="relative"
//         >
//           <div className="aspect-square relative w-[400px] h-[400px] mx-auto">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//               className="absolute inset-0 rounded-full border-2 border-dashed border-[#8B6E5B] opacity-40"
//             />
//             <div className="absolute inset-0 rounded-full overflow-hidden cover-fit p-2">
//               <img
//                 src="/shophead.jpg"
//                 alt="Featured Stamp Collection"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>

//     {/* Decorative elements */}
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 0.1 }}
//       transition={{ delay: 1 }}
//       className="absolute inset-0 overflow-hidden pointer-events-none"
//     >
//       <div className="absolute top-1/4 left-4 w-24 h-24 border border-[#8B6E5B] rounded-lg rotate-12" />
//       <div className="absolute bottom-1/4 right-4 w-32 h-32 border border-[#8B6E5B] rounded-lg -rotate-12" />
//     </motion.div>
//   </section>
// );

// const SearchSection = () => (
//   <section className="w-full bg-[#FFFFF] py-12">
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="space-y-8">
//         {/* Search Bar */}
//         <div className="relative">
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <Input
//             placeholder="Search"
//             className="w-full bg-gray-100 pl-12 h-14 rounded-full text-lg border-none"
//           />
//         </div>
//       </div>
//     </div>
//   </section>
// );

// const BentoCard = ({ item, className = "" }) => {
//   const router = useRouter();

//   const handleClick = () => {
//     if (item.title) {
//       const slug = item.title.toLowerCase().replace(/\s+/g, "-");
//       router.push(`/shop/${slug}`);
//     } else if (item.id) {
//       // Handle product navigation if needed
//       router.push(`/shop/product/${item.id}`);
//     }
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className={`relative overflow-hidden cursor-pointer group rounded-3xl ${className}`}
//     >
//       <div
//         className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
//         style={{
//           backgroundImage: `url(${item.image})`,
//         }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
//       <div className="absolute bottom-8 left-6 text-white">
//         <h3 className="text-xl font-semibold mb-2">
//           {item.title || item.name}
//         </h3>
//         <p className="text-sm text-gray-200 line-clamp-2">
//           {item.description || item.price}
//         </p>
//       </div>
//     </div>
//   );
// };

// const CategoryGrid = () => (
//   <section className="w-full bg-white py-8 px-4 sm:px-6 rounded-none sm:rounded-[12rem] sm:rounded-b-none ">
//     <div className="max-w-7xl mx-auto px-4">
//       <div className="mb-10">
//         <CardTitle className="text-3xl mb-2">Explore by Products</CardTitle>
//         <CardDescription className="text-lg">
//           Explore our Philatelic Treasures | Rare Stamps | Special Editions
//         </CardDescription>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-4">
//         {/* First row */}
//         <BentoCard
//           item={categories[0]}
//           className="col-span-2 h-full bg-[#FFE4E1]"
//         />
//         <BentoCard
//           item={categories[0]}
//           className="col-span-1 h-full bg-[#E6E6FA]"
//         />
//         <BentoCard
//           item={categories[1]}
//           className="col-span-1 h-full bg-[#FFFFE0]"
//         />

//         {/* Second row */}
//         <BentoCard
//           item={categories[1]}
//           className="col-span-1 row-span-2 h-full bg-[#E6E6FA]"
//         />
//         <BentoCard
//           item={categories[2]}
//           className="col-span-2 row-span-2 h-full bg-[#F0F8FF]"
//         />
//         <BentoCard
//           item={categories[2]}
//           className="col-span-1 row-span-1 h-full bg-[#87CEEB]"
//         />

//         {/* Third row */}
//         <BentoCard
//           item={categories[3]}
//           className="col-span-1 h-full bg-[#98FB98]"
//         />
//         <BentoCard
//           item={categories[3]}
//           className="col-span-1 h-full bg-[#4169E1]"
//         />
//         <BentoCard
//           item={categories[4]}
//           className="col-span-1 h-full bg-[#FFA500]"
//         />
//         <BentoCard
//           item={categories[4]}
//           className="col-span-1 h-full bg-[#90EE90]"
//         />
//         <BentoCard
//           item={categories[4]}
//           className="col-span-1 h-full bg-[#90EE90]"
//         />
//       </div>
//     </div>
//   </section>
// );

// const MasonryGrid = () => (
//   <section className="w-full bg-white py-16">
//     <div className="max-w-7xl mx-auto px-4">
//       <div className="mb-10">
//         <CardTitle className="text-3xl mb-2">Explore by Theme</CardTitle>
//         <CardDescription className="text-lg">
//           Explore our Philatelic Treasures | Rare Stamps | Special Editions
//         </CardDescription>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {/* Column 1 */}
//         <div className="flex flex-col gap-4">
//           <BentoCard item={categories[0]} className="h-[400px] bg-[#FFE4E1]" />
//           <BentoCard item={categories[1]} className="h-[280px] bg-[#E6E6FA]" />
//           <BentoCard item={categories[2]} className="h-[320px] bg-[#F0F8FF]" />
//         </div>

//         {/* Column 2 */}
//         <div className="flex flex-col gap-4">
//           <BentoCard item={categories[2]} className="h-[280px] bg-[#87CEEB]" />
//           <BentoCard item={categories[3]} className="h-[400px] bg-[#98FB98]" />
//           <BentoCard item={categories[3]} className="h-[320px] bg-[#4169E1]" />
//         </div>

//         {/* Column 3 */}
//         <div className="flex flex-col gap-4">
//           <BentoCard item={categories[4]} className="h-[320px] bg-[#FFA500]" />
//           <BentoCard item={categories[4]} className="h-[400px] bg-[#90EE90]" />
//           <BentoCard item={categories[1]} className="h-[280px] bg-[#FFB6C1]" />
//         </div>
//       </div>
//     </div>
//   </section>
// );

// const ProductModal = ({ product, onClose, onAddToCart }) => {
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();
//   const router = useRouter();

//   const handleQuantityChange = (change) => {
//     const newQuantity = quantity + change;
//     if (newQuantity >= 1 && newQuantity <= 10) {
//       setQuantity(newQuantity);
//     }
//   };
//   const handleAddToCart = () => {
//     addToCart(product, quantity);
//     router.push("/cart");
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-full w-full max-h-[90vh] overflow-y-auto p-4 sm:max-w-4xl">
//         <div className="flex flex-col md:flex-row">
//           {/* Left: Image */}
//           <div className="w-full md:w-1/2 p-2">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-[300px] object-cover rounded-lg"
//             />
//           </div>

//           {/* Right: Details */}
//           <div className="w-full md:w-1/2 p-2 space-y-4">
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               ✖
//             </button>

//             <h2 className="text-2xl font-bold">{product.name}</h2>

//             {/* Rating */}
//             <div className="flex items-center gap-2">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${
//                       i < Math.floor(product.rating)
//                         ? "text-yellow-400 fill-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-gray-600">
//                 ({product.ratingCount} reviews)
//               </span>
//             </div>

//             {/* Price */}
//             <div className="text-2xl font-bold text-gray-900">
//               {product.price}
//             </div>

//             {/* Backstory */}
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Stamp History</h3>
//               <p className="text-gray-600">{product.backstory}</p>
//             </div>

//             {/* Quantity Selector */}
//             <div className="flex items-center gap-4">
//               <span className="text-gray-700">Quantity:</span>
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => handleQuantityChange(-1)}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </Button>
//                 <span className="w-8 text-center">{quantity}</span>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => handleQuantityChange(1)}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             {/* Add to Cart Button */}
//             <Button
//               className="w-full bg-[#8B6E5B] hover:bg-[#7D6352] text-white"
//               onClick={() => handleAddToCart(product, quantity)}
//             >
//               <ShoppingCart className="mr-2 h-4 w-4" />
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Add this new component for the side navigation
// const SideNavigation = ({ onProductsFiltered }) => {
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(5000);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchFromAPI('collection/');
//         if (response.success) {
//           setCategories(response.data);
//         } else {
//           console.error('Unexpected API response format:', response);
//           setError('Invalid data format received');
//         }
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);
//         setError('Failed to load categories');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const toggleCategory = async (categoryId) => {
//     const newSelectedCategories = selectedCategories.includes(categoryId)
//       ? selectedCategories.filter(id => id !== categoryId)
//       : [...selectedCategories, categoryId];
    
//     setSelectedCategories(newSelectedCategories);
    
//     if (newSelectedCategories.length > 0) {
//       await filterProducts(newSelectedCategories, minPrice, maxPrice);
//     } else {
//       onProductsFiltered([]); // Reset to show all products
//     }
//   };

//   const filterProducts = async (selectedCategoryIds, min, max) => {
//     try {
//       const selectedCategoryObjects = selectedCategoryIds.map(id => 
//         categories.find(cat => cat._id === id || cat.id === id)
//       ).filter(Boolean);

//       if (selectedCategoryObjects.length === 0) {
//         console.error('No matching categories found');
//         return;
//       }

//       // Build URL parameters object
//       const params = new URLSearchParams();
      
//       // Add price range
//       // params.append('minPrice', min);
//       // params.append('maxPrice', max);
      
//       // Add collections with proper slug formatting
//       selectedCategoryObjects.forEach(cat => {
//         const collectionSlug = (cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '_'))
//           .replace(/-/g, '_'); // Ensure consistent use of underscores
//         if (collectionSlug) {
//           params.append('collection', collectionSlug);
//         }
//       });

//       const url = `product?/${params.toString()}/`;
//       console.log('Fetching from URL:', url); // For debugging

//       const response = await fetchFromAPI(url);
//       console.log(response)
      
//       if (response.success) {
//         onProductsFiltered(response.data);
//       } else {
//         console.error('Failed to filter products:', response.message);
//       }
//     } catch (error) {
//       console.error('Error filtering products:', error);
//     }
//   };

//   const handleMinChange = (e) => {
//     const value = Math.min(Number(e.target.value), maxPrice - 100);
//     setMinPrice(value);
//   };

//   const handleMaxChange = (e) => {
//     const value = Math.max(Number(e.target.value), minPrice + 100);
//     setMaxPrice(value);
//   };

//   const applyFilters = async () => {
//     if (selectedCategories.length > 0) {
//       await filterProducts(selectedCategories, minPrice, maxPrice);
//     }
//   };

//   return (
//     <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 md:p-6 h-auto md:h-[calc(100vh-120px)] sticky top-24 flex flex-col overflow-hidden">
//       {/* Price Range Filter */}
//       <div className="mb-8 bg-gray-50 p-4 rounded-xl flex-shrink-0">
//         <h4 className="text-lg font-semibold mb-4 text-[#8B6E5B] flex items-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.94a7 7 0 119.9 9.9 7 7 0 01-9.9-9.9zM10 4a6 6 0 100 12 6 6 0 000-12zm0 2a1 1 0 011 1v2.586l1.707 1.707a1 1 0 01-1.414 1.414l-2-2A1 1 0 019 10V7a1 1 0 011-1z" clipRule="evenodd" />
//           </svg>
//           Price Range
//         </h4>
        
//         {/* Price display */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex flex-col items-center bg-white px-4 py-2 rounded-lg shadow-sm">
//             <span className="text-xs text-gray-500 mb-1">Min Price</span>
//             <span className="text-sm font-semibold text-[#8B6E5B]">₹{minPrice.toLocaleString()}</span>
//           </div>
//           <div className="h-[2px] w-8 bg-gray-300"></div>
//           <div className="flex flex-col items-center bg-white px-4 py-2 rounded-lg shadow-sm">
//             <span className="text-xs text-gray-500 mb-1">Max Price</span>
//             <span className="text-sm font-semibold text-[#8B6E5B]">₹{maxPrice.toLocaleString()}</span>
//           </div>
//         </div>

//         {/* Slider container */}
//         <div className="relative h-2 mt-4">
//           {/* Track background */}
//           <div className="absolute inset-0 h-1.5 mt-0.5 w-full bg-gray-200 rounded-full"></div>
          
//           {/* Active track */}
//           <div
//             className="absolute inset-0 h-1.5 mt-0.5 bg-gradient-to-r from-[#8B6E5B] to-[#A68977] rounded-full"
//             style={{
//               left: `${(minPrice / 5000) * 100}%`,
//               right: `${100 - (maxPrice / 5000) * 100}%`,
//             }}
//           ></div>

//           {/* Range inputs */}
//           <input
//             type="range"
//             min="0"
//             max="5000"
//             value={minPrice}
//             step="100"
//             onChange={handleMinChange}
//             className="absolute inset-0 w-full appearance-none pointer-events-none bg-transparent z-20
//               [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
//               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white 
//               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer 
//               [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#8B6E5B] 
//               [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(139,110,91,0.1)] 
//               [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
//               [&::-webkit-slider-thumb]:hover:shadow-[0_0_0_6px_rgba(139,110,91,0.2)]
//               [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
//               [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white 
//               [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer 
//               [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#8B6E5B] 
//               [&::-moz-range-thumb]:shadow-[0_0_0_4px_rgba(139,110,91,0.1)]
//               [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
//               [&::-moz-range-thumb]:hover:shadow-[0_0_0_6px_rgba(139,110,91,0.2)]"
//           />
//           <input
//             type="range"
//             min="0"
//             max="5000"
//             value={maxPrice}
//             step="100"
//             onChange={handleMaxChange}
//             className="absolute inset-0 w-full appearance-none pointer-events-none bg-transparent z-20
//               [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
//               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white 
//               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer 
//               [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#8B6E5B] 
//               [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(139,110,91,0.1)] 
//               [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
//               [&::-webkit-slider-thumb]:hover:shadow-[0_0_0_6px_rgba(139,110,91,0.2)]
//               [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
//               [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white 
//               [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer 
//               [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#8B6E5B] 
//               [&::-moz-range-thumb]:shadow-[0_0_0_4px_rgba(139,110,91,0.1)]
//               [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
//               [&::-moz-range-thumb]:hover:shadow-[0_0_0_6px_rgba(139,110,91,0.2)]"
//           />
//         </div>
//       </div>

//       <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#8B6E5B] border-b pb-4 flex-shrink-0">
//         Categories {isLoading && <span className="text-sm text-gray-500">(Loading...)</span>}
//       </h3>
      
//       <div className="flex-1 overflow-y-auto overscroll-contain pr-2 -mr-2 
//         [&::-webkit-scrollbar]:w-2
//         [&::-webkit-scrollbar-track]:bg-gray-100 
//         [&::-webkit-scrollbar-track]:rounded-full
//         [&::-webkit-scrollbar-thumb]:bg-[#8B6E5B]
//         [&::-webkit-scrollbar-thumb]:rounded-full
//         [&::-webkit-scrollbar-thumb]:border
//         [&::-webkit-scrollbar-thumb]:border-white">
        
//         {isLoading ? (
//           <div className="flex items-center justify-center h-full">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B6E5B]"></div>
//           </div>
//         ) : error ? (
//           <div className="text-red-500 text-center py-4">{error}</div>
//         ) : categories.length === 0 ? (
//           <div className="text-gray-500 text-center py-4">No categories found</div>
//         ) : (
//           <div className="grid grid-cols-1 gap-1 pb-4">
//             {categories.map((category) => (
//               <button
//                 key={category.id || category._id}
//                 onClick={() => toggleCategory(category.id || category._id)}
//                 className={`flex items-center w-full text-left py-2.5 px-4 rounded-lg transition-all duration-200 font-medium text-sm
//                   ${selectedCategories.includes(category.id || category._id)
//                     ? 'bg-[#8B6E5B] text-white'
//                     : 'text-gray-600 hover:text-[#8B6E5B] hover:bg-[#fff7e5]'
//                   }`}
//               >
//                 <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center
//                   ${selectedCategories.includes(category.id || category._id)
//                     ? 'border-white bg-white'
//                     : 'border-[#8B6E5B]'
//                   }`}
//                 >
//                   {selectedCategories.includes(category.id || category._id) && (
//                     <svg className="w-3 h-3 text-[#8B6E5B]" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
//                     </svg>
//                   )}
//                 </div>
//                 {category.name || category.title}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <button
//         onClick={applyFilters}
//         disabled={isLoading}
//         className={`mt-4 w-full py-2 rounded-lg transition-colors duration-200 flex-shrink-0
//           ${isLoading 
//             ? 'bg-gray-300 cursor-not-allowed' 
//             : 'bg-[#8B6E5B] hover:bg-[#7D6352] text-white'
//           }`}
//       >
//         {isLoading ? 'Loading...' : 'Apply Filters'}
//       </button>
//     </div>
//   );
// };

// // Rename this to FilteredProductsGrid to avoid naming conflict
// const FilteredProductsGrid = ({ products: filteredProducts = [] }) => {
//   // Use the products array defined at the top of the file as fallback
//   const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

//   return (
//     <section className="w-full bg-white py-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-10">
//           <CardTitle className="text-3xl mb-2">Featured Products</CardTitle>
//           <CardDescription className="text-lg">
//             Explore our Philatelic Treasures | Rare Stamps | Special Editions
//           </CardDescription>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {displayProducts.map((product) => (
//             <BentoCard key={product._id || product.id} item={product} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Update the Page component to use FilteredProductsGrid
// export default function Page() {
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const handleProductsFiltered = (products) => {
//     setFilteredProducts(products);
//   };

//   return (
//     <main className="min-h-screen w-full bg-white overflow-y-auto">
//       <div className="w-full">
//         <HeroSection />
//         <SearchSection />
        
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex flex-col md:flex-row gap-8">
//             <aside className="md:w-64 flex-shrink-0">
//               <SideNavigation onProductsFiltered={handleProductsFiltered} />
//             </aside>
            
//             <div className="flex-1 overflow-y-auto">
//               <FilteredProductsGrid products={filteredProducts} />
//               <CollectionGrid />
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import React, { useState } from "react";
import { Search, ChevronRight, Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Elsie_Swash_Caps } from "next/font/google";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import ProductsGrid from "./components/ProductGrid";
import CollectionGrid from "./components/CollectionGrid";

// import { useCart } from "@/contexts/CartContext";
// Data
const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

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

const SearchSection = () => (
  <section className="w-full bg-[#FFFFF] py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search"
            className="w-full bg-gray-100 pl-12 h-14 rounded-full text-lg border-none"
          />
        </div>
      </div>
    </div>
  </section>
);

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

const CategoryGrid = () => (
  <section className="w-full bg-white py-8 px-4 sm:px-6 rounded-none sm:rounded-[12rem] sm:rounded-b-none ">
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-10">
        <CardTitle className="text-3xl mb-2">Explore by Products</CardTitle>
        <CardDescription className="text-lg">
          Explore our Philatelic Treasures | Rare Stamps | Special Editions
        </CardDescription>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-4">
        {/* First row */}
        <BentoCard
          item={categories[0]}
          className="col-span-2 h-full bg-[#FFE4E1]"
        />
        <BentoCard
          item={categories[0]}
          className="col-span-1 h-full bg-[#E6E6FA]"
        />
        <BentoCard
          item={categories[1]}
          className="col-span-1 h-full bg-[#FFFFE0]"
        />

        {/* Second row */}
        <BentoCard
          item={categories[1]}
          className="col-span-1 row-span-2 h-full bg-[#E6E6FA]"
        />
        <BentoCard
          item={categories[2]}
          className="col-span-2 row-span-2 h-full bg-[#F0F8FF]"
        />
        <BentoCard
          item={categories[2]}
          className="col-span-1 row-span-1 h-full bg-[#87CEEB]"
        />

        {/* Third row */}
        <BentoCard
          item={categories[3]}
          className="col-span-1 h-full bg-[#98FB98]"
        />
        <BentoCard
          item={categories[3]}
          className="col-span-1 h-full bg-[#4169E1]"
        />
        <BentoCard
          item={categories[4]}
          className="col-span-1 h-full bg-[#FFA500]"
        />
        <BentoCard
          item={categories[4]}
          className="col-span-1 h-full bg-[#90EE90]"
        />
        <BentoCard
          item={categories[4]}
          className="col-span-1 h-full bg-[#90EE90]"
        />
      </div>
    </div>
  </section>
);

const MasonryGrid = () => (
  <section className="w-full bg-white py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-10">
        <CardTitle className="text-3xl mb-2">Explore by Theme</CardTitle>
        <CardDescription className="text-lg">
          Explore our Philatelic Treasures | Rare Stamps | Special Editions
        </CardDescription>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <BentoCard item={categories[0]} className="h-[400px] bg-[#FFE4E1]" />
          <BentoCard item={categories[1]} className="h-[280px] bg-[#E6E6FA]" />
          <BentoCard item={categories[2]} className="h-[320px] bg-[#F0F8FF]" />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <BentoCard item={categories[2]} className="h-[280px] bg-[#87CEEB]" />
          <BentoCard item={categories[3]} className="h-[400px] bg-[#98FB98]" />
          <BentoCard item={categories[3]} className="h-[320px] bg-[#4169E1]" />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <BentoCard item={categories[4]} className="h-[320px] bg-[#FFA500]" />
          <BentoCard item={categories[4]} className="h-[400px] bg-[#90EE90]" />
          <BentoCard item={categories[1]} className="h-[280px] bg-[#FFB6C1]" />
        </div>
      </div>
    </div>
  </section>
);

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-full w-full max-h-[90vh] overflow-y-auto p-4 sm:max-w-4xl">
        <div className="flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 p-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 p-2 space-y-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.ratingCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-gray-900">
              {product.price}
            </div>

            {/* Backstory */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Stamp History</h3>
              <p className="text-gray-600">{product.backstory}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-[#8B6E5B] hover:bg-[#7D6352] text-white"
              onClick={() => handleAddToCart(product, quantity)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this new component for the side navigation
const SideNavigation = () => (
  <div className="w-64 pr-8 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
    <h3 className="text-2xl font-semibold mb-6 text-[#8B6E5B] border-b pb-4">Categories</h3>
    <div className="space-y-1">
      {[
        "Miniature Sheets",
        "First Day Cover",
        "Setenant",
        "Definitive",
        "Sheetlets",
        "Full Sheets",
        "Single Mint Stamp",
        "Block of 4",
        "Year Pack",
        "Error / Oddities",
        "Cancelled Brochure",
        "Special Cover",
        "MS on FDC",
        "MS on Brochure",
        "Setenant on FDC",
        "Setenant Brochure",
        "Army Covers",
        "VIP Folders",
        "Maxim Cards",
        "Booklets & Thematic Pack",
        "Used Stamps",
        "Broken Setenant",
        "Foreign Stamps",
        "Miscellaneous Items",
        "UNIQUE"
      ].map((category) => (
        <button
          key={category}
          className="block w-full text-left py-2.5 px-4 rounded-lg text-gray-600 hover:text-[#8B6E5B] hover:bg-[#fff7e5] transition-all duration-200 font-medium text-sm"
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

// Update the main Page component
export default function Page() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-full">
        <HeroSection />
        <SearchSection />
        
        {/* New layout with side navigation */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            <SideNavigation />
            <div className="flex-1">
              <ProductsGrid />
              <CollectionGrid />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}