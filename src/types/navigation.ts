// Navigation type definitions

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";

// Stack Param Lists
export type MatchesStackParamList = {
  Matches: undefined;
  MatchDetails: { matchId: string; liveTicker?: boolean };
  PlayerStats: { matchId: string; playerId: string };
};

export type NewsStackParamList = {
  News: undefined;
  ArticleDetails: { articleId: string; source?: "featured" | "main" };
};

export type LeaguesStackParamList = {
  Leagues: undefined;
  LeagueDetails: { leagueId: string };
  ComponentCatalog: undefined;
};

export type FavoritesStackParamList = {
  Favorites: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
};

// Root Stack Param List (Tab Navigator)
export type RootStackParamList = {
  MatchesTab: NavigatorScreenParams<MatchesStackParamList>;
  NewsTab: NavigatorScreenParams<NewsStackParamList>;
  LeaguesTab: NavigatorScreenParams<LeaguesStackParamList>;
  FavoritesTab: NavigatorScreenParams<FavoritesStackParamList>;
  SearchTab: NavigatorScreenParams<SearchStackParamList>;
  Settings: undefined;
};

// Screen Props Types
export type MatchesScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MatchesStackParamList, "Matches">,
  BottomTabScreenProps<RootStackParamList>
>;

export type MatchDetailsScreenProps = NativeStackScreenProps<MatchesStackParamList, "MatchDetails">;

export type PlayerStatsScreenProps = NativeStackScreenProps<MatchesStackParamList, "PlayerStats">;

export type NewsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<NewsStackParamList, "News">,
  BottomTabScreenProps<RootStackParamList>
>;

export type ArticleDetailsScreenProps = NativeStackScreenProps<
  NewsStackParamList,
  "ArticleDetails"
>;

export type LeaguesScreenProps = CompositeScreenProps<
  NativeStackScreenProps<LeaguesStackParamList, "Leagues">,
  BottomTabScreenProps<RootStackParamList>
>;

export type LeagueDetailsScreenProps = NativeStackScreenProps<
  LeaguesStackParamList,
  "LeagueDetails"
>;

export type ComponentCatalogScreenProps = NativeStackScreenProps<
  LeaguesStackParamList,
  "ComponentCatalog"
>;

export type FavoritesScreenProps = CompositeScreenProps<
  NativeStackScreenProps<FavoritesStackParamList, "Favorites">,
  BottomTabScreenProps<RootStackParamList>
>;

export type SearchScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, "Search">,
  BottomTabScreenProps<RootStackParamList>
>;

export type SettingsScreenProps = BottomTabScreenProps<RootStackParamList, "Settings">;

// Route Names Enum
export enum RouteNames {
  Matches = "Matches",
  MatchDetails = "MatchDetails",
  PlayerStats = "PlayerStats",
  News = "News",
  ArticleDetails = "ArticleDetails",
  Leagues = "Leagues",
  LeagueDetails = "LeagueDetails",
  ComponentCatalog = "ComponentCatalog",
  Favorites = "Favorites",
  Search = "Search",
  Settings = "Settings",
}
