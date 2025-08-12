import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("https://heckathon-backend-feqo.vercel.app/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-200 via-teal-300 to-blue-200 flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-extrabold text-teal-700 mb-10 tracking-wide text-center">
        WELCOME TO PORTFOLIO BUILDER
      </h1>

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">Sign Up</h2>
        {error && (
          <p className="text-red-600 text-center mb-6 font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border-2 border-teal-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-teal-400 transition text-lg"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border-2 border-teal-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-teal-400 transition text-lg"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border-2 border-teal-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-teal-400 transition text-lg"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg hover:from-green-700 hover:to-teal-700 transition transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-teal-700 mt-8 text-lg">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
