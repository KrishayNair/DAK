"use client";
import React, { useState, useEffect } from "react";
import { putDataToAPI, fetchFromAPI } from "@/lib/api";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Spinner from "@/components/custom/Spinner";

const profileSchema = z.object({
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  isPrivate: z.boolean(),
  profile_img: z.instanceof(File).optional(),
});

const AccountSettings = ({ userData }) => {
  const router = useRouter();
  const [email, setEmail] = useState(userData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
  const [isPrivate, setIsPrivate] = useState(userData?.isPrivate || false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTogglePrivacy = () => {
    setIsPrivate(!isPrivate);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    const validationResult = profileSchema.safeParse({
      email,
      phoneNumber,
      isPrivate,
      profile_img: image,
    });

    if (!validationResult.success) {
      alert(validationResult.error.errors.map((err) => err.message).join(", "));
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("isPrivate", isPrivate.toString());
    if (image) {
      formData.append("profile_img", image);
    }

    try {
      setLoading(true);
      const profile = await fetchFromAPI("philatelist/getProfile");
      if (profile.success) {
        const res = await putDataToAPI(
          `philatelist/${profile.data.id}/`,
          formData,
          true
        );
        if (res.success) {
          alert("Changes saved!");
          router.push("/profile");
        } else {
          alert(res.message);
        }
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("An error occurred while saving changes.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

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

      <div className="mb-6 relative">
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={`w-full p-3 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500 transition-all duration-300`}
        />
        <label
          className={`absolute left-3 top-3 text-gray-700 transition-all duration-200 ${
            phoneNumber ? "text-sm transform -translate-y-4" : "text-base"
          }`}
        >
          Phone Number
        </label>
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
        <label className="block text-lg font-semibold mb-1">
          Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 rounded-md p-2"
        />
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
