import { groupCompetitionsByLetter } from "../../../src/features/leagues/utils/competitionIndex";
import { runSearchProjection } from "../../../src/features/search/services/searchEngine";
import { applyReorderFavorites } from "../../../src/features/favorites/services/favoritesMutations";
import { Competition, FavoriteItem, SearchResultItem } from "../../../src/models/phase2";

const buildCompetitions = (size: number): Competition[] =>
  Array.from({ length: size }).map((_, index) => ({
    id: `league-${index}`,
    name: `League ${index}`,
    category: "domestic",
    letterKey: String.fromCharCode(65 + (index % 26)),
  }));

const buildFavorites = (size: number): FavoriteItem[] =>
  Array.from({ length: size }).map((_, index) => ({
    id: `team-${index}`,
    type: "team",
    displayName: `Team ${index}`,
    order: index,
    updatedAt: "2026-01-01T00:00:00.000Z",
  }));

const buildSearchIndex = (size: number): SearchResultItem[] =>
  Array.from({ length: size }).map((_, index) => ({
    id: `news-${index}`,
    type: "news",
    title: `Matchday report ${index}`,
    description: index % 2 ? "Preview coverage" : "Live report coverage",
    destinationRoute: "ArticleDetails",
    destinationParams: { articleId: `article-${index}` },
  }));

describe("Phase 2 performance-focused interaction coverage", () => {
  it("handles large competition grouping and maintains full item coverage", () => {
    const competitions = buildCompetitions(1200);
    const sections = groupCompetitionsByLetter(competitions);

    const groupedCount = sections.reduce((sum, section) => sum + section.items.length, 0);
    expect(groupedCount).toBe(competitions.length);
    expect(sections.length).toBeGreaterThan(10);
  });

  it("supports list reordering and query projection for large interaction sets", () => {
    const favorites = buildFavorites(500);
    const reverseIds = favorites.map(item => item.id).reverse();
    const reordered = applyReorderFavorites(favorites, reverseIds, "2026-04-18T00:00:00.000Z");
    expect(reordered[0]?.id).toBe("team-499");
    expect(reordered[0]?.order).toBe(0);
    expect(reordered[reordered.length - 1]?.id).toBe("team-0");

    const index = buildSearchIndex(1500);
    const projected = runSearchProjection(index, "report 14", "news");
    expect(projected.length).toBeGreaterThan(0);
    expect(projected.every(item => item.type === "news")).toBe(true);
  });
});
