// sih-frontend/DAK/src/app/(authentication)/signup/page.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Carousel from "@/components/custom/onboardingcarousel";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getOTP, login, verifyOTP } from "@/lib/auth";
import Cookies from "js-cookie";
import OTPForm from "./components/OTPForm";
import PhilatelistQuestion from "./components/PhilatelistQuestion";
import SignupForm from "./components/SignupForm";

// Add form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Must contain only digits"),
  postal_code: z
    .string().optional()
});

// Main Signup Component
export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [uid, setUID] = useState(null);
  const [isPincodeFetched, setIsPincodeFetched] = useState(false);
  const [showPhilatelistQuestion, setShowPhilatelistQuestion] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      postal_code: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    const userData = {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      postal_code: values.postal_code,
    };

    try {
      const res = await login(userData);

      if (res.success) {
        setUID(res.data?.id);
        setEmail(values.email);

        const emailSent = await getOTP(res.data?.id);

        if (emailSent.success) {
          setShowOTP(true);
        } else {
          alert("Error in sending OTP", emailSent?.message);
        }
      } else {
        alert("Something went wrong : ", res?.mesage);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message || "Something went wrong");
    }

    setLoading(false);
  }

  async function getPincode() {
    form.setValue('postal_code', 'Fetching your location...');
    setIsPincodeFetched(false);
    
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(response => response.json())
        .then(data => {
          if (data.address && data.address.postcode) {
            form.setValue('postal_code', data.address.postcode);
            form.setError('postal_code', {
              message: data.display_name
            });
            setIsPincodeFetched(true);
          }
        })
        .catch(error => {
          console.error('Error fetching address:', error);
          form.setValue('postal_code', '');
          form.setError('postal_code', {
            message: 'Error fetching location'
          });
        });
    })
  }

  async function onOTPSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const otpInputs = document.querySelectorAll('input[type="text"]');
      const otpArray = Array.from(otpInputs).map((input) => input.value);
      const otpString = otpArray.join("");

      if (otpString.length !== 5) {
        alert("Please enter all 5 digits");
        return;
      }

      const response = await verifyOTP(uid, otpString);

      if (response) {
        setShowPhilatelistQuestion(true);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  const handlePhilatelistResponse = (isPhilatelist) => {
    Cookies.set("show_tour", "true", { expires: 1 });
    router.replace("/");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Section - Signup Form */}
      <div className="w-full md:w-3/5 flex flex-col px-4 sm:px-6 md:px-0">
        <div className="flex-grow flex flex-col md:mr-40 md:ml-28 mt-10 sm:mt-16 md:mt-28">
          <img
            src="/logoNew.png"
            alt="DAK"
            className="w-16 sm:w-20 md:w-28 h-auto mb-6 sm:mb-8 md:mb-10"
          />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-3">
            Get Started
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 md:mb-8 text-sm md:text-base">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold">
              Signin
            </Link>
          </p>

          {showPhilatelistQuestion ? (
            <PhilatelistQuestion handlePhilatelistResponse={handlePhilatelistResponse} />
          ) : showOTP ? (
            <OTPForm email={email} onOTPSubmit={onOTPSubmit} loading={loading} />
          ) : (
            <SignupForm form={form} onSubmit={onSubmit} getPincode={getPincode} loading={loading} isPincodeFetched={isPincodeFetched} />
          )}
        </div>
      </div>

      {/* Right Section - Carousel */}
      <div className="hidden md:block w-full md:w-2/5 bg-gradient-to-br from-orange-50 to-[#FFE5C2] p-2 sm:p-3 md:m-3 md:rounded-[50px]">
        <div className="h-full w-full relative overflow-hidden">
          <Carousel />
        </div>
      </div>
    </div>
  );
}