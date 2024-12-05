import { Inter as FontSans } from "next/font/google";
import SmoothScroll from "../components/custom/smoothscroll";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";
import { NotificationProvider } from "@/context/NotificationContext";
import { CartProvider } from "../context/CartContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Dak",
  description: "",
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
            <NotificationProvider>{children}</NotificationProvider>
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
