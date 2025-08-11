import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Builder from "./pages/Builder.jsx";
import Preview from "./pages/Preview.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/Landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
