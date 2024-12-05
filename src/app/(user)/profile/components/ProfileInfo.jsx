'use client';
import Image from 'next/image';
import pfp from "../../../../../public/images/pfpWhite.jpg"
import { useEffect, useState } from 'react';
import { fetchFromAPI } from '@/lib/api';
import { buildImageUrl } from "@/lib/utils"

export default function ProfileInfo() {
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

  return (
    <div className="bg-white rounded-3xl overflow-hidden">
      {/* Cover Image Section */}
      <div className="relative">
        <div className="h-48 bg-gray-200 rounded-t-3xl"></div>
        {/* Profile Image - Using Next.js Image */}
        <div className="absolute -bottom-12 left-16">
          <div className="w-32 h-32 bg-gray-200 rounded-full p-2">
            <div className="w-full h-full bg-white rounded-full p-1">
              <div className="relative w-full h-full">
                <img src={buildImageUrl(userData?.profile_img || "") || pfp}  alt="" className="object-contain rounded-full" />
              </div>
            </div>
          </div>
        </div>
        {/* Edit Profile Button */}
        <button className="absolute top-4 right-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
          Edit profile
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>

      {/* Profile Content */}
      <div className="pt-16 px-8 pb-8">
        <div className="flex justify-between items-start">
          {/* Left Side - Profile Info */}
          <div className="max-w-xl">
            <h1 className="text-2xl font-semibold mb-4">
              {userData ? userData.name : 'Loading...'}
            </h1>
            <p className="text-gray-600 mb-6">
              {userData ? userData.bio || 'No bio available' : 'Loading...'}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{userData ? userData.email : 'Loading...'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{userData ? userData.phone_number || 'No phone number' : 'Loading...'}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Dak Points */}
          <div className="bg-white shadow-sm border rounded-3xl p-4 min-w-[200px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dak points</p>
                <p className="text-3xl font-semibold">1000</p>
              </div>
              <div className="w-8 h-8">
                <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button className="p-2 hover:bg-gray-50 rounded-full">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}