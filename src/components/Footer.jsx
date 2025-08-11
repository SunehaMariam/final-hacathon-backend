import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center mt-10">
      <p>© {new Date().getFullYear()} PortfolioBuilder. All rights reserved.</p>
    </footer>
  );
}
