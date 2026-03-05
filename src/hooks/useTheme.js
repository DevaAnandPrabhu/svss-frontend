import { useState, useEffect, createContext, useContext } from "react";

export const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeProvider() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("svss-theme") || "dark";
  });

  useEffect(() => {
    // Apply theme class to <html> element
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("svss-theme", theme);
  }, [theme]);

  const toggleTheme = (newTheme) => setTheme(newTheme);

  return { theme, toggleTheme };
}