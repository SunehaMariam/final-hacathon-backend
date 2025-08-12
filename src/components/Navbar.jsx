import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wider hover:tracking-widest transition-all duration-300"
        >
          Portfolio Builder
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-white text-indigo-700 font-semibold shadow-md hover:bg-indigo-100 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-pink-300 focus:outline-none transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg px-6 py-5 space-y-4 border-t border-gray-200 animate-fadeIn">
          <Link
            to="/login"
            className="block text-indigo-700 font-semibold hover:text-indigo-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-5 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </nav>
  );
}
