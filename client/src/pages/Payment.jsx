// src/pages/Payment.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { ride, seats, rideId } = location.state || {};

  if (!ride) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 text-center max-w-sm w-full">
          <p className="text-sm text-slate-600 mb-4">
            No ride information found. Please go back and select a ride first.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const basePrice = parseInt(ride.price.replace("₹", ""), 10) || 0;
  const totalPrice = basePrice * seats;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const handleCardChange = (field) => (e) => {
    setCardDetails((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePay = () => {
    if (paymentMethod === "card") {
      const { name, number, expiry, cvv } = cardDetails;
      if (!name || !number || !expiry || !cvv) {
        alert("Please fill all card details.");
        return;
      }
      // very basic front-end check
      if (number.replace(/\s/g, "").length < 12) {
        alert("Please enter a valid card number.");
        return;
      }
      if (cvv.length < 3) {
        alert("Please enter a valid CVV.");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        alert("Please enter your UPI ID.");
        return;
      }
      if (!upiId.includes("@")) {
        alert("Please enter a valid UPI ID (e.g. username@upi).");
        return;
      }
    }

    // 🔐 HERE you would call your real payment gateway (Razorpay / Stripe / etc.)
    alert(
      `Demo: payment successful for ${seats} seat(s) on ride #${rideId}. In a real app this would process payment and create a booking.`
    );
    navigate("/passenger/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[2fr,1.4fr] gap-6">
        {/* LEFT: Payment methods & form */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h1 className="text-xl font-semibold text-slate-900 mb-4">
            Complete your payment
          </h1>

          {/* Payment Method tabs */}
          <div className="flex gap-2 mb-5 text-sm">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex-1 py-2 rounded-full border text-center ${
                paymentMethod === "card"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              💳 Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("upi")}
              className={`flex-1 py-2 rounded-full border text-center ${
                paymentMethod === "upi"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              📱 UPI
            </button>
          </div>

          {/* CARD FORM */}
          {paymentMethod === "card" && (
            <div className="space-y-4 text-sm">
              {/* Fake card preview */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 text-white mb-3 shadow-md">
                <div className="flex justify-between text-xs opacity-90">
                  <span>Virtual Card</span>
                  <span>RideShare</span>
                </div>
                <p className="mt-6 tracking-widest text-lg">
                  **** **** **** 4242
                </p>
                <div className="mt-4 flex justify-between text-xs">
                  <div>
                    <p className="opacity-70">CARD HOLDER</p>
                    <p className="font-semibold truncate max-w-[140px]">
                      {cardDetails.name || "YOUR NAME"}
                    </p>
                  </div>
                  <div>
                    <p className="opacity-70">EXPIRES</p>
                    <p className="font-semibold">
                      {cardDetails.expiry || "MM/YY"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Name on card
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aarav Singh"
                  value={cardDetails.name}
                  onChange={handleCardChange("name")}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Card number
                </label>
                <input
                  type="text"
                  placeholder="1111 2222 3333 4444"
                  value={cardDetails.number}
                  onChange={handleCardChange("number")}
                  maxLength={19}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    placeholder="08/28"
                    value={cardDetails.expiry}
                    onChange={handleCardChange("expiry")}
                    maxLength={5}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="***"
                    value={cardDetails.cvv}
                    onChange={handleCardChange("cvv")}
                    maxLength={4}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                This is a demo screen. Do not enter real card details. In a
                production app, you would integrate a secure payment gateway
                here.
              </p>
            </div>
          )}

          {/* UPI FORM */}
          {paymentMethod === "upi" && (
            <div className="space-y-4 text-sm">
              <div className="bg-slate-100 rounded-xl p-3 text-xs text-slate-600">
                Pay instantly using UPI apps like PhonePe, Google Pay or Paytm.
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 rounded-full bg-slate-100">
                  GPay
                </span>
                <span className="px-2 py-1 rounded-full bg-slate-100">
                  PhonePe
                </span>
                <span className="px-2 py-1 rounded-full bg-slate-100">
                  Paytm
                </span>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                This is a demo screen. In a real app, after clicking Pay Now
                you would open the UPI intent or show a QR code.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 space-y-2">
            <button
              onClick={handlePay}
              className="w-full py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
            >
              Pay ₹{totalPrice}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200"
            >
              ← Go back
            </button>
          </div>
        </div>

        {/* RIGHT: Order summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 h-fit">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            Ride summary
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Ride:</span> {ride.from} →{" "}
              {ride.to}
            </p>
            <p>
              <span className="font-medium">Driver:</span> {ride.driver}
            </p>
            <p>
              <span className="font-medium">Time:</span> {ride.time}
            </p>
            <p>
              <span className="font-medium">Seats:</span> {seats}
            </p>
            <p>
              <span className="font-medium">Price per seat:</span> {ride.price}
            </p>

            <hr className="my-3" />

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-emerald-600">
              <span>Carpool discount</span>
              <span>- ₹0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Platform fee</span>
              <span>₹0</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-900">
                Total amount
              </span>
              <span className="text-lg font-bold text-indigo-600">
                ₹{totalPrice}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4">
            By confirming this payment, you agree to RideShare&apos;s terms of
            use & cancellation policy.
          </p>
        </div>
      </div>
    </div>
  );
}
