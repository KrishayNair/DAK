"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Carousel from "@/components/custom/onboardingcarousel";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { getOTP, login, verifyOTP } from "@/lib/auth";
import Cookies from "js-cookie";

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
  // .length(6, "Postal code must be 6 digits")
  // .regex(/^\d+$/, "Must contain only digits"),
});


// Main Signup Component
export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [uid, setUID] = useState(null);

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

    await getPincode();

    if (form.getValues('postal_code') == null) {
      alert("Please allow location access to get your pincode, and try again");
      return;
    }

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
        Cookies.set("show_tour", "true", { expires: 1 }); // expires in 1 day
        router.replace("/");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  // Add OTP Form Component
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
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Section - Signup Form */}
      <div className="w-full md:w-3/5 flex flex-col px-4 sm:px-6 md:px-0">
        <div className="flex-grow flex flex-col md:mr-40 md:ml-28 mt-10 sm:mt-16 md:mt-28">
          <img
            src="logoNew.png"
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

          {showOTP ? (
            OTPForm
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder=" "
                            className="rounded-full py-5 peer"
                            {...field}
                          />
                          <FormLabel className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-2 transition-all duration-200 peer-focus:text-xs peer-focus:-top-1 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-black">
                            Name
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder=" "
                            className="rounded-full py-5 peer"
                            {...field}
                          />
                          <FormLabel className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-2 transition-all duration-200 peer-focus:text-xs peer-focus:-top-1 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-black">
                            Email
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder=" "
                            className="rounded-full py-5 peer"
                            {...field}
                          />
                          <FormLabel className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-2 transition-all duration-200 peer-focus:text-xs peer-focus:-top-1 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-black">
                            Phone Number
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Postal Code Field */}
                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder=" "
                            className="rounded-full py-5 peer"
                            {...field}
                          />
                          <FormLabel className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-2 transition-all duration-200 peer-focus:text-xs peer-focus:-top-1 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-black">
                            Postal Code
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" required />
                  <p className="text-xs text-gray-600">
                    I agree with Dak's{" "}
                    <Link href="/terms" className="underline">
                      Terms of Service
                    </Link>
                    ,{" "}
                    <Link href="/privacy" className="underline">
                      Privacy Policy
                    </Link>
                    , and default{" "}
                    <Link href="/notifications" className="underline">
                      Notification Settings
                    </Link>
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full py-5 text-base bg-[#FFE5C2] hover:bg-[#FFE5C2/90]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>
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
