import { SearchFilter, SearchQuery, SearchResultItem } from "../../../models/phase2";

export type SearchScreenSurfaceState = "recents" | "results" | "no-results" | "loading";

export const deriveSearchSurfaceState = (
  query: string,
  results: SearchResultItem[],
  isSearching: boolean
): SearchScreenSurfaceState => {
  if (!query.trim()) {
    return "recents";
  }
  if (isSearching) {
    return "loading";
  }
  return results.length > 0 ? "results" : "no-results";
};

interface SearchScreenSnapshotInput {
  query: string;
  activeFilter: SearchFilter;
  recents: SearchQuery[];
  results: SearchResultItem[];
  isSearching: boolean;
}

export const buildSearchScreenSnapshot = (input: SearchScreenSnapshotInput) => ({
  query: input.query,
  activeFilter: input.activeFilter,
  recentsCount: input.recents.length,
  resultCount: input.results.length,
  resultTypes: input.results.map(item => item.type),
  surfaceState: deriveSearchSurfaceState(input.query, input.results, input.isSearching),
});
