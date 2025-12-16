// src/pages/ReviewPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Small reusable rating select */
function Rating({ label, name, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
      >
        <option value="">Select rating</option>
        <option value="5">5 ⭐ Excellent</option>
        <option value="4">4 ⭐ Very Good</option>
        <option value="3">3 ⭐ Good</option>
        <option value="2">2 ⭐ Poor</option>
        <option value="1">1 ⭐ Very Bad</option>
      </select>
    </div>
  );
}

export default function ReviewPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rideId: "",
    driverName: "",
    from: "",
    to: "",
    overall: "",
    driverBehaviour: "",
    punctuality: "",
    safety: "",
    cleanliness: "",
    recommend: "",
    comments: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Review Submitted:", form); // demo only
    setSubmitted(true);
  }

  /* ---------- THANK-YOU STATE ---------- */
  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-64px-64px)] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-10">
        <div className="max-w-lg w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 px-8 py-10 text-center space-y-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-3xl">
            🎉
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Thank you for your feedback!
          </h2>
          <p className="text-sm text-slate-600">
            Your ride review has been recorded. It helps us keep RideShare safe
            and reliable for everyone.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-slate-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /* ---------- FORM UI ---------- */
  return (
    <div className="min-h-[calc(100vh-64px-64px)] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="relative max-w-4xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 px-6 py-8 sm:px-10 sm:py-10 space-y-8"
      >
        {/* Header */}
        <header className="space-y-2 text-center">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-indigo-500">
            Ride Feedback
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Ride Review & Rating
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Share your experience for this ride. Your ratings help other
            passengers choose safe and friendly drivers.
          </p>
        </header>

        {/* Ride details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Ride ID
            </label>
            <input
              name="rideId"
              value={form.rideId}
              onChange={handleChange}
              placeholder="e.g. RS-2025-1045"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Driver Name
            </label>
            <input
              name="driverName"
              value={form.driverName}
              onChange={handleChange}
              placeholder="Driver full name"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              From Location
            </label>
            <input
              name="from"
              value={form.from}
              onChange={handleChange}
              placeholder="Pickup point"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              To Location
            </label>
            <input
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="Drop location"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>
        </section>

        {/* Overall rating */}
        <section className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Overall Rating ⭐
            </label>
            <span className="text-[11px] text-slate-400">
              5 = Excellent · 1 = Very Bad
            </span>
          </div>
          <select
            name="overall"
            value={form.overall}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          >
            <option value="">Select overall rating</option>
            <option value="5">5 ⭐ Excellent</option>
            <option value="4">4 ⭐ Very Good</option>
            <option value="3">3 ⭐ Good</option>
            <option value="2">2 ⭐ Poor</option>
            <option value="1">1 ⭐ Very Bad</option>
          </select>
        </section>

        {/* Category ratings */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Rating
            label="Driver Behaviour"
            name="driverBehaviour"
            value={form.driverBehaviour}
            onChange={handleChange}
          />
          <Rating
            label="Punctuality"
            name="punctuality"
            value={form.punctuality}
            onChange={handleChange}
          />
          <Rating
            label="Safety & Driving Quality"
            name="safety"
            value={form.safety}
            onChange={handleChange}
          />
          <Rating
            label="Car Cleanliness"
            name="cleanliness"
            value={form.cleanliness}
            onChange={handleChange}
          />
        </section>

        {/* Comments */}
        <section className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Detailed Feedback
          </label>
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            placeholder="Share anything specific about the ride, driver behaviour, traffic, safety, etc."
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 shadow-sm resize-y focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          />
        </section>

        {/* Recommend */}
        <section className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Would you ride again with this driver?
          </label>
          <select
            name="recommend"
            value={form.recommend}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          >
            <option value="">Choose one</option>
            <option value="yes">Yes, definitely</option>
            <option value="maybe">Maybe / depends on route</option>
            <option value="no">No</option>
          </select>
        </section>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-indigo-300/60 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
