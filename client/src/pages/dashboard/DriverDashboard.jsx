import { useAuth } from "../../context/AuthContext";
import DashboardCard from "../../components/DashboardCard";
import { Link } from "react-router-dom";

export default function DriverDashboard() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        
        {/* HEADER */}
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-500">
            Driver Dashboard
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Hello, {user?.name} 🚗
          </h1>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat title="Total rides given" value={user?.totalRidesGiven || 0} color="text-emerald-600" />
          <Stat title="Rides cancelled" value={user?.driverCancelledRides || 0} color="text-rose-500" />
          <Stat title="Active rides" value={user?.activeRides || 0} color="text-indigo-600" />
        </div>

        {/* ACTION CARDS */}
        <div className="grid md:grid-cols-2 gap-6">
          <DashboardCard icon="➕" title="Create Ride">
            <p className="text-sm text-slate-600 mb-3">
              Offer a new carpool ride to passengers on your route.
            </p>
            <Link
              to="/driver/create-ride"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded text-sm font-semibold"
            >
              Create Ride
            </Link>
          </DashboardCard>

          <DashboardCard icon="🚨" title="SOS / Emergency">
            <p className="text-sm text-slate-600">
              If you face any emergency during a ride, instantly alert admin and share your live location.
            </p>
            <button
              className="mt-3 bg-rose-600 text-white px-4 py-2 rounded text-sm font-semibold"
              disabled
            >
              SOS (Demo)
            </button>
          </DashboardCard>
        </div>

        {/* DRIVER INFO */}
        <DashboardCard icon="👤" title="Driver Information">
          <ul className="text-sm space-y-1">
            <li><b>Name:</b> {user?.name}</li>
            <li><b>Email:</b> {user?.email || "Not set"}</li>
            <li><b>License:</b> {user?.drivingLicense || "Not set"}</li>
            <li><b>Aadhaar:</b> {user?.aadharNumber || "Not set"}</li>
            <li><b>Working at:</b> {user?.workingAt || "Not set"}</li>
            <li><b>Address:</b> {user?.address || "Not set"}</li>
          </ul>

          <Link
            to="/driver/profile"
            className="text-indigo-600 text-sm font-semibold mt-2 inline-block"
          >
            Edit driver details
          </Link>
        </DashboardCard>

        {/* VEHICLES */}
        <DashboardCard icon="🚙" title="Your Vehicles">
          {user?.vehicles?.length ? (
            user.vehicles.map((v, i) => (
              <div key={i} className="text-sm mb-3">
                <p><b>Type:</b> {v.vehicleType}</p>
                <p><b>Name:</b> {v.vehicleName}</p>
                <p><b>Number:</b> {v.vehicleNumber}</p>
                <hr className="my-2" />
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No vehicles added</p>
          )}

          <Link
            to="/driver/vehicle"
            className="text-indigo-600 text-sm font-semibold"
          >
            Add / Manage vehicles
          </Link>
        </DashboardCard>

        {/* REVIEWS */}
        <DashboardCard icon="⭐" title="Ride Reviews">
          <p className="text-sm text-slate-600">
            Passenger ratings and reviews will appear here after completed rides.
          </p>
        </DashboardCard>

      </div>
    </div>
  );
}

const Stat = ({ title, value, color }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm">
    <p className="text-xs text-slate-500">{title}</p>
    <p className={`text-2xl font-semibold ${color}`}>{value}</p>
  </div>
);
