"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const checkoutSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    confirmEmail: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    shippingMethod: z.enum(["free", "regular", "express"]),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails don't match",
    path: ["confirmEmail"],
  });

// Server action simulation (in real app, this would be a server component)
async function processCheckout(orderData) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validate the order data
    if (!orderData) {
      throw new Error("Invalid order data");
    }

    // Here you would typically:
    // 1. Create the order in your database
    // 2. Process payment
    // 3. Send confirmation email
    // 4. Update inventory

    // Mock successful response
    return {
      success: true,
      orderId: "ORD" + Date.now(),
      message: "Order placed successfully",
    };
  } catch (error) {
    console.error("Checkout processing error:", error);
    throw new Error(error.message || "Failed to process order");
  }
}

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export default function CheckoutPage() {
  const router = useRouter();
  const [total, setTotal] = useState(2200.0);
  const [shipping, setShipping] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: "free",
    },
  });

  // Watch shipping method and update shipping cost
  const shippingMethod = watch("shippingMethod");
  useEffect(() => {
    switch (shippingMethod) {
      case "regular":
        setShipping(50);
        break;
      case "express":
        setShipping(100);
        break;
      default:
        setShipping(0);
    }
  }, [shippingMethod]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError("");

      // Prepare the order data
      const orderData = {
        ...data,
        orderTotal: total + shipping,
        items: [
          {
            id: "india-1873-indipex",
            name: "India 1873 Indipex MNH Miniature Sheet",
            price: 2200.0,
            quantity: 1,
          },
        ],
        shippingCost: shipping,
        tax: 0,
        status: "pending",
        orderDate: new Date().toISOString(),
      };

      // Store order details in localStorage for payment page
      localStorage.setItem("pendingOrder", JSON.stringify(orderData));

      // Redirect to payment page
      router.push("/payment");
    } catch (error) {
      console.error("Checkout error:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-6 flex gap-8">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form
        id="checkout-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1"
      >
        <div className="bg-[#FDF8F3] rounded-lg p-6 mb-6 box-shadow shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">Full name *</label>
              <input
                {...register("fullName")}
                className="w-full p-2 rounded border"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Email *</label>
                <input
                  {...register("email")}
                  className="w-full p-2 rounded border"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Confirm Email *</label>
                <input
                  {...register("confirmEmail")}
                  className="w-full p-2 rounded border"
                  placeholder="Enter your email"
                />
                {errors.confirmEmail && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmEmail.message}
                  </p>
                )}
              </div>
            </div>

            {/* Other form fields following the same pattern */}
            <div>
              <label className="block mb-1">Phone no. *</label>
              <input
                {...register("phone")}
                className="w-full p-2 rounded border"
                placeholder="Enter your Phone number"
              />
            </div>

            <div>
              <label className="block mb-1">
                Street Name and House Number *
              </label>
              <input
                {...register("streetAddress")}
                className="w-full p-2 rounded border"
                placeholder="Enter your Street Name and House Number"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">City *</label>
                <input
                  {...register("city")}
                  className="w-full p-2 rounded border"
                  placeholder="Enter your City"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1">Region *</label>
                <select
                  {...register("region")}
                  className="w-full p-2 rounded border"
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p className="text-red-500 text-sm">
                    {errors.region.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1">Postal Code *</label>
              <input
                {...register("postalCode")}
                className="w-full p-2 rounded border"
                placeholder="Enter your postal code"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#FDF8F3] rounded-lg p-6 box-shadow shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
          <div className="space-y-4">
            <label
              className="flex items-center justify-between p-3 border rounded cursor-pointer transition-all duration-200 hover:bg-[#F5E6D8] data-[selected=true]:bg-[#F5E6D8]"
              data-selected={watch("shippingMethod") === "free"}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  {...register("shippingMethod")}
                  value="free"
                  className="accent-[#8B4513] w-4 h-4"
                />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-500">7-30 Business Days</p>
                </div>
              </div>
              <span>₹0.00</span>
            </label>

            <label
              className="flex items-center justify-between p-3 border rounded cursor-pointer transition-all duration-200 hover:bg-[#F5E6D8] data-[selected=true]:bg-[#F5E6D8]"
              data-selected={watch("shippingMethod") === "regular"}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  {...register("shippingMethod")}
                  value="regular"
                  className="accent-[#8B4513] w-4 h-4"
                />
                <div>
                  <p className="font-medium">Regular Shipping</p>
                  <p className="text-sm text-gray-500">3-15 Business Days</p>
                </div>
              </div>
              <span>₹50.00</span>
            </label>

            <label
              className="flex items-center justify-between p-3 border rounded cursor-pointer transition-all duration-200 hover:bg-[#F5E6D8] data-[selected=true]:bg-[#F5E6D8]"
              data-selected={watch("shippingMethod") === "express"}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  {...register("shippingMethod")}
                  value="express"
                  className="accent-[#8B4513] w-4 h-4"
                />
                <div>
                  <p className="font-medium">Express Shipping</p>
                  <p className="text-sm text-gray-500">1-3 Business Days</p>
                </div>
              </div>
              <span>₹100.00</span>
            </label>
          </div>
        </div>
      </form>

      <div className="w-80">
        <div className="bg-[#FDF8F3] rounded-lg p-6 box-shadow shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>India 1873 Indipex MNH Miniature Sheet</span>
              <span>₹2,200.00</span>
            </div>

            <hr />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹0.00</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold">
              <span>Grand total</span>
              <span>₹{(total + shipping).toFixed(2)}</span>
            </div>

            <button
              type="submit"
              form="checkout-form"
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
                "Continue to Payment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
