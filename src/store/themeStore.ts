// Zustand theme store for Elite Football app

import { create } from "zustand";
import { ThemeMode, ThemeStoreState } from "../types/theme";

export const useThemeStore = create<ThemeStoreState>(set => ({
  mode: "light" as ThemeMode,
  modeOverride: false,

  setMode: (mode: ThemeMode) => set({ mode, modeOverride: true }),

  toggleMode: () =>
    set(state => ({
      mode: state.mode === "light" ? "dark" : "light",
      modeOverride: true,
    })),

  resetToSystemPreference: () => set({ modeOverride: false }),
}));

// Selector hooks for granular subscriptions
export const useThemeMode = () => useThemeStore(state => state.mode);
export const useThemeModeOverride = () => useThemeStore(state => state.modeOverride);
export const useThemeActions = () => ({
  setMode: useThemeStore(state => state.setMode),
  toggleMode: useThemeStore(state => state.toggleMode),
  resetToSystemPreference: useThemeStore(state => state.resetToSystemPreference),
});
