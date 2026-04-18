import {
  COMPETITION_CATEGORIES,
  CompetitionCategory,
  FavoriteItem,
  FavoriteType,
  SearchFilter,
  SearchQuery,
} from "../../models/phase2";

const COMPETITION_CATEGORY_SET = new Set<CompetitionCategory>(COMPETITION_CATEGORIES);

const normalizeRecentLookupKey = (text: string, filter: SearchFilter): string =>
  `${text.trim().toLowerCase()}::${filter}`;

export const normalizeCategoryKey = (
  value: string | null | undefined,
  fallback: CompetitionCategory = "top"
): CompetitionCategory => {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase() as CompetitionCategory;
  return COMPETITION_CATEGORY_SET.has(normalized) ? normalized : fallback;
};

export const normalizeLetterKey = (value: string): string => {
  const firstAlpha = value.trim().charAt(0).toUpperCase();
  return /^[A-Z]$/.test(firstAlpha) ? firstAlpha : "#";
};

export const normalizeFavoritesOrder = <T extends Pick<FavoriteItem, "order">>(items: T[]): T[] =>
  [...items].sort((a, b) => a.order - b.order).map((item, index) => ({ ...item, order: index }));

export const groupFavoritesByType = (
  items: FavoriteItem[]
): Record<FavoriteType, FavoriteItem[]> => ({
  team: normalizeFavoritesOrder(items.filter(item => item.type === "team")),
  player: normalizeFavoritesOrder(items.filter(item => item.type === "player")),
  league: normalizeFavoritesOrder(items.filter(item => item.type === "league")),
});

export const dedupeRecentSearches = (items: SearchQuery[], maxItems = 10): SearchQuery[] => {
  const seen = new Set<string>();
  const deduped: SearchQuery[] = [];

  for (const item of items) {
    const normalizedText = item.text.trim();
    if (!normalizedText) {
      continue;
    }

    const lookupKey = normalizeRecentLookupKey(normalizedText, item.filter);
    if (seen.has(lookupKey)) {
      continue;
    }

    seen.add(lookupKey);
    deduped.push({ ...item, text: normalizedText });

    if (deduped.length >= maxItems) {
      break;
    }
  }

  return deduped;
};
