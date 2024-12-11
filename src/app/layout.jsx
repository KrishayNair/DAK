"use client";

import { Inter as FontSans } from "next/font/google";
import SmoothScroll from "../components/custom/smoothscroll";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NotificationProvider } from "@/context/NotificationContext";
import { CartProvider } from "../context/CartContext";
import Chatbot from "../components/custom/Chatbot";
import ProductTour from "../components/custom/ProductTour";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { Providers } from "./providers"

import Script from "next/script";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});


export default function RootLayout({ children }) {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check for tour cookie after a small delay
    const timer = setTimeout(() => {
      const shouldShowTour = Cookies.get('show_tour');
      if (shouldShowTour === 'true') {
        setIsTourOpen(true);
        // Remove the cookie after starting the tour
        Cookies.remove('show_tour');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTourClose = () => {
    setIsTourOpen(false);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased relative",
          fontSans.variable
        )}
      >
        <Providers>
          {isMounted && (
            <div className="relative z-[9999]">
              <ProductTour 
                isOpen={isTourOpen} 
                onClose={handleTourClose}
                steps={[
                  {
                    target: 'body',
                    content: "Welcome to Dak - Your Premier Online Marketplace for Indian Postal Circles! Discover a vast collection of philately materials and connect with fellow collectors.",
                    title: 'Welcome to Dak',
                    placement: 'center',
                  },
                  {
                    target: '[href="/"]',
                    content: "Our homepage showcases featured collections and highlights from various postal circles across India.",
                    title: 'Home Page',
                  },
                  {
                    target: '.chatbot-widget',
                    content: "Need assistance? Our AI-powered chatbot is available 24/7 to help you with queries about products, orders, or general information about philately.",
                    title: 'Chat Support',
                    placement: 'top-end',
                    floaterProps: {
                      disableAnimation: true,
                      offset: 20,
                    },
                    styles: {
                      tooltip: {
                        maxWidth: '300px',
                        marginBottom: '50px',
                      }
                    }
                  },
                  {
                    target: '[href="/pda"]',
                    content: "Create and manage your Philatelic Deposit Account (PDA) here. Get easy access to new stamps, first day covers, and set up standing orders for regular deliveries. You can also top up your PDA balance and track your philatelic deposit account details.",
                    title: 'Philatelic Deposit Account (PDA)',
                  },
                  {
                    target: '[href="/shop"]',
                    content: "Browse our extensive collection of philately materials, organized by postal circles. Find rare stamps, first-day covers, and more!",
                    title: 'Philately Shop',
                  },
                  {
                    target: '[href="/catalog"]',
                    content: "Explore our comprehensive catalog showcasing all stamp releases throughout the year. Find detailed information about each stamp's design, denomination, and historical significance.",
                    title: 'Stamp Catalog',
                  },
                  {
                    target: '[href="/blog"]',
                    content: "Stay updated with the latest philately news, government schemes, and expert insights from renowned philatelists. Your one-stop destination for all philately-related updates and articles.",
                    title: 'Philately Blog',
                  },
                  
                  
                  {
                    target: '[href="/forum"]',
                    content: "Join our vibrant community of philatelists! Connect, share, discuss, and learn from collectors across the country.",
                    title: 'Philatelists Forum',
                  },
                  {
                    target: '.notification-bell',
                    content: "Get timely alerts about upcoming stamp releases, delivery updates, and special cancellation releases. Never miss an important philatelic event!",
                    title: 'Notifications',
                  },
                  {
                    target: '[href="/cart"]',
                    content: "Your shopping cart keeps track of all your selected items. Review and proceed to checkout here.",
                    title: 'Shopping Cart',
                  }
                ]} 
              />
            </div>
          )}
          <SmoothScroll>
            <CartProvider>
              <NotificationProvider>
                <div className="main-content home-section">
                  {children}
                </div>
                <div className="chatbot-widget fixed bottom-56 right-32 z-[9998]">
                  <Chatbot />
                </div>
              </NotificationProvider>
            </CartProvider>
          </SmoothScroll>
        </Providers>

        <Script type="text/javascript" src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  );
}
