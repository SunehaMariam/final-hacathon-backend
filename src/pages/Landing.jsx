import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 p-8">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-xl px-8 py-5 rounded-xl">
        <h1 className="text-2xl font-extrabold text-indigo-700 tracking-wide">
          Dashboard
        </h1>
        <button
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition transform hover:scale-105 active:scale-95"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Create */}
        <div
          onClick={() => navigate("/builder")}
          className="bg-white rounded-2xl p-10 shadow-lg cursor-pointer transform transition duration-300 hover:shadow-2xl hover:bg-indigo-600 hover:text-white hover:scale-105 flex flex-col justify-center"
        >
          <h2 className="text-xl font-semibold mb-3">Create Portfolio</h2>
          <p className="text-sm opacity-80">
            Start building your new portfolio.
          </p>
        </div>

        {/* Edit */}
        <div
          onClick={() => navigate("/builder?edit=true")}
          className="bg-white rounded-2xl p-10 shadow-lg cursor-pointer transform transition duration-300 hover:shadow-2xl hover:bg-purple-600 hover:text-white hover:scale-105 flex flex-col justify-center"
        >
          <h2 className="text-xl font-semibold mb-3">Edit Portfolio</h2>
          <p className="text-sm opacity-80">
            Make changes to your existing portfolio.
          </p>
        </div>

        {/* Preview */}
        <div
          onClick={() => navigate("/preview")}
          className="bg-white rounded-2xl p-10 shadow-lg cursor-pointer transform transition duration-300 hover:shadow-2xl hover:bg-pink-600 hover:text-white hover:scale-105 flex flex-col justify-center"
        >
          <h2 className="text-xl font-semibold mb-3">Preview Portfolio</h2>
          <p className="text-sm opacity-80">
            See how your portfolio looks before publishing.
          </p>
        </div>
      </main>
    </div>
  );
}
