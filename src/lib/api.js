"use server";

import axios from "axios";
import { cookies } from "next/headers";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

axios.defaults.headers.common["Content-Type"] = 'application/json' 

export async function fetchFromAPI(url) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies().get("dak_session").value}`
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}

export async function postDataToAPI(url, data) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies().get("dak_session").value}`
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}

export async function putDataToAPI(url, data) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies().get("dak_session").value}`
    try {
        const response = await axios.patch(url, data);
        return response.data;
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}