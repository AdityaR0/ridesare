// src/pages/auth/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        password,
      });

      // save token & role in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      setLoading(false);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(
        err.response?.data?.message || "Admin login failed. Please try again."
      );
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-10">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-slate-900 mb-1">Admin Panel</div>
          <p className="text-sm text-slate-500">
            Enter admin password to access the dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Admin Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Signing in..." : "Sign in as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
