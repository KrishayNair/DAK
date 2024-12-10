import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RZP_KEY,
    key_secret: process.env.NEXT_PUBLIC_RZP_SECRET,
});

export async function POST(req) {
    const { amount } = await req.json();
    const order = await razorpay.orders.create({
        amount,
        currency: "INR",
    });

    return NextResponse.json(order);
}