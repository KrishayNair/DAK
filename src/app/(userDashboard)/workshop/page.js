"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Elsie_Swash_Caps } from 'next/font/google';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

const carouselItems = [
  { image: "/workshop.png", text: "Workshop" },
  { image: "/workshop.png", text: "Discover Philately" },
  { image: "/workshop.png", text: "Learn from Experts" },
  { image: "/workshop.png", text: "Join Our Community" }
];

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

export default function WorkshopPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    duration: '',
    date: '',
    time: '',
    mode: 'online'
  });
  const modalRef = useRef(null);
  const hostModalRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await fetch('/api/workshop', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch workshops');
      }
      const data = await response.json();
      setWorkshops(data.workshops);
    } catch (error) {
      console.error('Error fetching workshops:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleHostWorkshop = async (e) => {
    e.preventDefault();
    try {
      const dateStr = formData.date;
      const timeStr = formData.time;
      
      const workshopDate = new Date(dateStr);
      
      const [hours, minutes] = timeStr.split(':');
      const workshopTime = new Date(dateStr);
      workshopTime.setHours(parseInt(hours), parseInt(minutes), 0);

      const workshopData = {
        ...formData,
        date: workshopDate,
        time: workshopTime
      };

      const response = await fetch('/api/workshop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(workshopData)
      });

      if (response.ok) {
        setIsHostModalOpen(false);
        setFormData({
          title: '',
          description: '',
          image: '',
          duration: '',
          date: '',
          time: '',
          mode: 'online'
        });
        fetchWorkshops();
      } else {
        const error = await response.json();
        console.error('Failed to create workshop:', error);
      }
    } catch (error) {
      console.error('Error creating workshop:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading workshops...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E8] min-h-screen p-4 sm:p-6">
      <div className="h-[35vh] mb-4 sm:mb-6 bg-[#B85C38] rounded-lg overflow-hidden relative">
        <img
          src={carouselItems[currentSlide].image}
          alt="Philately workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className={`text-black text-4xl sm:text-6xl font-bold text-center px-4 py-2 rounded ${elsieSwashCaps.className}`}>
            {carouselItems[currentSlide].text}
          </h1>
        </div>
      </div>

      <div className="mb-4 sm:mb-6 relative">
        <input
          type="text"
          placeholder="Search workshops..."
          className="w-full p-3 pl-10 rounded-full border bg-white"
        />
        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

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
          <div
            key={workshop._id}
            className="bg-white rounded-lg p-6 flex flex-col sm:flex-row items-center shadow-md cursor-pointer"
            onClick={() => openModal(workshop)}
          >
            <div className="w-full sm:w-1/3 h-48 sm:h-64 bg-gray-200 rounded-lg mb-4 sm:mb-0 sm:mr-6">
              {workshop.image && (
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex-grow flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-semibold mb-3">{workshop.title}</h2>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span className="mr-4">{formatDate(workshop.date)}</span>
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>{formatTime(workshop.time)}</span>
                </div>
                <p className="text-base text-gray-600 mb-4">
                  {truncateText(workshop.description, 150)}
                </p>
              </div>
              <button className="bg-[#B85C38] text-white px-8 py-3 rounded-full text-lg font-medium self-start sm:self-end mt-4 transition duration-300 ease-in-out hover:bg-[#A04B2D] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-50">
                Join now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedWorkshop && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className={`fixed bottom-0 left-0 right-0 bg-white w-full h-[80vh] rounded-t-[2.5rem] p-6 overflow-y-auto transition-transform duration-300 ease-out ${
              isModalOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                {selectedWorkshop.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-48 md:h-64"></div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600">
                        {selectedWorkshop.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Workshop Details</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="font-medium text-gray-600">Duration</p>
                        <p>{selectedWorkshop.duration}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Time</p>
                        <p>{selectedWorkshop.time}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">
                          No. of joins
                        </p>
                        <p>{/* Add number of joins data */}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="font-semibold mb-2">Price / Free</p>
                    <p>{/* Add price or "Free" */}</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="font-semibold mb-2">Webinar name</p>
                    <p>{selectedWorkshop.name}</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="font-semibold mb-2">Workshop includes</p>
                    <ul className="list-disc pl-5">
                      {selectedWorkshop.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full bg-[#B85C38] text-white py-3 rounded-lg hover:bg-[#A04B2D] transition-colors font-medium">
                    Join now
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">FAQ</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  {/* Add FAQ content here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isHostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div 
            ref={hostModalRef}
            className="bg-white rounded-2xl w-full max-w-4xl h-auto max-h-[90vh] overflow-y-auto mx-4"
          >
            <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Host a Workshop</h2>
                <button
                  onClick={() => setIsHostModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleHostWorkshop} className="p-8">
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg h-32 text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                    placeholder="e.g., 2 hours"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode
                </label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                  required
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <div className="sticky bottom-0 bg-white pt-6 border-t mt-8">
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsHostModalOpen(false)}
                    className="px-6 py-2.5 border rounded-lg text-gray-600 hover:bg-gray-50 w-full sm:w-auto text-base font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#B85C38] text-white rounded-lg hover:bg-[#A04B2D] w-full sm:w-auto text-base font-medium"
                  >
                    Create Workshop
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
