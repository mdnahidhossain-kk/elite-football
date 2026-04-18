import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SearchFilter } from "../../../models/phase2";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";

const FILTERS: Array<{ key: SearchFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "clubs", label: "Clubs" },
  { key: "players", label: "Players" },
  { key: "leagues", label: "Leagues" },
  { key: "news", label: "News" },
];

interface SearchFilterBarProps {
  activeFilter: SearchFilter;
  onFilterChange: (filter: SearchFilter) => void;
}

export function SearchFilterBar({ activeFilter, onFilterChange }: SearchFilterBarProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;

  return (
    <View style={[styles.container, { gap: spacing.sm }]}>
      {FILTERS.map(filter => {
        const active = filter.key === activeFilter;
        return (
          <Pressable
            key={filter.key}
            accessibilityRole="button"
            accessibilityLabel={`Search filter ${filter.label}`}
            onPress={() => onFilterChange(filter.key)}
            style={[
              styles.filter,
              {
                minHeight: 44,
                borderRadius: radii.full,
                paddingHorizontal: spacing.md,
                backgroundColor: active ? colors.primary : colors.surface,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}
          >
            <Typography variant="labelSmall" color={active ? "surface" : "textSecondary"}>
              {filter.label}
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
  filter: {
    borderWidth: 1,
    justifyContent: "center",
  },
});
