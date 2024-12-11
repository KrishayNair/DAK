"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BsBell, BsCart3 } from "react-icons/bs";
import NotificationModal from "@/components/custom/NotificationModal";
import { useNotifications } from "@/context/NotificationContext";
import Cookies from "js-cookie";
import { fetchFromAPI } from "@/lib/api";
import { logout } from "@/lib/auth";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Bell,
  ShoppingCart
} from "lucide-react";
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
      setUserData(res.data);
    } else {
      alert(res.message);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navBarRoutes = [
    {
      title: "Philatelist Deposit Account",
      url: "/pda",
      regex: /^\/pda/,
    },
    {
      title: "Shop",
      url: "/shop",
      regex: /^\/shop/,
    },
    {
      title: "Catalog",
      url: "/catalog",
      regex: /^\/catalog/,
    },
    {
      title: "Blog",
      url: "/blog",
      regex: /^\/blog/,
    },
    {
      title: "Forum",
      url: "/forum",
      regex: /^\/forum/,
    },
    {
      title: "Auctions",
      url: "/auction",
      regex: /^\/auction/,
    },
  ];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    // <div className="relative z-50">
    //   <nav className="bg-primary backdrop-blur-sm font-primary shadow-lg sticky top-0 w-full">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="flex items-center justify-between h-16">
    //         {/* Logo */}
    //         <Link href="/" className="text-primary hover:text-gray-900">
    //           <img src="/images/dAk.png" alt="DAK" className="w-16 h-6 md:w-20 md:h-8" />
    //         </Link>

    //         {/* Navigation Links */}
    //         <div className="hidden md:flex items-center xl:space-x-6 space-x-2 ml-10">
    //           {[
    //             { href: "/", label: "HOME" },
    //             { href: "/pda", label: "PHILATELY DEPOSIT ACCOUNT" },
    //             { href: "/shop", label: "SHOP" },
    //             { href: "/catalog", label: "CATALOG" },
    //             { href: "/blog", label: "BLOG" },
    //             { href: "/forum", label: "FORUM" },
    //             { href: "/auction", label: "AUCTION" },
    //           ].map((link) => (
    //             <Link
    //               key={link.href}
    //               href={link.href}
    //               className={`text-[#604234] xl:text-base text-xs hover:text-gray-900 text-center ${
    //                 pathname === link.href ? "font-bold border-b-2 border-[#604234]" : ""
    //               }`}
    //             >
    //               {link.label}
    //             </Link>
    //           ))}
    //         </div>

    //         {/* Right Side Icons */}
    //         <div className="flex items-center xl:space-x-6 space-x-2">
    //           {/* Bell Icon */}
    //           <div className="relative">
    //             <BsBell className="w-5 h-5 ml-10 xl:w-6 md:h-6 text-[#604234]" />
    //           </div>

    //           {/* Cart Icon */}
    //           <Link href="/cart">
    //             <BsCart3 className="w-5 h-5 xl:w-6 md:h-6 text-[#604234]" />
    //           </Link>

    //           {/* Profile Dropdown with Username */}
    //           <div className="relative">
    //             <button
    //               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    //               className="flex items-center space-x-2 text-[#604234] hover:text-gray-900"
    //             >
    //               <span className="text-xs xl:text-base">Welcome, {userData ? userData.name : 'Loading...'}</span>
    //               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    //               </svg>
    //             </button>

    //             {isDropdownOpen && (
    //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
    //                 <Link
    //                   href="/profile"
    //                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //                 >
    //                   Profile
    //                 </Link>
    //                 <button
    //                   onClick={() => {
    //                     logout();
    //                     router.push("/login");
    //                   }}
    //                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //                 >
    //                   Log out
    //                 </button>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>

    //   <NotificationModal
    //     isOpen={isNotificationOpen}
    //     onClose={() => setIsNotificationOpen(false)}
    //     anchorRef={bellIconRef}
    //   />
    // </div>
    <aside className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center p-4 pr-5 pl-5",
      scrolled
        ? "bg-white/70 backdrop-blur-md border-b border-gray-300"
        : "bg-transparent"
    )}>
      <Link href="/">
      <Image src="/logoNew.png" width={100} height={50}  className="absolute top-2 left-7"/>
      </Link>
      <nav className="flex items-center justify-center w-full ml-40">
        <div className="flex space-x-8 text-[#604234] font-primary">
          {navBarRoutes.map((route, i) => (
            <Link
              key={i}
              href={route.url}
              className={cn(
                "flex items-center font-extralight font-primary text-sm hover:font-bold",
                pathname.match(route.regex)
                  ? "font-bold"
                  : ""
              )}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </nav>
      <div className="ml-auto cursor-pointer flex items-center space-x-3">
          <Bell className="w-6 h-6 opacity-60 hover:text-secondary hover:opacity-100" />
          <ShoppingCart className="w-6 h-6 opacity-60 hover:text-secondary hover:opacity-100"/>
          </div>
                    <div className="relative ml-5">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-[#604234] hover:text-gray-900"
                >
                 <div className="flex-col"><span className="font-semibold text-base">Welcome,</span> <span>{userData ? userData.name : 'Loading...'}</span> </div>
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
    </aside>
  );
}
