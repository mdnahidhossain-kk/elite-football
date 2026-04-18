import {
  Competition,
  FavoriteItem,
  MatchDetail,
  NewsArticle,
  SearchQuery,
  SearchResultItem,
} from "../../models/phase2";

export const mockCompetitions: Competition[] = [
  { id: "epl", name: "Premier League", category: "top", letterKey: "P", country: "England" },
  { id: "ucl", name: "UEFA Champions League", category: "international", letterKey: "U" },
];

export const mockFavorites: FavoriteItem[] = [
  {
    id: "team-1",
    type: "team",
    displayName: "Arsenal",
    order: 0,
    updatedAt: "2026-04-18T00:00:00.000Z",
  },
  {
    id: "league-1",
    type: "league",
    displayName: "La Liga",
    order: 0,
    updatedAt: "2026-04-18T00:00:00.000Z",
  },
];

export const mockSearchRecents: SearchQuery[] = [
  { id: "recent-1", text: "Arsenal", filter: "clubs", createdAt: "2026-04-18T00:00:00.000Z" },
];

export const mockSearchResults: SearchResultItem[] = [
  {
    id: "result-1",
    type: "club",
    title: "Arsenal FC",
    destinationRoute: "ClubDetails",
    destinationParams: { clubId: "arsenal" },
  },
];

export const mockMatchDetail: MatchDetail = {
  matchId: "fixture-1",
  homeTeam: "Arsenal",
  awayTeam: "Liverpool",
  status: "scheduled",
  info: { stadium: "Emirates Stadium" },
  lineups: {
    homeStarters: [],
    awayStarters: [],
    homeSubstitutes: [],
    awaySubstitutes: [],
  },
  stats: {},
  h2h: { entries: [] },
};

export const mockNewsArticle: NewsArticle = {
  id: "article-1",
  title: "Matchday Preview",
  publishedAt: "2026-04-18T00:00:00.000Z",
  contentBlocks: [{ id: "block-1", type: "paragraph", content: "Preview content." }],
  shareUrl: "https://example.com/article-1",
  relatedArticleIds: [],
};
