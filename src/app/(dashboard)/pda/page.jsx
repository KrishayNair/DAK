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
  { number: "05", title: "Review" },
  { number: "06", title: "Confirmation" },
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
      productType: "pack1",
      addedItems: [],
      mintCommemorative: 0,
      mintCommWithoutPersonalities: 0,
      mintDefinitive: 0,
      topMarginal: 0,
      bottomMarginal: 0,
      fullSheet: 0,
      fdcWithStamp: 0,
      fdcWithoutPersonality: 0,
      fdcBlank: 0,
      brochureWithStamp: 0,
      brochureBlank: 0,
      annualStampPack: 0,
      specialAnnualPack: 0,
      childrensPack: 0,
      specialCollectorPack: 0,
      fdcAnnualPack: 0,
      postalStationaryItem: 0,
      miniSheet: 0,
      otherItemName: "",
      otherItemQuantity: 0,
    },
    documents: {
      idProof: null,
      addressProof: null,
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("pdaFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
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
        return newData;
      });
    } catch (err) {
      setError("Failed to update form data");
      console.error(err);
    }
  };

  const isStepComplete = (step) => {
    try {
      switch (step) {
        case 0: // Customer Type
          return !!formData.customerType;
        
        case 1: // Personal Details
          return (
            formData.personalDetails &&
            !!formData.personalDetails.applicantName &&
            !!formData.personalDetails.mailingAddress &&
            !!formData.personalDetails.pinCode &&
            !!formData.personalDetails.frequency
          );
        
        case 2: // Order Details
          return (
            formData.orderDetails &&
            Array.isArray(formData.orderDetails.addedItems) &&
            formData.orderDetails.addedItems.length > 0 &&
            Number(formData.depositAmount) >= 200
          );
        
        case 3: // Document Upload
          return (
            formData.documents &&
            formData.documents.idProof &&
            formData.documents.addressProof
          );
        
        case 4: // Review
          return true;
        
        case 5: // Payment Gateway
          return true;
        
        default:
          return false;
      }
    } catch (error) {
      console.error('Error checking step completion:', error);
      return false;
    }
  };

  const getStepValidationMessage = (step) => {
    switch (step) {
      case 2:
        if (!formData.orderDetails?.addedItems?.length) {
          return "Please add at least one item to your order";
        }
        if (Number(formData.depositAmount) < 200) {
          return "Minimum deposit amount of ₹200 is required";
        }
        return "";
      default:
        return "Please complete all required fields";
    }
  };

  const canAccessStep = (stepIndex) => {
    // Can always access current or previous steps
    if (stepIndex <= currentStep) return true;
    
    // Can only access next step if current step is complete
    if (stepIndex === currentStep + 1) {
      return isStepComplete(currentStep);
    }
    
    // Cannot skip steps
    return false;
  };

  const handleStepChange = (direction) => {
    if (direction === "next") {
      if (!isStepComplete(currentStep)) {
        setError(`Please complete all required fields in ${steps[currentStep].title}`);
        return;
      }

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
    } else if (direction === "prev") {
      // Move to previous step
      const prevStep = currentStep - 1;
      if (prevStep >= 0) {
        setCurrentStep(prevStep);
        setError(null);

        // Scroll to the previous section
        const sections = document.querySelectorAll(".timeline-section");
        if (sections[prevStep]) {
          sections[prevStep].scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      }
    }
  };

  const renderStepContent = (index) => {
    // Only render content for the current step
    if (index !== currentStep) {
      return (
        <div className="text-center py-8 text-gray-500">
          {index < currentStep ? (
            <div>
              <span className="text-green-600">✓</span> Step Completed
            </div>
          ) : (
            <div>Please complete previous steps first</div>
          )}
        </div>
      );
    }

    switch (index) {
      case 0:
        return (
          <CustomerType
            value={formData.customerType}
            onChange={(type) => updateFormData("customerType", type)}
          />
        );
      case 1:
        return (
          <PersonalDetails
            details={formData.personalDetails}
            onChange={(details) => updateFormData("personalDetails", details)}
          />
        );
      case 2:
        return (
          <OrderDetails
            details={formData.orderDetails}
            onChange={(details) => updateFormData("orderDetails", details)}
            onAddItem={handleAddItem}
            depositAmount={formData.depositAmount}
            onDepositChange={(amount) => updateFormData("depositAmount", amount)}
          />
        );
      case 3:
        return (
          <DocumentUpload
            documents={formData.documents}
            onChange={(documents) => updateFormData("documents", documents)}
          />
        );
      case 4:
        return (
          <Review
            formData={formData}
          />
        );
      case 5:
        return <PaymentGateway amount={formData.depositAmount} />;
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
        <div className="rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
           

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-md">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="relative">
              <Timeline>
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`timeline-section min-h-[60vh] transition-opacity duration-300 ${
                      index !== currentStep ? 'opacity-60' : ''
                    }`}
                  >
                    <Timeline.Item active={currentStep >= index}>
                      <Timeline.Point>
                        <span className={`text-2xl font-bold ${
                          currentStep >= index ? `text-[${theme.secondary}]` : "text-gray-400"
                        }`}>
                          {step.number}
                        </span>
                      </Timeline.Point>
                      <Timeline.Content>
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                          <div className="mb-6 flex justify-between items-center">
                            <div className="text-sm font-medium" style={{ color: theme.primary }}>
                              Step {index + 1} of {steps.length}
                              {isStepComplete(index) && (
                                <span className="ml-2 text-green-600">
                                  ✓ Complete
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {renderStepContent(index)}

                          {index === currentStep && (
                            <div className="mt-8 flex flex-col items-center">
                              {!isStepComplete(index) && (
                                <p className="text-red-500 text-sm mb-4">
                                  {getStepValidationMessage(index)}
                                </p>
                              )}
                              
                              <div className="flex justify-between items-center w-full">
                                <button
                                  onClick={() => handleStepChange("prev")}
                                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                                    index === 0
                                      ? "opacity-50 cursor-not-allowed bg-gray-200"
                                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                  }`}
                                  disabled={index === 0}
                                >
                                  Previous
                                </button>

                                {index !== steps.length - 1 && (
                                  <button
                                    onClick={() => handleStepChange("next")}
                                    className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                                      !isStepComplete(index)
                                        ? "opacity-50 cursor-not-allowed bg-gray-200"
                                        : `bg-[${theme.secondary}] hover:brightness-110 text-white shadow-md hover:shadow-lg`
                                    }`}
                                    disabled={!isStepComplete(index)}
                                  >
                                    Continue
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </Timeline.Content>
                    </Timeline.Item>
                  </div>
                ))}
              </Timeline>
            </div>
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
