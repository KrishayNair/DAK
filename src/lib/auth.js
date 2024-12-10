"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

// axios.defaults.baseURL = "http://127.0.0.1:8000/v1/admin/"
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function getOTP(uid) {
  const res = await axios.post("philatelist/getOTPOnEmail/", { uid });

  return res.data;
}

export async function verifyOTP(uid, otp) {
  const res = await axios.post("philatelist/verifyOTPOnEmail/", {
    uid,
    otp,
  });

  if (res.data.success) {
    const accessToken = res.data.data.access_token;
    const decodedToken = jwtDecode(accessToken);
    const expires = new Date(decodedToken.exp * 1000);

    // Set the auth token
    cookies().set("dak_session", accessToken, { expires, httpOnly: true });
    // Always set show_tour to true on successful login/signup
    cookies().set("show_tour", "true", { expires });
  }

  return true;
}

export async function login(formData) {
  const res = await axios.post("/philatelist/signUpSignIn/", formData);

  return res.data;
}

export async function logout() {
  cookies().delete("dak_session");
}

export async function verifySession(request) {
  const session = request.cookies.get("dak_session")?.value;

  if (session && request.nextUrl.pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && !request.nextUrl.pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  // return NextResponse.redirect(request.url)
}
