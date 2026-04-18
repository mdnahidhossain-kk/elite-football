import React from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../../../../components/atomic/Typography";
import { MatchH2HSection } from "../../../../models/phase2";
import { useTheme } from "../../../../theme/useTheme";

interface MatchH2HSectionProps {
  data: MatchH2HSection;
}

export function MatchH2HSectionView({ data }: MatchH2HSectionProps) {
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
      <Typography variant="label">Head to head</Typography>
      {data.entries.length === 0 ? (
        <Typography variant="bodySmall" color="textSecondary">
          No previous meetings available.
        </Typography>
      ) : (
        data.entries.map(entry => (
          <Typography key={entry.id} variant="bodySmall">
            {`${entry.date} • ${entry.homeTeam} ${
              entry.score ? `${entry.score.home}-${entry.score.away}` : "vs"
            } ${entry.awayTeam}`}
          </Typography>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
