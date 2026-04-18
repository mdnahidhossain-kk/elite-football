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

export const mockNewsArticles: NewsArticle[] = [
  {
    id: "article-1",
    title: "Matchday Preview",
    author: "Alex Harper",
    publishedAt: "2026-04-18T00:00:00.000Z",
    contentBlocks: [
      { id: "block-1", type: "heading", content: "Arsenal vs Liverpool" },
      {
        id: "block-2",
        type: "paragraph",
        content: "Team news and tactical preview before kickoff.",
      },
      {
        id: "block-3",
        type: "embed",
        content: "<iframe src='https://video.example.com/highlights'></iframe>",
      },
    ],
    shareUrl: "https://example.com/article-1",
    relatedArticleIds: ["article-2"],
  },
  {
    id: "article-2",
    title: "Injury Update Ahead of Weekend Fixture",
    author: "Maya Collins",
    publishedAt: "2026-04-17T00:00:00.000Z",
    contentBlocks: [
      {
        id: "block-4",
        type: "paragraph",
        content: "Latest updates from the medical team.",
      },
    ],
    shareUrl: "https://example.com/article-2",
    relatedArticleIds: ["article-1"],
  },
];

export const mockNewsArticle: NewsArticle = mockNewsArticles[0]!;
