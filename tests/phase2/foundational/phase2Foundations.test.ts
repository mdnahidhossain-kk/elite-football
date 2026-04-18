import {
  dedupeRecentSearches,
  normalizeCategoryKey,
  normalizeFavoritesOrder,
  normalizeLetterKey,
} from "../../../src/features/shared/phase2Validation";
import {
  resetFavoritesStore,
  useFavoritesStore,
} from "../../../src/features/favorites/store/favoritesStore";
import { createSearchRecentsStorage } from "../../../src/features/search/services/searchRecentsStorage";

describe("phase2 foundational contracts", () => {
  beforeEach(() => {
    resetFavoritesStore();
  });

  it("normalizes category and letter keys", () => {
    expect(normalizeCategoryKey("DOMESTIC")).toBe("domestic");
    expect(normalizeCategoryKey("unknown")).toBe("top");
    expect(normalizeLetterKey(" premier league")).toBe("P");
    expect(normalizeLetterKey("1. Bundesliga")).toBe("#");
  });

  it("normalizes favorites ordering", () => {
    const ordered = normalizeFavoritesOrder([
      { id: "b", order: 4 },
      { id: "a", order: 2 },
      { id: "c", order: 9 },
    ]);
    expect(ordered.map(item => item.id)).toEqual(["a", "b", "c"]);
    expect(ordered.map(item => item.order)).toEqual([0, 1, 2]);
  });

  it("handles favorites ordering and removal by segment", () => {
    const store = useFavoritesStore.getState();

    store.upsertFavorite({
      id: "team-1",
      type: "team",
      displayName: "Arsenal",
      order: 0,
      updatedAt: "2026-04-18T00:00:00.000Z",
    });
    store.upsertFavorite({
      id: "team-2",
      type: "team",
      displayName: "Liverpool",
      order: 1,
      updatedAt: "2026-04-18T00:00:00.000Z",
    });
    store.reorderFavorites("team", ["team-2", "team-1"]);
    store.removeFavorite("team", "team-1");

    const teams = useFavoritesStore.getState().itemsByType.team;
    expect(teams).toHaveLength(1);
    expect(teams[0].id).toBe("team-2");
    expect(teams[0].order).toBe(0);
  });

  it("dedupes recents by normalized query + filter", async () => {
    const deduped = dedupeRecentSearches([
      { id: "1", text: " Arsenal ", filter: "clubs", createdAt: "2026-04-18T00:00:00.000Z" },
      { id: "2", text: "arsenal", filter: "clubs", createdAt: "2026-04-18T00:00:00.000Z" },
      { id: "3", text: "arsenal", filter: "all", createdAt: "2026-04-18T00:00:00.000Z" },
    ]);
    expect(deduped).toHaveLength(2);

    const storage = createSearchRecentsStorage();
    await storage.clearRecents();
    await storage.saveRecent({ text: "Arsenal", filter: "clubs" });
    await storage.saveRecent({ text: " arsenal ", filter: "clubs" });
    const recents = await storage.getRecents();
    expect(recents).toHaveLength(1);
    expect(recents[0].text).toBe("arsenal");
  });
});
