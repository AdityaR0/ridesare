// src/pages/dashboard/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  // For now, fake stats – later you can connect real API endpoints
  const stats = [
    { label: "Total Passengers", value: 120 },
    { label: "Total Drivers", value: 45 },
    { label: "Total Rides Completed", value: 320 },
    { label: "Rides Cancelled", value: 18 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-3xl font-bold mb-1">
                Welcome, Admin
              </h1>
              <p className="text-indigo-100 text-sm">
                Monitor passengers, drivers, rides, SOS alerts and feedback.
              </p>
            </div>
            <div className="text-sm text-indigo-100 bg-white/10 border border-white/20 rounded-full px-4 py-1">
              Carpool Management Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-4"
            >
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                {s.label}
              </p>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 3 columns */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Passengers */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">
              Passenger Management
            </h2>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• View passenger profiles and contact details.</li>
              <li>• Check total rides taken & cancellations.</li>
              <li>• Review feedback given by passengers.</li>
            </ul>
          </div>

          {/* Drivers */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">
              Driver Management
            </h2>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Verify car details, license numbers and documents.</li>
              <li>• Track total rides given & cancellation patterns.</li>
              <li>• Handle driver reports and ratings.</li>
            </ul>
          </div>

          {/* SOS & Feedback */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">
              SOS & Feedback Center
            </h2>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Monitor SOS alerts triggered during rides.</li>
              <li>• Check ride reviews from both passengers and drivers.</li>
              <li>• Take action on reported incidents.</li>
            </ul>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-xs text-slate-400 text-center pt-4 border-t border-slate-100">
          Built for B.Tech Final Year Project – Admin can be improved with charts
          and live data later.
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
