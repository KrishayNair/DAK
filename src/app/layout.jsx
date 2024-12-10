import { Inter as FontSans } from "next/font/google";
import SmoothScroll from "../components/custom/smoothscroll";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NotificationProvider } from "@/context/NotificationContext";
import { CartProvider } from "../context/CartContext";
import Chatbot from "../components/custom/Chatbot";
import Script from "next/script";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Dak - The World of Stamps",
  description: "Dak - The World of Stamps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-[#FFF8E8] font-sans antialiased",
          fontSans.variable
        )}
      >
        <SmoothScroll>
          <CartProvider>
            <NotificationProvider>
              {children}

              <Script
                type="text/javascript"
                src="https://checkout.razorpay.com/v1/checkout.js"
              />

              <Chatbot />
            </NotificationProvider>
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
