import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";
import { MATCH_CENTER_SECTIONS, MatchCenterSectionKey } from "../screens/matchCenterScreenModel";

interface MatchCenterSectionTabsProps {
  activeSection: MatchCenterSectionKey;
  onSectionChange: (section: MatchCenterSectionKey) => void;
}

export function MatchCenterSectionTabs({
  activeSection,
  onSectionChange,
}: MatchCenterSectionTabsProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;

  return (
    <View style={[styles.container, { gap: spacing.sm }]}>
      {MATCH_CENTER_SECTIONS.map(section => {
        const active = section.key === activeSection;
        return (
          <Pressable
            key={section.key}
            accessibilityRole="button"
            accessibilityLabel={`Match center section ${section.label}`}
            onPress={() => onSectionChange(section.key)}
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
              {section.label}
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
    minHeight: 44,
    justifyContent: "center",
  },
});
