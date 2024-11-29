"use client"
import React, { useState } from 'react';
import { CustomerType, PersonalDetails, OrderDetails, Review, PaymentGateway, StepIndicator, DepositModal, Header, StepNavigation, StepContent, FormContainer } from './components';
import { Elsie_Swash_Caps } from 'next/font/google';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

const steps = ['Type of customers', 'Personal Details', 'Order Details', 'Review', 'Confirmation'];

export default function PDAPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    customerType: '',
    depositAmount: '',
    personalDetails: {
      applicantName: '',
      mailingAddress: '',
      pinCode: '',
      frequency: '',
      detailType: ''
    },
    orderDetails: {
      // ... your initial order details state
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStepChange = (direction) => {
    if (direction === 'next' && currentStep === 3 && (!formData.depositAmount || formData.depositAmount < 200)) {
      setIsModalOpen(true);
      return;
    }
    setCurrentStep(prev => direction === 'next' ? 
      Math.min(prev + 1, steps.length - 1) : 
      Math.max(prev - 1, 0)
    );
  };

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 0:
        return <CustomerType 
          value={formData.customerType} 
          onChange={(type) => updateFormData('customerType', type)} 
        />;
      case 1:
        return <PersonalDetails 
          details={formData.personalDetails} 
          onChange={(details) => updateFormData('personalDetails', details)} 
        />;
      case 2:
        return <OrderDetails 
          details={formData.orderDetails} 
          onChange={(details) => updateFormData('orderDetails', details)} 
        />;
      case 3:
        return <Review 
          formData={formData} 
          onDepositChange={(amount) => updateFormData('depositAmount', amount)} 
        />;
      case 4:
        return <PaymentGateway amount={formData.depositAmount} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-12">
          <h1 className={`text-6xl font-bold text-center mb-4 ${elsieSwashCaps.className}`}>
            Philately Deposit Account
          </h1>
          
          <p className="text-sm text-gray-600 mb-8 text-center">
            Fill this easy Form to activate your philately deposit account and receive your favorite material regularly
          </p>
          
          <StepIndicator steps={steps} currentStep={currentStep} />
          
          <div className="bg-gray-100 rounded-lg p-6 sm:p-8 mb-8">
            {renderCurrentStep()}
          </div>
          
          <div className="flex justify-between items-center">
            {currentStep > 0 && (
              <button 
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                onClick={() => handleStepChange('prev')}
              >
                Previous
              </button>
            )}
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              Save
            </button>
            {currentStep < steps.length - 1 && (
              <button 
                className="px-4 py-2 sm:px-6 sm:py-3 bg-secondary text-primary rounded hover:bg-secondary/90 transition-colors"
                onClick={() => handleStepChange('next')}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      
      <DepositModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}