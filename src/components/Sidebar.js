import React from "react";
import { NavLink } from "react-router-dom";
import { APPOINTMENTS, VEHICLES } from "../data/mockData";

const NAV_ITEMS = [
  { path: "/",             icon: "⬛", label: "Dashboard"    },
  { path: "/vehicles",     icon: "🚗", label: "Vehicles",     badge: VEHICLES.length },
  { path: "/appointments", icon: "📅", label: "Appointments", badge: APPOINTMENTS.filter((a) => a.status === "pending").length },
  { path: "/services",     icon: "🔧", label: "Services"     },
  { path: "/reports",      icon: "📊", label: "Reports"      },
];

const ROLE_ICONS = {
  Admin:      "👑",
  Technician: "🔧",
  Reception:  "📋",
};

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🚘</div>
        <div>
          <div className="logo-text">SVSS</div>
          <div className="logo-sub">Vehicle Services</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-section">
        <div className="nav-label">Main Menu</div>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div style={{ padding: "0 12px 12px" }}>
        <button
          className="nav-item"
          onClick={onLogout}
          style={{ color: "var(--red)", width: "100%" }}
        >
          <span className="nav-icon">🚪</span>
          Logout
        </button>
      </div>

      {/* User Footer */}
      <div className="sidebar-footer">
        <div className="avatar" style={{ fontSize: 16 }}>
          {ROLE_ICONS[user?.role] || "👤"}
        </div>
        <div>
          <div className="user-name">{user?.role || "User"}</div>
          <div className="user-role" style={{ fontSize: 10 }}>{user?.email}</div>
        </div>
      </div>
    </aside>
  );
}