import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

const PAGE_TITLES = {
  "/":             "Dashboard",
  "/vehicles":     "Vehicles",
  "/appointments": "Appointments",
  "/services":     "Services",
  "/reports":      "Reports",
};

export default function Topbar({ user, onLogout }) {
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");

  return (
    <div className="topbar">
      {/* Page Title */}
      <div className="topbar-title">
        {PAGE_TITLES[pathname] || "SVSS"}
      </div>

      {/* Search */}
      <div className="topbar-search">
        <span style={{ color: "var(--muted)" }}>🔍</span>
        <input
          placeholder="Quick search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Theme Switcher — 🌙 ☀️ 🌊 */}
      <ThemeSwitcher />

      {/* Date */}
      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>
        {new Date().toLocaleDateString("en-IN", {
          day: "2-digit", month: "short", year: "numeric",
        })}
      </span>
    </div>
  );
}