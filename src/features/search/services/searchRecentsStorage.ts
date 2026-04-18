import { SearchFilter, SearchQuery } from "../../../models/phase2";
import { dedupeRecentSearches } from "../../shared/phase2Validation";

declare const require: (moduleId: string) => unknown;

const RECENTS_STORAGE_KEY = "phase2:search:recents";
const MAX_RECENTS = 10;

interface AsyncStorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

interface MMKVAdapter {
  getString: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
  delete: (key: string) => void;
}

type SearchRecentsDriver = AsyncStorageAdapter;

const createMemoryDriver = (): SearchRecentsDriver => {
  const memory = new Map<string, string>();

  return {
    getItem: async key => memory.get(key) ?? null,
    setItem: async (key, value) => {
      memory.set(key, value);
    },
    removeItem: async key => {
      memory.delete(key);
    },
  };
};

const createMmkvDriver = (): SearchRecentsDriver | null => {
  try {
    const mmkvModule = require("react-native-mmkv") as { MMKV?: new () => MMKVAdapter };
    if (!mmkvModule?.MMKV) {
      return null;
    }

    const mmkv = new mmkvModule.MMKV();
    return {
      getItem: async key => mmkv.getString(key) ?? null,
      setItem: async (key, value) => {
        mmkv.set(key, value);
      },
      removeItem: async key => {
        mmkv.delete(key);
      },
    };
  } catch {
    return null;
  }
};

const createAsyncStorageDriver = (): SearchRecentsDriver | null => {
  try {
    const module = require("@react-native-async-storage/async-storage") as {
      default?: AsyncStorageAdapter;
    };
    return module.default ?? null;
  } catch {
    return null;
  }
};

const resolveDriver = (): SearchRecentsDriver =>
  createMmkvDriver() ?? createAsyncStorageDriver() ?? createMemoryDriver();

const parseRecentsPayload = (raw: string | null): SearchQuery[] => {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as SearchQuery[];
    return Array.isArray(parsed) ? dedupeRecentSearches(parsed, MAX_RECENTS) : [];
  } catch {
    return [];
  }
};

export interface SearchRecentsStorageService {
  getRecents: () => Promise<SearchQuery[]>;
  saveRecent: (query: Pick<SearchQuery, "text" | "filter">) => Promise<SearchQuery[]>;
  clearRecents: () => Promise<void>;
}

export const createSearchRecentsStorage = (
  driver: SearchRecentsDriver = resolveDriver()
): SearchRecentsStorageService => ({
  getRecents: async () => {
    const raw = await driver.getItem(RECENTS_STORAGE_KEY);
    return parseRecentsPayload(raw);
  },

  saveRecent: async query => {
    const normalizedFilter: SearchFilter = query.filter ?? "all";
    const nextItem: SearchQuery = {
      id: `${Date.now()}`,
      text: query.text.trim(),
      filter: normalizedFilter,
      createdAt: new Date().toISOString(),
    };

    const existing = await parseRecentsPayload(await driver.getItem(RECENTS_STORAGE_KEY));
    const updated = dedupeRecentSearches([nextItem, ...existing], MAX_RECENTS);
    await driver.setItem(RECENTS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  clearRecents: async () => {
    await driver.removeItem(RECENTS_STORAGE_KEY);
  },
});

export const searchRecentsStorage = createSearchRecentsStorage();
