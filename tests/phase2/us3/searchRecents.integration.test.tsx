import { deriveSearchSurfaceState } from "../../../src/features/search/screens/searchScreenModel";
import {
  mockSearchIndex,
  runSearchProjection,
} from "../../../src/features/search/services/searchEngine";
import { createSearchRecentsStorage } from "../../../src/features/search/services/searchRecentsStorage";

const createMemoryDriver = () => {
  const memory = new Map<string, string>();
  return {
    getItem: async (key: string) => memory.get(key) ?? null,
    setItem: async (key: string, value: string) => {
      memory.set(key, value);
    },
    removeItem: async (key: string) => {
      memory.delete(key);
    },
  };
};

describe("Search recents + no results integration", () => {
  it("re-runs recalled recent search context", async () => {
    const storage = createSearchRecentsStorage(createMemoryDriver());

    await storage.saveRecent({ text: "arsenal", filter: "clubs" });
    await storage.saveRecent({ text: "saka", filter: "players" });

    const recents = await storage.getRecents();
    const recalled = recents.find(item => item.filter === "clubs");

    expect(recalled?.text).toBe("arsenal");

    const results = runSearchProjection(
      mockSearchIndex,
      recalled?.text ?? "",
      recalled?.filter ?? "all"
    );
    expect(results.map(item => item.id)).toEqual(["club-arsenal"]);
  });

  it("returns no-results surface state when projection is empty", () => {
    const results = runSearchProjection(mockSearchIndex, "zzzzzz", "news");
    expect(results).toEqual([]);
    expect(deriveSearchSurfaceState("zzzzzz", results, false)).toBe("no-results");
  });
});
