import { SearchFilter, SearchResultItem, SearchResultType } from "../../../models/phase2";

const FILTER_TO_TYPES: Record<SearchFilter, SearchResultType[]> = {
  all: ["club", "player", "league", "news"],
  clubs: ["club"],
  players: ["player"],
  leagues: ["league"],
  news: ["news"],
};

export const mockSearchIndex: SearchResultItem[] = [
  {
    id: "club-arsenal",
    type: "club",
    title: "Arsenal FC",
    description: "Premier League club",
    destinationRoute: "ClubDetails",
    destinationParams: { clubId: "arsenal" },
  },
  {
    id: "player-saka",
    type: "player",
    title: "Bukayo Saka",
    description: "Arsenal winger",
    destinationRoute: "PlayerDetails",
    destinationParams: { playerId: "saka" },
  },
  {
    id: "league-premier",
    type: "league",
    title: "Premier League",
    description: "England top division",
    destinationRoute: "LeagueDetails",
    destinationParams: { leagueId: "premier-league" },
  },
  {
    id: "news-arsenal-preview",
    type: "news",
    title: "Arsenal matchday preview",
    description: "Team news and expected lineups",
    destinationRoute: "ArticleDetails",
    destinationParams: { articleId: "arsenal-preview" },
  },
];

const normalize = (value: string): string => value.trim().toLowerCase();

export const runSearchProjection = (
  source: SearchResultItem[],
  query: string,
  filter: SearchFilter
): SearchResultItem[] => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return [];
  }

  const allowedTypes = FILTER_TO_TYPES[filter];
  return source.filter(item => {
    if (!allowedTypes.includes(item.type)) {
      return false;
    }

    const haystack = normalize(`${item.title} ${item.description ?? ""}`);
    return haystack.includes(normalizedQuery);
  });
};

export interface DebouncedSearchExecutor {
  execute: (query: string, filter: SearchFilter) => Promise<SearchResultItem[]>;
  cancel: () => void;
}

export const createDebouncedSearchExecutor = (
  searchFn: (query: string, filter: SearchFilter) => SearchResultItem[],
  delayMs = 300
): DebouncedSearchExecutor => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pendingResolve: ((value: SearchResultItem[]) => void) | null = null;

  const cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (pendingResolve) {
      pendingResolve([]);
      pendingResolve = null;
    }
  };

  return {
    execute: (query, filter) =>
      new Promise(resolve => {
        cancel();
        pendingResolve = resolve;

        timer = setTimeout(() => {
          pendingResolve = null;
          timer = null;
          resolve(searchFn(query, filter));
        }, delayMs);
      }),
    cancel,
  };
};
