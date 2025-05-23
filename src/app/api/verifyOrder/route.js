import { NextResponse } from "next/server";
import crypto from "crypto";

const generatedSignature = (
    razorpayOrderId,
    razorpayPaymentId
) => {
    const keySecret = process.env.NEXT_PUBLIC_RZP_SECRET;

    const sig = crypto
        .createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");
    return sig;
};

export async function POST(request) {
    const { orderId, razorpayPaymentId, razorpaySignature } =
        await request.json();

    const signature = generatedSignature(orderId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
        return NextResponse.json(
            { message: "payment verification failed", isOk: false },
            { status: 400 }
        );
    }

    // Probably some database calls here to update order or add premium status to user
    return NextResponse.json(
        { message: "payment verified successfully", isOk: true },
        { status: 200 }
    );
}