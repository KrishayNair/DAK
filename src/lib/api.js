"use server";

import axios from "axios";
import { cookies } from "next/headers";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.headers.common["Content-Type"] = 'application/json'

// Helper function to get auth token
function getAuthToken() {
  const cookie = cookies().get("dak_session");
  return cookie ? `Bearer ${cookie.value}` : null;
}

// Mock data for demo mode
const mockData = {
  // Add your mock data here
  success: true,
  message: "Demo mode - Backend not connected",
  data: []
};

export async function fetchFromAPI(url) {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log("Demo mode: Using mock data instead of API call");
    return mockData;
  }
}

export async function postDataToAPI(url, data, isFile = false) {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
  try {
    const response = await axios.post(url, data, isFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {});
    return response.data;
  } catch (error) {
    console.log("Demo mode: Using mock data instead of API call");
    return {
      ...mockData,
      message: "Demo mode - POST request simulated"
    };
  }
}

export async function putDataToAPI(url, data, isFile = false) {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
  try {
    const response = await axios.patch(url, data, isFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {});
    return response.data;
  } catch (error) {
    console.log("Demo mode: Using mock data instead of API call");
    return {
      ...mockData,
      message: "Demo mode - PUT request simulated"
    };
  }
}
