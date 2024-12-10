import { postDataToAPI } from "@/lib/api";

export const initializeRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    });
};

export async function makePayment(data) {
    const res = await initializeRazorpay();

    if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
    }

    var options = {
        key: process.env.NEXT_PUBLIC_RZP_KEY, // Enter the Key ID generated from the Dashboard
        name: "Dak Store",
        currency: "INR",
        amount: data.amount,
        order_id: data.id,
        description: "Thankyou for ordering from us",
        handler: function (response) {
            // Validate payment at server - using webhooks is a better idea.
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};

export const createOrder = async (amount, orderData) => {
    const res = await fetch("/api/createOrder", {
        method: "POST",
        body: JSON.stringify({ amount: amount * 100 }),
    });
    const data = await res.json();

    const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,

        handler: async function (response) {
            // verify payment
            const res = await fetch("/api/verifyOrder", {
                method: "POST",
                body: JSON.stringify({
                    orderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                }),
            });
            const data = await res.json();

            if (data.isOk) {
                orderData.transaction_details.id = response.razorpay_payment_id;
                
                const res = await postDataToAPI("order/placeOrder/", orderData);
                if (res.success) {
                    alert("Payment successful");
                    return true;
                } else {
                    alert("Something went wrong. Cannot place order : " + res?.message);
                    return false;
                }
            } else {
                alert("Payment verification failed");
                return false;
            }
        },
    };

    const payment = new window.Razorpay(paymentData);
    payment.open();
};