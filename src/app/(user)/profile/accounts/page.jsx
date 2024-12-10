"use client";
import React, { useState } from "react";

const AccountSettings = ({ userData }) => {
  const [email, setEmail] = useState(userData?.email || "");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleTogglePrivacy = () => {
    setIsPrivate(!isPrivate);
  };

  const handleSaveChanges = () => {
    // Logic to save changes (e.g., API call)
    alert("Changes saved!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Account Settings</h1>

      <div className="mb-6 relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500 transition-all duration-300 ${
            email ? "pt-5" : ""
          }`}
          onFocus={() => setEmail(email)}
        />
        <label
          className={`absolute left-3 top-3 text-gray-700 transition-all duration-200 ${
            email ? "text-sm transform -translate-y-4" : "text-base"
          }`}
        >
          Email
        </label>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <button className="mr-4  bg-yellow-200 text-brown py-2 px-4 rounded-full hover:bg-amber-300">
          Change Password
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Details Privacy
        </label>
        <div className="flex items-center">
          <span className="mr-2">
            Make your contact details hidden to other users of Dak
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={handleTogglePrivacy}
              className="sr-only"
            />
            <div
              className={`w-12 h-6 rounded-full transition-colors ${
                isPrivate ? "bg-brown-500" : "bg-gray-500"
              }`}
            ></div>
            <div
              className={`absolute w-4 h-4 rounded-full shadow transform transition-transform bg-white ${
                isPrivate ? "translate-x-5" : "translate-x-1"
              }`}
            ></div>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Remove your account</h2>
        <p className="text-sm text-gray-600 mb-2">
          You can do "Disable Account" to take a break from Dak
        </p>
        <button className="mr-2 bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-800">
          Disable Account
        </button>
        <button className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-800">
          Delete Account
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={handleSaveChanges}
          className="bg-white text-black font-bold py-2 px-6 rounded-full border border-yellow-600 shadow-md transition duration-300 hover:bg-yellow-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
