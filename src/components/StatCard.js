import React from "react";

export default function StatCard({ label, value, change, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color: color || "var(--text)" }}>
        {value}
      </div>
      {change !== undefined && (
        <div className={`stat-change ${change >= 0 ? "up" : "down"}`}>
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% this month
        </div>
      )}
      <div className="stat-icon">{icon}</div>
    </div>
  );
}
