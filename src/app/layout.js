import { Inter as FontSans } from "next/font/google"
import SmoothScroll from '../components/custom/smoothscroll'
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";
import { NotificationProvider } from '@/context/notificationcontext';
import { CartProvider } from '@/context/cartcontext';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
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
          "min-h-screen bg-white font-sans antialiased",
          fontSans.variable
        )}
      >
        <SmoothScroll>
          <NotificationProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </NotificationProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
