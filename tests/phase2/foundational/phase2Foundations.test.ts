import {
  dedupeRecentSearches,
  normalizeCategoryKey,
  normalizeFavoritesOrdering,
  normalizeLetterKey,
} from "../../../src/features/shared/phase2Validation";
import { useFavoritesStore } from "../../../src/features/favorites/store/favoritesStore";

describe("phase2 foundations", () => {
  it("normalizes category and letter keys", () => {
    expect(normalizeCategoryKey("Domestic")).toBe("domestic");
    expect(normalizeCategoryKey("unknown")).toBe("top");
    expect(normalizeLetterKey("premier league")).toBe("P");
    expect(normalizeLetterKey("1 bundesliga")).toBe("#");
  });

  it("dedupes recents by normalized text and filter", () => {
    const results = dedupeRecentSearches([
      { id: "1", text: "Arsenal", filter: "all", createdAt: "2026-01-01T00:00:00.000Z" },
      { id: "2", text: "arsenal ", filter: "all", createdAt: "2026-01-01T00:00:01.000Z" },
      { id: "3", text: "Arsenal", filter: "clubs", createdAt: "2026-01-01T00:00:02.000Z" },
    ]);

    expect(results).toHaveLength(2);
    expect(results[0]?.id).toBe("1");
    expect(results[1]?.id).toBe("3");
  });

  it("keeps favorites ordered per type and supports reorder/remove", () => {
    useFavoritesStore.setState({
      items: [],
      getByType: useFavoritesStore.getState().getByType,
      setItems: useFavoritesStore.getState().setItems,
      upsertFavorite: useFavoritesStore.getState().upsertFavorite,
      removeFavorite: useFavoritesStore.getState().removeFavorite,
      reorderFavorites: useFavoritesStore.getState().reorderFavorites,
    });

    useFavoritesStore.getState().setItems(
      normalizeFavoritesOrdering([
        {
          id: "a",
          type: "team",
          displayName: "A",
          order: 2,
          updatedAt: "2026-01-01T00:00:00.000Z",
        },
        {
          id: "b",
          type: "team",
          displayName: "B",
          order: 1,
          updatedAt: "2026-01-01T00:00:01.000Z",
        },
      ])
    );

    expect(
      useFavoritesStore
        .getState()
        .getByType("team")
        .map(item => item.id)
    ).toEqual(["b", "a"]);

    useFavoritesStore.getState().reorderFavorites("team", ["a", "b"]);
    expect(
      useFavoritesStore
        .getState()
        .getByType("team")
        .map(item => item.id)
    ).toEqual(["a", "b"]);

    useFavoritesStore.getState().removeFavorite("team", "a");
    const teams = useFavoritesStore.getState().getByType("team");
    expect(teams).toHaveLength(1);
    expect(teams[0]?.id).toBe("b");
    expect(teams[0]?.order).toBe(0);
  });
});
