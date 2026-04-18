import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { FavoriteItem } from "../../../models/phase2";
import { useTheme } from "../../../theme/useTheme";

interface FavoritesReorderListItemProps {
  item: FavoriteItem;
  isReorderEnabled?: boolean;
  onMoveUp?: (itemId: string) => void;
  onMoveDown?: (itemId: string) => void;
  onRemove?: (itemId: string) => void;
}

export function FavoritesReorderListItem({
  item,
  isReorderEnabled = false,
  onMoveUp,
  onMoveDown,
  onRemove,
}: FavoritesReorderListItemProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;

  const reorderDisabled = !isReorderEnabled;

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
          borderRadius: radii.md,
          backgroundColor: colors.surface,
          padding: spacing.md,
          gap: spacing.sm,
        },
      ]}
    >
      <Typography variant="label">{item.displayName}</Typography>
      {item.subtitle ? (
        <Typography variant="caption" color="textSecondary">
          {item.subtitle}
        </Typography>
      ) : null}
      <View style={[styles.actions, { gap: spacing.sm }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Move ${item.displayName} up`}
          disabled={reorderDisabled}
          onPress={() => onMoveUp?.(item.id)}
          style={styles.action}
        >
          <Typography variant="labelSmall" color={reorderDisabled ? "textTertiary" : "primary"}>
            Move Up
          </Typography>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Move ${item.displayName} down`}
          disabled={reorderDisabled}
          onPress={() => onMoveDown?.(item.id)}
          style={styles.action}
        >
          <Typography variant="labelSmall" color={reorderDisabled ? "textTertiary" : "primary"}>
            Move Down
          </Typography>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${item.displayName} from favorites`}
          onPress={() => onRemove?.(item.id)}
          style={styles.action}
        >
          <Typography variant="labelSmall" color="error">
            Remove
          </Typography>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  action: {
    minHeight: 44,
    justifyContent: "center",
  },
});
