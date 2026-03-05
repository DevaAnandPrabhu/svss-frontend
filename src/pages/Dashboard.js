import React from "react";
import { APPOINTMENTS, VEHICLES } from "../data/mockData";
import StatCard from "../components/StatCard";
import MiniChart from "../components/MiniChart";
import StatusBadge from "../components/StatusBadge";

const CHART_DATA = [12, 19, 15, 24, 18, 30, 22, 27, 33, 28, 35, 40];
const CHART_MONTHS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];

const STATUS_OVERVIEW = [
  { label: "Pending",   color: "var(--accent)", filter: "pending"   },
  { label: "Active",    color: "var(--blue)",   filter: "active"    },
  { label: "Completed", color: "var(--green)",  filter: "completed" },
  { label: "Cancelled", color: "var(--red)",    filter: "cancelled" },
];

export default function Dashboard() {
  const pending   = APPOINTMENTS.filter((a) => a.status === "pending").length;
  const active    = APPOINTMENTS.filter((a) => a.status === "active").length;
  const revenue   = APPOINTMENTS.filter((a) => a.status === "completed").reduce((s, a) => s + a.cost, 0);

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>DASHBOARD</h1>
          <p>Welcome back, Admin — here's what's happening today</p>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)" }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <StatCard label="Total Vehicles"  value={VEHICLES.length}                          change={12}  icon="🚗" color="var(--text)"  />
        <StatCard label="Pending Jobs"    value={pending}                                  change={-5}  icon="⏳" color="var(--accent)"/>
        <StatCard label="Active Service"  value={active}                                   change={8}   icon="🔧" color="var(--blue)"  />
        <StatCard label="Revenue (₹)"     value={`${(revenue / 1000).toFixed(1)}K`}        change={18}  icon="💰" color="var(--green)" />
      </div>

      {/* Chart + Recent Appointments */}
      <div className="two-col">
        <div className="table-card">
          <div className="table-header">
            <h3>Revenue Trend</h3>
            <span className="text-muted">Last 12 months</span>
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <MiniChart data={CHART_DATA} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--muted)" }}>
              {CHART_MONTHS.map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>

        <div className="table-card">
          <div className="table-header"><h3>Recent Appointments</h3></div>
          <table>
            <tbody>
              {APPOINTMENTS.slice(0, 4).map((a) => (
                <tr key={a.id}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{a.vehicle}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12 }}>{a.service}</div>
                  </td>
                  <td><StatusBadge status={a.status} /></td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green)" }}>
                    ₹{a.cost.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Overview */}
      <div className="mt-6 table-card">
        <div className="table-header"><h3>Service Status Overview</h3></div>
        <div style={{ padding: "20px 22px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {STATUS_OVERVIEW.map((item) => (
            <div key={item.label} style={{ textAlign: "center", padding: 16, background: "var(--surface2)", borderRadius: 10 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, color: item.color }}>
                {APPOINTMENTS.filter((a) => a.status === item.filter).length}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
