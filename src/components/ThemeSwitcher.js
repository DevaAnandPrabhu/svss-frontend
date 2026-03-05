import React from "react";
import { useTheme } from "../hooks/useTheme";

const THEMES = [
  { key: "dark",      icon: "🌙", label: "Dark"      },
  { key: "light",     icon: "☀️", label: "Light"     },
  { key: "solarized", icon: "🌊", label: "Solarized" },
];

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher" title="Switch theme">
      {THEMES.map((t) => (
        <button
          key={t.key}
          className={`theme-btn ${theme === t.key ? "active" : ""}`}
          onClick={() => toggleTheme(t.key)}
          aria-label={`Switch to ${t.label} theme`}
        >
          {t.icon}
          <span className="theme-tooltip">{t.label}</span>
        </button>
      ))}
    </div>
  );
}