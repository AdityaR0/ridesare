import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/axios";

export default function DriverVehicleProfile() {
  const { user, refreshProfile } = useAuth();

  const [vehicle, setVehicle] = useState({
    vehicleType: "car",
    vehicleName: "",
    vehicleNumber: "",
  });

  const addVehicle = async (e) => {
    e.preventDefault();

    await api.put("/users/me", {
      vehicles: [...(user.vehicles || []), vehicle],
    });

    await refreshProfile();
    alert("Vehicle added");

    setVehicle({ vehicleType: "car", vehicleName: "", vehicleNumber: "" });
  };

  return (
    <div className="bg-slate-50 py-10">
      <div className="max-w-lg mx-auto px-4">
        <form
          onSubmit={addVehicle}
          className="bg-white rounded-2xl shadow-sm p-6 space-y-5"
        >
          <h2 className="text-xl font-semibold text-slate-900">
            Vehicle Details
          </h2>

          {/* VEHICLE TYPE */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Vehicle Type
            </label>
            <select
              value={vehicle.vehicleType}
              onChange={(e) =>
                setVehicle({ ...vehicle, vehicleType: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          {/* VEHICLE NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Vehicle Name
            </label>
            <input
              value={vehicle.vehicleName}
              onChange={(e) =>
                setVehicle({ ...vehicle, vehicleName: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* VEHICLE NUMBER */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Vehicle Number
            </label>
            <input
              value={vehicle.vehicleNumber}
              onChange={(e) =>
                setVehicle({ ...vehicle, vehicleNumber: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium">
            Save Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}
