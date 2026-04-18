import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../../../components/atomic/Button";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";

interface ContentFallbackStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function ContentFallbackState({
  title,
  message,
  actionLabel,
  onActionPress,
}: ContentFallbackStateProps) {
  const { tokens } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: tokens.colors.border,
          backgroundColor: tokens.colors.surface,
          padding: tokens.spacing.lg,
        },
      ]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`${title}. ${message}`}
    >
      <Typography variant="h3" align="center">
        {title}
      </Typography>
      <Typography variant="body" color="textSecondary" align="center" style={styles.message}>
        {message}
      </Typography>
      {actionLabel && onActionPress ? (
        <Button title={actionLabel} onPress={onActionPress} variant="primary" size="medium" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  message: {
    marginBottom: 4,
  },
});
