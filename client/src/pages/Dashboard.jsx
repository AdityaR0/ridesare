import { useEffect, useState } from "react";

export default function Dashboard() {
  const [role, setRole] = useState("passenger");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to your {role === "driver" ? "Driver" : "Passenger"} Dashboard
      </h1>
      <p className="text-slate-600 mb-8">
        From here you will be able to {role === "driver"
          ? "create and manage rides, view bookings, and respond to SOS alerts."
          : "search available rides, book seats, send SOS during trip, and review rides after completion."}
      </p>

      <div className="grid md:grid-cols-3 gap-6 text-sm">
        <div className="p-4 rounded-xl bg-white shadow">
          <p className="font-semibold mb-1">🚘 Rides</p>
          <p>
            {role === "driver"
              ? "Create new ride offers and manage existing rides."
              : "Search for rides based on route and date."}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white shadow">
          <p className="font-semibold mb-1">🆘 SOS Center</p>
          <p>
            Access SOS alerts and view safety information related to your rides.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white shadow">
          <p className="font-semibold mb-1">⭐ Reviews</p>
          <p>View the ratings you received and reviews you have given.</p>
        </div>
      </div>
    </div>
  );
}
