"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/components/custom/razorpay";
import { postDataToAPI } from "@/lib/api";

const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  shippingMethod: z.enum(["free", "regular", "express"]),
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

const defaultAddress = {
  fullName: "suresh mistry",
  phone: "9876543210",
  streetAddress: "123, Green Park Colony",
  city: "Mumbai",
  region: "Maharashtra",
  postalCode: "400001",
  shippingMethod: "regular"
};

export default function CheckoutPage() {
  const router = useRouter();
  const [total, setTotal] = useState(2200.0);
  const [shipping, setShipping] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const { cartItems, getCartTotal } = useCart();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: "regular",
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

  useEffect(() => {
    const savedAddresses = localStorage.getItem('shippingAddresses');
    if (!savedAddresses) {
      // Initialize with default address if none exists
      const initialAddresses = [defaultAddress];
      localStorage.setItem('shippingAddresses', JSON.stringify(initialAddresses));
      setAddresses(initialAddresses);
    } else {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  // Add separate handler for new addresses
  const handleAddAddress = async (data) => {
    try {
      const newAddresses = [...addresses, data];
      localStorage.setItem('shippingAddresses', JSON.stringify(newAddresses));
      setAddresses(newAddresses);
      setSelectedAddressIndex(newAddresses.length - 1);
      setShowNewAddressForm(false);
      reset(data);
    } catch (error) {
      console.error('Error adding address:', error);
      alert("Failed to add address. Please try again.");
    }
  };

  // Update onSubmit to use selected address
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError("");

      const shippingAddress = showNewAddressForm ? data : addresses[selectedAddressIndex];
      
      const orderData = {
        shipping_address: shippingAddress, // Add shipping address to order data
        shipping_method: shippingMethod,
        transaction_details: {
          order_total: getCartTotal() + shipping,
          tax: 18,
          id: null
        },
        create_order_lines: cartItems.map(item => ({ product: item.id, quantity: item.quantity })),
      };

      const ok = await createOrder(getCartTotal() + shipping, orderData);

      if (ok) {
        alert("zala")
      }


    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
    if (index !== -1) {
      reset(addresses[index]);
      setShowNewAddressForm(false);
    }
  };

  return (
    <div className="mx-auto p-6 flex gap-8 mt-20">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex-1">
        <form
          id="checkout-form"
          onSubmit={handleSubmit(showNewAddressForm ? handleAddAddress : onSubmit)}
        >
          <div className="bg-[#FDF8F3] rounded-lg p-6 mb-6 box-shadow shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Select Shipping Address</h2>
            
            <div className="space-y-4 mb-6">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded cursor-pointer ${
                    selectedAddressIndex === index && !showNewAddressForm ? 'border-[#8B4513] bg-[#F5E6D8]' : 'border-gray-200'
                  }`}
                  onClick={() => handleAddressSelect(index)}
                >
                  <p className="font-semibold">{address.fullName}</p>
                  <p>{address.streetAddress}</p>
                  <p>{address.city}, {address.region} - {address.postalCode}</p>
                  <p>Phone: {address.phone}</p>
                </div>
              ))}
              
              <button
                type="button"
                className="w-full py-2 px-4 border border-[#8B4513] text-[#8B4513] rounded hover:bg-[#F5E6D8]"
                onClick={() => {
                  setShowNewAddressForm(true);
                  setSelectedAddressIndex(-1);
                  reset({});
                }}
              >
                + Add New Address
              </button>
            </div>

            {showNewAddressForm && (
              <>
                <h3 className="text-lg font-semibold mb-4">New Shipping Address</h3>
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

                  <div>
                    <label className="block mb-1">Phone no. *</label>
                    <input
                      {...register("phone")}
                      className="w-full p-2 rounded border"
                      placeholder="Enter your Phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
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
                    {errors.streetAddress && (
                      <p className="text-red-500 text-sm">
                        {errors.streetAddress.message}
                      </p>
                    )}
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
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Add these buttons */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#8B4513] text-white rounded hover:bg-[#704012]"
                  >
                    Add Address
                  </button>
                  <button
                    type="button"
                    className="w-full mt-2 py-2 px-4 border border-[#8B4513] text-[#8B4513] rounded hover:bg-[#F5E6D8]"
                    onClick={() => {
                      setShowNewAddressForm(false);
                      if (selectedAddressIndex >= 0) {
                        reset(addresses[selectedAddressIndex]);
                      }
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="bg-[#FDF8F3] rounded-lg p-6 box-shadow shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
            <div className="space-y-4">
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
      </div>

      <div className="w-80 space-y-6">
        <div className="bg-[#FDF8F3] rounded-lg p-6 box-shadow shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          <div className="space-y-4">
            {cartItems.map((item, idx) => (
              <div key={item.id} className="flex justify-between">
                <span className="mr-2"> <b>{idx + 1}.</b> {item.title}</span>
                <span>₹{item.price.toFixed(2)}</span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
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
              <span>₹{(getCartTotal() + shipping).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {!showNewAddressForm && (
          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#8B4513] text-white rounded hover:bg-[#704012] disabled:bg-gray-400"
          >
            Continue to Payment
          </button>
        )}
      </div>
    </div>
  );
}
