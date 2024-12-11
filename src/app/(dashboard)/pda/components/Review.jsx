"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Review() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Load all form data from localStorage
    const loadFormData = () => {
      const customerData = localStorage.getItem('pdaCustomerData');
      const personalData = localStorage.getItem('pdaPersonalDetails');
      const orderData = localStorage.getItem('pdaOrderItems');
      const depositAmount = localStorage.getItem('pdaDepositAmount');

      try {
        const parsedCustomerData = customerData ? JSON.parse(customerData) : {};
        const parsedPersonalData = personalData ? JSON.parse(personalData) : {};
        const parsedOrderData = orderData ? JSON.parse(orderData) : [];
        const parsedDepositAmount = depositAmount ? JSON.parse(depositAmount) : 0;

        const safeFormData = {
          customerType: parsedCustomerData.customerType || '',
          personalDetails: {
            applicantName: parsedPersonalData.applicantName || '',
            mailingAddress: parsedPersonalData.mailingAddress || '',
            pinCode: parsedPersonalData.pinCode || '',
            frequency: parsedPersonalData.frequency || '',
            detailType: parsedPersonalData.detailType || '',
            recipientName: parsedPersonalData.recipientName || '',
            recipientAddress: parsedPersonalData.recipientAddress || '',
            recipientPinCode: parsedPersonalData.recipientPinCode || '',
          },
          orderDetails: {
            productType: '',
            addedItems: parsedOrderData,
            depositAmount: parsedDepositAmount,
          }
        };

        setFormData(safeFormData);
      } catch (error) {
        console.error('Error parsing form data:', error);
      }
    };

    loadFormData();
  }, []);

  const handleProceedToPay = () => {
    router.push('/payment');
  };

  if (!formData) {
    return <div className="p-8 text-center">Loading form data...</div>;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-[21cm] mx-auto bg-white p-8 shadow-none">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold uppercase">Philatelic Deposit Account</h1>
            <h2 className="text-lg uppercase mt-2">Application Form</h2>
          </div>

          {/* Customer Type */}
          <div className="mb-6">
            <p className="text-sm mb-2">Type of Customer :</p>
            <div className="flex gap-12">
              {[
                { value: 'individual', label: 'Private / Individual' },
                { value: 'dealer', label: 'Stamp dealer / shop' },
                { value: 'company', label: 'Company' }
              ].map((type) => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.customerType === type.value}
                    readOnly
                    className="mr-2"
                  />
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Personal Details */}
          <div className="mb-8">
            <h3 className="font-bold text-sm border-b border-black mb-4">PERSONAL DETAILS</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm">Name of applicant:</p>
                <div className="border-b border-gray-300 py-1">
                  {formData.personalDetails.applicantName}
                </div>
              </div>
              <div>
                <p className="text-sm">Mailing Address:</p>
                <div className="border-b border-gray-300 py-1">
                  {formData.personalDetails.mailingAddress}
                </div>
              </div>
              <div>
                <p className="text-sm">Pin:</p>
                <div className="border-b border-gray-300 py-1">
                  {formData.personalDetails.pinCode}
                </div>
              </div>

              <h3 className="text-center">And/Or</h3>
              <div>
                <p className="text-sm">I wish to take out a gift subscription in the name of:</p>
                <div className="border-b border-gray-300 py-1">
                  {formData.personalDetails.recipientName}
                </div>
              </div>
              <div>
                <p className="text-sm">Mailing Address:</p>
                <div className="border-b border-gray-300 py-1">
                  {formData.personalDetails.recipientAddress}
                </div>
              </div>
              <div>
                <p className="text-sm">Pin:</p>
                <div className="border-b border-gray-300 py-1">
                  {formData.personalDetails.recipientPinCode}
                </div>
              </div>
            </div>
          </div>

          {/* Frequency Selection */}
          <div className="mt-4 mb-4">
            <p className="text-sm mb-2">Frequency:</p>
            <div className="flex gap-12">
              {[
                { value: 'yearly', label: 'Once a Year' },
                { value: 'halfYearly', label: 'Twice a Year' },
                { value: 'quarterly', label: 'Four times a year' },
                { value: 'bimonthly', label: 'Six times a year' }
              ].map((freq) => (
                <label key={freq.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.personalDetails.frequency === freq.value}
                    readOnly
                    className="mr-2"
                  />
                  <span className="text-sm">{freq.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Form */}
          <div>
            <h3 className="font-bold text-sm border-b border-black mb-4">ORDER FORM</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2 text-left">ITEM</th>
                  <th className="border border-gray-400 p-2 w-24">QUANTITY</th>
                  <th className="border border-gray-400 p-2 w-24">TYPE</th>
                </tr>
              </thead>
              <tbody>
                {formData.orderDetails.addedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2">{item.name}</td>
                    <td className="border border-gray-400 p-2 text-center">{item.quantity}</td>
                    <td className="border border-gray-400 p-2 text-center">{item.type}</td>
                  </tr>
                ))}
                {formData.orderDetails.addedItems.length === 0 && (
                  <tr>
                    <td colSpan="3" className="border border-gray-400 p-2 text-center text-gray-500">
                      No items added
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="mt-4">
              <p className="text-sm font-medium">
                Deposit Amount: ₹{formData.orderDetails.depositAmount}
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-8">
            <div>
              <p className="text-sm">Date:</p>
              <div className="border-b border-gray-300 w-48 py-1">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-8 print:hidden flex gap-4">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 shadow-lg"
        >
          <span>Download Form</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>

        <button
          onClick={handleProceedToPay}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
        >
          <span>Proceed to Pay</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Review;