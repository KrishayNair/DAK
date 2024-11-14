"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";

export default function Govnavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = auth.currentUser;
        setIsSignedIn(!!user);
      } catch (error) {
        console.error("Error checking user status:", error);
        setIsSignedIn(false);
      }
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Cookies.remove("token");
      setIsSignedIn(false);
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="bg-[#3C5141] font-primary rounded-full shadow-lg mx-4 my-2 sticky top-2 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 pl-4">
          <Link href="/" className="text-primary hover:text-gray-900">
            <img
              src="/images/dAk.png"
              alt="DAK"
              className="w-20 h-8"
            />
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center items-center space-x-4">
            {[
              { href: "/profile", label: "PROFILE" },
              { href: "/analysis", label: "ANALYSIS" },
              { href: "/inventory", label: "INVENTORY" },
              { href: "/invoice", label: "INVOICES" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-primary text-sm hover:text-gray-300 ${
                  pathname === link.href ? "border-b-2 border-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-2 pr-4">
            {!isSignedIn ? (
              <div className="relative">
                <button
                  className="px-3 py-2 rounded-full bg-[#B08D57] text-primary hover:bg-opacity-90"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Register ▼
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        router.push("/signup");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Sign Up
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        router.push("/login");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="px-3 py-2 rounded-full bg-secondary text-primary hover:bg-opacity-90"
                onClick={handleSignOut}
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-gray-300 pr-4"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#3C5141]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/profile"
              className="block px-3 py-2 text-primary hover:text-gray-300 hover:bg-[#4C6151]"
            >
              PROFILE
            </Link>
            <Link
              href="/analysis"
              className="block px-3 py-2 text-primary hover:text-gray-300 hover:bg-[#4C6151]"
            >
              PHILATELY DEPOSIT ACCOUNT
            </Link>
            <Link
              href="/inventory"
              className="block px-3 py-2 text-primary hover:text-gray-300 hover:bg-[#4C6151]"
            >
              INVENTORY
            </Link>
            <Link
              href="/invoice"
              className="block px-3 py-2 text-primary hover:text-gray-300 hover:bg-[#4C6151]"
            >
              INVOICES
            </Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!isSignedIn ? (
              <>
                <button
                  className="block w-full px-3 py-2 text-left text-primary hover:text-gray-300 hover:bg-[#4C6151]"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="block w-full px-3 py-2 text-left text-primary hover:text-gray-300 hover:bg-[#4C6151]"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </button>
              </>
            ) : (
              <button
                className="block w-full px-3 py-2 text-left bg-secondary text-primary hover:bg-opacity-90"
                onClick={handleSignOut}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
