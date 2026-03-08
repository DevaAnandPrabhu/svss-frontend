import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeContext, useThemeProvider } from "./hooks/useTheme";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Appointments from "./pages/Appointments";
import Services from "./pages/Services";
import Reports from "./pages/Reports";
import ToastContainer from "./components/ToastContainer";
import { useToast } from "./hooks/useToast";
import "./styles/global.css";

export default function App() {
  const { toasts, showToast } = useToast();
  const themeValue = useThemeProvider();

  // ── Load user from localStorage on first render ──────────────────────
  // This is the KEY fix: useState lazy initializer reads localStorage
  // so on refresh, if user was logged in, they stay logged in
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("svss-user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // ── Login: save user to localStorage ─────────────────────────────────
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("svss-user", JSON.stringify(userData));
  };

  // ── Logout: remove user from localStorage ────────────────────────────
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("svss-user");
    localStorage.removeItem("svss-token");
  };

  return (
    <ThemeContext.Provider value={themeValue}>

      {/* Not logged in → show Login */}
      {!user && (
        <>
          <Login onLogin={handleLogin} />
          <ToastContainer toasts={toasts} />
        </>
      )}

      {/* Logged in → show full app */}
      {user && (
        <Router>
          <div className="app-shell">
            <Sidebar user={user} onLogout={handleLogout} />
            <main className="main-content">
              <Topbar user={user} onLogout={handleLogout} />
              <Routes>
                <Route path="/"             element={<Dashboard />} />
                <Route path="/vehicles"     element={<Vehicles    showToast={showToast} />} />
                <Route path="/appointments" element={<Appointments showToast={showToast} />} />
                <Route path="/services"     element={<Services />} />
                <Route path="/reports"      element={<Reports />} />
                <Route path="*"             element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
          <ToastContainer toasts={toasts} />
        </Router>
      )}

    </ThemeContext.Provider>
  );
}