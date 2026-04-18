// Settings Screen - App settings with theme toggle

import React from "react";
import { View, StyleSheet, SafeAreaView, Switch } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { Card } from "../../../components/atomic/Card";
import { useTheme } from "../../../theme/useTheme";
import { useThemeStore } from "../../../store/themeStore";

export function SettingsScreen() {
  const theme = useTheme();
  const { colors, spacing } = theme.tokens;
  const mode = useThemeStore(state => state.mode);
  const toggleMode = useThemeStore(state => state.toggleMode);

  const isDark = mode === "dark";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, { padding: spacing.lg }]}>
        <Typography variant="h2" style={{ marginBottom: spacing.xl }}>
          Settings
        </Typography>

        <Card style={{ marginBottom: spacing.md }}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Typography variant="label">Dark Mode</Typography>
              <Typography variant="caption" color="textSecondary">
                Switch between light and dark themes
              </Typography>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
        </Card>

        <Typography variant="caption" color="textTertiary" style={{ marginTop: spacing.xxl }}>
          Elite Football v1.0.0
        </Typography>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
});
