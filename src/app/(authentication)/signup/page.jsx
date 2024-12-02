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

// Add form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Contact number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Carousel Component

// Main Signup Component
export default function Signup() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible((prev) => !prev);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    console.log(values);
    // Add your signup logic here
    setLoading(false);
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Section - Signup Form */}
      <div className="w-3/5 p-8 flex flex-col">
        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-4">dAk.</h1>
          <h2 className="text-6xl font-bold mb-2">Get Started</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold">
              Signin
            </Link>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              {/* Contact Field */}
              <FormField
                control={form.control}
                name="contact"
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
                          Contact number
                        </FormLabel>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={visible ? "text" : "password"}
                          placeholder=" "
                          className="rounded-full py-5 peer"
                          {...field}
                        />
                        <FormLabel className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-2 transition-all duration-200 peer-focus:text-xs peer-focus:-top-1 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-black">
                          Password
                        </FormLabel>
                        <button
                          type="button"
                          onClick={toggleVisible}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {visible ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
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
