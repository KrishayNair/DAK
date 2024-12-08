"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Carousel from "@/components/custom/onboardingcarousel";
import { getOTP, login, verifyOTP } from "@/lib/auth";
import { useRouter } from "next/navigation";

const emailFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpFormSchema = z.object({
  otp: z.string().length(5, "OTP must be 5 digits"),
});

export default function ForgotPassword() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

  const [uid, setUID] = useState(null);

  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: ["", "", "", "", ""],
    },
  });

  async function onEmailSubmit(values) {
    setLoading(true);

    const res = await login(values);

    if (res.success) {
      setUID(res.data?.id);
      setEmail(values.email);

      const emailSent = await getOTP(res.data?.id);

      if (emailSent.success) {
        setShowOTP(true);
        setLoading(false);
      } else {
        alert("error in sending otp")
      }

    } else {
      alert("something went wrong")
    }

    setLoading(false);
  }

  async function onOTPSubmit(e) {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    
    try {
        // Get all OTP input values
        const otpInputs = document.querySelectorAll('input[type="text"]');
        const otpArray = Array.from(otpInputs).map(input => input.value);
        const otpString = otpArray.join('');
        
        console.log('OTP Inputs:', otpArray);
        console.log('Combined OTP:', otpString);

        if (otpString.length !== 5) {
            alert('Please enter all 5 digits');
            return;
        }

        // Call verify OTP
        const response = await verifyOTP(uid, otpString);
        console.log('Verification Response:', response);

        if (response) {
            router.replace('/')
            // Handle successful verification
        }
    } catch (error) {
        console.error('OTP Verification Error:', error);
        alert(error.message || 'Verification failed');
    } finally {
        setLoading(false);
    }
}



  async function handleResendOTP() {
    // Handle resend OTP logic here
    console.log("Resending OTP to", email);
  }

  const EmailForm = (
    <Form {...emailForm}>
      <form
        onSubmit={emailForm.handleSubmit(onEmailSubmit)}
        className="space-y-6"
      >
        <FormField
          control={emailForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="relative">
                  <Input
                    className="rounded-full py-6 peer placeholder-gray-400 placeholder-shown:text-sm focus:placeholder-transparent"
                    {...field}
                  />
                  <FormLabel className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-2 transition-all duration-200 peer-focus:text-xs peer-focus:-top-1 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-black">
                    Email address
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-full py-6 h-auto text-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Sending code...
            </>
          ) : (
            "Send 5-digit code"
          )}
        </Button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-black font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );

// Update the OTP form to use this handler
const OTPForm = (
  <form onSubmit={onOTPSubmit} className="space-y-6">
      <p className="text-gray-600">We sent the code to {email}</p>

      <div className="flex gap-4 justify-center my-8">
          {[0, 1, 2, 3, 4].map((index) => (
              <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-16 h-16 text-center text-2xl border rounded-xl focus:border-black focus:ring-0 outline-none"
                  onChange={(e) => {
                      const value = e.target.value;
                      if (value.match(/^[0-9]$/)) {
                          console.log(`Input ${index}:`, value);
                          const nextInput = e.target.nextElementSibling;
                          if (nextInput) nextInput.focus();
                      }
                  }}
                  onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !e.target.value) {
                          const prevInput = e.target.previousElementSibling;
                          if (prevInput) prevInput.focus();
                      }
                  }}
              />
          ))}
      </div>

      <Button
          type="submit"
          className="w-full rounded-full py-6 h-auto text-lg"
          disabled={loading}
      >
          {loading ? (
              <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
              </>
          ) : (
              "Continue"
          )}
      </Button>
  </form>
);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Form */}
      <div className="w-3/5 p-12 flex flex-col">
        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8">dAk.</h1>
          <h2 className="text-6xl font-bold mb-3">
            Login
           
          </h2>
          <p className="text-gray-500 mb-8">
           Login with your registered email
          </p>

          {showOTP ? OTPForm : EmailForm}
        </div>
      </div>

      {/* Right Section - Carousel */}
      <div className="w-2/5 bg-gradient-to-br from-orange-50 to-[#FFE5C2] m-6 rounded-3xl">
        <div className="h-full w-full relative overflow-hidden">
          <Carousel />
        </div>
      </div>
    </div>
  );
}
