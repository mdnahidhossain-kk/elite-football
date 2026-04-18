// Design tokens for Elite Football app
// All values are consistent and theme-aware

import {
  ColorPalette,
  SpacingScale,
  TypographyScale,
  ShadowScale,
  BorderRadiiScale,
  DesignTokens,
} from "./types/theme";

// Color Palettes
export const LIGHT_COLORS: ColorPalette = {
  primary: "#0052FF",
  secondary: "#5A67D8",
  accent: "#FFD700",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  surface: "#FFFFFF",
  background: "#F9FAFB",
  surfaceHover: "#F3F4F6",
  surfacePressed: "#E5E7EB",
  text: "#111827",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  border: "#E5E7EB",
  borderHover: "#D1D5DB",
  focus: "#0052FF",
  disabled: "#D1D5DB",
  overlay: "rgba(0, 0, 0, 0.5)",
  skeleton: "#F0F0F0",
};

export const DARK_COLORS: ColorPalette = {
  primary: "#4A9EFF",
  secondary: "#8B9EFF",
  accent: "#FFD700",
  success: "#34D399",
  warning: "#FBBF24",
  error: "#F87171",
  surface: "#1F2937",
  background: "#111827",
  surfaceHover: "#374151",
  surfacePressed: "#4B5563",
  text: "#F9FAFB",
  textSecondary: "#D1D5DB",
  textTertiary: "#9CA3AF",
  border: "#374151",
  borderHover: "#4B5563",
  focus: "#4A9EFF",
  disabled: "#6B7280",
  overlay: "rgba(0, 0, 0, 0.8)",
  skeleton: "#2D3748",
};

// Spacing Scale (4px base unit)
export const SPACING: SpacingScale = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

// Typography Scale
export const TYPOGRAPHY: TypographyScale = {
  h1: { fontSize: 32, lineHeight: 40, fontWeight: "bold" },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: "bold" },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: "semibold" },
  h4: { fontSize: 16, lineHeight: 24, fontWeight: "semibold" },
  body: { fontSize: 16, lineHeight: 24, fontWeight: "regular" },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: "regular" },
  label: { fontSize: 14, lineHeight: 20, fontWeight: "semibold" },
  labelSmall: { fontSize: 12, lineHeight: 16, fontWeight: "semibold" },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: "regular" },
};

// Shadow Scale
export const SHADOWS: ShadowScale = {
  sm: { offset: { width: 0, height: 1 }, opacity: 0.1, radius: 2, elevation: 2 },
  md: { offset: { width: 0, height: 4 }, opacity: 0.15, radius: 8, elevation: 4 },
  lg: { offset: { width: 0, height: 12 }, opacity: 0.2, radius: 16, elevation: 8 },
  xl: { offset: { width: 0, height: 20 }, opacity: 0.25, radius: 24, elevation: 12 },
};

// Border Radii Scale
export const RADII: BorderRadiiScale = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Light Theme Tokens
export const LIGHT_TOKENS: DesignTokens = {
  colors: LIGHT_COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  shadows: SHADOWS,
  radii: RADII,
};

// Dark Theme Tokens
export const DARK_TOKENS: DesignTokens = {
  colors: DARK_COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  shadows: SHADOWS,
  radii: RADII,
};
