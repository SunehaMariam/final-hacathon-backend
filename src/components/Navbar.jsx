import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          PortfolioBuilder
        </Link>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
