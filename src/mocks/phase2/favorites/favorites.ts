import { FavoriteItem } from "../../../models/phase2/entities";

export const mockFavorites: FavoriteItem[] = [
  {
    id: "arsenal",
    type: "team",
    displayName: "Arsenal",
    order: 0,
    updatedAt: new Date("2026-04-18T00:00:00.000Z").toISOString(),
  },
  {
    id: "bukayo-saka",
    type: "player",
    displayName: "Bukayo Saka",
    order: 0,
    updatedAt: new Date("2026-04-18T00:00:00.000Z").toISOString(),
  },
];
