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
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "https://final-hacathon-frontend.vercel.app/api/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const payload = res.data?.data ?? res.data;
        if (!payload || payload.success === false) {
          navigate("/builder");
          return;
        }

        setPortfolio(payload);
      } catch (err) {
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600 font-semibold text-lg">
        Loading portfolio…
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 font-semibold text-lg">
        Error: {error}
      </div>
    );

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
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logout Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Logout
          </button>
        </div>

        {/* Portfolio Card */}
        <div className="bg-white rounded-3xl p-10 shadow-xl">
          <h1 className="text-4xl font-extrabold text-indigo-700">{name}</h1>
          {title && (
            <p className="text-xl text-gray-700 mt-1 mb-8 font-semibold tracking-wide">
              {title}
            </p>
          )}

          {p.about && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed">{p.about}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((proj, i) => (
                  <div
                    key={i}
                    className="p-6 border border-indigo-200 rounded-2xl shadow hover:shadow-lg transition cursor-pointer bg-white"
                  >
                    <h3 className="font-semibold text-indigo-700 text-lg">{proj.title}</h3>
                    {proj.description && (
                      <p className="text-gray-600 text-sm mt-2">{proj.description}</p>
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 flex justify-end">
            <button
              onClick={() => navigate("/builder?edit=true")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
            >
              Edit Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
