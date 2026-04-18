// Leagues Screen - Leagues listing

import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";

export function LeaguesScreen() {
  const theme = useTheme();
  const { colors, spacing } = theme.tokens;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Typography variant="h1" align="center" style={{ marginTop: spacing.xxl }}>
          Leagues
        </Typography>
        <Typography
          variant="body"
          color="textSecondary"
          align="center"
          style={{ marginTop: spacing.md }}
        >
          Coming Soon
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
    justifyContent: "center",
    alignItems: "center",
  },
});
