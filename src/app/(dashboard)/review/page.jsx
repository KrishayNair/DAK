'use client';

import { useEffect, useState } from 'react';
import { Review } from '../pda/components/Review';
import { useRouter } from 'next/navigation';

export default function ReviewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedData = localStorage.getItem('pdaFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      // If no form data is found, redirect back to PDA page
      router.push('/pda');
    }
  }, [router]);

  // Show loading state while formData is being retrieved
  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <Review formData={formData} />;
}
