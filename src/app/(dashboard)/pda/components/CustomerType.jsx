"use client";
import React, { useEffect } from 'react';

export function CustomerType({ value, onChange }) {
  const customerTypes = [
    { id: 'individual', label: 'Individual' },
    { id: 'business', label: 'Business' },
    { id: 'institution', label: 'Institution' }
  ];

  useEffect(() => {
    // Load customer type from localStorage on mount
    const savedCustomerData = localStorage.getItem('pdaCustomerData');
    if (savedCustomerData) {
      try {
        const parsedData = JSON.parse(savedCustomerData);
        if (parsedData.customerType && !value) {
          onChange(parsedData.customerType);
        }
      } catch (error) {
        console.error('Error parsing customer data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever value changes
  useEffect(() => {
    if (value) {
      const customerData = {
        customerType: value,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('pdaCustomerData', JSON.stringify(customerData));
    }
  }, [value]);

  const handleTypeChange = (typeId) => {
    // Save to localStorage
    const customerData = {
      customerType: typeId,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('pdaCustomerData', JSON.stringify(customerData));
    
    onChange(typeId);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Select Customer Type</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {customerTypes.map(type => (
          <button
            key={type.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              value === type.id 
                ? 'border-secondary bg-secondary/10' 
                : 'border-gray-200 hover:border-secondary/50'
            }`}
            onClick={() => handleTypeChange(type.id)}
          >
            <h3 className="text-lg sm:text-xl font-medium">{type.label}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}