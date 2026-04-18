export const PHASE2_ROUTES = {
  LEAGUES: "Leagues",
  COMPETITION_DETAIL: "CompetitionDetail",
  FAVORITES: "Favorites",
  SEARCH: "Search",
  MATCH_CENTER: "MatchCenter",
  NEWS_DETAILS: "NewsDetails",
} as const;

export type Phase2RouteName = (typeof PHASE2_ROUTES)[keyof typeof PHASE2_ROUTES];

export interface Phase2RouteParams {
  Leagues: undefined;
  CompetitionDetail: { competitionId: string };
  Favorites: undefined;
  Search: undefined;
  MatchCenter: { matchId: string };
  NewsDetails: { articleId: string };
}
