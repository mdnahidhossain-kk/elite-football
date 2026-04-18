import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";
import { CATEGORY_OPTIONS, CompetitionCategory } from "../data/mockCompetitions";

interface CompetitionCategoryTabsProps {
  activeCategory: CompetitionCategory;
  onCategoryChange: (category: CompetitionCategory) => void;
}

export function CompetitionCategoryTabs({
  activeCategory,
  onCategoryChange,
}: CompetitionCategoryTabsProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;

  return (
    <View style={[styles.container, { gap: spacing.sm }]}>
      {CATEGORY_OPTIONS.map(option => {
        const active = option.key === activeCategory;
        return (
          <Pressable
            key={option.key}
            accessibilityRole="button"
            accessibilityLabel={`Category ${option.label}`}
            onPress={() => onCategoryChange(option.key)}
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
              {option.label}
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
    flexWrap: "wrap",
    alignItems: "center",
  },
  tab: {
    borderWidth: 1,
  },
});
