"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function VerifyPage() {
  const [pdaDetails, setPdaDetails] = useState(null);
  const [showLowBalanceAlert, setShowLowBalanceAlert] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    // For now, we'll use localStorage data
    const savedData = localStorage.getItem('pdaFormData');
    if (savedData) {
      setPdaDetails(JSON.parse(savedData));
      // Simulate low balance check
      const { depositAmount } = JSON.parse(savedData);
      setShowLowBalanceAlert(depositAmount < 500); // Example threshold
    }
  }, []);

  const handleAddMoney = () => {
    // Implement payment gateway integration
    alert("Redirecting to payment gateway...");
  };

  if (!pdaDetails) {
    return <div className="p-8 text-center">Loading PDA details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">PDA Status: Active</h1>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Verified ✓
            </span>
          </div>
          <p className="text-gray-600">PDA Account Number: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        {/* Low Balance Alert */}
        {showLowBalanceAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Your current balance is low. You may miss the next release. Consider adding more funds.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Personal Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{pdaDetails.personalDetails.applicantName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer Type</p>
              <p className="font-medium capitalize">{pdaDetails.customerType}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Mailing Address</p>
              <p className="font-medium">{pdaDetails.personalDetails.mailingAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">PIN Code</p>
              <p className="font-medium">{pdaDetails.personalDetails.pinCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Frequency</p>
              <p className="font-medium capitalize">{pdaDetails.personalDetails.frequency}</p>
            </div>
          </div>
        </div>

        {/* Account Balance */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Account Balance</h2>
            <button
              onClick={handleAddMoney}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Money
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-gray-800">₹{pdaDetails.depositAmount}</div>
            <p className="text-gray-600 mt-2">Current Balance</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pdaDetails.orderDetails.addedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
