import React, { useState } from "react";
import { VEHICLES, VEHICLE_TYPES, VEHICLE_ICONS } from "../data/mockData";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";

const EMPTY_FORM = {
  name: "", plate: "", type: "Sedan", year: "",
  color: "", owner: "", ownerPhone: "", mileage: "",
};

const FIELDS = [
  { label: "Vehicle Name",    key: "name",       type: "text"   },
  { label: "Number Plate",    key: "plate",      type: "text"   },
  { label: "Owner Name",      key: "owner",      type: "text"   },
  { label: "Phone Number",    key: "ownerPhone", type: "text"   },
  { label: "Year",            key: "year",       type: "number" },
  { label: "Mileage (km)",    key: "mileage",    type: "number" },
  { label: "Color",           key: "color",      type: "text"   },
];

export default function Vehicles({ showToast }) {
  const [vehicles, setVehicles]   = useState(VEHICLES);
  const [search,   setSearch]     = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM);

  const filtered = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.plate || !form.owner) {
      showToast("Please fill in required fields", "error");
      return;
    }
    const newVehicle = {
      ...form,
      id:          Date.now(),
      status:      "active",
      lastService: "N/A",
      icon:        VEHICLE_ICONS[form.type] || "🚗",
      mileage:     parseInt(form.mileage) || 0,
      year:        parseInt(form.year)    || new Date().getFullYear(),
    };
    setVehicles((prev) => [...prev, newVehicle]);
    setShowModal(false);
    setForm(EMPTY_FORM);
    showToast("Vehicle added successfully!");
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>VEHICLES</h1>
          <p>{vehicles.length} vehicles registered in the system</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Vehicle
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <div className="topbar-search" style={{ display: "inline-flex", width: 320 }}>
          <span>🔍</span>
          <input
            placeholder="Search by name, plate, or owner…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Vehicle Cards */}
      <div className="card-grid">
        {filtered.map((v) => (
          <div key={v.id} className="vehicle-card">
            <div className="vehicle-card-icon">{v.icon}</div>
            <div className="vehicle-card-name">{v.name} {v.year}</div>
            <div className="vehicle-card-plate">{v.plate}</div>
            <div style={{ marginBottom: 12 }}>
              <StatusBadge status={v.status === "service" ? "active" : v.status} />
            </div>
            <div className="vehicle-card-detail">👤 {v.owner}</div>
            <div className="vehicle-card-detail">📞 {v.ownerPhone}</div>
            <div className="vehicle-card-detail">🎨 {v.color} · {v.type}</div>
            <div className="vehicle-card-detail mono">
              📍 {v.mileage.toLocaleString()} km
            </div>
            <div className="vehicle-card-detail">
              🔧 Last service: {v.lastService}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🚗</div>
          <p>No vehicles found matching "{search}"</p>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showModal && (
        <Modal
          title="ADD VEHICLE"
          onClose={() => setShowModal(false)}
          actions={
            <>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Add Vehicle</button>
            </>
          }
        >
          <div className="form-grid">
            {FIELDS.map(({ label, key, type }) => (
              <div className="form-group" key={key}>
                <label className="form-label">{label}</label>
                <input
                  className="form-input"
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Vehicle Type</label>
              <select
                className="form-select"
                value={form.type}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
              >
                {VEHICLE_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
