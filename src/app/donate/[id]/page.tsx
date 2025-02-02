"use client";

import { useState } from "react";
import Script from "next/script";
import { useParams } from "next/navigation";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: {
    order_id: string;
    payment_id: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: <T extends "payment.failed">(
    event: T,
    handler: T extends "payment.failed"
      ? (response: RazorpayError) => void
      : never
  ) => void;
  close: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function Donate() {
  const { id } = useParams();
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [panCard, setPanCard] = useState<string>("");

  const createOrder = async () => {
    if (amount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }
   // connect backend here for Razorpay
    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, id }),
      });

      const data = await res.json();

      const paymentData: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: amount * 100,
        currency: "INR",
        order_id: data.id,
        name: "Donation",
        description: "Support our cause",
        handler: function (response: RazorpayResponse) {
          console.log("Payment successful:", response);
        },
        prefill: {
          name,
          email,
          contact: panCard || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (typeof window !== "undefined") {
        const payment = new window.Razorpay(paymentData);
        payment.open();

        payment.on("payment.failed", function (response: RazorpayError) {
          console.error("Payment failed:", response);
        });
      }
    } catch (error) {
      console.error("Error during payment flow:", error);
    }
  };

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Script
        id="razorpay-checkout"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="flex flex-col items-center gap-6 p-8 bg-white shadow-lg rounded-md border border-gray-300 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800">Donate to Support Fundraiser:{id}</h1>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={panCard}
          onChange={(e) => setPanCard(e.target.value)}
          placeholder="Enter your PAN card number (optional)"
        />
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.valueAsNumber > 0 ? e.target.valueAsNumber : 0)
          }
          placeholder="Enter donation amount"
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md w-full transition duration-200"
          onClick={createOrder}
        >
          Donate
        </button>
      </div>
    </div>
  );
}
