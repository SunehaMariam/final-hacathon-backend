import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Builder() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    about: "",
    skills: "",
    projects: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";

  useEffect(() => {
    if (isEditMode) {
      axios
        .get("https://final-hacathon-frontend.vercel.app/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          if (res.data) {
            setFormData({
              name: res.data.name || "",
              title: res.data.title || "",
              about: res.data.bio || "", // backend expects 'bio'
              skills: Array.isArray(res.data.skills) ? res.data.skills.join(", ") : "",
              projects: Array.isArray(res.data.projects) ? res.data.projects.map(p => p.title).join(", ") : "",
            });
          }
        })
        .catch((err) => console.error(err));
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      bio: formData.about,
      skills: formData.skills.split(",").map((s) => s.trim()),
      projects: formData.projects.split(",").map((p) => ({
        title: p.trim(),
        description: "",
        link: "",
      })),
      title: formData.title,
    };

    try {
      if (isEditMode) {
        await axios.put(
          "https://final-hacathon-frontend.vercel.app/api/profile",
          payload,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        alert("Portfolio updated successfully!");
      } else {
        await axios.post(
          "https://final-hacathon-frontend.vercel.app/api/profile",
          payload,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        alert("Portfolio created successfully!");
      }
      navigate("/preview");
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <body className="bg-gradient-to-r from-indigo-50 to-pink-50 min-h-screen">
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl mt-12 border border-indigo-200">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 tracking-wide">
        {isEditMode ? "Edit Your Portfolio" : "Create Your Portfolio"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border-2 border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          required
          autoComplete="off"
        />
        <input
          type="text"
          name="title"
          placeholder="Professional Title (e.g. Web Developer)"
          value={formData.title}
          onChange={handleChange}
          className="w-full border-2 border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          required
          autoComplete="off"
        />
        <textarea
          name="about"
          placeholder="Tell us about yourself"
          value={formData.about}
          onChange={handleChange}
          className="w-full border-2 border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition resize-none"
          rows="5"
        ></textarea>
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border-2 border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          autoComplete="off"
        />
        <textarea
          name="projects"
          placeholder="Projects (comma separated)"
          value={formData.projects}
          onChange={handleChange}
          className="w-full border-2 border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition resize-none"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl py-3 shadow-lg transition-transform transform hover:scale-105 active:scale-95"
        >
          {isEditMode ? "Update Portfolio" : "Create Portfolio"}
        </button>
      </form>
    </div>
    </body>
  );
}
