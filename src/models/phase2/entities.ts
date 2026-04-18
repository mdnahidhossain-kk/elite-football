export const COMPETITION_CATEGORIES = ["top", "domestic", "international", "cups"] as const;
export type CompetitionCategory = (typeof COMPETITION_CATEGORIES)[number];

export interface Competition {
  id: string;
  name: string;
  category: CompetitionCategory;
  letterKey: string;
  logoUri?: string;
  country?: string;
}

export const FAVORITE_TYPES = ["team", "player", "league"] as const;
export type FavoriteType = (typeof FAVORITE_TYPES)[number];

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  displayName: string;
  subtitle?: string;
  imageUri?: string;
  order: number;
  updatedAt: string;
}

export const SEARCH_FILTERS = ["all", "clubs", "players", "news", "leagues"] as const;
export type SearchFilter = (typeof SEARCH_FILTERS)[number];

export interface SearchQuery {
  id: string;
  text: string;
  filter: SearchFilter;
  createdAt: string;
}

export const SEARCH_RESULT_TYPES = ["club", "player", "league", "news"] as const;
export type SearchResultType = (typeof SEARCH_RESULT_TYPES)[number];

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  thumbnailUri?: string;
  destinationRoute: string;
  destinationParams?: Record<string, string>;
}

export interface MatchInfoSection {
  stadium?: string;
  referee?: string;
  attendance?: number;
}

export interface MatchLineupsSection {
  homeFormation?: string;
  awayFormation?: string;
  starters: string[];
  substitutes: string[];
}

export interface MatchStatsSection {
  possessionHome?: number;
  possessionAway?: number;
  shotsHome?: number;
  shotsAway?: number;
  cornersHome?: number;
  cornersAway?: number;
  yellowCardsHome?: number;
  yellowCardsAway?: number;
}

export interface MatchH2HEntry {
  id: string;
  summary: string;
  playedAt: string;
}

export interface MatchH2HSection {
  entries: MatchH2HEntry[];
}

export type MatchStatus = "scheduled" | "live" | "ht" | "ft" | "postponed";

export interface MatchDetail {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  status: MatchStatus;
  score?: { home: number; away: number };
  info?: MatchInfoSection;
  lineups?: MatchLineupsSection;
  stats?: MatchStatsSection;
  h2h?: MatchH2HSection;
}

export type NewsContentBlockType = "paragraph" | "heading" | "image" | "embed";

export interface NewsContentBlock {
  id: string;
  type: NewsContentBlockType;
  value: string;
  mediaUri?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  author?: string;
  publishedAt: string;
  contentBlocks: NewsContentBlock[];
  shareUrl: string;
  relatedArticleIds: string[];
}
