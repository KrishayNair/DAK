"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "India 1973 Indipex MNH",
      type: "Miniature Sheet",
      price: 2200,
      quantity: 1,
      image: "/collage.png",
    },
    {
      id: 2,
      name: "India 1973 Indipex MNH",
      type: "Miniature Sheet",
      price: 2200,
      quantity: 1,
      image: "/collage.png",
    },
  ]);
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

  // Handle item deletion
  const deleteItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const tax = 0;
  const grandTotal = subtotal + shipping + tax;

  // Handle enrollment
  const handleEnroll = () => {
    // Add your enrollment logic here
    router.push("/checkout"); // or wherever you want to redirect
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
                <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                <button
                  onClick={() => deleteItem(item.id)}
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
              <p className="text-gray-600">you got ₹10 discount!!!</p>
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
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

//backend integration wala code
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function Cart() {
//   const router = useRouter();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showNotification, setShowNotification] = useState(true);
//   const [processingOrder, setProcessingOrder] = useState(false);

//   // Fetch cart items
//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const fetchCartItems = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/api/cart");
//       setCartItems(response.data);
//       setError(null);
//     } catch (err) {
//       setError("Failed to load cart items");
//       console.error("Error fetching cart:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle quantity changes
//   const updateQuantity = async (id, change) => {
//     try {
//       const item = cartItems.find((item) => item.id === id);
//       const newQuantity = Math.max(1, item.quantity + change);

//       // Optimistic update
//       setCartItems(
//         cartItems.map((item) =>
//           item.id === id ? { ...item, quantity: newQuantity } : item
//         )
//       );

//       // API call
//       await axios.patch(`/api/cart/${id}`, {
//         quantity: newQuantity,
//       });
//     } catch (err) {
//       // Revert on error
//       setError("Failed to update quantity");
//       console.error("Error updating quantity:", err);
//       fetchCartItems(); // Refresh cart state from server
//     }
//   };

//   // Handle item deletion
//   const deleteItem = async (id) => {
//     try {
//       // Optimistic update
//       setCartItems(cartItems.filter((item) => item.id !== id));

//       // API call
//       await axios.delete(`/api/cart/${id}`);
//     } catch (err) {
//       setError("Failed to delete item");
//       console.error("Error deleting item:", err);
//       fetchCartItems(); // Refresh cart state from server
//     }
//   };

//   // Calculate totals
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const shipping = cartItems.length > 0 ? 50 : 0;
//   const tax = 0;
//   const grandTotal = subtotal + shipping + tax;

//   // Handle enrollment/checkout
//   const handleEnroll = async () => {
//     try {
//       setProcessingOrder(true);
//       setError(null);

//       // Create order
//       const response = await axios.post("/api/orders", {
//         items: cartItems,
//         totalAmount: grandTotal,
//         shipping,
//         tax,
//       });

//       // Redirect to checkout/payment
//       router.push(`/checkout/${response.data.orderId}`);
//     } catch (err) {
//       setError("Failed to process order");
//       console.error("Error creating order:", err);
//     } finally {
//       setProcessingOrder(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FFF8F0] p-8 flex justify-center items-center">
//         <div className="text-center">Loading cart...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#FFF8F0] p-8">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-[#FFF8F0] p-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
//           <button
//             onClick={() => router.push("/shop")}
//             className="bg-white text-black border border-gray-200 px-6 py-3 rounded-xl hover:bg-gray-50"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-primary p-8">
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <div className="flex gap-8">
//         {/* Main Content Column */}
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold mb-8">Cart</h1>

//           {/* Cart Table Header */}
//           <div className="grid grid-cols-[2fr,1fr,1fr,auto] gap-8 mb-6 text-gray-600">
//             <div className="flex items-center">
//               <input type="checkbox" className="mr-4" />
//               <span>Product</span>
//             </div>
//             <div>Quantity</div>
//             <div>Price</div>
//             <div></div>
//           </div>

//           {/* Cart Items */}
//           <div className="space-y-6">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="grid grid-cols-[2fr,1fr,1fr,auto] gap-8 items-center"
//               >
//                 <div className="flex items-center gap-4">
//                   <input type="checkbox" />
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded-lg"
//                   />
//                   <div>
//                     <h3 className="font-medium">{item.name}</h3>
//                     <p className="text-sm text-gray-500">{item.type}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => updateQuantity(item.id, -1)}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
//                     disabled={loading}
//                   >
//                     -
//                   </button>
//                   <input
//                     type="text"
//                     value={String(item.quantity).padStart(2, "0")}
//                     className="w-12 text-center border-none bg-transparent"
//                     readOnly
//                   />
//                   <button
//                     onClick={() => updateQuantity(item.id, 1)}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
//                     disabled={loading}
//                   >
//                     +
//                   </button>
//                 </div>
//                 <div>₹{(item.price * item.quantity).toFixed(2)}</div>
//                 <button
//                   onClick={() => deleteItem(item.id)}
//                   className="text-red-500"
//                   disabled={loading}
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                   >
//                     <path
//                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="w-80 space-y-4">
//           {/* Notification Message */}
//           {showNotification && (
//             <div className="bg-white rounded-lg p-4 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span>HEHEHEHEHE</span>
//               </div>
//               <p className="text-gray-600">Yeah, you got ₹10 discount!!!</p>
//               <button
//                 onClick={() => setShowNotification(false)}
//                 className="text-gray-500"
//               >
//                 ×
//               </button>
//             </div>
//           )}

//           {/* Cart Summary */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm">
//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span>₹{subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Shipping</span>
//                 <span>₹{shipping.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Tax</span>
//                 <span>₹{tax.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-medium pt-4 border-t">
//                 <span>Grand total</span>
//                 <span>₹{grandTotal.toFixed(2)}</span>
//               </div>
//             </div>
//             <button
//               onClick={handleEnroll}
//               disabled={processingOrder || loading || cartItems.length === 0}
//               className="w-full bg-white text-black border border-gray-200 py-3 rounded-xl mt-6 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {processingOrder ? "Processing..." : "Enroll Now"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
