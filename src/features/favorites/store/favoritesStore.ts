import { create } from "zustand";
import { FavoriteItem, FavoriteType } from "../../../models/phase2/entities";
import { normalizeFavoritesOrdering } from "../../shared/phase2Validation";

interface FavoritesStoreState {
  items: FavoriteItem[];
  getByType: (type: FavoriteType) => FavoriteItem[];
  setItems: (items: FavoriteItem[]) => void;
  upsertFavorite: (item: FavoriteItem) => void;
  removeFavorite: (type: FavoriteType, id: string) => void;
  reorderFavorites: (type: FavoriteType, orderedIds: string[]) => void;
}

function nextOrder(items: FavoriteItem[], type: FavoriteType): number {
  return items.filter(item => item.type === type).length;
}

export const useFavoritesStore = create<FavoritesStoreState>((set, get) => ({
  items: [],

  getByType: type =>
    get()
      .items.filter(item => item.type === type)
      .sort((a, b) => a.order - b.order),

  setItems: items => {
    set({ items: normalizeFavoritesOrdering(items) });
  },

  upsertFavorite: item => {
    set(state => {
      const existing = state.items.find(entry => entry.id === item.id && entry.type === item.type);

      if (!existing) {
        const inserted: FavoriteItem = {
          ...item,
          order: nextOrder(state.items, item.type),
          updatedAt: item.updatedAt || new Date().toISOString(),
        };

        return {
          items: normalizeFavoritesOrdering([...state.items, inserted]),
        };
      }

      const updatedItems = state.items.map(entry =>
        entry.id === item.id && entry.type === item.type
          ? {
              ...entry,
              ...item,
              updatedAt: new Date().toISOString(),
            }
          : entry
      );

      return { items: normalizeFavoritesOrdering(updatedItems) };
    });
  },

  removeFavorite: (type, id) => {
    set(state => ({
      items: normalizeFavoritesOrdering(
        state.items.filter(item => !(item.type === type && item.id === id))
      ),
    }));
  },

  reorderFavorites: (type, orderedIds) => {
    set(state => {
      const target = state.items.filter(item => item.type === type);
      const untouched = state.items.filter(item => item.type !== type);

      const rank = new Map(orderedIds.map((value, index) => [value, index]));
      const reordered = [...target].sort((a, b) => {
        const aRank = rank.get(a.id) ?? Number.MAX_SAFE_INTEGER;
        const bRank = rank.get(b.id) ?? Number.MAX_SAFE_INTEGER;
        return aRank - bRank;
      });

      const normalized = reordered.map((item, index) => ({
        ...item,
        order: index,
        updatedAt: new Date().toISOString(),
      }));

      return {
        items: normalizeFavoritesOrdering([...untouched, ...normalized]),
      };
    });
  },
}));
