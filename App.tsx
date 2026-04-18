// Elite Football - Root App Component

import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { useThemeMode } from "./src/theme/useTheme";

function AppContent() {
  const mode = useThemeMode();
  return <StatusBar style={mode === "dark" ? "light" : "dark"} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <RootNavigator />
    </ThemeProvider>
  );
}
