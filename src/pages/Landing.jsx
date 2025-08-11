import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow px-6 py-4 rounded-lg">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => {
            localStorage.removeItem("token"); // remove auth token
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Create */}
        <div
          onClick={() => navigate("/builder")}
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Create Portfolio</h2>
          <p className="text-sm text-gray-600 mt-2">
            Start building your new portfolio.
          </p>
        </div>

        {/* Edit */}
        <div
          onClick={() => navigate("/builder?edit=true")}
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Edit Portfolio</h2>
          <p className="text-sm text-gray-600 mt-2">
            Make changes to your existing portfolio.
          </p>
        </div>

        {/* Preview */}
        <div
          onClick={() => navigate("/preview")}
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Preview Portfolio</h2>
          <p className="text-sm text-gray-600 mt-2">
            See how your portfolio looks before publishing.
          </p>
        </div>
      </main>
    </div>
  );
}
