"use client";

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
import { useRouter } from "next/navigation";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { useState } from "react";
import { login } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/custom/onboardingcarousel";

const formSchema = z.object({
  email: z.string().email(),
});

export default function Login() {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    const res = await login(values);

    if (res.success) {
      // push("/");
    } else {
      // toast("Login Error", {
      //     description: "Invalid Credentials. Please try again.",
      // })
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Login Form */}
      <div className="w-3/5 p-12 flex flex-col">
        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8">dAk.</h1>
          <h2 className="text-6xl font-bold mb-8">Welcome back</h2>
          <p className="text-gray-600 mb-8">
            Enter your credentials to access your account
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
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
                          Email
                        </FormLabel>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Add Password Field */}
              {/* <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={visible ? "text" : "password"}
                          placeholder=""
                          className="rounded-full py-6 peer placeholder-gray-400 placeholder-shown:text-sm focus:placeholder-transparent"
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
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-gray-600">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full py-6 text-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 border rounded-full py-4 hover:bg-gray-50 transition-colors text-lg">
            <Image src="/google-icon.jpg" alt="Google" width={24} height={24} />
            <span>Sign in with google</span>
          </button>

          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-semibold">
              Sign up
            </Link>
          </p>
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
