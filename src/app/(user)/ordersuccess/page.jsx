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
