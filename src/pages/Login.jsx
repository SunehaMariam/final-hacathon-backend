import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "https://final-hacathon-frontend.vercel.app//api/auth/login",
        formData,
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/Landing");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-4">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
          Login
        </h2>
        {error && (
          <p className="text-red-600 text-center mb-6 font-semibold">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border-2 border-indigo-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border-2 border-indigo-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/" className="text-indigo-700 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
