//backend code
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function OrderSuccess() {
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("orderId");
//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true);
//         // Replace with your actual API endpoint
//         const response = await fetch(`/api/orders/${orderId}`);
//         if (!response.ok) throw new Error("Failed to fetch order details");
//         const data = await response.json();
//         setOrderData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrderDetails();
//     }
//   }, [orderId]);

//   if (loading) {
//     return (
//       <div className="h-[100vh] flex items-center justify-center bg-primary">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="h-[100vh] flex items-center justify-center bg-primary">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//           <p className="text-red-500 text-center">Error: {error}</p>
//           <Link href="/shop" className="block mt-8">
//             <button className="w-full bg-white border-2 border-gray-300 text-gray-700 rounded-md py-2 px-4 font-medium hover:bg-gray-50 transition-colors">
//               Return to Shop
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Fallback values if orderData is not available
//   const {
//     email = "nandanikadave123@gmail.com",
//     transactionDate = "Thursday, November 28, 2024",
//     paymentMethod = "Cash on delivery",
//     shippingMethod = "Express Delivery (1-3 Business days)",
//     items = [
//       {
//         image: "/collage.png",
//         name: "India 1973 Indipex MNH Miniature Sheet",
//         quantity: 1,
//         price: 2200.0,
//       },
//     ],
//     subtotal = 2200.0,
//     discount = 50.0,
//     shippingCost = 100,
//     total = 2250.0,
//   } = orderData || {};

//   return (
//     <div className="h-[100vh] flex items-center justify-center bg-primary p-4">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//         {/* Success Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//             <svg
//               className="w-8 h-8 text-green-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Order Confirmation */}
//         <h1 className="text-2xl font-semibold text-center mb-2">
//           Thanks for your order!
//         </h1>
//         <p className="text-gray-600 text-center text-sm mb-6">
//           Order confirmation has been sent on {email}
//         </p>

//         {/* Order Details */}
//         <div className="space-y-4">
//           <div>
//             <h2 className="text-sm font-medium text-gray-700">
//               Transaction Date
//             </h2>
//             <p className="text-gray-600">{transactionDate}</p>
//           </div>

//           <div>
//             <h2 className="text-sm font-medium text-gray-700">
//               Payment Method
//             </h2>
//             <p className="text-gray-600">{paymentMethod}</p>
//           </div>

//           <div>
//             <h2 className="text-sm font-medium text-gray-700">
//               Shipping Method
//             </h2>
//             <p className="text-gray-600">{shippingMethod}</p>
//           </div>

//           <button className="w-full text-blue-600 text-sm font-medium">
//             TRACK ORDER
//           </button>

//           {/* Order Items */}
//           <div>
//             <h2 className="text-sm font-medium text-gray-700 mb-3">
//               Your Order
//             </h2>
//             {items.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 border-b pb-4"
//               >
//                 <div className="w-16 h-16 bg-gray-100 rounded">
//                   <Image
//                     src={item.image}
//                     alt={item.name}
//                     width={64}
//                     height={64}
//                     className="rounded w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-sm font-medium">{item.name}</h3>
//                   <p className="text-gray-600">{item.quantity}x</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium">₹{item.price.toFixed(2)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="space-y-2 pt-4">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Applied Discount</span>
//               <span className="bg-gray-100 px-2 rounded">
//                 ₹{discount.toFixed(2)} OFF
//               </span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Shipment Cost</span>
//               <span>₹{shippingCost}</span>
//             </div>
//             <div className="flex justify-between text-lg font-medium pt-2">
//               <span>Grand total</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Continue Shopping Button */}
//         <Link href="/shop" className="block mt-8">
//           <button className="w-full bg-white border-2 border-gray-300 text-gray-700 rounded-md py-2 px-4 font-medium hover:bg-gray-50 transition-colors">
//             Continue Shopping
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import Image from "next/image";

export default function OrderSuccess() {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-primary p-4 mb-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Order Confirmation */}
        <h1 className="text-2xl font-semibold text-center mb-2">
          Thanks for your order!
        </h1>
        <p className="text-gray-600 text-center text-sm mb-6">
          Order confirmation has been sent on nandanikadave123@gmail.com
        </p>

        {/* Order Details */}
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Transaction Date
            </h2>
            <p className="text-gray-600">Thursday, November 28, 2024</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Payment Method
            </h2>
            <p className="text-gray-600">Cash on delivery</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-700">
              Shipping Method
            </h2>
            <p className="text-gray-600">
              Express Delivery (1-3 Business days)
            </p>
          </div>

          <button className="w-full text-blue-600 text-sm font-medium">
            TRACK ORDER
          </button>

          {/* Order Items */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              Your Order
            </h2>
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="w-16 h-16 bg-gray-100 rounded">
                <Image
                  src="/collage.png"
                  alt="Product"
                  width={64}
                  height={64}
                  className="rounded w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">
                  India 1973 Indipex MNH Miniature Sheet
                </h3>
                <p className="text-gray-600">1x</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹2,200.00</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>₹2,200.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Applied Discount</span>
              <span className="bg-gray-100 px-2 rounded">₹50.00 OFF</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipment Cost</span>
              <span>₹100</span>
            </div>
            <div className="flex justify-between text-lg font-medium pt-2">
              <span>Grand total</span>
              <span>₹2,250.00</span>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <Link href="/shop" className="block mt-8">
          <button className="w-full bg-white border-2 border-gray-300 text-gray-700 rounded-md py-2 px-4 font-medium hover:bg-gray-50 transition-colors">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
