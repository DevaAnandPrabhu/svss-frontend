import React, { useState } from "react";
import { APPOINTMENTS, VEHICLES, SERVICES } from "../data/mockData";

const APPT_KEY = "svss-appointments";

function loadAppointments() {
  try {
    const saved = localStorage.getItem(APPT_KEY);
    return saved ? JSON.parse(saved) : APPOINTMENTS;
  } catch {
    return APPOINTMENTS;
  }
}

function saveAppointments(data) {
  localStorage.setItem(APPT_KEY, JSON.stringify(data));
}

const TECHNICIANS = ["Murugan K.", "Selvam R.", "Vijay P.", "Rajan M.", "Kumar S.", "Anbu T."];
const TABS = ["all", "pending", "active", "completed", "cancelled"];

export default function Appointments({ showToast }) {
  const [appointments, setAppointments] = useState(loadAppointments);
  const [activeTab,    setActiveTab]    = useState("all");
  const [showModal,    setShowModal]    = useState(false);
  const [form, setForm] = useState({
    vehicleId: "", service: "", date: "", time: "09:00 AM",
    technician: TECHNICIANS[0], cost: "", notes: "",
  });

  // ── Helpers ──────────────────────────────────────────────────────────
  const updateAppointments = (updated) => {
    setAppointments(updated);
    saveAppointments(updated);   // ← persist every change
  };

  const filtered = appointments.filter(
    (a) => activeTab === "all" || a.status === activeTab
  );

  // Load vehicles from localStorage too (in case user added new ones)
  const vehicles = (() => {
    try {
      const saved = localStorage.getItem("svss-vehicles");
      return saved ? JSON.parse(saved) : VEHICLES;
    } catch { return VEHICLES; }
  })();

  // ── Update status ─────────────────────────────────────────────────────
  const updateStatus = (id, status) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status } : a
    );
    updateAppointments(updated);
    showToast(`Status updated to ${status}`);
  };

  // ── Book appointment ──────────────────────────────────────────────────
  const handleBook = () => {
    if (!form.vehicleId || !form.service || !form.date) {
      showToast("Vehicle, service and date are required.", "error");
      return;
    }
    const vehicle = vehicles.find((v) => v.id === parseInt(form.vehicleId));
    const newAppt = {
      ...form,
      id:         Date.now(),
      vehicleId:  parseInt(form.vehicleId),
      vehicle:    vehicle?.name || "Unknown",
      plate:      vehicle?.plate || "",
      cost:       parseFloat(form.cost) || 0,
      status:     "pending",
    };
    const updated = [...appointments, newAppt];
    updateAppointments(updated);
    setShowModal(false);
    setForm({ vehicleId: "", service: "", date: "", time: "09:00 AM", technician: TECHNICIANS[0], cost: "", notes: "" });
    showToast("Appointment booked successfully!");
  };

  // ── Delete appointment ────────────────────────────────────────────────
  const handleDelete = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    updateAppointments(updated);
    showToast("Appointment removed.");
  };

  // ── Status badge color ────────────────────────────────────────────────
  const badgeClass = (s) => ({
    pending: "badge-pending", active: "badge-active",
    completed: "badge-completed", cancelled: "badge-cancelled",
  }[s] || "badge-pending");

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>Appointments</h1>
          <p>Manage all service appointments</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Book Appointment
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`btn btn-sm ${activeTab === tab ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setActiveTab(tab)}
            style={{ textTransform: "capitalize" }}
          >
            {tab} ({tab === "all"
              ? appointments.length
              : appointments.filter((a) => a.status === tab).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-header">
          <h3>
            {activeTab === "all" ? "All Appointments" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Appointments`}
          </h3>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>{filtered.length} records</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <p>No appointments found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Date</th>
                <th>Technician</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{a.vehicle || a.vehicle_name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace" }}>{a.plate}</div>
                  </td>
                  <td>{a.service}</td>
                  <td>
                    <div>{a.date}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.time}</div>
                  </td>
                  <td>{a.technician}</td>
                  <td style={{ fontFamily: "monospace" }}>₹{Number(a.cost).toLocaleString()}</td>
                  <td><span className={`badge ${badgeClass(a.status)}`}>{a.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {a.status === "pending" && (
                        <button className="btn btn-success btn-sm" onClick={() => updateStatus(a.id, "active")}>
                          ▶ Start
                        </button>
                      )}
                      {a.status === "active" && (
                        <button className="btn btn-success btn-sm" onClick={() => updateStatus(a.id, "completed")}>
                          ✓ Done
                        </button>
                      )}
                      {(a.status === "pending" || a.status === "active") && (
                        <button className="btn btn-danger btn-sm" onClick={() => updateStatus(a.id, "cancelled")}>
                          ✕ Cancel
                        </button>
                      )}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Book Appointment Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Book Appointment</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="form-grid">
              {/* Vehicle */}
              <div className="form-group">
                <label className="form-label">Vehicle *</label>
                <select
                  className="form-select"
                  value={form.vehicleId}
                  onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
                >
                  <option value="">Select vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>{v.name} — {v.plate}</option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div className="form-group">
                <label className="form-label">Service *</label>
                <select
                  className="form-select"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="">Select service</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} — ₹{s.price}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  className="form-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>

              {/* Time */}
              <div className="form-group">
                <label className="form-label">Time</label>
                <input
                  className="form-input"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>

              {/* Technician */}
              <div className="form-group">
                <label className="form-label">Technician</label>
                <select
                  className="form-select"
                  value={form.technician}
                  onChange={(e) => setForm({ ...form, technician: e.target.value })}
                >
                  {TECHNICIANS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              {/* Cost */}
              <div className="form-group">
                <label className="form-label">Cost (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="0"
                  value={form.cost}
                  onChange={(e) => setForm({ ...form, cost: e.target.value })}
                />
              </div>

              {/* Notes */}
              <div className="form-group full">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  placeholder="Any special instructions…"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleBook}>Book Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}