"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BsBell, BsCart3 } from "react-icons/bs";

import Cookies from "js-cookie";

export default function Navbar() {
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
      Cookies.remove("token"); // Remove Firebase auth token from cookies
      setIsSignedIn(false);
      router.push("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#FFF7E5]/80 backdrop-blur-sm font-primary shadow-lg sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-primary hover:text-gray-900">
              <img src="/images/dAk.png" alt="DAK" className="w-20 h-8" />
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center items-center space-x-8">
            {[
              { href: "/", label: "HOME" },
              { href: "/pda", label: "PHILATELY DEPOSIT ACCOUNT" },
              { href: "/shop", label: "SHOP" },
              { href: "/catalog", label: "CATALOG" },
              { href: "/workshop", label: "WORKSHOP" },
              { href: "/forum", label: "FORUM" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[#604234] text-sm hover:text-gray-900 ${
                  pathname === link.href
                    ? "font-bold border-b-2 border-[#604234]"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4 pr-4">
            <Link
              href="/notifications"
              className="text-[#604234] hover:text-gray-900"
            >
              <BsBell className="w-6 h-6" />
            </Link>
            <Link href="/cart" className="text-[#604234] hover:text-gray-900">
              <BsCart3 className="w-6 h-6" />
            </Link>
            <div className="relative">
              <button
                className="px-3 py-2 rounded-full bg-[#B08D57] text-white hover:bg-opacity-90"
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
            {isSignedIn && (
              <button
                className="px-3 py-2 rounded-full bg-secondary text-primary hover:bg-opacity-90"
                onClick={handleSignOut}
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/notifications"
              className="text-[#604234] hover:text-gray-900"
            >
              <BsBell className="w-6 h-6" />
            </Link>
            <Link href="/cart" className="text-[#604234] hover:text-gray-900">
              <BsCart3 className="w-6 h-6" />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-[#604234] hover:text-gray-900"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#FFF7E5]/80 backdrop-blur-sm w-full">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[
              { href: "/", label: "HOME" },
              { href: "/pda", label: "PHILATELY DEPOSIT ACCOUNT" },
              { href: "/shop", label: "SHOP" },
              { href: "/catalog", label: "CATALOG" },
              { href: "/workshop", label: "WORKSHOP" },
              { href: "/forum", label: "FORUM" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base text-[#604234] hover:bg-[#4C6151]/10 ${
                  pathname === link.href ? "font-bold bg-[#4C6151]/10" : ""
                }`}
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 space-y-2">
              <button
                className="w-full px-3 py-2 rounded-md text-base font-medium text-white bg-[#B08D57] hover:bg-opacity-90"
                onClick={() => {
                  router.push("/signup");
                  toggleMenu();
                }}
              >
                Sign Up
              </button>
              <button
                className="w-full px-3 py-2 rounded-md text-base font-medium text-white bg-[#B08D57] hover:bg-opacity-90"
                onClick={() => {
                  router.push("/login");
                  toggleMenu();
                }}
              >
                Sign In
              </button>
              {isSignedIn && (
                <button
                  className="w-full px-3 py-2 rounded-md text-base font-medium text-primary bg-secondary hover:bg-opacity-90"
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
