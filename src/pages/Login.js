import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

  .login-root {
    min-height: 100vh;
    display: flex;
    background: #0a0c10;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    position: relative;
  }

  /* ── ANIMATED BACKGROUND ── */
  .login-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }
  .login-bg::before {
    content: '';
    position: absolute;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%);
    top: -200px; left: -200px;
    animation: pulse1 8s ease-in-out infinite;
  }
  .login-bg::after {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,93,4,0.10) 0%, transparent 70%);
    bottom: -100px; right: -100px;
    animation: pulse2 10s ease-in-out infinite;
  }
  .login-bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* ── LEFT PANEL ── */
  .login-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 80px;
    position: relative;
    z-index: 1;
  }
  .login-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 60px;
    animation: fadeSlideUp 0.6s ease both;
  }
  .login-brand-icon {
    width: 48px; height: 48px;
    background: linear-gradient(135deg, #f5a623, #e85d04);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    box-shadow: 0 0 30px rgba(245,166,35,0.4);
  }
  .login-brand-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 3px;
    color: #e8eaf0;
  }
  .login-brand-sub {
    font-size: 11px;
    color: #6b7280;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: -2px;
  }

  .login-headline {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 72px;
    line-height: 0.9;
    letter-spacing: 2px;
    color: #e8eaf0;
    margin-bottom: 20px;
    animation: fadeSlideUp 0.6s 0.1s ease both;
  }
  .login-headline span {
    color: #f5a623;
    display: block;
  }

  .login-desc {
    font-size: 16px;
    color: #6b7280;
    line-height: 1.7;
    max-width: 380px;
    margin-bottom: 48px;
    animation: fadeSlideUp 0.6s 0.2s ease both;
  }

  .login-features {
    display: flex;
    flex-direction: column;
    gap: 14px;
    animation: fadeSlideUp 0.6s 0.3s ease both;
  }
  .login-feature {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    transition: border-color 0.2s;
  }
  .login-feature:hover { border-color: rgba(245,166,35,0.3); }
  .login-feature-icon {
    width: 36px; height: 36px;
    background: rgba(245,166,35,0.1);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .login-feature-text { font-size: 13px; color: #9ca3af; }
  .login-feature-title { font-size: 14px; font-weight: 600; color: #e8eaf0; margin-bottom: 2px; }

  /* ── RIGHT PANEL (FORM) ── */
  .login-right {
    width: 480px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
    z-index: 1;
  }

  .login-card {
    width: 100%;
    background: #111318;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 44px;
    box-shadow:
      0 0 0 1px rgba(245,166,35,0.05),
      0 40px 80px rgba(0,0,0,0.6),
      0 0 60px rgba(245,166,35,0.04);
    animation: fadeSlideUp 0.7s 0.15s ease both;
    position: relative;
    overflow: hidden;
  }
  .login-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #f5a623, #e85d04, transparent);
  }

  .login-card-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px;
    letter-spacing: 2px;
    color: #e8eaf0;
    margin-bottom: 6px;
  }
  .login-card-sub {
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 36px;
  }

  /* ROLE SELECTOR */
  .role-selector {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 28px;
  }
  .role-btn {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.07);
    background: #181c24;
    color: #6b7280;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .role-btn .role-icon { font-size: 20px; }
  .role-btn:hover { border-color: rgba(245,166,35,0.3); color: #e8eaf0; }
  .role-btn.selected {
    border-color: #f5a623;
    background: rgba(245,166,35,0.08);
    color: #f5a623;
  }

  /* FORM FIELDS */
  .lf-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 18px;
  }
  .lf-label {
    font-size: 11px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }
  .lf-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .lf-input-icon {
    position: absolute;
    left: 14px;
    font-size: 15px;
    pointer-events: none;
    z-index: 1;
  }
  .lf-input {
    width: 100%;
    background: #181c24;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 12px 14px 12px 42px;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .lf-input:focus {
    border-color: #f5a623;
    box-shadow: 0 0 0 3px rgba(245,166,35,0.08);
  }
  .lf-input::placeholder { color: #374151; }
  .lf-input.error { border-color: #ef4444; }

  .lf-toggle-pw {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    transition: color 0.15s;
  }
  .lf-toggle-pw:hover { color: #e8eaf0; }

  /* OPTIONS ROW */
  .lf-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }
  .lf-remember {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #6b7280;
    cursor: pointer;
    user-select: none;
  }
  .lf-remember input[type="checkbox"] {
    accent-color: #f5a623;
    width: 15px; height: 15px;
    cursor: pointer;
  }
  .lf-forgot {
    font-size: 13px;
    color: #f5a623;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
    transition: opacity 0.15s;
  }
  .lf-forgot:hover { opacity: 0.7; }

  /* SUBMIT BUTTON */
  .lf-submit {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #f5a623, #e85d04);
    border: none;
    border-radius: 12px;
    color: #000;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .lf-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(245,166,35,0.4);
  }
  .lf-submit:active { transform: translateY(0); }
  .lf-submit.loading { opacity: 0.7; cursor: not-allowed; transform: none; }

  .lf-submit-shine {
    position: absolute;
    top: -50%;
    left: -75%;
    width: 50%;
    height: 200%;
    background: rgba(255,255,255,0.15);
    transform: skewX(-20deg);
    transition: left 0.5s ease;
  }
  .lf-submit:hover .lf-submit-shine { left: 125%; }

  /* ERROR MESSAGE */
  .lf-error-msg {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: #ef4444;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* DEMO HINT */
  .lf-demo {
    background: rgba(245,166,35,0.06);
    border: 1px solid rgba(245,166,35,0.15);
    border-radius: 10px;
    padding: 12px 16px;
    margin-top: 4px;
  }
  .lf-demo-title {
    font-size: 11px;
    color: #f5a623;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .lf-demo-row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #6b7280;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 3px;
  }
  .lf-demo-row span:last-child { color: #9ca3af; }

  /* LOADING SPINNER */
  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(0,0,0,0.3);
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    display: inline-block;
    margin-right: 8px;
    vertical-align: middle;
  }

  /* DIVIDER */
  .lf-divider {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 20px;
    font-size: 12px; color: #374151;
  }
  .lf-divider::before, .lf-divider::after {
    content: ''; flex: 1;
    height: 1px; background: rgba(255,255,255,0.07);
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse1 {
    0%,100% { transform: scale(1) translate(0,0); }
    50%     { transform: scale(1.1) translate(30px, 20px); }
  }
  @keyframes pulse2 {
    0%,100% { transform: scale(1) translate(0,0); }
    50%     { transform: scale(1.15) translate(-20px,-30px); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .login-left  { display: none; }
    .login-right { width: 100%; padding: 24px; }
  }
`;

const DEMO_CREDENTIALS = {
  Admin:      { email: "admin@svss.com",     password: "admin123"  },
  Technician: { email: "tech@svss.com",      password: "tech123"   },
  Reception:  { email: "reception@svss.com", password: "recep123"  },
};

const ROLES = [
  { key: "Admin",      icon: "👑", label: "Admin"      },
  { key: "Technician", icon: "🔧", label: "Technician" },
  { key: "Reception",  icon: "📋", label: "Reception"  },
];

const FEATURES = [
  { icon: "🚗", title: "Vehicle Management",    text: "Track every vehicle and owner in one place"   },
  { icon: "📅", title: "Smart Appointments",    text: "Book and manage service jobs effortlessly"    },
  { icon: "📊", title: "Real-time Reports",     text: "Revenue analytics and technician performance" },
];

export default function Login({ onLogin }) {
  const [role,       setRole]       = useState("Admin");
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [showPw,     setShowPw]     = useState(false);
  const [remember,   setRemember]   = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");

  const handleSubmit = () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const creds = DEMO_CREDENTIALS[role];
      if (email === creds.email && password === creds.password) {
        onLogin({ role, email });
      } else {
        setError("Invalid email or password. Check demo credentials below.");
        setLoading(false);
      }
    }, 1200);
  };

  const fillDemo = () => {
    const creds = DEMO_CREDENTIALS[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setError("");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        {/* Animated Background */}
        <div className="login-bg">
          <div className="login-bg-grid" />
        </div>

        {/* LEFT — Branding */}
        <div className="login-left">
          <div className="login-brand">
            <div className="login-brand-icon">🚘</div>
            <div>
              <div className="login-brand-name"> Deva SVSS</div>
              <div className="login-brand-sub">Smart Vehicle Service System</div>
            </div>
          </div>

          <div className="login-headline">
            DRIVE YOUR<span>SERVICE</span>FORWARD
          </div>

          <p className="login-desc">
            A complete platform to manage vehicles, appointments,
            technicians and revenue — all in one powerful dashboard.
          </p>

          <div className="login-features">
            {FEATURES.map((f) => (
              <div key={f.title} className="login-feature">
                <div className="login-feature-icon">{f.icon}</div>
                <div>
                  <div className="login-feature-title">{f.title}</div>
                  <div className="login-feature-text">{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Login Card */}
        <div className="login-right">
          <div className="login-card">
            <div className="login-card-title">SIGN IN</div>
            <div className="login-card-sub">Choose your role and enter credentials</div>

            {/* Role Selector */}
            <div className="role-selector">
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  className={`role-btn ${role === r.key ? "selected" : ""}`}
                  onClick={() => { setRole(r.key); setError(""); setEmail(""); setPassword(""); }}
                >
                  <span className="role-icon">{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="lf-error-msg">⚠️ {error}</div>
            )}

            {/* Email */}
            <div className="lf-group">
              <label className="lf-label">Email Address</label>
              <div className="lf-input-wrap">
                <span className="lf-input-icon">✉️</span>
                <input
                  className={`lf-input ${error ? "error" : ""}`}
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
            </div>

            {/* Password */}
            <div className="lf-group">
              <label className="lf-label">Password</label>
              <div className="lf-input-wrap">
                <span className="lf-input-icon">🔒</span>
                <input
                  className={`lf-input ${error ? "error" : ""}`}
                  type={showPw ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button className="lf-toggle-pw" onClick={() => setShowPw(!showPw)}>
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="lf-options">
              <label className="lf-remember">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <button className="lf-forgot">Forgot password?</button>
            </div>

            {/* Submit */}
            <button
              className={`lf-submit ${loading ? "loading" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              <div className="lf-submit-shine" />
              {loading ? (
                <><span className="spinner" />SIGNING IN…</>
              ) : (
                "SIGN IN →"
              )}
            </button>

            {/* Demo Credentials hint */}
            <div className="lf-divider">Demo Credentials</div>
            <div className="lf-demo">
              <div className="lf-demo-title">🔑 {role} Login — click to autofill</div>
              <div className="lf-demo-row" style={{ cursor: "pointer" }} onClick={fillDemo}>
                <span>Email:</span>
                <span>{DEMO_CREDENTIALS[role].email}</span>
              </div>
              <div className="lf-demo-row" style={{ cursor: "pointer" }} onClick={fillDemo}>
                <span>Password:</span>
                <span>{DEMO_CREDENTIALS[role].password}</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: "#4b5563", textAlign: "center" }}>
                Click any row to autofill ↑
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}