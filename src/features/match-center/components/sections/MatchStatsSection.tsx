import React from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../../../../components/atomic/Typography";
import { MatchStatsSection } from "../../../../models/phase2";
import { useTheme } from "../../../../theme/useTheme";

interface MatchStatsSectionProps {
  data: MatchStatsSection;
}

const buildStatRow = (label: string, home: number | undefined, away: number | undefined) =>
  `${label}: ${typeof home === "number" ? home : "-"} / ${typeof away === "number" ? away : "-"}`;

export function MatchStatsSectionView({ data }: MatchStatsSectionProps) {
  const theme = useTheme();
  const { spacing, radii, colors } = theme.tokens;

  return (
    <View
      style={[
        styles.container,
        {
          gap: spacing.sm,
          borderRadius: radii.md,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: spacing.md,
        },
      ]}
    >
      <Typography variant="label">Stats</Typography>
      <Typography variant="bodySmall">
        {buildStatRow("Possession", data.possessionHome, data.possessionAway)}
      </Typography>
      <Typography variant="bodySmall">
        {buildStatRow("Shots", data.shotsHome, data.shotsAway)}
      </Typography>
      <Typography variant="bodySmall">
        {buildStatRow("Corners", data.cornersHome, data.cornersAway)}
      </Typography>
      <Typography variant="bodySmall">
        {buildStatRow("Cards", data.cardsHome, data.cardsAway)}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
