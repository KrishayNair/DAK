"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function WorkshopModal({ isOpen, onClose, workshop, modalRef }) {
  if (!workshop) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={`fixed bottom-0 left-0 right-0 bg-white w-full h-[80vh] rounded-t-[2.5rem] p-6 overflow-y-auto transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            {workshop.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                {workshop.image && (
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="text-sm text-gray-600">
                    {workshop.description}
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Workshop Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-gray-600">Duration</p>
                    <p>{workshop.duration}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Time</p>
                    <p>{new Date(workshop.time).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Mode</p>
                    <p className="capitalize">{workshop.mode}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold mb-2">Price</p>
                <p className="text-lg font-medium text-[#B85C38]">Free</p>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold mb-2">Workshop Name</p>
                <p>{workshop.title}</p>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold mb-2">Date & Time</p>
                <p>{new Date(workshop.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p>{new Date(workshop.time).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}</p>
              </div>

              <button 
                className="w-full bg-[#B85C38] text-white py-3 rounded-lg hover:bg-[#A04B2D] transition-colors font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add join workshop logic here
                }}
              >
                Join Workshop
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-4">Additional Information</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What you'll learn</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Introduction to philately and stamp collecting</li>
                    <li>Understanding stamp values and rarity</li>
                    <li>Proper handling and preservation techniques</li>
                    <li>Building and organizing your collection</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>No prior experience needed</li>
                    <li>Basic stamp collecting tools (optional)</li>
                    <li>Enthusiasm to learn about philately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}