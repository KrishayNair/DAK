"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Share, Heart, Shield, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// API service functions (to be implemented)
const api = {
  getProduct: async (id) => {
    // Temporary: using import for demo
    const { initialPhilatelicItems } = await import('../page');
    return initialPhilatelicItems.find(item => item.id === id);
    
    // TODO: Replace with actual API call
    // return await fetch(`/api/products/${id}`).then(res => res.json());
  },
  addToCart: async (productId) => {
    // TODO: Implement cart API
    // return await fetch('/api/cart', {
    //   method: 'POST',
    //   body: JSON.stringify({ productId }),
    // }).then(res => res.json());
  },
  makeOffer: async (productId, amount) => {
    // TODO: Implement offer API
    // return await fetch('/api/offers', {
    //   method: 'POST',
    //   body: JSON.stringify({ productId, amount }),
    // }).then(res => res.json());
  },
  toggleWishlist: async (productId) => {
    // TODO: Implement wishlist API
    // return await fetch('/api/wishlist', {
    //   method: 'POST',
    //   body: JSON.stringify({ productId }),
    // }).then(res => res.json());
  }
};

export default function ProductDetail({ params }) {
  const searchParams = useSearchParams();
  
  // States
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isMakingOffer, setIsMakingOffer] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const id = parseInt(searchParams.get('id'));
        const product = await api.getProduct(id);
        
        if (!product) {
          throw new Error('Product not found');
        }
        
        setItem(product);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams]);

  // Handler functions
  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      await api.addToCart(item.id);
      alert('Added to cart successfully!');
    } catch (err) {
      alert('Failed to add to cart: ' + err.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleMakeOffer = async () => {
    try {
      setIsMakingOffer(true);
      await api.makeOffer(item.id, offerAmount);
      alert('Offer sent successfully!');
    } catch (err) {
      alert('Failed to make offer: ' + err.message);
    } finally {
      setIsMakingOffer(false);
    }
  };

  const handleWishlist = async () => {
    try {
      await api.toggleWishlist(item.id);
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      alert('Failed to update wishlist: ' + err.message);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff8e8] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-[#8B4513]">Loading...</h1>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#fff8e8] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-[#8B4513] mb-2">Oops! Something went wrong</h1>
          <p className="text-[#8B4513]/70 mb-4">{error}</p>
          <Link 
            href="/dak-exchange" 
            className="text-[#8B4513] hover:underline"
          >
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // No item found state
  if (!item) {
    return (
      <div className="min-h-screen bg-[#fff8e8] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-[#8B4513] mb-2">Product Not Found</h1>
          <p className="text-[#8B4513]/70 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/dak-exchange" 
            className="text-[#8B4513] hover:underline"
          >
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8e8]">
      {/* Navigation */}
      <nav className="bg-[#fff8e8] shadow-sm py-4 px-8">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/dak-exchange" className="flex items-center gap-2 text-[#8B4513] hover:opacity-80">
            <ArrowLeft size={20} />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white/50 p-4 shadow-sm hover:shadow-md transition-shadow">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
              <button 
                onClick={handleWishlist}
                className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md 
                         hover:scale-110 transition-transform"
              >
                <Heart 
                  className={`w-5 h-5 ${isWishlisted ? 'fill-[#8B4513]' : ''} text-[#8B4513]`} 
                />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[item.image, item.image, item.image, item.image].map((img, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-lg overflow-hidden border-2 bg-white/50 p-2 transition-all ${
                    selectedImage === index ? 'border-[#8B4513]' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title and Price Section */}
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-[#8B4513]">{item.name}</h1>
                <button className="p-2 hover:bg-white/50 rounded-full">
                  <Share className="w-5 h-5 text-[#8B4513]" />
                </button>
              </div>
              <p className="text-4xl font-bold text-[#8B4513]">₹{item.price.toLocaleString()}</p>
            </div>

            {/* Description Section */}
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-[#8B4513] mb-3">Description</h2>
              <p className="text-gray-700">{item.description}</p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Year', value: item.year },
                { label: 'Theme', value: item.theme },
                { label: 'Condition', value: item.condition },
                { label: 'Country', value: item.country }
              ].map((spec, index) => (
                <div key={index} className="bg-white/50 p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-[#8B4513]/70">{spec.label}</p>
                  <p className="font-semibold text-[#8B4513]">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Shield, title: 'Authenticity Guaranteed', subtitle: 'Verified by Experts' },
                { icon: Truck, title: 'Free Shipping', subtitle: '2-3 Business Days' },
                { icon: RefreshCw, title: 'Easy Returns', subtitle: '30 Day Return Policy' }
              ].map((feature, index) => (
                <div key={index} className="bg-white/50 p-4 rounded-lg shadow-sm flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-[#8B4513]" />
                  <div>
                    <p className="font-medium text-[#8B4513]">{feature.title}</p>
                    <p className="text-sm text-[#8B4513]/70">{feature.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-[#8B4513] text-white px-6 py-4 rounded-lg hover:bg-[#8B4513]/90 
                         transition-all duration-300 font-semibold shadow-sm disabled:opacity-50"
              >
                {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
              <button 
                onClick={handleMakeOffer}
                disabled={isMakingOffer}
                className="w-full bg-white/50 text-[#8B4513] px-6 py-4 rounded-lg hover:bg-white/70 
                         transition-all duration-300 font-semibold shadow-sm disabled:opacity-50"
              >
                {isMakingOffer ? 'Sending Offer...' : 'Make an Offer'}
              </button>
            </div>

            {/* Seller Info */}
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full overflow-hidden">
                  <img src="/collage.png" alt="Seller" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#8B4513]">{item.owner}</h3>
                  <p className="text-[#8B4513]/70">Professional Dealer</p>
                  <div className="flex items-center gap-1 text-[#8B4513]">
                    {'★'.repeat(5)}
                    <span className="text-[#8B4513]/70 text-sm ml-2">(124 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
