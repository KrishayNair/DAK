"use client";
import React, { useState, useEffect, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import WorkshopCard from './components/WorkshopCard';
import WorkshopModal from './components/WorkshopModal';
import HostWorkshopModal from './components/HostWorkshopModal';
import { useWorkshops } from './hooks/useWorkshops';

const carouselItems = [
  { image: "/workshop.png", text: "Workshop" },
  { image: "/workshop.png", text: "Discover Philately" },
  { image: "/workshop.png", text: "Learn from Experts" },
  { image: "/workshop.png", text: "Join Our Community" }
];

export default function WorkshopPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { workshops, loading, error, fetchWorkshops } = useWorkshops();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    duration: '',
    date: '',
    time: '',
    mode: 'online'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHostWorkshop = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/workshops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create workshop');
      }

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        image: '',
        duration: '',
        date: '',
        time: '',
        mode: 'online'
      });
      setIsHostModalOpen(false);
      
      // Refresh workshops list
      fetchWorkshops();
    } catch (error) {
      console.error('Error creating workshop:', error);
      // You might want to show an error message to the user here
    }
  };

  const openModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading workshops...</div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl text-red-600">Error: {error}</div>
    </div>;
  }

  return (
    <div className="bg-[#FFF8E8] min-h-screen p-4 sm:p-6">
      <Hero currentSlide={currentSlide} carouselItems={carouselItems} />
      <SearchBar />
      
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsHostModalOpen(true)}
          className="bg-[#B85C38] text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-[#A04B2D] transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Host a Workshop</span>
        </button>
      </div>

      <div className="space-y-6">
        {workshops.map((workshop) => (
          <WorkshopCard
            key={workshop._id}
            workshop={workshop}
            onClick={() => openModal(workshop)}
          />
        ))}
      </div>

      <WorkshopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workshop={selectedWorkshop}
      />

      <HostWorkshopModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleHostWorkshop}
      />
    </div>
  );
}