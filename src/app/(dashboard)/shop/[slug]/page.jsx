"use client";
// main slug
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Elsie_Swash_Caps } from "next/font/google";
import { categories, products } from "../data";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from '@/context/cartcontext'
import { useRouter } from "next/navigation";
const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

const MasonryGrid = ({ onProductClick }) => {
  const featuredProducts = [
    {
      id: "f1",
      name: "Rare Collection",
      description: "Limited Edition Series",
      image: "/images/stamps/1.jpg",
      price: "₹2,500",
      backstory:
        "Released in 1953, this rare stamp commemorates the centenary of Indian Railways. Only 100 pieces were ever printed, making it one of the most sought-after stamps in Indian philately.",
      rating: 4.8,
      ratingCount: 24,
    },
    {
      id: "f2",
      name: "Vintage Collection",
      description: "Historical Series",
      image: "/images/stamps/2.jpg",
      price: "₹1,800",
      backstory:
        "This vintage collection features stamps from the early 20th century, showcasing the golden era of philately.",
      rating: 4.5,
      ratingCount: 30,
    },
    {
      id: "f3",
      name: "Premium Selection",
      description: "Exclusive Series",
      image: "/images/stamps/3.jpg",
      price: "₹3,000",
      backstory:
        "A premium selection of limited edition stamps, perfect for seasoned collectors.",
      rating: 4.9,
      ratingCount: 15,
    },
    {
      id: "f4",
      name: "Classic Collection",
      description: "Heritage Series",
      image: "/images/stamps/4.jpg",
      price: "₹2,000",
      backstory:
        "A classic collection that features stamps from the 19th century, revered for their historical significance.",
      rating: 4.7,
      ratingCount: 20,
    },
    {
      id: "f5",
      name: "Artistic Collection",
      description: "Art Inspired Stamps",
      image: "/images/stamps/5.jpg",
      price: "₹2,200",
      backstory:
        "This collection features stamps inspired by famous artworks, perfect for art lovers.",
      rating: 4.6,
      ratingCount: 18,
    },
    {
      id: "f6",
      name: "Nature's Wonders",
      description: "Stamps Celebrating Nature",
      image: "/images/stamps/6.jpg",
      price: "₹1,500",
      backstory:
        "A beautiful collection showcasing the wonders of nature through stamps.",
      rating: 4.4,
      ratingCount: 22,
    },
    {
      id: "f7",
      name: "Historical Events",
      description: "Stamps from Significant Events",
      image: "/images/stamps/7.jpg",
      price: "₹2,800",
      backstory:
        "This collection features stamps that commemorate significant historical events.",
      rating: 4.8,
      ratingCount: 25,
    },
    {
      id: "f8",
      name: "Cultural Heritage",
      description: "Stamps Reflecting Culture",
      image: "/images/stamps/8.jpg",
      price: "₹2,400",
      backstory:
        "A collection that reflects the rich cultural heritage through stamps.",
      rating: 4.5,
      ratingCount: 19,
    },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Featured Items</h2>
          <p className="text-gray-600">
            Explore our handpicked selection of rare and unique stamps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="cursor-pointer h-[400px] bg-[#FFE4E1] rounded-lg relative overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-8 left-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-200">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 p-6 space-y-6">
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

export default function CategoryPage() {
  const params = useParams();
  const { slug } = params;
  const [selectedProduct, setSelectedProduct] = useState(null);

  const category = categories.find((cat) => cat.slug === slug) || {
    title: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: "Browse our collection",
  };

  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (!product.price || isNaN(parseFloat(product.price))) {
      console.error("Invalid product price:", product.price);
      return;
    }

    addToCart({ ...product, price: parseFloat(product.price) }, quantity);
    router.push("/cart");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-[#F8F4F0] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-semibold text-[#8B6E5B]">
            {category.title}
          </h1>
          <p className="text-xl text-gray-600">{category.description}</p>
        </div>
      </div>

      <div className="py-8">
        <MasonryGrid onProductClick={handleProductClick} />
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
