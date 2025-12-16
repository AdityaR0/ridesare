import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function CompleteProfile() {
  const { user, refreshProfile } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDriver = user?.role === "driver";

  const [form, setForm] = useState({
    gender: "",
    workingAt: "",
    address: "",
    aadharNumber: "",
    drivingLicense: "",
    vehicleType: "",
    vehicleName: "",
    vehicleNumber: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aadhaar: digits only
    if (name === "aadharNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.gender) return "Please select gender.";
    if (!form.workingAt.trim()) return "Please enter working place.";
    if (!form.address.trim()) return "Please enter address.";

    if (!/^\d{12}$/.test(form.aadharNumber)) {
      return "Aadhaar number must be exactly 12 digits.";
    }

    if (isDriver) {
      if (!form.drivingLicense.trim())
        return "Please enter driving license number.";

      if (!form.vehicleType)
        return "Please select vehicle type.";

      if (!form.vehicleName.trim())
        return "Please enter vehicle name.";

      if (!/^[A-Z]{2}\s?\d{2}\s?[A-Z]{2}\s?\d{4}$/i.test(form.vehicleNumber)) {
        return "Enter valid vehicle number (e.g. WB 12 AB 1234).";
      }
    }

    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      gender: form.gender,
      workingAt: form.workingAt,
      address: form.address,
      aadharNumber: form.aadharNumber,
    };

    if (isDriver) {
      payload.drivingLicense = form.drivingLicense;
      payload.vehicleType = form.vehicleType;
      payload.vehicleName = form.vehicleName;
      payload.vehicleNumber = form.vehicleNumber;
    }

    try {
      await api.put("/users/me", payload);
      await refreshProfile();

      navigate(
        isDriver ? "/driver/dashboard" : "/passenger/dashboard",
        { replace: true }
      );
    } catch (err) {
      setError("Profile update failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 space-y-8"
      >
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            {t("completeProfile")}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        {/* PERSONAL DETAILS */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 uppercase">
            {t("personalDetails")}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              name="workingAt"
              value={form.workingAt}
              placeholder="Working At"
              onChange={handleChange}
              className="input"
            />

            <input
              name="address"
              value={form.address}
              placeholder="Address"
              onChange={handleChange}
              className="input md:col-span-2"
            />

            <input
              name="aadharNumber"
              value={form.aadharNumber}
              placeholder="Aadhaar Number (12 digits)"
              maxLength={12}
              onChange={handleChange}
              className="input md:col-span-2"
            />
          </div>
        </section>

        {/* DRIVER DETAILS */}
        {isDriver && (
          <>
            <hr />
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 uppercase">
                {t("driverVehicle")}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="drivingLicense"
                  value={form.drivingLicense}
                  placeholder="Driving License Number"
                  onChange={handleChange}
                  className="input"
                />

                <select
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Vehicle</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                </select>

                <input
                  name="vehicleName"
                  value={form.vehicleName}
                  placeholder="Vehicle Name"
                  onChange={handleChange}
                  className="input"
                />

                <input
                  name="vehicleNumber"
                  value={form.vehicleNumber}
                  placeholder="Vehicle Number (WB 12 AB 1234)"
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </section>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}
