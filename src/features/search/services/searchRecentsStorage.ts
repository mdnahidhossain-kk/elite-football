import { SearchQuery } from "../../../models/phase2/entities";
import { dedupeRecentSearches } from "../../shared/phase2Validation";

const STORAGE_KEY = "phase2:search:recents";
const MAX_RECENTS = 15;

interface StorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

const memoryStore = new Map<string, string>();

const memoryAdapter: StorageAdapter = {
  getItem: async key => memoryStore.get(key) ?? null,
  setItem: async (key, value) => {
    memoryStore.set(key, value);
  },
  removeItem: async key => {
    memoryStore.delete(key);
  },
};

function safeRequire(moduleName: string): unknown {
  try {
    const maybeRequire = (globalThis as { require?: (id: string) => unknown }).require;
    if (maybeRequire) {
      return maybeRequire(moduleName);
    }
  } catch {
    // no-op
  }

  return null;
}

function createMmkvAdapter(): StorageAdapter | null {
  const module = safeRequire("react-native-mmkv") as {
    MMKV?: new () => {
      getString: (k: string) => string | undefined;
      set: (k: string, v: string) => void;
      delete: (k: string) => void;
    };
  } | null;

  if (!module?.MMKV) {
    return null;
  }

  const mmkv = new module.MMKV();

  return {
    getItem: async key => mmkv.getString(key) ?? null,
    setItem: async (key, value) => {
      mmkv.set(key, value);
    },
    removeItem: async key => {
      mmkv.delete(key);
    },
  };
}

function createAsyncStorageAdapter(): StorageAdapter | null {
  const module = safeRequire("@react-native-async-storage/async-storage") as {
    default?: {
      getItem: (key: string) => Promise<string | null>;
      setItem: (key: string, value: string) => Promise<void>;
      removeItem: (key: string) => Promise<void>;
    };
  } | null;

  if (!module?.default) {
    return null;
  }

  return {
    getItem: module.default.getItem,
    setItem: module.default.setItem,
    removeItem: module.default.removeItem,
  };
}

function getAdapter(): StorageAdapter {
  return createMmkvAdapter() ?? createAsyncStorageAdapter() ?? memoryAdapter;
}

export class SearchRecentsStorage {
  private readonly adapter: StorageAdapter;

  constructor(adapter: StorageAdapter = getAdapter()) {
    this.adapter = adapter;
  }

  async list(): Promise<SearchQuery[]> {
    const raw = await this.adapter.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as SearchQuery[];
      return dedupeRecentSearches(parsed).slice(0, MAX_RECENTS);
    } catch {
      await this.adapter.removeItem(STORAGE_KEY);
      return [];
    }
  }

  async save(query: SearchQuery): Promise<SearchQuery[]> {
    const current = await this.list();
    const merged = dedupeRecentSearches([query, ...current]).slice(0, MAX_RECENTS);
    await this.adapter.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }

  async remove(queryId: string): Promise<SearchQuery[]> {
    const current = await this.list();
    const filtered = current.filter(query => query.id !== queryId);
    await this.adapter.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  }

  async clear(): Promise<void> {
    await this.adapter.removeItem(STORAGE_KEY);
  }
}

export const searchRecentsStorage = new SearchRecentsStorage();
