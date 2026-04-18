// React Navigation Linking Configuration

import { LinkingOptions } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["elitef://", "https://elitef.app"],
  config: {
    screens: {
      MatchesTab: {
        screens: {
          Matches: "matches",
          MatchDetails: "matches/:matchId",
          PlayerStats: "matches/:matchId/player/:playerId",
        },
      },
      NewsTab: {
        screens: {
          News: "news",
          ArticleDetails: "news/:articleId",
        },
      },
      LeaguesTab: {
        screens: {
          Leagues: "leagues",
          LeagueDetails: "leagues/:leagueId",
          ComponentCatalog: "leagues/catalog",
        },
      },
      FavoritesTab: {
        screens: {
          Favorites: "favorites",
        },
      },
      SearchTab: {
        screens: {
          Search: "search",
        },
      },
      Settings: "settings",
    },
  },
};
