// Theme-related TypeScript types

export type ThemeMode = "light" | "dark";

// Color Palette - semantic color tokens
export interface ColorPalette {
  // Primary brand colors
  primary: string;
  secondary: string;
  accent: string;

  // Status colors
  success: string;
  warning: string;
  error: string;

  // Surface colors
  surface: string;
  background: string;
  surfaceHover: string;
  surfacePressed: string;

  // Text colors (contrast tiers)
  text: string;
  textSecondary: string;
  textTertiary: string;

  // Interactive state colors
  border: string;
  borderHover: string;
  focus: string;
  disabled: string;

  // Specialized
  overlay: string;
  skeleton: string;
}

// Spacing Scale
export interface SpacingScale {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

// Typography Variant
export interface TypographyVariant {
  fontSize: number;
  lineHeight: number;
  fontWeight: "regular" | "medium" | "semibold" | "bold";
  letterSpacing?: number;
}

// Typography Scale
export interface TypographyScale {
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;
  body: TypographyVariant;
  bodySmall: TypographyVariant;
  label: TypographyVariant;
  labelSmall: TypographyVariant;
  caption: TypographyVariant;
}

// Shadow Variant
export interface ShadowVariant {
  offset: { width: number; height: number };
  opacity: number;
  radius: number;
  elevation?: number;
}

// Shadow Scale
export interface ShadowScale {
  sm: ShadowVariant;
  md: ShadowVariant;
  lg: ShadowVariant;
  xl: ShadowVariant;
}

// Border Radii Scale
export interface BorderRadiiScale {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

// Design Tokens - bundle of all token categories
export interface DesignTokens {
  colors: ColorPalette;
  spacing: SpacingScale;
  typography: TypographyScale;
  shadows: ShadowScale;
  radii: BorderRadiiScale;
}

// Theme - complete theme definition
export interface Theme {
  mode: ThemeMode;
  tokens: DesignTokens;
}

// Theme Store State
export interface ThemeStoreState {
  mode: ThemeMode;
  modeOverride: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  resetToSystemPreference: () => void;
}
