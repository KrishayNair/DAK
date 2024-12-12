
// sih-frontend/DAK/src/app/(authentication)/signup/components/OTPForm.jsx
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function OTPForm({ email, onOTPSubmit, loading }) {
  return (
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
}

