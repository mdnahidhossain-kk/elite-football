// Navigation Contracts: React Navigation Type-Safe Routing Configuration
// 
// Purpose:
// - Define all possible routes in the app
// - Type-safe navigation (TypeScript prevents invalid route params)
// - Enable deep linking (URI → screen mapping)
// - Centralized route naming (single source of truth)
//
// Usage:
// import { RootStackParamList } from '@contracts/navigation'
// useNavigation<RootStackNavigationProp>()
// navigation.navigate('MatchDetails', { matchId: '123' })  ✅ Type-checked
//
// Reference:
// - Data model: specs/001-foundation-design-system/data-model.md
// - React Navigation docs: https://reactnavigation.org/docs/typescript/

export type MatchesStackParamList = {
  Matches: undefined;
  MatchDetails: {
    matchId: string;
    liveTicker?: boolean;
  };
  PlayerStats: {
    matchId: string;
    playerId: string;
  };
};

export type NewsStackParamList = {
  News: undefined;
  ArticleDetails: {
    articleId: string;
    source?: 'featured' | 'main';
  };
};

export type LeaguesStackParamList = {
  Leagues: undefined;
  LeagueDetails: {
    leagueId: string;
  };
  ComponentCatalog: undefined;  // Dev tool for Phase 1
};

export type FavoritesStackParamList = {
  Favorites: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
};

// Root navigator (bottom tab navigator)
export type RootStackParamList = {
  MatchesTab: undefined;
  NewsTab: undefined;
  LeaguesTab: undefined;
  FavoritesTab: undefined;
  SearchTab: undefined;
  Settings: undefined;  // Modal stack overlaid on all tabs
};

// Deep Linking Configuration
// Maps URI patterns to screens + auto-extracts params
export const linking = {
  prefixes: ['elitef://', 'https://elitef.app'],
  config: {
    screens: {
      // Tab routes
      MatchesTab: 'matches',
      NewsTab: 'news',
      LeaguesTab: 'leagues',
      FavoritesTab: 'favorites',
      SearchTab: 'search',

      // Matches stack
      Matches: 'matches',
      MatchDetails: 'matches/:matchId',  // URI: elitef://matches/12345
      PlayerStats: 'matches/:matchId/players/:playerId',  // URI: elitef://matches/12345/players/67890

      // News stack
      News: 'news',
      ArticleDetails: 'news/:articleId',  // URI: elitef://news/abc-def-123

      // Leagues stack
      Leagues: 'leagues',
      LeagueDetails: 'leagues/:leagueId',
      ComponentCatalog: 'dev/catalog',  // URI: elitef://dev/catalog

      // Settings (modal)
      Settings: 'settings',

      // Fallback for un matched routes (improves UX)
      NotFound: '*',
    },
  },
};

// React Navigation Type Helpers
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Navigation prop types for deeply nested screens
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type MatchesStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MatchesStackParamList>,
  RootStackNavigationProp
>;

export type MatchDetailsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MatchesStackParamList, 'MatchDetails'>,
  RootStackNavigationProp
>;

// Usage in a component:
// import { useNavigation } from '@react-navigation/native'
// import type { MatchDetailsScreenNavigationProp } from '@contracts/navigation'
// 
// const MyScreen = () => {
//   const navigation = useNavigation<MatchDetailsScreenNavigationProp>()
//   
//   const handlePress = () => {
//     navigation.navigate('MatchDetails', { matchId: '123' })  ✅ Type-safe
//     // navigation.navigate('MatchDetails', {})  ❌ TS error: matchId required
//   }
// }

// Route Names Enum (optional, for consistency)
export const RouteNames = {
  MATCHES_TAB: 'MatchesTab',
  NEWS_TAB: 'NewsTab',
  LEAGUES_TAB: 'LeaguesTab',
  FAVORITES_TAB: 'FavoritesTab',
  SEARCH_TAB: 'SearchTab',
  SETTINGS: 'Settings',
  MATCHES: 'Matches',
  MATCH_DETAILS: 'MatchDetails',
  PLAYER_STATS: 'PlayerStats',
  NEWS: 'News',
  ARTICLE_DETAILS: 'ArticleDetails',
  LEAGUES: 'Leagues',
  LEAGUE_DETAILS: 'LeagueDetails',
  COMPONENT_CATALOG: 'ComponentCatalog',
  FAVORITES: 'Favorites',
  SEARCH: 'Search',
} as const;

// Constraints & Validation
// - All route names must be present in RootStackParamList (TypeScript enforces this)
// - All params must match their type definitions
// - Deep linking URIs must map 1:1 with screen routes
// - modalScope (Settings) is rendered on top of tab navigators; always accessible

/**
 * Navigation Hierarchy (Conceptual)
 *
 * RootNavigator (react-navigation BottomTabNavigator)
 * ├── MatchesTab
 * │   └── MatchesStack (react-navigation NativeStackNavigator)
 * │       ├── Matches
 * │       ├── MatchDetails
 * │       └── PlayerStats
 * ├── NewsTab
 * │   └── NewsStack
 * │       ├── News
 * │       └── ArticleDetails
 * ├── LeaguesTab
 * │   └── LeaguesStack
 * │       ├── Leagues
 * │       ├── LeagueDetails
 * │       └── ComponentCatalog (dev tool)
 * ├── FavoritesTab
 * │   └── FavoritesStack
 * │       └── Favorites
 * ├── SearchTab
 * │   └── SearchStack
 * │       └── Search
 * └── SettingsStack (Modal, overlaid on active tab)
 *     └── Settings
 *
 * Deep Linking Examples:
 * - elitef://matches/12345 → Navigate to MatchDetails(matchId='12345')
 * - elitef://matches/12345/players/67890 → Navigate to PlayerStats
 * - elitef://news/abc-123 → Navigate to ArticleDetails(articleId='abc-123')
 * - elitef://settings → Open Settings modal
 *
 * State Preservation:
 * - Each tab maintains its own stack (Matches → Fixture → Player Stats)
 * - Switching tabs preserves the stack state
 * - Returning to a tab restores the last viewed screen
 */

export default linking;
