export const COMPETITION_CATEGORIES = ["top", "domestic", "international", "cups"] as const;
export type CompetitionCategory = (typeof COMPETITION_CATEGORIES)[number];

export type FavoriteType = "team" | "player" | "league";
export type SearchFilter = "all" | "clubs" | "players" | "news" | "leagues";
export type SearchResultType = "club" | "player" | "league" | "news";
export type MatchStatus = "scheduled" | "live" | "ht" | "ft" | "postponed";
export type NewsContentBlockType = "paragraph" | "heading" | "image" | "embed";

export interface Competition {
  id: string;
  name: string;
  category: CompetitionCategory;
  letterKey: string;
  logoUri?: string;
  country?: string;
}

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  displayName: string;
  subtitle?: string;
  imageUri?: string;
  order: number;
  updatedAt: string;
}

export interface SearchQuery {
  id: string;
  text: string;
  filter: SearchFilter;
  createdAt: string;
}

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

export interface MatchLineupPlayer {
  id: string;
  name: string;
  number?: number;
  position?: string;
}

export interface MatchLineupsSection {
  homeFormation?: string;
  awayFormation?: string;
  homeStarters: MatchLineupPlayer[];
  awayStarters: MatchLineupPlayer[];
  homeSubstitutes: MatchLineupPlayer[];
  awaySubstitutes: MatchLineupPlayer[];
}

export interface MatchStatsSection {
  possessionHome?: number;
  possessionAway?: number;
  shotsHome?: number;
  shotsAway?: number;
  cornersHome?: number;
  cornersAway?: number;
  cardsHome?: number;
  cardsAway?: number;
}

export interface MatchH2HEntry {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  score?: { home: number; away: number };
}

export interface MatchH2HSection {
  entries: MatchH2HEntry[];
}

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

export interface NewsContentBlock {
  id: string;
  type: NewsContentBlockType;
  content: string;
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
