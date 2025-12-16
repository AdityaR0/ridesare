import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LanguageModal from "./LanguageModal";

const navLinkClass =
  "text-sm font-medium px-3 py-2 rounded-full hover:bg-white/10 transition";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showLang, setShowLang] = useState(false);

  const dashboardPath =
    user?.role === "passenger"
      ? "/passenger/dashboard"
      : user?.role === "driver"
      ? "/driver/dashboard"
      : user?.role === "admin"
      ? "/admin/dashboard"
      : "/";

  return (
    <>
      <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🚗</span>
            <span className="font-semibold text-xl">RideShare</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-3">
            
            {/* 🌐 Language Button */}
            <button
              onClick={() => setShowLang(true)}
              className="text-sm px-3 py-2 rounded-full hover:bg-white/10"
            >
              🌐 EN
            </button>

            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink to={dashboardPath} className={navLinkClass}>
                  Dashboard
                </NavLink>

                <NavLink to="/community" className={navLinkClass}>
                  Community
                </NavLink>

                <button
                  onClick={logout}
                  className="text-sm font-medium px-4 py-2 rounded-full bg-white text-indigo-600 hover:bg-slate-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-sm font-medium px-5 py-2 rounded-full bg-white text-purple-600"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* 🌍 Language Modal */}
      {showLang && <LanguageModal onClose={() => setShowLang(false)} />}
    </>
  );
};

export default Navbar;
