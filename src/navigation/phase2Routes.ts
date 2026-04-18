export const Phase2RouteNames = {
  Leagues: "Leagues",
  CompetitionDetails: "CompetitionDetails",
  Favorites: "Favorites",
  Search: "Search",
  MatchCenter: "MatchCenter",
  NewsDetails: "NewsDetails",
} as const;

export type Phase2RouteName = (typeof Phase2RouteNames)[keyof typeof Phase2RouteNames];

export type Phase2ParamList = {
  Leagues: undefined;
  CompetitionDetails: { competitionId: string };
  Favorites: undefined;
  Search: undefined;
  MatchCenter: { matchId: string };
  NewsDetails: { articleId: string };
};
