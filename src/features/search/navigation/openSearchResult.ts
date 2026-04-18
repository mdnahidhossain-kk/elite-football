import { SearchResultItem } from "../../../models/phase2";

interface SearchResultNavigationLike {
  navigate: (routeName: string, params?: Record<string, string>) => void;
}

const FALLBACK_ROUTE_BY_TYPE: Record<SearchResultItem["type"], string> = {
  club: "ClubDetails",
  player: "PlayerDetails",
  league: "LeagueDetails",
  news: "ArticleDetails",
};

export function openSearchResult(navigation: SearchResultNavigationLike, result: SearchResultItem) {
  const routeName = result.destinationRoute || FALLBACK_ROUTE_BY_TYPE[result.type];
  const params = result.destinationParams ?? {};
  navigation.navigate(routeName, params);
}
