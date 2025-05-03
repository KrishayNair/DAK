"use client"; // Ensure this is a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartcontext"; // Import the useCart hook
import { buildImageUrl } from "@/lib/utils";

export default function Cart() {
  const router = useRouter();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();
  const [showNotification, setShowNotification] = useState(true);

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = cartItems.length > 0 ? 50 : 0;
  const tax = subtotal * 0.18; // 18% tax
  const grandTotal = subtotal + shipping + tax;

  const handleEnroll = () => {
    router.push("/checkout");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-primary p-8 flex flex-col items-center justify-center ">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button 
          onClick={() => router.push('/shop')}
          className="bg-white text-black border border-gray-200 px-6 py-3 rounded-xl hover:bg-gray-50"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-8 mt-20">
      <div className="flex gap-8">
        {/* Main Content Column */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-8">Cart</h1>

          {/* Cart Table Header */}
          <div className="grid grid-cols-[2fr,1fr,1fr,auto] gap-8 mb-6 text-gray-600">
            <div className="flex items-center">
              <input type="checkbox" className="mr-4" />
              <span>Product</span>
            </div>
            <div>Quantity</div>
            <div>Price</div>
            <div></div>
          </div>

          {/* Cart Items */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[2fr,1fr,1fr,auto] gap-8 items-center bg-white p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images?.[0] ? buildImageUrl(item.images[0]) : '/placeholder-image.jpg'}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">Added: {new Date(item.addedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-80 space-y-4">
          {/* Notification Message */}
          {/* {showNotification && (
            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>HEHEHE</span>
              </div>
              <p className="text-gray-600">You got ₹10 discount!!!</p>
              <button
                onClick={() => setShowNotification(false)}
                className="text-gray-500"
              >
                ×
              </button>
            </div>
          )} */}

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-4 border-t">
                <span>Grand total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleEnroll}
            className="w-full bg-white text-black border border-gray-200 py-3 rounded-xl mt-6 hover:bg-gray-50"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
