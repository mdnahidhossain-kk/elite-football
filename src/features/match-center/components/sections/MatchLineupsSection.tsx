import React from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../../../../components/atomic/Typography";
import { MatchLineupPlayer, MatchLineupsSection } from "../../../../models/phase2";
import { useTheme } from "../../../../theme/useTheme";

interface MatchLineupsSectionProps {
  data: MatchLineupsSection;
}

const formatPlayers = (players: MatchLineupPlayer[]): string =>
  players.length > 0 ? players.map(player => player.name).join(", ") : "Unavailable";

export function MatchLineupsSectionView({ data }: MatchLineupsSectionProps) {
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
      <Typography variant="label">Lineups</Typography>
      <Typography variant="bodySmall">{`Home formation: ${data.homeFormation ?? "TBD"}`}</Typography>
      <Typography variant="bodySmall">{`Away formation: ${data.awayFormation ?? "TBD"}`}</Typography>
      <Typography variant="caption">{`Home XI: ${formatPlayers(data.homeStarters)}`}</Typography>
      <Typography variant="caption">{`Away XI: ${formatPlayers(data.awayStarters)}`}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
