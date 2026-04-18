import { SearchQuery, SearchResultItem } from "../../../src/models/phase2";
import { buildSearchScreenSnapshot } from "../../../src/features/search/screens/searchScreenModel";

const buildResult = (
  id: string,
  type: SearchResultItem["type"],
  title: string
): SearchResultItem => ({
  id,
  type,
  title,
  destinationRoute: "Details",
});

const RECENTS: SearchQuery[] = [
  { id: "recent-1", text: "arsenal", filter: "clubs", createdAt: "2026-04-18T00:00:00.000Z" },
];

describe("SearchScreen snapshot", () => {
  it("matches active filter state with visible results", () => {
    const snapshot = buildSearchScreenSnapshot({
      query: "arsenal",
      activeFilter: "clubs",
      recents: RECENTS,
      results: [buildResult("club-1", "club", "Arsenal FC")],
      isSearching: false,
    });

    expect(snapshot).toMatchSnapshot();
  });
});
