"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const paymentSchema = z
  .object({
    paymentMethod: z.enum(["card", "upi", "cod"]),
    // Card details (only required if paymentMethod is "card")
    cardNumber: z.string().optional(),
    cardName: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
    saveInformation: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "card") {
        return data.cardNumber && data.cardName && data.expiryDate && data.cvv;
      }
      return true;
    },
    {
      message: "Card details are required for card payment",
      path: ["cardNumber"],
    }
  );

export default function PaymentPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
      saveInformation: false,
    },
  });

  useEffect(() => {
    const savedOrder = localStorage.getItem("pendingOrder");
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
  }, []);

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError("");

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically:
      // 1. Process payment through payment gateway
      // 2. Update order status
      // 3. Clear cart
      // 4. Send confirmation email

      // Clear pending order from localStorage
      localStorage.removeItem("pendingOrder");

      // Redirect to success page
      router.push("/ordersuccess");
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="mx-auto p-6 flex gap-8">
      <div className="flex-1">
        <div className="bg-[#FDF8F3] rounded-lg p-6 mb-6 box-shadow shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Select Payment Methods</h2>

          <div className="space-y-4">
            <label
              className="flex items-center p-3 border rounded cursor-pointer transition-all duration-200 hover:bg-[#F5E6D8] data-[selected=true]:bg-[#F5E6D8]"
              data-selected={paymentMethod === "card"}
            >
              <div className="flex items-center gap-3 w-full">
                <input
                  type="radio"
                  {...register("paymentMethod")}
                  value="card"
                  className="accent-[#8B4513] w-4 h-4"
                />
                <span className="font-medium">Credit Card / Debit card</span>
              </div>
            </label>

            {paymentMethod === "card" && (
              <div className="space-y-4 p-4">
                <input
                  {...register("cardNumber")}
                  placeholder="Card Number"
                  className="w-full p-2 rounded border"
                />
                <input
                  {...register("cardName")}
                  placeholder="Name on card"
                  className="w-full p-2 rounded border"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    {...register("expiryDate")}
                    placeholder="Expiration date"
                    className="w-full p-2 rounded border"
                  />
                  <input
                    {...register("cvv")}
                    placeholder="CVV"
                    className="w-full p-2 rounded border"
                    type="password"
                    maxLength={4}
                  />
                </div>
              </div>
            )}

            <label
              className="flex items-center p-3 border rounded cursor-pointer transition-all duration-200 hover:bg-[#F5E6D8] data-[selected=true]:bg-[#F5E6D8]"
              data-selected={paymentMethod === "upi"}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  {...register("paymentMethod")}
                  value="upi"
                  className="accent-[#8B4513] w-4 h-4"
                />
                <span className="font-medium">UPI</span>
              </div>
            </label>

            <label
              className="flex items-center p-3 border rounded cursor-pointer transition-all duration-200 hover:bg-[#F5E6D8] data-[selected=true]:bg-[#F5E6D8]"
              data-selected={paymentMethod === "cod"}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  {...register("paymentMethod")}
                  value="cod"
                  className="accent-[#8B4513] w-4 h-4"
                />
                <span className="font-medium">Cash on delivery</span>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-[#FDF8F3] rounded-lg p-6 box-shadow shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Remember my information
          </h2>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("saveInformation")}
              className="accent-[#8B4513] w-4 h-4"
            />
            <span>Save my information for future purchase</span>
          </label>
        </div>
      </div>

      <div className="w-80">
        <div className="bg-[#FDF8F3] rounded-lg p-6 box-shadow shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Items</h2>
            <button className="text-gray-600 hover:text-gray-800">
              Edit Cart
            </button>
          </div>

          <div className="space-y-4">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">{item.quantity}x</p>
                </div>
                <span>₹{item.price.toFixed(2)}</span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{orderDetails.orderTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{orderDetails.shippingCost.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{orderDetails.tax.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold">
              <span>Grand total</span>
              <span>
                ₹
                {(
                  orderDetails.orderTotal +
                  orderDetails.shippingCost +
                  orderDetails.tax
                ).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl mt-6 transition-all duration-200
                ${
                  isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white text-black border border-gray-200 hover:bg-gray-50"
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Continue Payment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//backend code
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const paymentSchema = z
//   .object({
//     paymentMethod: z.enum(["card", "upi", "cod"]),
//     // Card details (only required if paymentMethod is "card")
//     cardNumber: z.string().optional(),
//     cardName: z.string().optional(),
//     expiryDate: z.string().optional(),
//     cvv: z.string().optional(),
//     saveInformation: z.boolean().optional(),
//   })
//   .refine(
//     (data) => {
//       if (data.paymentMethod === "card") {
//         return data.cardNumber && data.cardName && data.expiryDate && data.cvv;
//       }
//       return true;
//     },
//     {
//       message: "Card details are required for card payment",
//       path: ["cardNumber"],
//     }
//   );

// // Add API endpoints configuration
// const API_ENDPOINTS = {
//   processPayment: "/api/payment/process",
//   validatePayment: "/api/payment/validate",
//   updateOrder: "/api/orders/update",
// };

// // Add payment processing service
// const paymentService = {
//   async processCardPayment(paymentData) {
//     try {
//       const response = await axios.post(
//         API_ENDPOINTS.processPayment,
//         paymentData
//       );
//       return response.data;
//     } catch (error) {
//       throw new Error(
//         error.response?.data?.message || "Payment processing failed"
//       );
//     }
//   },

//   async processUPIPayment(paymentData) {
//     try {
//       const response = await axios.post(API_ENDPOINTS.processPayment, {
//         ...paymentData,
//         method: "upi",
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "UPI payment failed");
//     }
//   },

//   async updateOrderStatus(orderId, status) {
//     try {
//       const response = await axios.patch(API_ENDPOINTS.updateOrder, {
//         orderId,
//         status,
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(
//         error.response?.data?.message || "Failed to update order"
//       );
//     }
//   },
// };

// export default function PaymentPage() {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(paymentSchema),
//     defaultValues: {
//       paymentMethod: "card",
//       saveInformation: false,
//     },
//   });

//   useEffect(() => {
//     const handleApiError = (error) => {
//       if (error.response?.status === 401) {
//         // Handle unauthorized access
//         router.push("/login");
//       } else if (error.response?.status === 503) {
//         // Handle service unavailable
//         setError(
//           "Payment service is currently unavailable. Please try again later."
//         );
//       }
//     };

//     // Add axios interceptor for global error handling
//     const interceptor = axios.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         handleApiError(error);
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       // Remove interceptor on cleanup
//       axios.interceptors.response.eject(interceptor);
//     };
//   }, [router]);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setIsLoading(true);
//         const savedOrder = localStorage.getItem("pendingOrder");

//         if (!savedOrder) {
//           router.push("/cart");
//           return;
//         }

//         const orderData = JSON.parse(savedOrder);

//         // Validate order data here if needed
//         if (!orderData.orderId || !orderData.orderTotal) {
//           throw new Error("Invalid order data");
//         }

//         setOrderDetails(orderData);
//       } catch (error) {
//         console.error("Error loading order details:", error);
//         setError("Failed to load order details. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [router]);

//   const paymentMethod = watch("paymentMethod");

//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);
//       setError("");

//       // Prepare payment data
//       const paymentData = {
//         orderId: orderDetails.orderId,
//         amount:
//           orderDetails.orderTotal +
//           orderDetails.shippingCost +
//           orderDetails.tax,
//         currency: "INR",
//         paymentMethod: data.paymentMethod,
//         customerInfo: {
//           email: orderDetails.email,
//           phone: orderDetails.phone,
//         },
//         saveInformation: data.saveInformation,
//       };

//       // Add card details if payment method is card
//       if (data.paymentMethod === "card") {
//         paymentData.cardDetails = {
//           number: data.cardNumber,
//           name: data.cardName,
//           expiry: data.expiryDate,
//           cvv: data.cvv,
//         };
//       }

//       let paymentResult;

//       // Process payment based on method
//       switch (data.paymentMethod) {
//         case "card":
//           paymentResult = await paymentService.processCardPayment(paymentData);
//           break;
//         case "upi":
//           paymentResult = await paymentService.processUPIPayment(paymentData);
//           break;
//         case "cod":
//           paymentResult = {
//             success: true,
//             message: "COD order placed successfully",
//           };
//           break;
//         default:
//           throw new Error("Invalid payment method");
//       }

//       if (paymentResult.success) {
//         // Update order status
//         await paymentService.updateOrderStatus(orderDetails.orderId, "paid");

//         // Clear pending order from localStorage
//         localStorage.removeItem("pendingOrder");

//         // Redirect to success page with order details
//         router.push(`/order-success?orderId=${orderDetails.orderId}`);
//       } else {
//         throw new Error(paymentResult.message || "Payment failed");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       setError(error.message || "Payment failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div
//           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//           role="alert"
//         >
//           <strong className="font-bold">Error!</strong>
//           <span className="block sm:inline"> {error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!orderDetails) return <div>Loading...</div>;

//   return (
//     <div className="mx-auto p-6 flex gap-8">
//       <div className="flex-1">
//         <div className="bg-[#FDF8F3] rounded-lg p-6 mb-6 box-shadow shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">Select Payment Methods</h2>

//           <div className="space-y-4">
//             <label
//               className="flex items-center p-3 border rounded cursor-pointer transition-all duration-200 hover:bg-[#F5E6D8] data-[selected=true]:bg-[#F5E6D8]"
//               data-selected={paymentMethod === "card"}
//             >
//               <div className="flex items-center gap-3 w-full">
//                 <input
//                   type="radio"
//                   {...register("paymentMethod")}
//                   value="card"
//                   className="accent-[#8B4513] w-4 h-4"
//                 />
//                 <span className="font-medium">Credit Card / Debit card</span>
//               </div>
//             </label>

//             {paymentMethod === "card" && (
//               <div className="space-y-4 p-4">
//                 <input
//                   {...register("cardNumber")}
//                   placeholder="Card Number"
//                   className="w-full p-2 rounded border"
//                 />
//                 <input
//                   {...register("cardName")}
//                   placeholder="Name on card"
//                   className="w-full p-2 rounded border"
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     {...register("expiryDate")}
//                     placeholder="Expiration date"
//                     className="w-full p-2 rounded border"
//                   />
//                   <input
//                     {...register("cvv")}
//                     placeholder="CVV"
//                     className="w-full p-2 rounded border"
//                     type="password"
//                     maxLength={4}
//                   />
//                 </div>
//               </div>
//             )}

//             <label
//               className="flex items-center p-3 border rounded cursor-pointer transition-all duration-200 hover:bg-[#F5E6D8] data-[selected=true]:bg-[#F5E6D8]"
//               data-selected={paymentMethod === "upi"}
//             >
//               <div className="flex items-center gap-3">
//                 <input
//                   type="radio"
//                   {...register("paymentMethod")}
//                   value="upi"
//                   className="accent-[#8B4513] w-4 h-4"
//                 />
//                 <span className="font-medium">UPI</span>
//               </div>
//             </label>

//             <label
//               className="flex items-center p-3 border rounded cursor-pointer transition-all duration-200 hover:bg-[#F5E6D8] data-[selected=true]:bg-[#F5E6D8]"
//               data-selected={paymentMethod === "cod"}
//             >
//               <div className="flex items-center gap-3">
//                 <input
//                   type="radio"
//                   {...register("paymentMethod")}
//                   value="cod"
//                   className="accent-[#8B4513] w-4 h-4"
//                 />
//                 <span className="font-medium">Cash on delivery</span>
//               </div>
//             </label>
//           </div>
//         </div>

//         <div className="bg-[#FDF8F3] rounded-lg p-6 box-shadow shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">
//             Remember my information
//           </h2>
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               {...register("saveInformation")}
//               className="accent-[#8B4513] w-4 h-4"
//             />
//             <span>Save my information for future purchase</span>
//           </label>
//         </div>
//       </div>

//       <div className="w-80">
//         <div className="bg-[#FDF8F3] rounded-lg p-6 box-shadow shadow-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Items</h2>
//             <button className="text-gray-600 hover:text-gray-800">
//               Edit Cart
//             </button>
//           </div>

//           <div className="space-y-4">
//             {orderDetails.items.map((item, index) => (
//               <div key={index} className="flex justify-between">
//                 <div>
//                   <p>{item.name}</p>
//                   <p className="text-sm text-gray-500">{item.quantity}x</p>
//                 </div>
//                 <span>₹{item.price.toFixed(2)}</span>
//               </div>
//             ))}

//             <hr />

//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{orderDetails.orderTotal.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span>₹{orderDetails.shippingCost.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Tax</span>
//               <span>₹{orderDetails.tax.toFixed(2)}</span>
//             </div>

//             <hr />

//             <div className="flex justify-between font-semibold">
//               <span>Grand total</span>
//               <span>
//                 ₹
//                 {(
//                   orderDetails.orderTotal +
//                   orderDetails.shippingCost +
//                   orderDetails.tax
//                 ).toFixed(2)}
//               </span>
//             </div>

//             <button
//               onClick={handleSubmit(onSubmit)}
//               disabled={isSubmitting}
//               className={`w-full py-3 rounded-xl mt-6 transition-all duration-200
//                 ${
//                   isSubmitting
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-white text-black border border-gray-200 hover:bg-gray-50"
//                 }`}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg
//                     className="animate-spin h-5 w-5 text-gray-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Processing...
//                 </span>
//               ) : (
//                 "Continue Payment"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
