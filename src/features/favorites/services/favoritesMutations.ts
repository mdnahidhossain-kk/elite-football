import { FavoriteItem } from "../../../models/phase2";
import { normalizeFavoritesOrder } from "../../shared/phase2Validation";

export const buildMutationTimestamp = (clock: () => Date = () => new Date()): string =>
  clock().toISOString();

export const applyReorderFavorites = (
  items: FavoriteItem[],
  orderedIds: string[],
  timestamp: string = buildMutationTimestamp()
): FavoriteItem[] => {
  const byId = new Map(items.map(item => [item.id, item]));
  const reordered = orderedIds
    .map(id => byId.get(id))
    .filter((item): item is FavoriteItem => Boolean(item))
    .map(item => ({ ...item, updatedAt: timestamp }));
  const leftovers = items
    .filter(item => !orderedIds.includes(item.id))
    .map(item => ({ ...item, updatedAt: timestamp }));

  return [...reordered, ...leftovers].map((item, index) => ({
    ...item,
    order: index,
  }));
};

export const applyRemoveFavorite = (
  items: FavoriteItem[],
  id: string,
  timestamp: string = buildMutationTimestamp()
): FavoriteItem[] =>
  normalizeFavoritesOrder(
    items
      .filter(item => item.id !== id)
      .map(item => ({
        ...item,
        updatedAt: timestamp,
      }))
  );
