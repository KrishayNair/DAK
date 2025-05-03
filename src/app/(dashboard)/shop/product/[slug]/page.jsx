'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/cartcontext'
import { fetchFromAPI } from '@/lib/api'
import { buildImageUrl } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const POSTAL_CIRCLES = [
    'Maharashtra Postal Circle',
    'Andhra Pradesh Postal Circle',
    'Assam Postal Circle',
    'Bihar Postal Circle',
    'Chhattisgarh Postal Circle',
    'Delhi Postal Circle',
    'Gujarat Postal Circle',
    'Haryana Postal Circle',
    'Himachal Pradesh Postal Circle',
    'Jammu & Kashmir Postal Circle',
    'Jharkhand Postal Circle',
    'Karnataka Postal Circle',
    'Kerala Postal Circle',
    'Madhya Pradesh Postal Circle',
    'North East Postal Circle',
    'Odisha Postal Circle',
    'Punjab Postal Circle',
    'Rajasthan Postal Circle',
    'Tamil Nadu Postal Circle',
    'Telangana Postal Circle',
    'Uttar Pradesh Postal Circle',
    'Uttarakhand Postal Circle',
    'West Bengal Postal Circle'
];

export default function ProductDetail({ params }) {
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showWaitlistModal, setShowWaitlistModal] = useState(false)
    const [waitlistEmail, setWaitlistEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { addToCart } = useCart()

    const router = useRouter()

    // Get a random postal circle for the product
    const [postalCircle] = useState(() => 
        POSTAL_CIRCLES[Math.floor(Math.random() * POSTAL_CIRCLES.length)]
    );

    async function fetchProduct() {
        const res = await fetchFromAPI(`product/${params.slug}/`)
        console.log(res)
        if (res.success) {
            setProduct(res.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [params.slug, fetchProduct])

    if (loading) {
        return <div className="max-w-7xl mx-auto p-6">Loading...</div>
    }

    if (!product) {
        return <div className="max-w-7xl mx-auto p-6">Product not found</div>
    }

    const handleAddToCart = () => {
        addToCart(product, parseInt(quantity))
        alert("Added to cart");
    }

    const handleBuyNow = () => {
        addToCart(product, parseInt(quantity))
        
        router.push('/cart')
    }

    const incrementQuantity = () => {
        if (quantity < product.items_quantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            if (value > product.items_quantity) {
                setQuantity(product.items_quantity);
            } else if (value < 1) {
                setQuantity(1);
            } else {
                setQuantity(value);
            }
        }
    };

    const handleQuantityBlur = () => {
        if (!quantity || isNaN(quantity)) {
            setQuantity(1);
        }
    };

    const handleWaitlistSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            // Add API call here to save waitlist email
            const response = await fetchFromAPI('waitlist/', {
                method: 'POST',
                body: JSON.stringify({
                    email: waitlistEmail,
                    productId: product.id,
                    productName: product.title
                })
            })
            
            if (response.success) {
                alert('You have been added to the waitlist!')
                setShowWaitlistModal(false)
                setWaitlistEmail('')
            } else {
                alert('Failed to join waitlist. Please try again.')
            }
        } catch (error) {
            console.error('Waitlist error:', error)
            alert('Failed to join waitlist. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex gap-8">
                {/* Product Image Section */}
                <div className="w-1/2">
                    <Image
                        src={buildImageUrl(product?.images[0])}
                        alt={product?.title}
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />
                </div>

                {/* Product Details Section */}
                <div className="w-1/2">
                    {/* Enhanced Postal Circle Badge */}
                    <div className="flex justify-end mb-6">
                        <div className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-amber-100 rounded-full animate-ping opacity-20"></div>
                                    <Image 
                                        src="/postaloffice.png"
                                        alt="Postal Office"
                                        width={24}
                                        height={24}
                                        className="relative"
                                    />
                                </div>
                                <span className="text-sm text-amber-900 font-semibold group-hover:text-amber-800">
                                    {postalCircle}
                                </span>
                            </div>
                            
                            {/* Tooltip below on hover */}
                            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-full right-0 mt-2 w-64 p-3 bg-white rounded-lg shadow-xl border border-amber-100 z-10">
                                <div className="text-xs text-gray-600">
                                    <p className="font-medium text-amber-900 mb-1">About Postal Circles</p>
                                    <p className="mb-2">Each stamp in our collection is carefully curated and authenticated by official Indian Postal Circles, ensuring genuine philatelic value.</p>
                                    <div className="space-y-1 mt-3 pt-3 border-t border-amber-100">
                                        <p className="font-medium text-amber-900">Circle Details:</p>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Regional Office: {postalCircle.split(' ')[0]}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                            <span>Verified Authenticity</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>24/7 Support Available</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Tooltip arrow */}
                                <div className="absolute -top-2 right-6 w-3 h-3 rotate-45 bg-white border-l border-t border-amber-100"></div>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold mb-4">
                        {product?.title}
                    </h1>

                    <div className="text-gray-600 mb-6">
                        <p className="leading-relaxed text-sm">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-400">★</span>
                        ))}
                        <span className="ml-2 text-gray-600">(21 reviews)</span>
                    </div>

                    <div className="text-3xl font-bold mb-6">₹{product?.price}</div>

                    <div className="flex items-center gap-4 mb-6">
                        {product.items_quantity > 0 ? (
                            <>
                                <div className="flex items-center border rounded-md hover:border-[#8B6E5B] focus-within:border-[#8B6E5B] focus-within:ring-1 focus-within:ring-[#8B6E5B]">
                                    <button
                                        onClick={decrementQuantity}
                                        className="px-3 py-2 border-r hover:bg-gray-100 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.items_quantity}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        onBlur={handleQuantityBlur}
                                        className="w-20 px-3 py-2 text-center focus:outline-none cursor-text bg-transparent
                                            [appearance:textfield] 
                                            [&::-webkit-outer-spin-button]:appearance-none 
                                            [&::-webkit-inner-spin-button]:appearance-none
                                            hover:bg-gray-50
                                            focus:bg-gray-50"
                                        placeholder="Enter quantity"
                                        title="Click to edit quantity"
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key) && e.key !== 'Enter' && e.key !== 'Backspace') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={incrementQuantity}
                                        className="px-3 py-2 border-l hover:bg-gray-100 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                                {quantity >= product.items_quantity ? (
                                    <span className="text-red-500">Maximum quantity reached!</span>
                                ) : (
                                    <span className="text-red-500">Only {product.items_quantity} left!</span>
                                )}
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <span className="text-red-500 font-semibold">Out of Stock</span>
                                <button
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center gap-2"
                                    onClick={() => setShowWaitlistModal(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                    Join Waitlist
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        {product.items_quantity > 0 ? (
                            <>
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
                            </>
                        ) : (
                            <div className="text-sm text-gray-500">
                                Get notified when this item is back in stock
                            </div>
                        )}
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
                                            style={{ width: `${rating * 20}%` }}
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

            {/* Waitlist Modal */}
            {showWaitlistModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
                        {/* Close button */}
                        <button 
                            onClick={() => setShowWaitlistModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="text-xl font-semibold mb-4">Join Waitlist</h3>
                        <p className="text-gray-600 mb-6">
                            Enter your email to be notified when &quot;{product?.title}&quot; is back in stock.
                        </p>

                        <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={waitlistEmail}
                                    onChange={(e) => setWaitlistEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6E5B] focus:border-transparent"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-2 rounded-md text-white transition-colors duration-200
                                    ${isSubmitting 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-[#8B6E5B] hover:bg-[#7D6352]'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Joining...
                                    </span>
                                ) : 'Join Waitlist'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
