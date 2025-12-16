import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";

export default function Register() {
  const [role, setRole] = useState("passenger");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({ ...form, role });
      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-10">
        <div className="text-center mb-6">
          <div className="text-2xl">🚗</div>
          <h1 className="font-semibold text-lg">RideShare</h1>
          <p className="text-slate-500 text-sm">
            Join RideShare and start your journey
          </p>
        </div>

        {/* Role selector */}
        <div className="flex bg-slate-100 rounded-full p-1 mb-6 text-sm">
          <button
            type="button"
            onClick={() => setRole("passenger")}
            className={`flex-1 py-2 rounded-full ${
              role === "passenger" ? "bg-white shadow" : "text-slate-500"
            }`}
          >
            Passenger
          </button>
          <button
            type="button"
            onClick={() => setRole("driver")}
            className={`flex-1 py-2 rounded-full ${
              role === "driver" ? "bg-white shadow" : "text-slate-500"
            }`}
          >
            Driver
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-2 rounded"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
