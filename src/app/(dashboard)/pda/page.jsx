"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CustomerType,
  PersonalDetails,
  OrderDetails,
  Review,
  PaymentGateway,
  DepositModal,
} from "./components";
import { Elsie_Swash_Caps } from "next/font/google";
import { Timeline } from "./components/Timeline";
import { DocumentUpload } from './components/DocumentUpload';
import { useRouter } from 'next/navigation';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

const theme = {
  primary: "#2C3E50",    // Deep blue-gray
  secondary: "#8B4513",  // Saddle brown (stamp-like)
  accent: "#D4AF37",     // Metallic gold
  background: "#F5F5DC", // Beige (vintage paper look)
  success: "#2E7D32",    // Forest green
};

const steps = [
  { number: "01", title: "Type of customers" },
  { number: "02", title: "Personal Details" },
  { number: "03", title: "Order Details" },
  { number: "04", title: "Document Upload" },
  { number: "05", title: "Review & Pay" },
];

export default function PDAPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);
  const [orderSummary, setOrderSummary] = useState([]);
  const [formData, setFormData] = useState({
    customerType: "",
    depositAmount: "",
    personalDetails: {
      applicantName: "",
      mailingAddress: "",
      pinCode: "",
      frequency: "",
      detailType: "",
    },
    orderDetails: {
      productType: "",
      addedItems: [],
      depositAmount: 0,
    },
    documents: {
      idProof: null,
      addressProof: null,
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Reset form data on component mount
    setFormData({
      customerType: "",
      depositAmount: "",
      personalDetails: {
        applicantName: "",
        mailingAddress: "",
        pinCode: "",
        frequency: "",
        detailType: "",
      },
      orderDetails: {
        productType: "",
        addedItems: [],
        depositAmount: 0,
      },
      documents: {
        idProof: null,
        addressProof: null,
      }
    });
  }, []);

  const updateFormData = (section, data) => {
    try {
      setError(null);
      setFormData((prev) => {
        const newData = {
          ...prev,
          [section]:
            typeof data === "object" ? { ...prev[section], ...data } : data,
        };
        console.log('Form Data Updated:', JSON.stringify(newData, null, 2));
        return newData;
      });
    } catch (err) {
      setError("Failed to update form data");
      console.error(err);
    }
  };

  const handleDocumentChange = (documents) => {
    setFormData(prev => ({
      ...prev,
      documents
    }));
  };

  const handleValidityChange = (isValid) => {
    console.log('Validity changed:', isValid);
    setIsStepValid(isValid);
  };

  const handleStepValidityChange = (isValid) => {
    console.log('Step validity changed:', isValid);
    setIsStepValid(isValid);
  };

  const isStepComplete = (stepIndex) => {
    try {
      switch (stepIndex) {
        case 0: // Customer Type
          return !!formData.customerType && 
                 formData.customerType.trim() !== '';

        case 1: // Personal Details
          return !!(
            formData.personalDetails?.applicantName?.trim() &&
            formData.personalDetails?.mailingAddress?.trim() &&
            formData.personalDetails?.pinCode?.trim() &&
            formData.personalDetails?.frequency
          );

        case 2: // Order Details
          const hasItems = formData.orderDetails?.addedItems?.length > 0;
          console.log('Step 2 validation:', {
            hasItems,
            items: formData.orderDetails?.addedItems,
            isStepValid
          });
          return hasItems || isStepValid;

        case 3: // Document Upload
          const hasIdProof = formData.documents?.idProof?.file || formData.documents?.idProof?.url;
          const hasPanCard = formData.documents?.panCard?.file || formData.documents?.panCard?.url;
          return hasIdProof && hasPanCard;

        case 4: // Review
          return (
            isStepComplete(0) &&
            isStepComplete(1) &&
            isStepComplete(2) &&
            isStepComplete(3)
          );

        default:
          return false;
      }
    } catch (error) {
      console.error('Error checking step completion:', error);
      return false;
    }
  };

  // Add this helper function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Add this helper function to validate mobile number
  const isValidMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  // Add this helper function to validate PIN code
  const isValidPinCode = (pinCode) => {
    const pinCodeRegex = /^[0-9]{6}$/;
    return pinCodeRegex.test(pinCode);
  };

  // Update the handleStepChange function to include additional validation
  const handleStepChange = (direction) => {
    if (direction === "next") {
      if (!isStepComplete(currentStep)) {
        let errorMessage = "Please complete all required fields";
        
        // Custom error messages based on step
        switch (currentStep) {
          case 0:
            errorMessage = "Please select your customer type";
            break;
          case 1:
            if (!formData.personalDetails?.applicantName?.trim()) {
              errorMessage = "Please enter your full name";
            } else if (!formData.personalDetails?.mailingAddress?.trim()) {
              errorMessage = "Please enter your complete mailing address";
            } else if (!isValidPinCode(formData.personalDetails?.pinCode)) {
              errorMessage = "Please enter a valid 6-digit PIN code";
            } else if (!formData.personalDetails?.frequency) {
              errorMessage = "Please select your preferred frequency";
            }
            break;
          case 2:
            if (!formData.orderDetails?.addedItems?.length) {
              errorMessage = "Please add at least one item to your order";
            } else if (!formData.depositAmount || Number(formData.depositAmount) < 250) {
              errorMessage = "Minimum deposit amount of ₹250 is required";
            }
            break;
          case 3:
            errorMessage = "Please upload both ID proof and PAN card documents";
            break;
          case 4:
            errorMessage = "Please review all information and ensure it's correct";
            break;
        }
        
        setError(errorMessage);
        return;
      }

      // If we're on the Document Upload step (index 3) and moving to Review
      if (currentStep === 3) {
        // Fix the navigation
        router.push(`/review?data=${encodeURIComponent(JSON.stringify(formData))}`);
        return;
      }

      // Log form data when moving to next step
      console.log(`Completed Step ${currentStep + 1}:`, JSON.stringify(formData, null, 2));

      // Move to next step
      const nextStep = currentStep + 1;
      if (nextStep < steps.length) {
        setCurrentStep(nextStep);
        setError(null);

        // Scroll to the next section
        const sections = document.querySelectorAll(".timeline-section");
        if (sections[nextStep]) {
          sections[nextStep].scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      }
    } else if (direction === "prev" && currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const renderStepContent = (index) => {
    if (index !== currentStep) {
      return (
        <div className="text-center py-8 text-gray-500">
          {index < currentStep ? (
            <div><span className="text-green-600">✓</span> Step Completed</div>
          ) : (
            <div>Please complete previous steps first</div>
          )}
        </div>
      );
    }

    switch (index) {
      case 0:
        return <CustomerType value={formData.customerType} onChange={(type) => updateFormData("customerType", type)} />;
      case 1:
        return <PersonalDetails details={formData.personalDetails} onChange={(details) => updateFormData("personalDetails", details)} />;
      case 2:
        return (
          <OrderDetails
            details={formData.orderDetails}
            onChange={(details) => {
              console.log('OrderDetails onChange:', details);
              setFormData(prev => ({
                ...prev,
                orderDetails: {
                  ...prev.orderDetails,
                  ...details,
                  addedItems: details.addedItems || [],
                }
              }));
            }}
            onAddItem={(item) => {
              console.log('New item added:', item);
              setFormData(prev => ({
                ...prev,
                orderDetails: {
                  ...prev.orderDetails,
                  addedItems: [...(prev.orderDetails.addedItems || []), item]
                }
              }));
              setIsStepValid(true);
            }}
            depositAmount={formData.depositAmount}
            onDepositChange={(amount) => {
              setFormData(prev => ({
                ...prev,
                depositAmount: amount
              }));
            }}
            onValidityChange={handleValidityChange}
          />
        );
      case 3:
        return (
          <DocumentUpload
            documents={formData.documents}
            onChange={handleDocumentChange}
            onValidityChange={handleStepValidityChange}
          />
        );
      case 4:
        // Log the complete form data when reaching the Review step
        console.log('Review Component Data:', {
          customerType: formData.customerType,
          personalDetails: formData.personalDetails,
          orderDetails: formData.orderDetails,
          documents: formData.documents,
          depositAmount: formData.depositAmount
        });
        return <Review formData={formData} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (currentStep > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentStep]);

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll(".timeline-section");
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
    setCurrentStep(index);
  };

  const handleNext = () => {
    handleStepChange("next");
  };

  const handlePrev = () => {
    handleStepChange("prev");
  };

  useEffect(() => {
    return () => {
      // Optionally clear the form data when component unmounts
      // localStorage.removeItem('pdaFormData');
    };
  }, []);

  const handleAddItem = (item) => {
    setOrderSummary(prev => {
      const existingItemIndex = prev.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        const newSummary = [...prev];
        newSummary[existingItemIndex] = {
          ...newSummary[existingItemIndex],
          quantity: item.quantity
        };
        return newSummary;
      } else {
        return [...prev, item];
      }
    });
  };

  const getStepGuidance = (step) => {
    switch (step) {
      case 0:
        return "Select your customer type. This helps us customize your PDA experience based on whether you're an individual collector or representing an organization.";
      case 1:
        return "Fill in your personal details carefully. Make sure your mailing address is complete and accurate as this will be used for delivering your philatelic items.";
      case 2:
        return "Choose the items you'd like to receive. Remember, you need a minimum deposit of ₹200 to proceed. You can always add more items later.";
      case 3:
        return "Upload clear, legible copies of your ID and address proof. Accepted formats are JPG, PNG, or PDF (max 5MB each).";
      case 4:
        return "Review all your information carefully before proceeding. You can go back to any previous step to make changes if needed.";
      default:
        return "";
    }
  };

  const getStepSpecificTips = (step) => {
    switch (step) {
      case 0:
        return [
          "Individual accounts are for personal collectors",
          "Institutional accounts are for organizations and businesses",
          "Your selection will determine the required documents"
        ];
      case 1:
        return [
          "Use your full legal name as it appears on your ID",
          "Provide a complete mailing address including landmarks",
          "PIN code must be valid and current",
          "Choose a frequency that matches your collection goals"
        ];
      case 2:
        return [
          "Minimum deposit amount is ₹250",
          "You can modify your selections later",
          "Consider your collecting interests when choosing items",
          "Special packs offer better value for regular collectors"
        ];
      case 3:
        return [
          "Acceptable ID proofs: Aadhaar, PAN, Passport",
          "Ensure documents are clearly visible and complete",
          "File size should not exceed 5MB per document"
        ];
      case 4:
        return [
          "Double-check all entered information",
          "Verify your mailing address carefully",
          "Confirm your selected items and quantities",
          "Make sure your deposit amount meets requirements"
        ];
      default:
        return [];
    }
  };

  const handleOrderDetailsChange = (orderDetails) => {
    const updatedFormData = {
      ...formData,
      orderDetails: {
        ...formData.orderDetails,
        ...orderDetails,
        addedItems: orderDetails.addedItems || [], // Ensure addedItems is always an array
      }
    };
    setFormData(updatedFormData);
    localStorage.setItem('pdaFormData', JSON.stringify(updatedFormData));
  };

  useEffect(() => {
    console.log('Form Data Updated:', formData);
    console.log('Current Step:', currentStep);
    console.log('Step Valid:', isStepComplete(currentStep));
  }, [formData, currentStep]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
    {/* Updated Hero Section with optimized height */}
<div className="relative overflow-hidden bg-white py-8 border-b border-gray-100">
  <div className="absolute inset-0 opacity-5">
    <div className="grid grid-cols-8 gap-2 rotate-12 transform scale-150">
      {[...Array(64)].map((_, i) => (
        <div
          key={i}
          className="w-16 h-16 border border-gray-400/20"
          style={{
            animation: `pulse ${2 + (i % 3)}s infinite ${i * 0.1}s`
          }}
        />
      ))}
    </div>
  </div>
  
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content - More Concise */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h1 className={`${elsieSwashCaps.className} text-4xl md:text-5xl font-bold mb-3`}
                style={{ color: theme.secondary }}>
              Philatelic Deposit Account
            </h1>
            <p className="text-lg mb-4" style={{ color: theme.primary }}>
              Never miss a stamp release again
            </p>
            <p className="text-gray-600 text-sm md:text-base max-w-xl">
              A PDA with India Post ensures you automatically receive new commemorative stamps, 
              first day covers, and other philatelic items as soon as they're released.
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border border-gray-100">
              <h3 className="font-semibold text-sm" style={{ color: theme.secondary }}>Minimum Deposit</h3>
              <p className="text-xl" style={{ color: theme.primary }}>₹200</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border border-gray-100">
              <h3 className="font-semibold text-sm" style={{ color: theme.secondary }}>Auto Updates</h3>
              <p className="text-sm text-gray-600">Instant Access</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all border border-gray-100">
              <h3 className="font-semibold text-sm" style={{ color: theme.secondary }}>Delivery</h3>
              <p className="text-sm text-gray-600">To Your Door</p>
            </div>
          </div>
        </div>

        {/* Right Content - Interactive Stamp Gallery */}
        <div className="relative h-[300px] md:h-[400px]">
          <div className="absolute inset-0 -rotate-2 bg-gray-100/50 rounded-xl transform"></div>
          <div className="absolute inset-0 rotate-2 bg-gray-50/50 rounded-xl transform"></div>
          
          <div className="relative h-full bg-white rounded-xl p-6 shadow-lg border border-gray-100 overflow-hidden">
            {/* Stamp Collection Grid */}
            <div className="grid grid-cols-3 gap-4 h-full">
              <div className="space-y-4 transform translate-y-4">
                {[1, 4, 7].map((num) => (
                  <motion.div
                    key={num}
                    className="relative group"
                    whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-all duration-300 rounded-lg"></div>
                    <img
                      src={`/images/stamps/${num}.jpg`}
                      alt={`Stamp ${num}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md border-4 border-white"
                      style={{
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transform: `rotate(${Math.random() * 4 - 2}deg)`
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      PDA Collection
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                {[2, 5, 8].map((num) => (
                  <motion.div
                    key={num}
                    className="relative group"
                    whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-all duration-300 rounded-lg"></div>
                    <img
                      src={`/images/stamps/${num}.jpg`}
                      alt={`Stamp ${num}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md border-4 border-white"
                      style={{
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transform: `rotate(${Math.random() * 4 - 2}deg)`
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      PDA Collection
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4 transform -translate-y-4">
                {[3, 6, 9].map((num) => (
                  <motion.div
                    key={num}
                    className="relative group"
                    whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-all duration-300 rounded-lg"></div>
                    <img
                      src={`/images/stamps/${num}.jpg`}
                      alt={`Stamp ${num}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md border-4 border-white"
                      style={{
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transform: `rotate(${Math.random() * 4 - 2}deg)`
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      PDA Collection
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent p-4 text-center">
              <p className="text-sm font-medium text-gray-600">
                Get exclusive access to commemorative stamps through your PDA
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-2 right-2">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-12 h-12 opacity-10"
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 0L61 39H100L69 63L80 100L50 77L20 100L31 63L0 39H39L50 0Z" fill="currentColor"/>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <Timeline>
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`timeline-section transition-all duration-500 ease-in-out ${
                    index !== currentStep ? 'opacity-60 scale-95' : 'scale-100'
                  }`}
                >
                  <Timeline.Item active={currentStep >= index}>
                    <Timeline.Point>
                      <span className={`text-xl font-bold ${
                        currentStep >= index ? `text-[${theme.secondary}]` : "text-gray-400"
                      }`}>
                        {step.number}
                      </span>
                    </Timeline.Point>
                    <Timeline.Content>
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full mb-8">
                        {/* Header Section */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold" style={{ color: theme.primary }}>
                              {step.title}
                            </h2>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium text-gray-500">
                                Step {index + 1} of {steps.length}
                              </div>
                              {isStepComplete(index) && (
                                <span className="text-green-600 flex items-center">
                                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Complete
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Guidance Box */}
                          <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                            {getStepGuidance(index)}
                          </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="mb-8">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Form - Takes 2 columns */}
                            <div className="lg:col-span-2 space-y-4">
                              {renderStepContent(index)}
                            </div>

                            {/* Helper Content - Takes 1 column */}
                            <div className="hidden lg:block">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-medium mb-3" style={{ color: theme.secondary }}>
                                  Helpful Tips
                                </h3>
                                <div className="space-y-3">
                                  {getStepSpecificTips(index).map((tip, i) => (
                                    <div key={i} className="flex items-start space-x-2">
                                      <div className="text-blue-500 mt-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </div>
                                      <p className="text-sm text-gray-600">{tip}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="border-t border-gray-200 pt-6">
                          <div className="flex justify-between items-center max-w-md mx-auto">
                            <button
                              onClick={() => handleStepChange("prev")}
                              className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center ${
                                index === 0
                                  ? "opacity-50 cursor-not-allowed bg-gray-200"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }`}
                              disabled={index === 0}
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Previous
                            </button>

                            {index !== steps.length - 1 && currentStep === index && (
                              <button
                                onClick={() => handleStepChange("next")}
                                className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center ${
                                  !isStepComplete(index)
                                    ? "opacity-50 cursor-not-allowed bg-gray-200"
                                    : `bg-[${theme.secondary}] hover:brightness-110 text-white shadow-md hover:shadow-lg`
                                }`}
                                disabled={!isStepComplete(index)}
                              >
                                Continue
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Timeline.Content>
                  </Timeline.Item>
                </div>
              ))}
            </Timeline>
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
