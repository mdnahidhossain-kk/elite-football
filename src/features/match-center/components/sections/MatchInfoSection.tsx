import React from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../../../../components/atomic/Typography";
import { MatchInfoSection } from "../../../../models/phase2";
import { useTheme } from "../../../../theme/useTheme";

interface MatchInfoSectionProps {
  data: MatchInfoSection;
}

export function MatchInfoSectionView({ data }: MatchInfoSectionProps) {
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
      <Typography variant="label">Match info</Typography>
      <Typography variant="bodySmall">{`Stadium: ${data.stadium ?? "TBD"}`}</Typography>
      <Typography variant="bodySmall">{`Referee: ${data.referee ?? "TBD"}`}</Typography>
      <Typography variant="bodySmall">
        {`Attendance: ${typeof data.attendance === "number" ? data.attendance.toLocaleString() : "TBD"}`}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
