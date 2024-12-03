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

  const expires = new Date(Date.now() + 10 * 1000);
  if (res.data.success) {
    const accessToken = res.data.data.access_token;

    const decodedToken = jwtDecode(accessToken);
    const expires = new Date(decodedToken.exp * 1000);

    cookies().set("dak_session", accessToken, { expires, httpOnly: true });
  }

  return true;
}

export async function login(formData) {
  const res = await axios.post("philatelist/signUpSignIn/", formData);

  return res.data;
}

export async function logout() {
  cookies().delete("dak_session");
}

export async function verifySession(request) {
  const session = request.cookies.get("dak_session")?.value;

  if (session && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // return NextResponse.redirect(request.url)
}
