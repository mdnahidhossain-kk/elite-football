import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";
import { useFavoritesStore } from "../store/favoritesStore";
import { FavoritesSegmentTabs } from "../components/FavoritesSegmentTabs";
import { FavoritesReorderListItem } from "../components/FavoritesReorderListItem";
import { FavoritesEmptyState } from "../components/FavoritesEmptyState";
import {
  FAVORITES_SEGMENTS,
  FavoritesSegmentKey,
  buildFavoritesScreenSnapshot,
  getFavoritesForSegment,
} from "./favoritesScreenModel";
import { applyRemoveFavorite, applyReorderFavorites } from "../services/favoritesMutations";

export function FavoritesScreen() {
  const theme = useTheme();
  const { colors, spacing } = theme.tokens;
  const [activeSegment, setActiveSegment] = React.useState<FavoritesSegmentKey>(
    FavoritesSegmentKey.Teams
  );
  const itemsByType = useFavoritesStore(state => state.itemsByType);
  const setFavorites = useFavoritesStore(state => state.setFavorites);
  const visibleItems = React.useMemo(
    () => getFavoritesForSegment(itemsByType, activeSegment),
    [activeSegment, itemsByType]
  );

  const segmentType =
    FAVORITES_SEGMENTS.find(segment => segment.key === activeSegment)?.favoriteType ?? "team";
  const reorderEnabled = visibleItems.length > 1;

  const handleMove = React.useCallback(
    (itemId: string, direction: "up" | "down") => {
      const source = getFavoritesForSegment(
        useFavoritesStore.getState().itemsByType,
        activeSegment
      );
      const currentIndex = source.findIndex(item => item.id === itemId);
      if (currentIndex < 0) {
        return;
      }

      const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (nextIndex < 0 || nextIndex >= source.length) {
        return;
      }

      const reorderedIds = source.map(item => item.id);
      const temp = reorderedIds[currentIndex];
      reorderedIds[currentIndex] = reorderedIds[nextIndex];
      reorderedIds[nextIndex] = temp;

      const nextItems = applyReorderFavorites(source, reorderedIds);
      setFavorites(segmentType, nextItems);
    },
    [activeSegment, segmentType, setFavorites]
  );

  const handleRemove = React.useCallback(
    (itemId: string) => {
      const source = getFavoritesForSegment(
        useFavoritesStore.getState().itemsByType,
        activeSegment
      );
      const nextItems = applyRemoveFavorite(source, itemId);
      setFavorites(segmentType, nextItems);
    },
    [activeSegment, segmentType, setFavorites]
  );

  const snapshot = buildFavoritesScreenSnapshot({ activeSegment, itemsByType });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, { padding: spacing.lg, gap: spacing.md }]}>
        <Typography variant="h2">Favorites</Typography>
        <FavoritesSegmentTabs activeSegment={activeSegment} onSegmentChange={setActiveSegment} />
        <Typography variant="caption" color="textSecondary">
          {`Teams ${snapshot.segmentCounts.teams} • Players ${snapshot.segmentCounts.players} • Leagues ${snapshot.segmentCounts.leagues}`}
        </Typography>

        {visibleItems.length === 0 ? (
          <FavoritesEmptyState segment={activeSegment} />
        ) : (
          <FlashList
            data={visibleItems}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <FavoritesReorderListItem
                item={item}
                isReorderEnabled={reorderEnabled}
                onMoveUp={index > 0 ? id => handleMove(id, "up") : undefined}
                onMoveDown={
                  index < visibleItems.length - 1 ? id => handleMove(id, "down") : undefined
                }
                onRemove={handleRemove}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export {
  FavoritesSegmentKey,
  buildFavoritesScreenSnapshot,
  getFavoritesForSegment,
  mapFavoritesTypeToSegment,
} from "./favoritesScreenModel";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
