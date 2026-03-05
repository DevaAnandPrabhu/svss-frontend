import React from "react";
import { SERVICES } from "../data/mockData";

const CATEGORY_ICONS = {
  "Maintenance":  "🔩",
  "Repair":       "🔧",
  "Major Repair": "⚙️",
  "Inspection":   "🔍",
};

export default function Services() {
  // Group by category
  const byCategory = SERVICES.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>SERVICES</h1>
          <p>Full service catalog with pricing and durations</p>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)" }}>
          {SERVICES.length} services available
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 32 }}>
        {Object.entries(byCategory).map(([cat, items]) => (
          <div key={cat} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 18, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{CATEGORY_ICONS[cat] || "🔧"}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--accent)" }}>{items.length}</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, textTransform: "uppercase", letterSpacing: 1 }}>{cat}</div>
          </div>
        ))}
      </div>

      {/* Service List by Category */}
      {Object.entries(byCategory).map(([cat, services]) => (
        <div key={cat} style={{ marginBottom: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 20 }}>{CATEGORY_ICONS[cat] || "🔧"}</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--accent)", letterSpacing: 1 }}>
              {cat.toUpperCase()}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 14 }}>
            {services.map((s) => (
              <div key={s.id} className="vehicle-card">
                <div style={{ fontSize: 28, marginBottom: 12 }}>{CATEGORY_ICONS[cat] || "🔧"}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: 0.5, marginBottom: 6 }}>
                  {s.name}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 14 }}>
                  ⏱ Est. duration: {s.duration}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--green)" }}>
                  ₹{s.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
