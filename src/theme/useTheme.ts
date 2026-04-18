// useTheme hook - consume theme from context

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { Theme } from "../types/theme";

/**
 * Hook to access the current theme
 * @returns Theme object with mode and tokens
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Hook to get only the current theme mode
 */
export function useThemeMode() {
  const theme = useTheme();
  return theme.mode;
}

/**
 * Hook to get only the design tokens
 */
export function useTokens() {
  const theme = useTheme();
  return theme.tokens;
}
