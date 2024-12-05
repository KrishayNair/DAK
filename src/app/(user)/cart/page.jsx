"use client"; // Ensure this is a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext"; // Import the useCart hook

export default function Cart() {
  const router = useRouter();
  const { cartItems, removeFromCart } = useCart(); // Get cart items from context
  const [showNotification, setShowNotification] = useState(true);

  // Handle quantity changes
  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change); // Prevent going below 1
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0), // Ensure price is a number
    0
  );
  const shipping = 50; // Example shipping cost
  const tax = 0; // Example tax
  const grandTotal = subtotal + shipping + tax;

  // Handle enrollment (proceed to checkout)
  const handleEnroll = () => {
    // Redirect to the checkout page
    router.push("/checkout"); // Ensure you have a checkout page at this route
  };

  return (
    <div className="min-h-screen bg-primary p-8">
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
                className="grid grid-cols-[2fr,1fr,1fr,auto] gap-8 items-center"
              >
                <div className="flex items-center gap-4">
                  <input type="checkbox" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={String(item.quantity).padStart(2, "0")}
                    className="w-12 text-center border-none bg-transparent"
                    readOnly
                  />
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <div>₹{(item.price * item.quantity).toFixed(2)}</div>{" "}
                {/* Ensure price is parsed */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-80 space-y-4">
          {/* Notification Message */}
          {showNotification && (
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
          )}

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
