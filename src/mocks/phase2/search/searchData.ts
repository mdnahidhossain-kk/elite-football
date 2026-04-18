import { SearchResultItem } from "../../../models/phase2/entities";

export const mockSearchResults: SearchResultItem[] = [
  {
    id: "club-1",
    type: "club",
    title: "Arsenal FC",
    destinationRoute: "ClubDetails",
    destinationParams: { clubId: "arsenal" },
  },
  {
    id: "news-1",
    type: "news",
    title: "Matchday Preview",
    destinationRoute: "NewsDetails",
    destinationParams: { articleId: "preview-1" },
  },
];
