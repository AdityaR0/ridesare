// client/src/pages/profile/PassengerProfilePage.jsx
import { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

export default function PassengerProfilePage() {
  const { user, refreshProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    workingAt: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        workingAt: user.workingAt || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await api.put("/users/me", form);
      await refreshProfile();
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px-64px)] flex items-center justify-center bg-slate-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold text-slate-900">
          Passenger Profile
        </h1>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Full name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Working at
          </label>
          <input
            name="workingAt"
            value={form.workingAt}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Address
          </label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {message && (
          <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-indigo-600 text-white rounded-full py-2 text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
