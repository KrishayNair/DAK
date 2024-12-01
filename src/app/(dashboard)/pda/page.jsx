"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CustomerType,
  PersonalDetails,
  OrderDetails,
  Review,
  PaymentGateway,
  StepIndicator,
  DepositModal,
  Header,
  StepNavigation,
  StepContent,
  FormContainer,
} from "./components";
import { Elsie_Swash_Caps } from "next/font/google";
import { Timeline } from "./components/Timeline";

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

const steps = [
  { number: "01", title: "Type of customers" },
  { number: "02", title: "Personal Details" },
  { number: "03", title: "Order Details" },
  { number: "04", title: "Review" },
  { number: "05", title: "Confirmation" },
];

export default function PDAPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(() => {
    const savedData =
      typeof window !== "undefined"
        ? localStorage.getItem("pdaFormData")
        : null;
    return savedData
      ? JSON.parse(savedData)
      : {
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
            orderType: "",
            quantity: "",
          },
        };
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("pdaFormData", JSON.stringify(formData));
  }, [formData]);

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
    switch (step) {
      case 0:
        return !!formData.customerType;
      case 1:
        return (
          !!formData.personalDetails.applicantName &&
          !!formData.personalDetails.mailingAddress &&
          !!formData.personalDetails.pinCode
        );
      case 2:
        return (
          !!formData.orderDetails.orderType && !!formData.orderDetails.quantity
        );
      case 3:
        return !!formData.depositAmount && formData.depositAmount >= 200;
      case 4:
        return true; // Payment gateway step
      default:
        return false;
    }
  };

  const handleStepChange = (direction) => {
    if (direction === "next" && currentStep === 3) {
      if (!formData.depositAmount || formData.depositAmount < 200) {
        setIsModalOpen(true);
        return;
      }
    }

    setCurrentStep((prev) =>
      direction === "next"
        ? Math.min(prev + 1, steps.length - 1)
        : Math.max(prev - 1, 0)
    );

    const sections = document.querySelectorAll(".timeline-section");
    const nextIndex = direction === "next" ? currentStep + 1 : currentStep - 1;
    if (sections[nextIndex]) {
      const section = sections[nextIndex];
      const viewportHeight = window.innerHeight;
      const elementTop =
        section.getBoundingClientRect().top + window.pageYOffset;
      const elementHeight = section.offsetHeight;
      const centerPosition = elementTop - (viewportHeight - elementHeight) / 2;

      window.scrollTo({
        top: centerPosition,
        behavior: "smooth",
      });
    }
  };

  const renderStepContent = (index) => {
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
          />
        );
      case 3:
        return (
          <Review
            formData={formData}
            onDepositChange={(amount) =>
              updateFormData("depositAmount", amount)
            }
          />
        );
      case 4:
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

  return (
    <div className="container mx-auto px-4 py-8  bg-primary min-h-screen">
      <div className="rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-12">
          <h1 className="text-4xl font-bold mb-2">
            Philatelic Deposit Account
          </h1>
          <p className="text-sm text-gray-600 mb-12">
            Fill this easy Form to activate your philately deposit account and
            receive your favorite material regularly
          </p>

          <div className="relative">
            <Timeline>
              {steps.map((step, index) => (
                <div key={index} className="timeline-section min-h-[60vh]">
                  <Timeline.Item active={currentStep >= index}>
                    <Timeline.Point>
                      <span
                        className={`text-2xl font-bold ${
                          currentStep >= index
                            ? "text-[#B45309]"
                            : "text-gray-500"
                        }`}
                      >
                        {step.number}
                      </span>
                    </Timeline.Point>
                    <Timeline.Content>
                      <div className="bg-white rounded-lg p-8 shadow-lg">
                        {/* <h2 className="text-2xl font-bold mb-6">
                          {step.title}
                        </h2> */}
                        <div className="mb-4 text-sm text-gray-600">
                          Step {currentStep + 1} of {steps.length}
                          {isStepComplete(currentStep) && (
                            <span className="text-green-600 ml-2">
                              ✓ Complete
                            </span>
                          )}
                        </div>
                        {renderStepContent(index)}

                        <div className="mt-8 flex justify-between items-center">
                          <button
                            onClick={handlePrev}
                            className={`px-6 py-2 rounded-lg ${
                              index === 0
                                ? "opacity-50 cursor-not-allowed bg-gray-300"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            disabled={index === 0}
                          >
                            Previous
                          </button>

                          <button
                            onClick={handleNext}
                            className={`px-6 py-2 rounded-lg ${
                              index === steps.length - 1
                                ? "opacity-50 cursor-not-allowed bg-[#B45309]"
                                : "bg-[#B45309] hover:bg-[#A34308]"
                            } text-white`}
                            disabled={index === steps.length - 1}
                          >
                            Next
                          </button>
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
