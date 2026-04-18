import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type ContentFallbackVariant = "empty" | "error" | "no-data";

interface ContentFallbackStateProps {
  title: string;
  message: string;
  variant?: ContentFallbackVariant;
  actionLabel?: string;
  onActionPress?: () => void;
  testID?: string;
}

const variantPrefix: Record<ContentFallbackVariant, string> = {
  empty: "Nothing here yet",
  error: "Something went wrong",
  "no-data": "Data unavailable",
};

export function ContentFallbackState({
  title,
  message,
  variant = "empty",
  actionLabel,
  onActionPress,
  testID,
}: ContentFallbackStateProps) {
  return (
    <View accessibilityRole="summary" style={styles.container} testID={testID}>
      <Text style={styles.prefix}>{variantPrefix[variant]}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onActionPress ? (
        <Pressable accessibilityRole="button" onPress={onActionPress} style={styles.actionButton}>
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 180,
    padding: 16,
    gap: 8,
  },
  prefix: {
    fontSize: 12,
    color: "#64748B",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
  },
  actionButton: {
    marginTop: 8,
    backgroundColor: "#0EA5E9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minHeight: 44,
    justifyContent: "center",
  },
  actionLabel: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
