"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setUser(null);
        setIsDropdownOpen(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#3C5141] font-primary shadow-lg sticky top-0 z-50 md:top-2 md:mx-4 md:my-2 md:rounded-full">
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
                className={`text-primary text-sm hover:text-gray-900 ${
                  pathname === link.href ? "border-b-2 border-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-2 pr-4">
            <div className="relative">
              <button
                className="px-3 py-2 rounded-full bg-[#B08D57] text-white hover:bg-opacity-90"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user ? `Welcome, ${user.username} ▼` : 'Register ▼'}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {user ? (
                    <>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleSignOut();
                          setIsDropdownOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-primary hover:text-gray-900 pr-4"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#3C5141] w-full">
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
                className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#4C6151] ${
                  pathname === link.href ? "bg-[#4C6151]" : ""
                }`}
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 space-y-2">
              {user ? (
                <button
                  className="w-full px-3 py-2 rounded-md text-base font-medium text-primary bg-secondary hover:bg-opacity-90"
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
