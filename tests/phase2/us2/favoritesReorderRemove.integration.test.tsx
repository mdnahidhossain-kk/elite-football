import { FavoriteItem } from "../../../src/models/phase2";
import {
  applyRemoveFavorite,
  applyReorderFavorites,
  buildMutationTimestamp,
} from "../../../src/features/favorites/services/favoritesMutations";
import {
  resetFavoritesStore,
  useFavoritesStore,
} from "../../../src/features/favorites/store/favoritesStore";

const buildFavorite = (
  id: string,
  type: FavoriteItem["type"],
  displayName: string,
  order: number,
  updatedAt = "2026-04-18T00:00:00.000Z"
): FavoriteItem => ({
  id,
  type,
  displayName,
  order,
  updatedAt,
});

describe("Favorites reorder + remove integration", () => {
  beforeEach(() => {
    resetFavoritesStore();
  });

  it("reorders a segment and keeps normalized order with stable persistence shape", () => {
    const store = useFavoritesStore.getState();
    store.setFavorites("team", [
      buildFavorite("team-1", "team", "Arsenal", 0),
      buildFavorite("team-2", "team", "Liverpool", 1),
      buildFavorite("team-3", "team", "Barcelona", 2),
    ]);

    const reordered = applyReorderFavorites(useFavoritesStore.getState().itemsByType.team, [
      "team-3",
      "team-1",
      "team-2",
    ]);
    store.setFavorites("team", reordered);

    const teams = useFavoritesStore.getState().itemsByType.team;
    expect(teams.map(item => item.id)).toEqual(["team-3", "team-1", "team-2"]);
    expect(teams.map(item => item.order)).toEqual([0, 1, 2]);
  });

  it("removes an item and re-normalizes order without touching other segments", () => {
    const store = useFavoritesStore.getState();
    store.setFavorites("team", [
      buildFavorite("team-1", "team", "Arsenal", 0),
      buildFavorite("team-2", "team", "Liverpool", 1),
    ]);
    store.setFavorites("player", [
      buildFavorite("player-1", "player", "Saka", 0),
      buildFavorite("player-2", "player", "Ødegaard", 1),
    ]);

    const timestamp = buildMutationTimestamp(() => new Date("2026-04-20T00:00:00.000Z"));
    const nextTeams = applyRemoveFavorite(
      useFavoritesStore.getState().itemsByType.team,
      "team-1",
      timestamp
    );
    store.setFavorites("team", nextTeams);

    const state = useFavoritesStore.getState().itemsByType;
    expect(state.team.map(item => item.id)).toEqual(["team-2"]);
    expect(state.team[0]?.order).toBe(0);
    expect(state.team[0]?.updatedAt).toBe(timestamp);
    expect(state.player.map(item => item.id)).toEqual(["player-1", "player-2"]);
  });
});
