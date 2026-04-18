import {
  createDebouncedSearchExecutor,
  mockSearchIndex,
  runSearchProjection,
} from "../../../src/features/search/services/searchEngine";

describe("Search query + filter integration", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("debounces rapid query updates and only executes latest value", async () => {
    const searchFn = jest.fn(
      (query: string, filter: "all" | "clubs" | "players" | "news" | "leagues") =>
        runSearchProjection(mockSearchIndex, query, filter)
    );
    const debounced = createDebouncedSearchExecutor(
      (query, filter) => searchFn(query, filter),
      300
    );

    const first = debounced.execute("ars", "all");
    const second = debounced.execute("arsenal", "all");

    jest.advanceTimersByTime(300);

    const firstResult = await first;
    const secondResult = await second;

    expect(searchFn).toHaveBeenCalledTimes(1);
    expect(searchFn).toHaveBeenCalledWith("arsenal", "all");
    expect(firstResult).toEqual([]);
    expect(secondResult.map(item => item.id)).toEqual([
      "club-arsenal",
      "player-saka",
      "news-arsenal-preview",
    ]);
  });

  it("projects results by active filter scope", () => {
    const clubs = runSearchProjection(mockSearchIndex, "arsenal", "clubs");
    const players = runSearchProjection(mockSearchIndex, "saka", "players");
    const leagues = runSearchProjection(mockSearchIndex, "premier", "leagues");

    expect(clubs.map(item => item.type)).toEqual(["club"]);
    expect(players.map(item => item.type)).toEqual(["player"]);
    expect(leagues.map(item => item.type)).toEqual(["league"]);
  });
});
