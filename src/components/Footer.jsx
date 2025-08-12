import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-gray-300 py-4 text-center shadow-inner">
      <p className="text-sm">
        © {new Date().getFullYear()} PortfolioBuilder. All rights reserved.
      </p>
    </footer>
  );
}
