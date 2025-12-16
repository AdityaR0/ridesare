// src/components/Footer.jsx
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xl shadow">
              🚗
            </div>
            <span className="text-lg font-semibold">RideShare</span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            Making travel affordable, sustainable, and social for everyone.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg mt-3">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Company */}
        <div className="space-y-3 text-sm">
          <h3 className="font-semibold text-white">Company</h3>
          <ul className="space-y-1 text-slate-400">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-3 text-sm">
          <h3 className="font-semibold text-white">Support</h3>
          <ul className="space-y-1 text-slate-400">
            <li>Help Center</li>
            <li>Safety</li>
            <li>Contact Us</li>
            <li>Trust &amp; Safety</li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3 text-sm">
          <h3 className="font-semibold text-white">Legal</h3>
          <ul className="space-y-1 text-slate-400">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Licenses</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-xs text-slate-400">
          © {year} RideShare. All rights reserved. • Built for B.Tech Final Year Project.
        </div>
      </div>
    </footer>
  );
}
