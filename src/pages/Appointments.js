import React, { useState } from "react";
import { APPOINTMENTS, VEHICLES, SERVICES, TECHNICIANS } from "../data/mockData";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";

const FILTERS = ["all", "pending", "active", "completed", "cancelled"];

const EMPTY_FORM = {
  vehicleId:  "1",
  service:    "Oil Change",
  date:       "",
  time:       "09:00",
  technician: "",
  notes:      "",
  cost:       "",
};

export default function Appointments({ showToast }) {
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [filter,       setFilter]       = useState("all");
  const [showModal,    setShowModal]    = useState(false);
  const [form,         setForm]         = useState(EMPTY_FORM);

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  const countOf = (s) =>
    s === "all" ? appointments.length : appointments.filter((a) => a.status === s).length;

  const handleAdd = () => {
    if (!form.date || !form.technician) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    const vehicle = VEHICLES.find((v) => v.id === parseInt(form.vehicleId));
    const svc     = SERVICES.find((s) => s.name === form.service);
    const newA = {
      ...form,
      id:         Date.now(),
      vehicleId:  parseInt(form.vehicleId),
      vehicle:    vehicle?.name  || "",
      plate:      vehicle?.plate || "",
      status:     "pending",
      cost:       parseInt(form.cost) || svc?.price || 0,
    };
    setAppointments((prev) => [...prev, newA]);
    setShowModal(false);
    setForm(EMPTY_FORM);
    showToast("Appointment booked!");
  };

  const updateStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    showToast(`Status updated to ${status}`);
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>APPOINTMENTS</h1>
          <p>Manage service appointments and track jobs</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + New Appointment
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span style={{ opacity: 0.7 }}> ({countOf(f)})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Date & Time</th>
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
                  <div style={{ fontWeight: 600 }}>{a.vehicle}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>{a.plate}</div>
                </td>
                <td>{a.service}</td>
                <td>
                  <div style={{ fontSize: 13 }}>{a.date}</div>
                  <div style={{ color: "var(--muted)", fontSize: 12 }}>{a.time}</div>
                </td>
                <td>{a.technician}</td>
                <td className="mono" style={{ color: "var(--green)" }}>
                  ₹{a.cost.toLocaleString()}
                </td>
                <td><StatusBadge status={a.status} /></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    {a.status === "pending" && (
                      <button className="btn btn-sm btn-success" onClick={() => updateStatus(a.id, "active")}>
                        ▶ Start
                      </button>
                    )}
                    {a.status === "active" && (
                      <button className="btn btn-sm btn-primary" onClick={() => updateStatus(a.id, "completed")}>
                        ✓ Done
                      </button>
                    )}
                    {(a.status === "pending" || a.status === "active") && (
                      <button className="btn btn-sm btn-danger" onClick={() => updateStatus(a.id, "cancelled")}>
                        ✕
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <p>No appointments found</p>
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {showModal && (
        <Modal
          title="NEW APPOINTMENT"
          onClose={() => setShowModal(false)}
          actions={
            <>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Book Appointment</button>
            </>
          }
        >
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Vehicle</label>
              <select
                className="form-select"
                value={form.vehicleId}
                onChange={(e) => setForm((p) => ({ ...p, vehicleId: e.target.value }))}
              >
                {VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>{v.name} — {v.plate}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Service Type</label>
              <select
                className="form-select"
                value={form.service}
                onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
              >
                {SERVICES.map((s) => (
                  <option key={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date *</label>
              <input
                className="form-input"
                type="date"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                className="form-input"
                type="time"
                value={form.time}
                onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Technician *</label>
              <select
                className="form-select"
                value={form.technician}
                onChange={(e) => setForm((p) => ({ ...p, technician: e.target.value }))}
              >
                <option value="">Select technician</option>
                {TECHNICIANS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Cost (₹)</label>
              <input
                className="form-input"
                type="number"
                placeholder="Auto-filled from service"
                value={form.cost}
                onChange={(e) => setForm((p) => ({ ...p, cost: e.target.value }))}
              />
            </div>

            <div className="form-group full">
              <label className="form-label">Notes</label>
              <textarea
                className="form-textarea"
                placeholder="Additional notes or customer requests…"
                value={form.notes}
                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
