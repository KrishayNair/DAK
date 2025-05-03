"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import Cookies from "js-cookie";

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

    try {
      const res = await login(values);

      if (res.success) {
        setUID(res.data?.id);
        setEmail(values.email);

        const emailSent = await getOTP(res.data?.id);

        if (emailSent.success) {
          setShowOTP(true);
          setLoading(false);
        } else {
          alert("Error in sending OTP");
        }
      } else {
        alert("Something went wrong: " + (res.err?.message || "Unknown error"));
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
    } 

    setLoading(false);
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
        Cookies.set("show_tour", "true", { expires: 1 });
        router.replace("/");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert(error.message || "Verification failed");
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
        className="space-y-4 sm:space-y-5 md:space-y-6"
      >
        <FormField
          control={emailForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="relative">
                  <Input
                    className="rounded-lg sm:rounded-xl md:rounded-2xl py-3 sm:py-4 md:py-6 peer placeholder-gray-400 placeholder-shown:text-sm focus:placeholder-transparent"
                    {...field}
                    placeholder="Email address"
                  />
                  <FormLabel className="absolute text-xs sm:text-sm left-3 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-2 transition-all duration-200 peer-focus:text-xs peer-focus:-top-1 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-black">
                    Email address
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-full py-3 sm:py-4 md:py-5 h-auto text-sm sm:text-base md:text-lg border bg-[#FFE5C2]"
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              Sending code...
            </>
          ) : (
            "Send 5-digit code"
          )}
        </Button>

        <div className="text-center mt-3 sm:mt-4 md:mt-6">
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-black font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );

  // Update the OTP form to use this handler
  const OTPForm = (
    <form onSubmit={onOTPSubmit} className="space-y-4 md:space-y-6">
      <p className="text-gray-600 text-xs sm:text-sm md:text-base">
        We sent the code to {email}
      </p>

      <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center my-4 sm:my-6 md:my-8">
        {[0, 1, 2, 3, 4].map((index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 text-center text-lg sm:text-xl md:text-2xl border rounded-lg md:rounded-xl focus:border-black focus:ring-0 outline-none"
            onChange={(e) => {
              const value = e.target.value;
              if (value.match(/^[0-9]$/)) {
                console.log(`Input ${index}:`, value);
                const nextInput = e.target.nextElementSibling;
                if (nextInput) nextInput.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !e.target.value) {
                const prevInput = e.target.previousElementSibling;
                if (prevInput) prevInput.focus();
              }
            }}
          />
        ))}
      </div>

      <Button
        type="submit"
        className="w-full rounded-full py-3 sm:py-4 md:py-6 h-auto text-sm sm:text-base md:text-lg"
        disabled={loading}
      >
        {loading ? (
          <>
            <RefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Continue"
        )}
      </Button>
    </form>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Section - Form */}
      <div className="w-full md:w-3/5 flex flex-col px-4 sm:px-6 md:px-0">
        <div className="flex-grow flex flex-col md:mr-40 md:ml-28 mt-10 sm:mt-16 md:mt-28">
          <img
            src="/logoNew.png"
            alt="DAK"
            className="w-16 sm:w-20 md:w-28 h-auto mb-6 sm:mb-8 md:mb-10"
          />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-3">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 md:mb-16 text-sm md:text-base">
            Enter registered email to access your account
          </p>

          {showOTP ? OTPForm : EmailForm}
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
