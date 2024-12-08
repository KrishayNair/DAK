"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BsBell, BsCart3 } from "react-icons/bs";
import NotificationModal from "@/components/custom/NotificationModal";
import { useNotifications } from "@/context/NotificationContext";
import Cookies from "js-cookie";
import { fetchFromAPI } from '@/lib/api';
import { logout } from "@/lib/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const bellIconRef = useRef(null); // Ref to track the bell icon
  const router = useRouter();
  const pathname = usePathname();
  const { unreadCount } = useNotifications();
  const [userData, setUserData] = useState(null);

  async function fetchProfile() {
    const res = await fetchFromAPI("philatelist/getProfile/");

    if (res.success) {
      setUserData(res.data)
    } else {
      alert(res.message)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50">
      <nav className="bg-[#FFF7E5]/80 backdrop-blur-sm font-primary shadow-lg sticky top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-primary hover:text-gray-900">
              <img src="/images/dAk.png" alt="DAK" className="w-20 h-8" />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: "/", label: "HOME" },
                { href: "/pda", label: "PHILATELY DEPOSIT ACCOUNT" },
                { href: "/shop", label: "SHOP" },
                { href: "/catalog", label: "CATALOG" },
                { href: "/blog", label: "BLOG" },
                { href: "/forum", label: "FORUM" },
                { href: "/auctions", label: "AUCTIONS" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[#604234] text-sm hover:text-gray-900 ${
                    pathname === link.href ? "font-bold border-b-2 border-[#604234]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              {/* Bell Icon */}
              <div className="relative">
                <BsBell className="w-6 h-6 text-[#604234]" />
              </div>

              {/* Cart Icon */}
              <Link href="/cart">
                <BsCart3 className="w-6 h-6 text-[#604234]" />
              </Link>

              {/* Profile Dropdown with Username */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-[#604234] hover:text-gray-900"
                >
                  <span>Welcome, {userData ? userData.name : 'Loading...'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        router.push("/login");
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        anchorRef={bellIconRef}
      />
    </div>
  );
}
