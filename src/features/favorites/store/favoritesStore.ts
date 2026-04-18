import { create } from "zustand";
import { FavoriteItem, FavoriteType } from "../../../models/phase2";
import { normalizeFavoritesOrder } from "../../shared/phase2Validation";

export type FavoritesByType = Record<FavoriteType, FavoriteItem[]>;

export const createEmptyFavoritesByType = (): FavoritesByType => ({
  team: [],
  player: [],
  league: [],
});

interface FavoritesStoreState {
  itemsByType: FavoritesByType;
  setFavorites: (type: FavoriteType, items: FavoriteItem[]) => void;
  upsertFavorite: (item: FavoriteItem) => void;
  removeFavorite: (type: FavoriteType, id: string) => void;
  reorderFavorites: (type: FavoriteType, orderedIds: string[]) => void;
  reset: () => void;
}

const normalizeSegment = (items: FavoriteItem[]) => normalizeFavoritesOrder(items);

export const useFavoritesStore = create<FavoritesStoreState>(set => ({
  itemsByType: createEmptyFavoritesByType(),

  setFavorites: (type, items) =>
    set(state => ({
      itemsByType: {
        ...state.itemsByType,
        [type]: normalizeSegment(items.filter(item => item.type === type)),
      },
    })),

  upsertFavorite: item =>
    set(state => {
      const current = state.itemsByType[item.type];
      const existingIndex = current.findIndex(entry => entry.id === item.id);
      const nextSegment = [...current];

      if (existingIndex >= 0) {
        nextSegment[existingIndex] = { ...nextSegment[existingIndex], ...item };
      } else {
        nextSegment.push(item);
      }

      return {
        itemsByType: {
          ...state.itemsByType,
          [item.type]: normalizeSegment(nextSegment),
        },
      };
    }),

  removeFavorite: (type, id) =>
    set(state => ({
      itemsByType: {
        ...state.itemsByType,
        [type]: normalizeSegment(state.itemsByType[type].filter(item => item.id !== id)),
      },
    })),

  reorderFavorites: (type, orderedIds) =>
    set(state => {
      const current = state.itemsByType[type];
      const byId = new Map(current.map(item => [item.id, item]));

      const reordered = orderedIds
        .map(id => byId.get(id))
        .filter((item): item is FavoriteItem => Boolean(item));

      const leftovers = current.filter(item => !orderedIds.includes(item.id));
      return {
        itemsByType: {
          ...state.itemsByType,
          [type]: normalizeSegment([...reordered, ...leftovers]),
        },
      };
    }),

  reset: () => set({ itemsByType: createEmptyFavoritesByType() }),
}));

export const selectFavoritesByType = (type: FavoriteType) => (state: FavoritesStoreState) =>
  state.itemsByType[type];

export const getFavoritesByType = (type: FavoriteType): FavoriteItem[] =>
  useFavoritesStore.getState().itemsByType[type];

export const resetFavoritesStore = (): void => {
  useFavoritesStore.getState().reset();
};
