import { FavoriteItem } from "../../../src/models/phase2";
import {
  FavoritesSegmentKey,
  buildFavoritesScreenSnapshot,
} from "../../../src/features/favorites/screens/favoritesScreenModel";

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

describe("FavoritesScreen snapshot", () => {
  it("matches teams segment with ordered items and segment counts", () => {
    const snapshot = buildFavoritesScreenSnapshot({
      activeSegment: FavoritesSegmentKey.Teams,
      itemsByType: {
        team: [
          buildFavorite("team-2", "team", "Liverpool", 1),
          buildFavorite("team-1", "team", "Arsenal", 0),
        ],
        player: [buildFavorite("player-1", "player", "Bukayo Saka", 0)],
        league: [],
      },
    });

    expect(snapshot).toMatchSnapshot();
  });
});
