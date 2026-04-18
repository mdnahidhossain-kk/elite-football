import { FavoriteItem } from "../../../src/models/phase2";
import {
  FavoritesSegmentKey,
  getFavoritesForSegment,
  mapFavoritesTypeToSegment,
} from "../../../src/features/favorites/screens/favoritesScreenModel";
import { createEmptyFavoritesByType } from "../../../src/features/favorites/store/favoritesStore";

const buildFavorite = (
  id: string,
  type: FavoriteItem["type"],
  displayName: string,
  order: number
): FavoriteItem => ({
  id,
  type,
  displayName,
  order,
  updatedAt: "2026-04-18T00:00:00.000Z",
});

describe("Favorites segments integration", () => {
  it("isolates favorites by active segment tab", () => {
    const itemsByType = createEmptyFavoritesByType();
    itemsByType.team = [buildFavorite("team-1", "team", "Arsenal", 0)];
    itemsByType.player = [buildFavorite("player-1", "player", "Saka", 0)];
    itemsByType.league = [buildFavorite("league-1", "league", "Premier League", 0)];

    expect(
      getFavoritesForSegment(itemsByType, FavoritesSegmentKey.Teams).map(item => item.id)
    ).toEqual(["team-1"]);
    expect(
      getFavoritesForSegment(itemsByType, FavoritesSegmentKey.Players).map(item => item.id)
    ).toEqual(["player-1"]);
    expect(
      getFavoritesForSegment(itemsByType, FavoritesSegmentKey.Leagues).map(item => item.id)
    ).toEqual(["league-1"]);
  });

  it("maps store favorite types to visible segment keys", () => {
    expect(mapFavoritesTypeToSegment("team")).toBe(FavoritesSegmentKey.Teams);
    expect(mapFavoritesTypeToSegment("player")).toBe(FavoritesSegmentKey.Players);
    expect(mapFavoritesTypeToSegment("league")).toBe(FavoritesSegmentKey.Leagues);
  });
});
