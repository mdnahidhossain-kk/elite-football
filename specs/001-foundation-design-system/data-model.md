# Data Model: Phase 1 — Core Entities & Structures

**Date Generated**: 2025-04-17  
**Feature Scope**: Design system entities, theme management, navigation state  
**Status**: Ready for implementation

---

## Overview

Phase 1 establishes the data structures for:
1. **Design Tokens** — Immutable values for colors, spacing, typography, shadows, border radii
2. **Theme Management** — Light/Dark mode switching with persistence
3. **Navigation State** — App shell state (active tab, route stack per tab)
4. **Component Data** — Props and variants for atomic components

All structures are defined with TypeScript types for compile-time safety.

---

## 1. Design Token Entities

### 1.1 ColorPalette

```typescript
// src/types/theme.ts
export interface ColorPalette {
  // Semantic colors (theme-aware; map to different hex values in light vs dark)
  primary: string;        // CTA buttons, highlights, primary actions
  secondary: string;      // Secondary buttons, less prominent actions
  accent: string;         // Tertiary highlights (e.g., favorite badge)
  
  // Semantic status colors
  success: string;        // Positive states (e.g., goal scored)
  warning: string;        // Warnings (e.g., yellow card)
  error: string;          // Errors, destructive actions (e.g., red card)
  
  // Neutral colors (surface hierarchy)
  surface: string;        // Primary surfaces (cards, backgrounds)
  background: string;     // App background (behind all content)
  surfaceHover: string;   // Surface when hovered/focused
  surfacePressed: string; // Surface when pressed
  
  // Text colors (contrast tiers)
  text: string;           // Primary text; must be ≥ 4.5:1 contrast with background
  textSecondary: string;  // Secondary text (descriptive, less prominent)
  textTertiary: string;   // Tertiary text (hints, placeholders); must be ≥ 3:1 contrast
  
  // Interactive states
  border: string;         // Borders, dividers, subtle separators
  borderHover: string;    // Border when element is hovered
  focus: string;          // Focus outline color (for keyboard navigation, tab stops)
  disabled: string;       // Disabled state (text, icons)
  
  // Specialized
  overlay: string;        // Semi-transparent overlay for modals (rgba)
  skeleton: string;       // Blurhash placeholder color
}

// Example instantiation:
// Light theme
const LIGHT_PALETTE: ColorPalette = {
  primary: '#0052FF',      // Electoral blue (sports-themed)
  secondary: '#5A67D8',    // Indigo
  accent: '#FFD700',       // Gold (for favorited)
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  surface: '#FFFFFF',
  background: '#F9FAFB',
  surfaceHover: '#F3F4F6',
  surfacePressed: '#E5E7EB',
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  borderHover: '#D1D5DB',
  focus: '#0052FF',
  disabled: '#D1D5DB',
  overlay: 'rgba(0, 0, 0, 0.5)',
  skeleton: '#F0F0F0',
};

// Dark theme
const DARK_PALETTE: ColorPalette = {
  primary: '#4A9EFF',      // Lighter electoral blue
  secondary: '#8B9EFF',    // Lighter indigo
  accent: '#FFD700',       // Gold (same across themes)
  success: '#34D399',      // Lighter green
  warning: '#FBBF24',      // Lighter orange
  error: '#F87171',        // Lighter red
  surface: '#1F2937',      // Dark surface
  background: '#111827',   // Darker background
  surfaceHover: '#374151',
  surfacePressed: '#4B5563',
  text: '#F9FAFB',         // Light text
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',
  border: '#374151',
  borderHover: '#4B5563',
  focus: '#4A9EFF',
  disabled: '#6B7280',
  overlay: 'rgba(0, 0, 0, 0.8)',
  skeleton: '#2D3748',
};
```

### 1.2 SpacingScale

```typescript
// src/types/theme.ts
export interface SpacingScale {
  // 4px base unit; supports multiples (xs=4, sm=8, md=12, etc.)
  xs: number;      // 4px   — Tight spacing, micro-interactions
  sm: number;      // 8px   — Close items, nested groups
  md: number;      // 12px  — Standard spacing, most content
  lg: number;      // 16px  — Breathing room, sections
  xl: number;      // 24px  — Major sections, top-level spacing
  xxl: number;     // 32px  — Full gutters, page-level margins
  xxxl: number;    // 48px  — Rare; only for hero sections
}

const SPACING: SpacingScale = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};
```

### 1.3 TypographyScale

```typescript
// src/types/theme.ts
export interface TypographyVariant {
  fontSize: number;
  lineHeight: number;
  fontWeight: 'regular' | 'medium' | 'semibold' | 'bold';
  letterSpacing?: number;
}

export interface TypographyScale {
  // Headings (hierarchical)
  h1: TypographyVariant;   // 32px, weight 700 (bold)
  h2: TypographyVariant;   // 24px, weight 700
  h3: TypographyVariant;   // 20px, weight 600 (semibold)
  h4: TypographyVariant;   // 16px, weight 600
  
  // Body text
  body: TypographyVariant;        // 16px, weight 400 (regular) — main content
  bodySmall: TypographyVariant;   // 14px, weight 400 — secondary content
  
  // UI labels
  label: TypographyVariant;       // 14px, weight 600 — button labels, form labels
  labelSmall: TypographyVariant;  // 12px, weight 600 — tiny labels
  
  // Caption & meta
  caption: TypographyVariant;     // 12px, weight 400 — timestamps, hints, meta info
}

const TYPOGRAPHY: TypographyScale = {
  h1: { fontSize: 32, lineHeight: 40, fontWeight: 'bold' },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: 'bold' },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: 'semibold' },
  h4: { fontSize: 16, lineHeight: 24, fontWeight: 'semibold' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: 'regular' },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: 'regular' },
  label: { fontSize: 14, lineHeight: 20, fontWeight: 'semibold' },
  labelSmall: { fontSize: 12, lineHeight: 16, fontWeight: 'semibold' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: 'regular' },
};
```

### 1.4 ShadowScale

```typescript
// src/types/theme.ts
export interface ShadowVariant {
  offset: { width: number; height: number };
  opacity: number;
  radius: number;
  elevation?: number; // Android; iOS uses offset + opacity + radius
}

export interface ShadowScale {
  sm: ShadowVariant;  // Subtle elevation (buttons, raised text)
  md: ShadowVariant;  // Standard elevation (cards)
  lg: ShadowVariant;  // Strong elevation (modals, sheets)
  xl: ShadowVariant;  // Maximum elevation (toasts, popups)
}

const SHADOWS: ShadowScale = {
  sm: { offset: { width: 0, height: 1 }, opacity: 0.1, radius: 2, elevation: 2 },
  md: { offset: { width: 0, height: 4 }, opacity: 0.15, radius: 8, elevation: 4 },
  lg: { offset: { width: 0, height: 12 }, opacity: 0.2, radius: 16, elevation: 8 },
  xl: { offset: { width: 0, height: 20 }, opacity: 0.25, radius: 24, elevation: 12 },
};
```

### 1.5 BorderRadiiScale

```typescript
// src/types/theme.ts
export interface BorderRadiiScale {
  none: number;   // 0px — No rounding
  xs: number;     // 4px — Slight rounding
  sm: number;     // 8px — Subtle
  md: number;     // 12px — Standard (most components)
  lg: number;     // 16px — Prominent
  xl: number;     // 24px — Large components
  full: number;   // 9999px — Pills, circles
}

const RADII: BorderRadiiScale = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
```

---

## 2. Theme Entity

### 2.1 Theme State

```typescript
// src/types/theme.ts
export type ThemeMode = 'light' | 'dark';

export interface DesignTokens {
  colors: ColorPalette;
  spacing: SpacingScale;
  typography: TypographyScale;
  shadows: ShadowScale;
  radii: BorderRadiiScale;
}

export interface Theme {
  mode: ThemeMode;
  tokens: DesignTokens;
  // Metadata (for internal use)
  _modeOverride?: boolean;  // true = user explicitly set mode; false = system preference
}

// Example:
const LIGHT_THEME: Theme = {
  mode: 'light',
  tokens: {
    colors: LIGHT_PALETTE,
    spacing: SPACING,
    typography: TYPOGRAPHY,
    shadows: SHADOWS,
    radii: RADII,
  },
};

const DARK_THEME: Theme = {
  mode: 'dark',
  tokens: {
    colors: DARK_PALETTE,
    spacing: SPACING,
    typography: TYPOGRAPHY,
    shadows: SHADOWS,
    radii: RADII,
  },
};
```

### 2.2 Theme Store (Zustand)

```typescript
// src/store/themeStore.ts
import create from 'zustand';
import { Theme, ThemeMode } from '../types/theme';

interface ThemeStoreState {
  mode: ThemeMode;
  modeOverride: boolean;
  
  // Actions
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  resetToSystemPreference: () => void;
  hydrateFromStorage: () => Promise<void>;
  persistToStorage: () => Promise<void>;
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
  mode: 'light',      // Default; actual value loaded from AsyncStorage on app init
  modeOverride: false,
  
  setMode: (mode) => set({ mode, modeOverride: true }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  resetToSystemPreference: () => set({ modeOverride: false }),
  
  hydrateFromStorage: async () => {
    // Load theme preference from AsyncStorage (Phase 16+ persistent storage)
    // For Phase 1, this is a no-op (theme won't survive app restart)
    // Implemented in Phase 16
  },
  
  persistToStorage: async () => {
    // Save current theme preference to AsyncStorage
    // For Phase 1, this is a no-op
    // Implemented in Phase 16
  },
}));

// Selector hooks for granular subscriptions
export const useThemeMode = () => useThemeStore((state) => state.mode);
export const useThemeActions = () => ({
  setMode: useThemeStore((state) => state.setMode),
  toggleMode: useThemeStore((state) => state.toggleMode),
  resetToSystemPreference: useThemeStore((state) => state.resetToSystemPreference),
});
```

---

## 3. Navigation State Entity

### 3.1 Route Params

```typescript
// src/types/navigation.ts
export type MatchesStackParamList = {
  Matches: undefined;
  MatchDetails: { matchId: string; liveTicker?: boolean };
  PlayerStats: { matchId: string; playerId: string };
};

export type NewsStackParamList = {
  News: undefined;
  ArticleDetails: { articleId: string; source?: 'featured' | 'main' };
};

export type LeaguesStackParamList = {
  Leagues: undefined;
  LeagueDetails: { leagueId: string };
  ComponentCatalog: undefined;  // Dev tool
};

export type FavoritesStackParamList = {
  Favorites: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
};

export type RootStackParamList = {
  MatchesTab: undefined;
  NewsTab: undefined;
  LeaguesTab: undefined;
  FavoritesTab: undefined;
  SearchTab: undefined;
  Settings: undefined;
};
```

### 3.2 Navigation Stack Relationships

```typescript
// Component tree (conceptual):
/*
RootNavigator (BottomTabNavigator)
├── MatchesTab (NativeStackNavigator)
│   ├── Matches          (MatchesScreen)
│   ├── MatchDetails     (MatchDetailsScreen)
│   └── PlayerStats      (PlayerStatsScreen)
├── NewsTab (NativeStackNavigator)
│   ├── News             (NewsScreen)
│   └── ArticleDetails   (ArticleDetailsScreen)
├── LeaguesTab (NativeStackNavigator)
│   ├── Leagues          (LeaguesScreen)
│   ├── LeagueDetails    (LeagueDetailsScreen)
│   └── ComponentCatalog (ComponentCatalogScreen) — Phase 1 dev tool
├── FavoritesTab (NativeStackNavigator)
│   └── Favorites        (FavoritesScreen)
├── SearchTab (NativeStackNavigator)
│   └── Search           (SearchScreen)
└── Settings (Modal stack, from any tab)
    └── SettingsScreen
*/
```

---

## 4. Component Data Models

### 4.1 Button Props

```typescript
// src/components/atomic/Button.tsx
export interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

// Variants map to color tokens:
// primary:   background = tokens.colors.primary, text = white
// secondary: background = tokens.colors.secondary, text = white
// outline:   background = transparent, border = tokens.colors.primary, text = tokens.colors.primary
// ghost:     background = transparent, text = tokens.colors.primary
```

### 4.2 Typography Props

```typescript
// src/components/atomic/Typography.tsx
export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'label' | 'labelSmall' | 'caption';
  children: React.ReactNode;
  color?: keyof ColorPalette;  // Defaults to 'text'
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}
```

### 4.3 Card Props

```typescript
// src/components/atomic/Card.tsx
export interface CardProps {
  variant?: 'default' | 'elevated' | 'flat';
  padding?: keyof SpacingScale;  // Defaults to 'md'
  onPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

---

## 5. Validation & Constraints

### 5.1 Design Token Constraints

- **All color values** must meet WCAG AA contrast (≥ 4.5:1) when used as text on their default backgrounds
- **Spacing scale** must be multiples of 4px (4, 8, 12, 16, 24, 32, 48) for alignment consistency
- **Typography lineHeight** must be ≥ fontSize for readability
- **Border radii** must not exceed component dimensions

### 5.2 Type Safety

- All component props are strictly typed; no `any` types
- All color references must use `ColorPalette` keys; no hex strings allowed in components
- All spacing references must use `SpacingScale` keys; no magic numbers
- Navigation params fully typed via `RootStackParamList`; TypeScript prevents invalid route params

---

## 6. Data Flow Diagram

```
Theme Store (Zustand)
  ├── mode: 'light' | 'dark'
  └── modeOverride: boolean

         ↓ (useThemeStore hook)

Theme Provider (Context)
  ├── Listens to store changes
  └── Provides useTheme() hook to all descendants

         ↓ (useTheme hook)

All Components
  ├── Button.tsx        (consumes tokens.colors, tokens.spacing)
  ├── Typography.tsx    (consumes tokens.typography, tokens.colors)
  ├── Card.tsx          (consumes tokens.radii, tokens.shadows, tokens.spacing)
  ├── MatchCard.tsx     (composed from above)
  └── ... (all UI layers)

Result: Theme toggle → Store updates → Provider re-renders descendants → All components update instantly
```

---

## Summary

| Entity | Type | Location | Persistence | Purpose |
|--------|------|----------|-------------|---------|
| ColorPalette | TypeScript interface | `src/tokens.ts` | Const (hardcoded) | Define colors for light/dark themes |
| SpacingScale | TypeScript interface | `src/tokens.ts` | Const (hardcoded) | Enforce spacing consistency |
| TypographyScale | TypeScript interface | `src/tokens.ts` | Const (hardcoded) | Define font sizes, weights, line heights |
| ShadowScale | TypeScript interface | `src/tokens.ts` | Const (hardcoded) | Define elevation shadows |
| BorderRadiiScale | TypeScript interface | `src/tokens.ts` | Const (hardcoded) | Define border radius options |
| Theme | TypeScript interface | `src/types/theme.ts` | Const (currently) | Bundle tokens + mode |
| ThemeStore | Zustand store | `src/store/themeStore.ts` | Memory (Phase 16: AsyncStorage) | Persist user theme preference |
| RootStackParamList | TypeScript types | `src/types/navigation.ts` | Const (hardcoded) | Type-safe navigation routing |

All entities are ready for Phase 1 implementation. No [NEEDS CLARIFICATION] markers remain.

---

**Status**: ✅ **Data Model Complete** — Ready for task generation
