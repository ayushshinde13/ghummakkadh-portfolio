"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Synchronously initialize state if in browser
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = (localStorage.getItem("ghumakkadh_theme") ||
          localStorage.getItem("admin_theme")) as ThemeMode | null;
        if (saved === "light" || saved === "dark") {
          return saved;
        }
      } catch (e) {}
    }
    return "dark";
  });

  const [mounted, setMounted] = useState(false);

  // Helper to apply classes and color-scheme to document.documentElement
  const applyTheme = useCallback((t: ThemeMode) => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    if (t === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  }, []);

  // On client mount: sync with localStorage and apply classes
  useEffect(() => {
    try {
      const savedTheme = (localStorage.getItem("ghumakkadh_theme") ||
        localStorage.getItem("admin_theme")) as ThemeMode | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        setThemeState("dark");
        applyTheme("dark");
      }
    } catch (e) {
      console.warn("Could not read theme from localStorage", e);
    }
    setMounted(true);
  }, [applyTheme]);

  // Explicit user action to change theme
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem("ghumakkadh_theme", newTheme);
      localStorage.setItem("admin_theme", newTheme);
    } catch (e) {
      console.warn("Could not save theme to localStorage", e);
    }
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);

