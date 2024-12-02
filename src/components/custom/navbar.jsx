"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BsBell, BsCart3 } from "react-icons/bs";
import NotificationModal from "@/components/custom/NotificationModal";
import { useNotifications } from "@/context/NotificationContext";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const bellIconRef = useRef(null); // Ref to track the bell icon
  const router = useRouter();
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50">
      {/* Navbar */}
      <nav className="bg-[#FFF7E5]/80 backdrop-blur-sm font-primary shadow-lg sticky top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-primary hover:text-gray-900">
                <img src="/images/dAk.png" alt="DAK" className="w-20 h-8" />
              </Link>
            </div>

            {/* Desktop Navigation */}
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

            {/* Desktop Right Menu */}
            <div className="hidden md:flex items-center space-x-8 pr-8">
              <div
                ref={bellIconRef} // Reference the bell icon
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="text-[#604234] hover:text-gray-900 cursor-pointer relative"
              >
                <BsBell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <Link href="/cart" className="text-[#604234] hover:text-gray-900">
                <BsCart3 className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        anchorRef={bellIconRef} // Pass the bell icon reference
      />
    </div>
  );
}
