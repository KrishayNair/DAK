import { useState, useEffect } from 'react';

// Mock data for testing
const mockWorkshops = [
  {
    _id: '1',
    title: 'Introduction to Stamp Collecting',
    description: 'Learn the basics of philately and start your collection journey.',
    image: '/workshop.png',
    date: '2024-04-15',
    time: '14:00',
    duration: '2 hours',
    mode: 'online'
  },
  {
    _id: '2',
    title: 'Advanced Philately Techniques',
    description: 'Deep dive into advanced stamp collecting methods and preservation.',
    image: '/workshop.png',
    date: '2024-04-20',
    time: '15:30',
    duration: '1.5 hours',
    mode: 'offline'
  }
];

export const useWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      // Simulating API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setWorkshops(mockWorkshops);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  return {
    workshops,
    loading,
    error,
    fetchWorkshops,
  };
};