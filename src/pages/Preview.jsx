// src/pages/Preview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Preview() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // not logged in → go to login
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("https://heckathon-backend-3.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // backend might return data directly, or { success, data }
        const payload = res.data?.data ?? res.data;
        if (!payload || payload.success === false) {
          // if backend says not found or similar, redirect to builder
          navigate("/builder");
          return;
        }

        setPortfolio(payload);
      } catch (err) {
        // 404 → no portfolio, go to builder
        if (err.response?.status === 404) {
          navigate("/builder");
          return;
        }
        console.error("Fetch portfolio error:", err);
        setError(err.response?.data?.message || err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div className="p-6 text-center">Loading portfolio…</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  // normalize data (support variations: bio/about, projects array or string)
  const p = portfolio;
  const name = p.name || p.fullName || "";
  const title = p.title || p.bio || p.about || "";
  const skills = Array.isArray(p.skills)
    ? p.skills
    : typeof p.skills === "string"
    ? p.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const projects =
    Array.isArray(p.projects) && p.projects.length && typeof p.projects[0] === "object"
      ? p.projects
      : Array.isArray(p.projects)
      ? p.projects.map((t) => ({ title: t }))
      : typeof p.projects === "string"
      ? p.projects.split(",").map((t) => ({ title: t.trim() }))
      : [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Logout button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-indigo-600">{name}</h1>
        {title && <p className="text-lg text-gray-700 mb-4">{title}</p>}

        {p.about && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="text-gray-600 mt-2">{p.about}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((s, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              {projects.map((proj, i) => (
                <div key={i} className="p-4 border rounded-lg shadow-sm">
                  <h3 className="font-semibold">{proj.title}</h3>
                  {proj.description && <p className="text-gray-600 text-sm mt-1">{proj.description}</p>}
                  {proj.link && (
                    <a className="text-indigo-600 text-sm mt-2 inline-block" href={proj.link} target="_blank" rel="noreferrer">
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("/builder?edit=true")}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Edit Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
