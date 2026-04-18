// Theme Provider - React Context for theme switching

import React, { createContext, useContext, useMemo } from "react";
import { useThemeStore } from "../store/themeStore";
import { LIGHT_TOKENS, DARK_TOKENS } from "../tokens";
import { Theme, ThemeMode } from "../types/theme";

// Theme Context
export const ThemeContext = createContext<Theme | null>(null);

// Theme Provider Props
interface ThemeProviderProps {
  children: React.ReactNode;
}

// Theme Provider Component
export function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = useThemeStore(state => state.mode);

  const theme = useMemo<Theme>(() => {
    const tokens = mode === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    return {
      mode: mode as ThemeMode,
      tokens,
    };
  }, [mode]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

// Hook to use theme
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
