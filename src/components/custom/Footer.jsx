import React, { useState } from "react";
import Link from "next/link";
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#D1F1D3] text-gray-600 py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            
            <Link href="/" className="text-primary hover:text-gray-900">
            <img
              src="logoNew.png"
              alt="DAK"
              className="w-36 h-20"
            />
            </Link>
           
            <p className="text-sm">
              Want to know what we&apos;re up to ?<br />
              Sign up to get regular updates
            </p>
            <form onSubmit={handleSubmit} className="flex max-w-xs">
              <input
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-800 px-3 py-1 rounded-l-md w-full text-sm"
                required
              />
              <button
                type="submit"
                className="bg-[#7c5f4c] text-white px-4 py-1 rounded-r-md text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          {["Contact", "Contact", "Contacts"].map((title, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold">{title}</h3>
              <ul className="space-y-1 text-sm">
                <li>About us</li>
                <li>Contact</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-600 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p className="mb-2 sm:mb-0">
            &copy; 2024 Acme Inc. All rights reserved.
          </p>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of services
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
