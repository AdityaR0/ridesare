// src/pages/CommunityList.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommunityList() {
  const navigate = useNavigate();
  const [showVerify, setShowVerify] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState("");

  const handleJoin = (type, name) => {
    if (type === "local") {
      navigate("/community/local");
    } else {
      setSelectedCommunity(name);
      setShowVerify(true);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">

        <p className="text-xs uppercase tracking-[0.2em] text-indigo-500">
          Community
        </p>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          Choose Your Community
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Join college, company or local communities
        </p>

        <div className="grid sm:grid-cols-2 gap-6">

          {/* COLLEGE */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg">Techno Main Salt Lake</h3>
            <p className="text-sm text-slate-500">
              College community (email verification required)
            </p>
            <button
              onClick={() => handleJoin("college", "Techno Main Salt Lake")}
              className="mt-4 px-4 py-2 rounded-full bg-slate-900 text-white text-sm"
            >
              Join Community
            </button>
          </div>

          {/* COMPANY */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg">Infosys</h3>
            <p className="text-sm text-slate-500">
              Company community (official email required)
            </p>
            <button
              onClick={() => handleJoin("company", "Infosys")}
              className="mt-4 px-4 py-2 rounded-full bg-slate-900 text-white text-sm"
            >
              Join Community
            </button>
          </div>

          {/* LOCAL */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg">Salt Lake Local</h3>
            <p className="text-sm text-slate-500">
              Open local carpool community
            </p>
            <button
              onClick={() => handleJoin("local")}
              className="mt-4 px-4 py-2 rounded-full bg-slate-900 text-white text-sm"
            >
              Join Community
            </button>
          </div>
        </div>

        {/* INFO */}
        <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-700">
          🔒 College & Company communities will require official email
          verification in future versions.
        </div>
      </div>

      {/* EMAIL VERIFY POPUP (DEMO) */}
      {showVerify && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[360px]">
            <h2 className="text-lg font-semibold mb-2">
              Verify Email
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Enter official email to join {selectedCommunity}
            </p>

            <input
              type="email"
              placeholder="your-email@college/company.com"
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowVerify(false)}
                className="px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowVerify(false)}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg"
              >
                Verify Email
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3">
              * Demo only. Email verification will be implemented later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
