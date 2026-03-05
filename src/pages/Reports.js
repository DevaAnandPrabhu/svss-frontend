import React from "react";
import { APPOINTMENTS } from "../data/mockData";
import StatCard from "../components/StatCard";

export default function Reports() {
  const completed    = APPOINTMENTS.filter((a) => a.status === "completed");
  const totalRevenue = completed.reduce((s, a) => s + a.cost, 0);
  const totalJobs    = APPOINTMENTS.length;
  const completionRate = Math.round((completed.length / totalJobs) * 100);
  const avgJobValue  = Math.round(APPOINTMENTS.reduce((s, a) => s + a.cost, 0) / totalJobs / 100) * 100;

  // Technician stats
  const techStats = APPOINTMENTS.reduce((acc, a) => {
    if (!a.technician) return acc;
    acc[a.technician] = acc[a.technician] || { jobs: 0, revenue: 0, completed: 0 };
    acc[a.technician].jobs++;
    if (a.status === "completed") {
      acc[a.technician].revenue  += a.cost;
      acc[a.technician].completed++;
    }
    return acc;
  }, {});

  // Service stats
  const serviceStats = APPOINTMENTS.reduce((acc, a) => {
    acc[a.service] = acc[a.service] || { count: 0, revenue: 0 };
    acc[a.service].count++;
    if (a.status === "completed") acc[a.service].revenue += a.cost;
    return acc;
  }, {});

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>REPORTS</h1>
          <p>Analytics, performance insights, and revenue tracking</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <StatCard label="Total Revenue"   value={`₹${(totalRevenue / 1000).toFixed(1)}K`} icon="💰" color="var(--green)" change={22} />
        <StatCard label="Total Jobs"      value={totalJobs}                                icon="🔧" change={15} />
        <StatCard label="Completion Rate" value={`${completionRate}%`}                     icon="✅" color="var(--blue)"  change={5}  />
        <StatCard label="Avg Job Value"   value={`₹${avgJobValue.toLocaleString()}`}       icon="📊" color="var(--accent)" change={8} />
      </div>

      <div className="two-col mt-4">
        {/* Technician Performance */}
        <div className="table-card">
          <div className="table-header"><h3>Technician Performance</h3></div>
          <table>
            <thead>
              <tr>
                <th>Technician</th>
                <th>Total Jobs</th>
                <th>Completed</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(techStats)
                .sort((a, b) => b[1].revenue - a[1].revenue)
                .map(([name, stats]) => (
                  <tr key={name}>
                    <td style={{ fontWeight: 600 }}>{name}</td>
                    <td>{stats.jobs}</td>
                    <td style={{ color: "var(--green)" }}>{stats.completed}</td>
                    <td className="mono" style={{ color: "var(--green)" }}>
                      ₹{stats.revenue.toLocaleString()}
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Services */}
        <div className="table-card">
          <div className="table-header"><h3>Top Services</h3></div>
          <table>
            <thead>
              <tr><th>Service</th><th>Bookings</th><th>Revenue</th></tr>
            </thead>
            <tbody>
              {Object.entries(serviceStats)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([name, d]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{d.count}</td>
                    <td className="mono" style={{ color: "var(--green)" }}>
                      ₹{d.revenue.toLocaleString()}
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="mt-6 table-card">
        <div className="table-header"><h3>All Appointments Breakdown</h3></div>
        <table>
          <thead>
            <tr><th>ID</th><th>Vehicle</th><th>Service</th><th>Technician</th><th>Date</th><th>Cost</th><th>Status</th></tr>
          </thead>
          <tbody>
            {APPOINTMENTS.map((a) => (
              <tr key={a.id}>
                <td className="mono" style={{ color: "var(--muted)", fontSize: 11 }}>#{a.id}</td>
                <td style={{ fontWeight: 600 }}>{a.vehicle}</td>
                <td>{a.service}</td>
                <td>{a.technician}</td>
                <td style={{ color: "var(--muted)", fontSize: 12 }}>{a.date}</td>
                <td className="mono" style={{ color: "var(--green)" }}>₹{a.cost.toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${a.status}`}>
                    {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
