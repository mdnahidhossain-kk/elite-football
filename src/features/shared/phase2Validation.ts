import {
  COMPETITION_CATEGORIES,
  FAVORITE_TYPES,
  FavoriteItem,
  SearchFilter,
  SearchQuery,
  CompetitionCategory,
} from "../../models/phase2/entities";

const LETTER_FALLBACK = "#";

export function normalizeCategoryKey(value: string): CompetitionCategory {
  const normalized = value.trim().toLowerCase();
  if (COMPETITION_CATEGORIES.includes(normalized as CompetitionCategory)) {
    return normalized as CompetitionCategory;
  }

  return "top";
}

export function normalizeLetterKey(value: string): string {
  const normalized = value.trim().charAt(0).toUpperCase();
  if (!normalized) {
    return LETTER_FALLBACK;
  }

  return /[A-Z]/.test(normalized) ? normalized : LETTER_FALLBACK;
}

export function dedupeRecentSearches(queries: SearchQuery[]): SearchQuery[] {
  const seen = new Set<string>();

  return queries.filter(query => {
    const normalizedText = query.text.trim().toLowerCase();
    const filter: SearchFilter = query.filter ?? "all";
    const key = `${normalizedText}::${filter}`;

    if (!normalizedText || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function normalizeFavoritesOrdering(items: FavoriteItem[]): FavoriteItem[] {
  const normalizedByType = FAVORITE_TYPES.flatMap(type => {
    const sorted = items
      .filter(item => item.type === type)
      .sort((a, b) => {
        if (a.order === b.order) {
          return b.updatedAt.localeCompare(a.updatedAt);
        }

        return a.order - b.order;
      });

    return sorted.map((item, index) => ({
      ...item,
      order: index,
    }));
  });

  return normalizedByType;
}
