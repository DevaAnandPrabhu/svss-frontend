import React, { useState } from "react";
import { VEHICLES } from "../data/mockData";

const STORAGE_KEY = "svss-vehicles";

// ── Load from localStorage or fall back to mockData ──────────────────────
function loadVehicles() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : VEHICLES;
  } catch {
    return VEHICLES;
  }
}

// ── Save to localStorage ──────────────────────────────────────────────────
function saveVehicles(vehicles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
}

const VEHICLE_TYPES = ["Sedan", "SUV", "Hatchback", "Motorcycle", "EV SUV", "Truck", "Van"];
const ICONS = { Sedan: "🚗", SUV: "🚙", Hatchback: "🚘", Motorcycle: "🏍️", "EV SUV": "⚡", Truck: "🚛", Van: "🚐" };

export default function Vehicles({ showToast }) {
  const [vehicles, setVehicles]   = useState(loadVehicles);
  const [search,   setSearch]     = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "", plate: "", type: "Sedan", year: "",
    color: "", owner: "", ownerPhone: "", mileage: "",
  });

  // ── Helpers ──────────────────────────────────────────────────────────
  const updateVehicles = (updated) => {
    setVehicles(updated);
    saveVehicles(updated);   // ← persist every change
  };

  const filtered = vehicles.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.plate.toLowerCase().includes(search.toLowerCase()) ||
    v.owner.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.plate || !form.owner) {
      showToast("Name, plate and owner are required.", "error");
      return;
    }
    const newVehicle = {
      ...form,
      id:     Date.now(),
      status: "active",
      icon:   ICONS[form.type] || "🚗",
      mileage: parseInt(form.mileage) || 0,
      year:    parseInt(form.year) || new Date().getFullYear(),
    };
    const updated = [...vehicles, newVehicle];
    updateVehicles(updated);
    setShowModal(false);
    setForm({ name: "", plate: "", type: "Sedan", year: "", color: "", owner: "", ownerPhone: "", mileage: "" });
    showToast("Vehicle added successfully!");
  };

  const handleDelete = (id) => {
    const updated = vehicles.filter((v) => v.id !== id);
    updateVehicles(updated);
    showToast("Vehicle removed.");
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>Vehicles</h1>
          <p>Manage all registered vehicles</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Vehicle
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          className="form-input"
          placeholder="🔍  Search by name, plate or owner…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 340 }}
        />
      </div>

      {/* Vehicle Cards */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🚗</div>
          <p>No vehicles found</p>
        </div>
      ) : (
        <div className="card-grid">
          {filtered.map((v) => (
            <div key={v.id} className="vehicle-card">
              <div className="vehicle-card-icon">{v.icon || "🚗"}</div>
              <div className="vehicle-card-name">{v.name}</div>
              <div className="vehicle-card-plate">{v.plate}</div>
              <div className="vehicle-card-detail">👤 {v.owner}</div>
              <div className="vehicle-card-detail">📅 {v.year} &nbsp;|&nbsp; 🎨 {v.color}</div>
              <div className="vehicle-card-detail">🏁 {v.mileage?.toLocaleString()} km</div>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <span className={`badge badge-${v.status}`}>{v.status}</span>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ marginLeft: "auto" }}
                  onClick={() => handleDelete(v.id)}
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add New Vehicle</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="form-grid">
              {[
                { label: "Vehicle Name *", key: "name",       placeholder: "e.g. Toyota Camry" },
                { label: "Plate Number *", key: "plate",      placeholder: "e.g. TN-01-AB-1234" },
                { label: "Owner Name *",   key: "owner",      placeholder: "Full name" },
                { label: "Phone",          key: "ownerPhone", placeholder: "+91 98765 43210" },
                { label: "Year",           key: "year",       placeholder: "2023" },
                { label: "Color",          key: "color",      placeholder: "Silver" },
                { label: "Mileage (km)",   key: "mileage",    placeholder: "0" },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input
                    className="form-input"
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}

              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  {VEHICLE_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Add Vehicle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}