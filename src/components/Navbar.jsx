import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          PortfolioBuilder
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3">
          <Link
            to="/login"
            className="block text-gray-700 hover:text-indigo-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
