import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";
import { Competition } from "../data/mockCompetitions";

interface CompetitionListItemProps {
  competition: Competition;
  onPress: (competition: Competition) => void;
}

export function CompetitionListItem({ competition, onPress }: CompetitionListItemProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;

  return (
    <Pressable
      onPress={() => onPress(competition)}
      accessibilityRole="button"
      accessibilityLabel={`Open ${competition.name}`}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radii.md,
          padding: spacing.md,
          marginBottom: spacing.sm,
        },
      ]}
    >
      <Typography variant="label">{competition.name}</Typography>
      {competition.country ? (
        <Typography variant="bodySmall" color="textSecondary" style={{ marginTop: spacing.xs }}>
          {competition.country}
        </Typography>
      ) : null}
    </Pressable>
  );
}

interface EmptyCategoryStateProps {
  categoryLabel: string;
}

export function EmptyCategoryState({ categoryLabel }: EmptyCategoryStateProps) {
  const theme = useTheme();
  const { spacing } = theme.tokens;

  return (
    <View style={[styles.emptyState, { padding: spacing.lg }]}>
      <Typography variant="h4" align="center">
        No competitions found
      </Typography>
      <Typography
        variant="bodySmall"
        color="textSecondary"
        align="center"
        style={{ marginTop: spacing.sm }}
      >
        {`No ${categoryLabel.toLowerCase()} competitions are available right now.`}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
