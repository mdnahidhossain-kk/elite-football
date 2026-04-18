import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SearchQuery } from "../../../models/phase2";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";

interface RecentSearchesListProps {
  recents: SearchQuery[];
  onSelect: (item: SearchQuery) => void;
  onClear?: () => void;
}

export function RecentSearchesList({ recents, onSelect, onClear }: RecentSearchesListProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;

  if (recents.length === 0) {
    return (
      <Typography variant="bodySmall" color="textSecondary">
        No recent searches yet.
      </Typography>
    );
  }

  return (
    <View style={{ gap: spacing.sm }}>
      <View style={styles.header}>
        <Typography variant="label">Recent Searches</Typography>
        {onClear ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear recent searches"
            onPress={onClear}
          >
            <Typography variant="labelSmall" color="primary">
              Clear
            </Typography>
          </Pressable>
        ) : null}
      </View>
      <FlashList
        data={recents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Recent search ${item.text}`}
            onPress={() => onSelect(item)}
            style={[
              styles.item,
              {
                borderRadius: radii.md,
                borderColor: colors.border,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Typography variant="label">{item.text}</Typography>
            <Typography variant="caption" color="textSecondary">
              {item.filter}
            </Typography>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    borderWidth: 1,
    minHeight: 44,
    justifyContent: "center",
    marginBottom: 8,
    gap: 2,
  },
});
