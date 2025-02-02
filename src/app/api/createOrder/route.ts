import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse the JSON body
        const { amount } = body;

        const order = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects the amount in paise
            currency: "INR",
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
