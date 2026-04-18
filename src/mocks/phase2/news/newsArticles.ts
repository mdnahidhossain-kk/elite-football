import { NewsArticle } from "../../../models/phase2/entities";

export const mockNewsArticles: NewsArticle[] = [
  {
    id: "article-1",
    title: "Team News Ahead of Derby",
    publishedAt: new Date("2026-04-18T00:00:00.000Z").toISOString(),
    contentBlocks: [
      {
        id: "block-1",
        type: "paragraph",
        value: "Headline summary content",
      },
    ],
    shareUrl: "https://example.com/article-1",
    relatedArticleIds: [],
  },
];
