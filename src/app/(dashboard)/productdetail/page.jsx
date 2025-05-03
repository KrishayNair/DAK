'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/context/cartcontext'

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  // Product details - you should get this from your API/props
  const product = {
    id: "telegraph-1953", // unique identifier
    name: "India 1953 Telegraph Centenary MNH Miniature Sheet",
    price: "2200.00",
    image: "/product-image.jpg",
    merchant: "Numismatic Postal Circle",
    stock: 3
  }

  const handleAddToCart = () => {
    addToCart(product, parseInt(quantity))
    // Optionally add a success notification here
  }

  const handleBuyNow = () => {
    addToCart(product, parseInt(quantity))
    // Navigate to cart page
    window.location.href = '/cart'
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-8">
        {/* Product Image Section */}
        <div className="w-1/2">
          <Image 
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>

        {/* Product Details Section */}
        <div className="w-1/2">
          <div className="flex items-center gap-2 mb-4">
            <Image 
              src="/merchant-logo.jpg" 
              alt={product.merchant}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>{product.merchant}</span>
          </div>

          <h1 className="text-2xl font-semibold mb-4">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400">★</span>
            ))}
            <span className="ml-2 text-gray-600">(21 reviews)</span>
          </div>

          <div className="text-3xl font-bold mb-6">₹{product.price}</div>

          <div className="flex items-center gap-4 mb-6">
            <select 
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border p-2 rounded-md"
            >
              {[...Array(product.stock)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span className="text-red-500">Only {product.stock} left!</span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleBuyNow}
              className="bg-orange-100 text-orange-900 px-8 py-2 rounded-md hover:bg-orange-200"
            >
              Buy Now
            </button>
            <button 
              onClick={handleAddToCart}
              className="border border-gray-300 px-8 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Reviews</h2>
        
        <div className="flex gap-12">
          <div className="w-2/3">
            <select className="border p-2 rounded-md mb-6">
              <option>Newest</option>
              <option>Highest Rating</option>
              <option>Lowest Rating</option>
            </select>

            {/* Review Items */}
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b py-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="flex text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600">Best quality and ever received !!</p>
              </div>
            ))}
          </div>

          {/* Rating Summary */}
          <div className="w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">4.2</div>
                <div className="text-yellow-400 text-xl">★★★★☆</div>
              </div>

              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2 mb-2">
                  <span>{rating}</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{width: `${rating * 20}%`}}
                    ></div>
                  </div>
                  <span>{rating + 2}</span>
                </div>
              ))}

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Review this product</h3>
                <p className="text-sm text-gray-600 mb-4">Share your thoughts about this product :)</p>
                <button className="w-full bg-orange-50 text-orange-900 py-2 rounded-md">
                  Write Your Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Similar Products</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 rounded-full border hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border rounded-lg p-4">
              <Image
                src="/product-image.jpg"
                alt="India 1973 Indipex MNH Miniature Sheet"
                width={200}
                height={200}
                className="w-full mb-4"
              />
              <h3 className="text-sm mb-2">India 1973 Indipex MNH Miniature Sheet</h3>
              <div className="font-bold">₹2,200.00</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
