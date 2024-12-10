// src/app/(dashboard)/pda/components/Sidebar.jsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchFromAPI } from "@/lib/api";
import { buildImageUrl } from "@/lib/utils";
import Spinner from "@/components/custom/Spinner";

export default function Sidebar() {
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
  return (
    <div className="w-80 bg-white p-8 shadow-xl rounded-3xl">
      <div className="flex items-center gap-3 mb-8 p-4 shadow-md rounded-2xl bg-white">
        <img
          src={buildImageUrl(userData?.profile_img || "")}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm text-gray-800 font-bold">Hi</p>
          <p className="  text-black-900 font-bold">
            {userData ? userData.name : <Spinner />}
          </p>
        </div>
      </div>

      <nav className="space-y-6">
        <Link
          href="/profile/orders"
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          My Orders
        </Link>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </div>
          <div className="space-y-3 pl-8">
            <Link
              href="/profile"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </Link>
            <Link
              href="/profile/accounts"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Account
            </Link>
            <Link
              href="/profile/notifications"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Notification
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
