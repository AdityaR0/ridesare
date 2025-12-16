// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const demoRides = [
  {
    id: 1,
    from: "Ballygunge",
    to: "Dum Dum",
    time: "09:00 AM",
    price: "₹180",
    driver: "Aarav Singh",
    rating: "4.8",
  },
  {
    id: 2,
    from: "Ballygunge",
    to: "Salt Lake",
    time: "10:30 AM",
    price: "₹160",
    driver: "Sneha Das",
    rating: "4.6",
  },
  {
    id: 3,
    from: "Howrah",
    to: "New Town",
    time: "06:15 PM",
    price: "₹210",
    driver: "Rahul Verma",
    rating: "4.9",
  },
];

const features = [
  {
    title: "Dual Login",
    desc: "Separate login & dashboards for Passenger, Driver and Admin with role-based access.",
    icon: "🔑",
  },
  {
    title: "Ride Management",
    desc: "Create, search and book rides with route, date, time, seats and price.",
    icon: "🗺️",
  },
  {
    title: "Safety & SOS",
    desc: "Verified drivers, in-ride SOS alerts, and admin monitoring for emergencies.",
    icon: "🚨",
  },
  {
    title: "Ratings & Reviews",
    desc: "Passengers and drivers can rate each other and leave feedback after every trip.",
    icon: "⭐",
  },
];

const reviews = [
  {
    name: "Aditya Singh",
    role: "Passenger",
    text: "Very easy to find college rides. I save money and don’t have to travel alone.",
  },
  {
    name: "Rahul Verma",
    role: "Driver",
    text: "I can fill my empty seats and cover my fuel cost. The SOS feature feels very safe.",
  },
  {
    name: "Sneha Das",
    role: "Passenger",
    text: "Clean interface, verified drivers and quick booking. Perfect for daily commute.",
  },
  {
    name: "Priya Sen",
    role: "Driver",
    text: "Love how I can see all upcoming rides in one place and manage my schedule.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeReview, setActiveReview] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const id = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const isLoggedIn = !!user;
  const role = user?.role;

  const handlePrimaryHeroClick = () => {
    if (!isLoggedIn) {
      navigate("/register");
      return;
    }

    if (role === "passenger") navigate("/passenger/dashboard");
    else if (role === "driver") navigate("/driver/dashboard");
    else if (role === "admin") navigate("/admin/dashboard");
    else navigate("/");
  };

  const handleSecondaryHeroClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center gap-10">
          {/* Left */}
          <div className="flex-1 space-y-4">
            <p className="text-xs tracking-[0.3em] uppercase text-indigo-100">
              Carpool Ride Sharing
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              Save Money, Save Fuel,
              <br />
              Share Your Commute.
            </h1>
            <p className="text-sm md:text-base text-indigo-100 max-w-xl">
              Connect passengers and drivers securely with seat booking,
              SOS alerts and ride reviews. Built as a full-stack project
              using React, Node.js and MongoDB.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handlePrimaryHeroClick}
                className="px-6 py-2.5 rounded-full bg-white text-slate-900 text-sm font-semibold shadow-md hover:bg-slate-100"
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              </button>
              <button
                onClick={handleSecondaryHeroClick}
                className="px-6 py-2.5 rounded-full border border-white/60 text-sm font-semibold hover:bg-white/10"
              >
                {isLoggedIn ? "View My Rides" : "Sign In"}
              </button>
            </div>
          </div>

          {/* Right – stats / quick actions */}
          <div className="flex-1 w-full">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5 md:p-6 shadow-xl">
              {!isLoggedIn ? (
                <>
                  <p className="text-xs font-semibold text-indigo-100 uppercase tracking-[0.2em] mb-3">
                    Why use RideShare?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-2xl font-bold">10k+</p>
                      <p className="text-indigo-100/90">
                        Verified users sharing daily college & office rides.
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">70%</p>
                      <p className="text-indigo-100/90">
                        Average saving on monthly commute cost through carpool.
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">Eco</p>
                      <p className="text-indigo-100/90">
                        Reduce traffic and carbon footprint by sharing rides.
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1 text-xs text-indigo-100/90 list-disc list-inside">
                    <li>Secure login & JWT based authentication.</li>
                    <li>Separate dashboards for Passenger, Driver & Admin.</li>
                    <li>SOS button during ride and detailed rating system.</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold text-indigo-100 uppercase tracking-[0.2em] mb-3">
                    Quick actions for you
                  </p>
                  <p className="text-sm mb-3">
                    Welcome back{" "}
                    <span className="font-semibold">
                      {user.name || "Rider"}
                    </span>
                    ! Choose what you want to do now.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    {role === "passenger" && (
                      <>
                        <button
                          onClick={() => navigate("/passenger/dashboard")}
                          className="bg-white text-slate-900 rounded-xl px-4 py-3 text-left shadow-sm hover:bg-slate-100"
                        >
                          🔍 Search rides & book seats
                        </button>
                        <button
                          onClick={() => navigate("/passenger/dashboard")}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left hover:bg-white/5"
                        >
                          📋 View your ride history
                        </button>
                        <button
                          onClick={() => navigate("/passenger/dashboard")}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left hover:bg-white/5"
                        >
                          🚨 Check SOS & alerts
                        </button>
                      </>
                    )}
                    {role === "driver" && (
                      <>
                        <button
                          onClick={() => navigate("/driver/dashboard")}
                          className="bg-white text-slate-900 rounded-xl px-4 py-3 text-left shadow-sm hover:bg-slate-100"
                        >
                          ➕ Create / offer a ride
                        </button>
                        <button
                          onClick={() => navigate("/driver/dashboard")}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left hover:bg-white/5"
                        >
                          🚙 Manage vehicle & profile
                        </button>
                        <button
                          onClick={() => navigate("/driver/dashboard")}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left hover:bg-white/5"
                        >
                          ⭐ View your ratings
                        </button>
                      </>
                    )}
                    {role === "admin" && (
                      <>
                        <button
                          onClick={() => navigate("/admin/dashboard")}
                          className="bg-white text-slate-900 rounded-xl px-4 py-3 text-left shadow-sm hover:bg-slate-100"
                        >
                          📊 Open admin dashboard
                        </button>
                        <button
                          onClick={() => navigate("/admin/dashboard")}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left hover:bg-white/5"
                        >
                          🧑‍✈️ Monitor drivers & passengers
                        </button>
                        <button
                          onClick={() => navigate("/admin/dashboard")}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left hover:bg-white/5"
                        >
                          🚨 View SOS & feedback
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH + MAP + DEMO RIDES */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Find a carpool instantly
              </h2>
              <p className="text-sm text-slate-500">
                Select pickup, drop, date and time to see a demo list of rides
                and route on the map.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col lg:flex-row gap-3 items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <div>
                <label className="block text-xs font-medium text-slate-500">
                  From (City)
                </label>
                <select className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                  <option>Ballygunge</option>
                  <option>Howrah</option>
                  <option>Salt Lake</option>
                  <option>New Town</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500">
                  To (City)
                </label>
                <select className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                  <option>Dum Dum</option>
                  <option>Howrah</option>
                  <option>Salt Lake</option>
                  <option>New Town</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500">
                    Date
                  </label>
                  <input
                    type="date"
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    defaultValue="2025-11-16"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500">
                    Time
                  </label>
                  <input
                    type="time"
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    defaultValue="09:00"
                  />
                </div>
              </div>
            </div>

            <button
              className="w-full lg:w-auto px-6 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
              onClick={() => {
                // just a demo; in real app you would call backend
                alert(
                  "This is a demo search. In the real system this would fetch rides from the backend."
                );
              }}
            >
              Search Rides
            </button>
          </div>

          {/* Map + demo rides */}
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Map (simple iframe of Kolkata area) */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-[320px]">
              <iframe
                title="Kolkata demo map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=88.30,22.45,88.50,22.65&layer=mapnik&marker=22.57,88.37"
                className="w-full h-full border-0"
              ></iframe>
            </div>

            {/* Demo rides list */}
            <div className="space-y-3">
              {demoRides.map((ride) => (
                <div
                  key={ride.id}
                  className="border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-3 shadow-sm bg-white"
                >
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-slate-900">
                      {ride.from} → {ride.to}
                    </p>
                    <p className="text-slate-500">
                      Time: <span className="font-medium">{ride.time}</span>
                    </p>
                    <p className="text-slate-500">
                      Driver:{" "}
                      <span className="font-medium">{ride.driver}</span> • ⭐{" "}
                      {ride.rating}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-indigo-600">
                      {ride.price}
                    </p>
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          alert("Please login as Passenger to book a ride.");
                          navigate("/login");
                          return;
                        }
                        if (role !== "passenger") {
                          alert(
                            "Only Passenger accounts can book rides in this demo."
                          );
                          return;
                        }
                        alert(
                          `Demo: booking ride with ${ride.driver}. In real app this would create a booking.`
                        );
                      }}
                      className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                    >
                      Book Seat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES – 2x2 GRID */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Key Features
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Everything you need for a safe, real-time carpooling platform built
            for students and daily commuters.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-3 shadow-sm"
              >
                <div className="text-2xl">{f.icon}</div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-slate-900 text-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-4">
          <h2 className="text-xl font-semibold">What passengers & drivers say</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {/* Active review */}
            <div className="md:col-span-2 bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-inner">
              <p className="text-slate-200">
                “{reviews[activeReview].text}”
              </p>
              <p className="mt-3 text-xs text-slate-400">
                — {reviews[activeReview].name},{" "}
                {reviews[activeReview].role}
              </p>
            </div>

            {/* Small list of all */}
            <div className="space-y-2 text-xs">
              {reviews.map((r, idx) => (
                <button
                  key={r.name}
                  onClick={() => setActiveReview(idx)}
                  className={`w-full text-left px-3 py-2 rounded-xl border ${
                    idx === activeReview
                      ? "bg-slate-800 border-indigo-400"
                      : "bg-slate-900 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  <p className="font-semibold text-slate-100">{r.name}</p>
                  <p className="text-slate-400">{r.role}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SINGLE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© 2025 RideShare. All rights reserved.</p>
          <p className="text-slate-500">
            Built as a B.Tech Final Year Project – React, Node.js, Express &
            MongoDB.
          </p>
        </div>
      </footer>
    </div>
  );
}
