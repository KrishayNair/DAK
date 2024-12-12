// sih-frontend/DAK/src/app/(authentication)/signup/components/SignupForm.jsx
import Link from "next/link";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";

export default function SignupForm({ form, onSubmit, getPincode, loading, isPincodeFetched }) {
  return (
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

        {!isPincodeFetched ? (
          <Button
            type="button"
            onClick={getPincode}
            className="w-full rounded-full py-5 text-base bg-[#FFE5C2] hover:bg-[#FFE5C2/90]"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Fetching Location
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        ) : (
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
              "Continue"
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}