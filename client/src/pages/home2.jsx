// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Save Money",
    desc: "Split travel costs with other passengers and save up to 70% on your journey expenses.",
    icon: "💰",
  },
  {
    title: "Eco-Friendly",
    desc: "Reduce carbon emissions by sharing rides and help protect our planet for future generations.",
    icon: "🌿",
  },
  {
    title: "Meet People",
    desc: "Connect with fellow travelers and make new friends during your journey.",
    icon: "🧑‍🤝‍🧑",
  },
  {
    title: "Verified Users",
    desc: "All users are verified with ID, phone, and email for maximum safety and trust.",
    icon: "✅",
  },
  {
    title: "Real-Time Updates",
    desc: "Get instant notifications about ride status, driver location, and schedule changes.",
    icon: "⏱️",
  },
  {
    title: "In-App Messaging",
    desc: "Communicate securely with drivers and passengers through our built-in chat system.",
    icon: "💬",
  },
];

const steps = [
  {
    num: 1,
    title: "Sign Up",
    desc: "Create your free account and verify your identity for a safe experience.",
  },
  {
    num: 2,
    title: "Find a Ride",
    desc: "Search for rides going your way or offer your own ride to passengers.",
  },
  {
    num: 3,
    title: "Travel Together",
    desc: "Meet your driver or passengers and enjoy a safe, comfortable journey.",
  },
];

const safetyPoints = [
  {
    title: "Identity Verification",
    desc: "All users must verify their email, phone number, and ID before joining.",
  },
  {
    title: "Ratings & Reviews",
    desc: "Read reviews from other users and make informed decisions.",
  },
  {
    title: "24/7 Support",
    desc: "Our support team is always available to help with any concerns.",
  },
  {
    title: "Emergency Assistance",
    desc: "Built-in SOS and emergency tools to keep you safe on every trip.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Daily Commuter",
    text: "RideShare has completely changed how I commute. I've saved hundreds of dollars and met amazing people along the way!",
  },
  {
    name: "Michael Chen",
    role: "RideShare Driver",
    text: "As a driver, I love being able to cover my fuel costs while meeting new people. The verification process makes me feel safe.",
  },
  {
    name: "Emily Rodriguez",
    role: "Weekend Traveler",
    text: "The app is so easy to use! I can find rides in seconds and the messaging feature makes coordination a breeze.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      {/* Top nav */}
      <header className="fixed top-0 inset-x-0 z-30 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
              🚗
            </div>
            <span className="text-lg font-semibold">RideShare</span>
          </button>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => scrollToSection("features")}>Features</button>
            <button onClick={() => scrollToSection("how-it-works")}>
              How It Works
            </button>
            <button onClick={() => scrollToSection("safety")}>Safety</button>
            <button onClick={() => scrollToSection("testimonials")}>
              Testimonials
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-slate-700"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* HERO */}
        <section
          id="hero"
          className="max-w-6xl mx-auto px-4 py-14 md:py-20 flex flex-col md:flex-row items-center gap-10"
        >
          {/* Left side text */}
          <div className="flex-1 space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              <span className="text-yellow-500 text-sm">☀️</span>
              Trusted by 10,000+ users
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              Travel Smarter,
              <br />
              Together.
            </h1>

            <p className="text-sm md:text-base text-slate-600 max-w-xl">
              Share your journey, split the costs, and reduce your carbon
              footprint. Connect with verified travelers heading your way.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
              >
                Get Started Free
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="px-6 py-2.5 rounded-full border border-slate-300 text-sm font-semibold hover:bg-slate-50"
              >
                Learn More
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm pt-2">
              <div>
                <p className="text-lg font-bold">4.9</p>
                <p className="text-slate-500">User Rating</p>
              </div>
              <div>
                <p className="text-lg font-bold">50K+</p>
                <p className="text-slate-500">Rides Shared</p>
              </div>
              <div>
                <p className="text-lg font-bold">$2M+</p>
                <p className="text-slate-500">Saved</p>
              </div>
            </div>
          </div>

          {/* Right image (replace src with your own image if you have one) */}
          <div className="flex-1 w-full">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <div className="aspect-[4/3] w-full bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                Hero Image / City Road
              </div>
              {/* Example if you have an image file:
              <img
                src="/images/hero-road.jpg"
                alt="Cars on a city highway"
                className="w-full h-full object-cover"
              />
              */}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="bg-slate-50 border-y border-slate-100"
        >
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-500 mb-2">
                Features
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Why Choose RideShare?
              </h2>
              <p className="text-sm md:text-base text-slate-500">
                Experience the future of shared transportation with our
                comprehensive platform.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-2"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {f.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="bg-white">
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-500 mb-2">
              Simple Process
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              How It Works
            </h2>
            <p className="text-sm md:text-base text-slate-500 mb-10">
              Get started in just three simple steps.
            </p>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {steps.map((step) => (
                <div key={step.num} className="space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-base">{step.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SAFETY */}
        <section
          id="safety"
          className="bg-slate-50 border-y border-slate-100"
        >
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center gap-10">
            {/* Left image (placeholder) */}
            <div className="flex-1 w-full">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                <div className="aspect-[4/3] w-full bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                  Safety Image / Driver
                </div>
              </div>
            </div>

            {/* Right text */}
            <div className="flex-1 space-y-4">
              <span className="inline-flex text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                Your Safety First
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">
                Travel With Confidence
              </h2>
              <p className="text-sm md:text-base text-slate-600">
                Your safety is our top priority. We&apos;ve implemented
                comprehensive security measures to ensure every journey is
                secure.
              </p>

              <div className="space-y-3 text-sm">
                {safetyPoints.map((point) => (
                  <div key={point.title} className="flex gap-3 items-start">
                    <span className="mt-1 text-lg">✅</span>
                    <div>
                      <p className="font-semibold">{point.title}</p>
                      <p className="text-xs md:text-sm text-slate-500">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-500 mb-2">
                Testimonials
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                What Our Users Say
              </h2>
              <p className="text-sm md:text-base text-slate-500">
                Join thousands of satisfied travelers who trust RideShare.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3 bg-slate-50/60"
                >
                  <div className="flex gap-1 text-yellow-400 text-sm">
                    {"★★★★★"}
                  </div>
                  <p className="text-sm text-slate-700">“{t.text}”</p>
                  <div className="pt-2">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} RideShare. All rights reserved.</p>
          <p>Built for B.Tech Final Year Project.</p>
        </div>
      </footer>
    </div>
  );
}
