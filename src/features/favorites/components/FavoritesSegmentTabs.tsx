import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";
import { FAVORITES_SEGMENTS, FavoritesSegmentKey } from "../screens/favoritesScreenModel";

interface FavoritesSegmentTabsProps {
  activeSegment: FavoritesSegmentKey;
  onSegmentChange: (segment: FavoritesSegmentKey) => void;
}

export function FavoritesSegmentTabs({
  activeSegment,
  onSegmentChange,
}: FavoritesSegmentTabsProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;

  return (
    <View style={[styles.container, { gap: spacing.sm }]}>
      {FAVORITES_SEGMENTS.map(segment => {
        const active = segment.key === activeSegment;
        return (
          <Pressable
            key={segment.key}
            accessibilityRole="button"
            accessibilityLabel={`Favorites segment ${segment.label}`}
            onPress={() => onSegmentChange(segment.key)}
            style={[
              styles.tab,
              {
                borderRadius: radii.full,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                backgroundColor: active ? colors.primary : colors.surface,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}
          >
            <Typography variant="labelSmall" color={active ? "surface" : "textSecondary"}>
              {segment.label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tab: {
    borderWidth: 1,
  },
});
