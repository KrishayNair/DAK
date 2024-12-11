"use client";
import React, { useEffect } from 'react';

export function PersonalDetails({ details = {}, onChange }) {
  const handleChange = (field, value) => {
    let updatedDetails;
    
    if (field === 'subscriptionType') {
      updatedDetails = {
        ...details,
        subscriptionType: value,
        applicantName: '',
        mailingAddress: '',
        pinCode: '',
        recipientName: '',
        recipientAddress: '',
        recipientPinCode: '',
        frequency: details.frequency
      };
    } else {
      updatedDetails = {
        ...details,
        [field]: value,
      };
    }

    // Save to localStorage
    localStorage.setItem('pdaPersonalDetails', JSON.stringify(updatedDetails));
    
    // Update parent component
    onChange(updatedDetails);
  };

  // Save initial data to localStorage when component mounts
  useEffect(() => {
    const savedDetails = localStorage.getItem('pdaPersonalDetails');
    if (!savedDetails) {
      localStorage.setItem('pdaPersonalDetails', JSON.stringify(details));
    }
  }, []);

  // Log changes for debugging
  useEffect(() => {
    console.log('Personal Details Updated:', details);
  }, [details]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center mb-6">PERSONAL DETAILS</h2>

      {/* Subscription Type Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subscription Type
        </label>
        <select
          value={details.subscriptionType || ''}
          onChange={(e) => handleChange('subscriptionType', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select subscription type</option>
          <option value="self">Self Subscription</option>
          <option value="gift">Gift Subscription</option>
        </select>
      </div>

      {/* Self Subscription Fields */}
      {details.subscriptionType === 'self' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name of applicant
            </label>
            <input
              type="text"
              value={details.applicantName || ''}
              onChange={(e) => handleChange('applicantName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mailing Address
            </label>
            <textarea
              value={details.mailingAddress || ''}
              onChange={(e) => handleChange('mailingAddress', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pin
            </label>
            <input
              type="text"
              value={details.pinCode || ''}
              onChange={(e) => handleChange('pinCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              maxLength={6}
            />
          </div>
        </div>
      )}

      {/* Gift Subscription Fields */}
      {details.subscriptionType === 'gift' && (
        <div>
          <p className="text-sm font-medium mb-4">I wish to take out a gift subscription in the name of:</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of recipient
              </label>
              <input
                type="text"
                value={details.recipientName || ''}
                onChange={(e) => handleChange('recipientName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mailing Address
              </label>
              <textarea
                value={details.recipientAddress || ''}
                onChange={(e) => handleChange('recipientAddress', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pin
              </label>
              <input
                type="text"
                value={details.recipientPinCode || ''}
                onChange={(e) => handleChange('recipientPinCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                maxLength={6}
              />
            </div>
          </div>
        </div>
      )}

      {/* Frequency Options */}
      {details.subscriptionType && (
        <div className="flex justify-between items-center gap-4 mt-4">
          {[
            { value: 'yearly', label: 'Once a Year' },
            { value: 'halfYearly', label: 'Twice a Year' },
            { value: 'quarterly', label: 'Four times a year' },
            { value: 'bimonthly', label: 'Six times a year' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="frequency"
                value={option.value}
                checked={details.frequency === option.value}
                onChange={(e) => handleChange('frequency', e.target.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Debug Information */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <pre className="text-xs overflow-auto">
          {JSON.stringify(details, null, 2)}
        </pre>
      </div>
    </div>
  );
}