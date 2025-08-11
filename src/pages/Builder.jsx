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

  // Fetch existing portfolio for edit mode
  useEffect(() => {
    if (isEditMode) {
      axios
        .get("https://heckathon-backend-3.onrender.com", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          if (res.data) {
            setFormData({
              name: res.data.name || "",
              title: res.data.title || "",
              about: res.data.about || "",
              skills: Array.isArray(res.data.skills) ? res.data.skills.join(", ") : "",
              projects: Array.isArray(res.data.projects) ? res.data.projects.join(", ") : "",
            });
          }
        })
        .catch((err) => console.error(err));
    }
  }, [isEditMode]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
  name: formData.name,
  bio: formData.about, // backend expects 'bio', not 'about'
  skills: formData.skills.split(",").map((s) => s.trim()),
  projects: formData.projects.split(",").map((p) => ({
    title: p.trim(), description: "", link: ""
  }))
};


    try {
      if (isEditMode) {
        await axios.put(
          "https://heckathon-backend-3.onrender.com/api/profile",
          payload,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        alert("Portfolio updated successfully!");
      } else {
        await axios.post(
          "https://heckathon-backend-3.onrender.com/api/profile",
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Portfolio" : "Create Portfolio"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Professional Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          name="about"
          placeholder="About You"
          value={formData.about}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows="4"
        ></textarea>
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <textarea
          name="projects"
          placeholder="Projects (comma separated)"
          value={formData.projects}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          {isEditMode ? "Update Portfolio" : "Create Portfolio"}
        </button>
      </form>
    </div>
  );
}
