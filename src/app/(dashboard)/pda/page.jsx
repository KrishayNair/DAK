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
    <div className="container mx-auto px-4 py-8 bg-primary min-h-screen">
      <div className="rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Philatelic Deposit Account
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Fill this easy Form to activate your philately deposit account and
            receive your favorite material regularly
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="relative">
            <Timeline>
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`timeline-section min-h-[60vh] ${
                    index !== currentStep ? 'opacity-50' : ''
                  }`}
                >
                  <Timeline.Item active={currentStep >= index}>
                    <Timeline.Point>
                      <span className={`text-2xl font-bold ${
                        currentStep >= index ? "text-[#B45309]" : "text-gray-500"
                      }`}>
                        {step.number}
                      </span>
                    </Timeline.Point>
                    <Timeline.Content>
                      <div className="bg-white rounded-lg p-8 shadow-lg">
                        <div className="mb-4 flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Step {index + 1} of {steps.length}
                            {isStepComplete(index) && (
                              <span className="text-green-600 ml-2">
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
                                className={`px-6 py-2 rounded-lg ${
                                  index === 0
                                    ? "opacity-50 cursor-not-allowed bg-gray-300"
                                    : "bg-gray-200 hover:bg-gray-300"
                                }`}
                                disabled={index === 0}
                              >
                                Previous
                              </button>

                              {index !== steps.length - 1 && (
                                <button
                                  onClick={() => handleStepChange("next")}
                                  className={`px-6 py-2 rounded-lg ${
                                    !isStepComplete(index)
                                      ? "opacity-50 cursor-not-allowed bg-gray-300"
                                      : "bg-[#B45309] hover:bg-[#A34308] text-white"
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

      <DepositModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
