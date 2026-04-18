import { NewsArticle } from "../../../models/phase2";
import { mapNewsBlocksToRenderableItems } from "../components/newsRichContentMapper";

export type NewsDetailsSurfaceState = "article" | "fallback";

export const deriveNewsDetailsSurfaceState = (
  article: NewsArticle | null
): NewsDetailsSurfaceState => (article ? "article" : "fallback");

export const buildNewsDetailsSnapshot = ({
  article,
  relatedArticles,
}: {
  article: NewsArticle | null;
  relatedArticles: NewsArticle[];
}) => ({
  articleId: article?.id ?? null,
  title: article?.title ?? null,
  author: article?.author ?? null,
  publishedAt: article?.publishedAt ?? null,
  surfaceState: deriveNewsDetailsSurfaceState(article),
  canShare: Boolean(article?.shareUrl),
  blocks:
    article?.contentBlocks.map(block => ({
      id: block.id,
      type: block.type,
    })) ?? [],
  unsupportedBlockCount: article
    ? mapNewsBlocksToRenderableItems(article.contentBlocks).filter(
        block => block.kind === "unsupported-media"
      ).length
    : 0,
  relatedArticleIds: relatedArticles.map(item => item.id),
});

export const selectRelatedArticles = (
  article: NewsArticle | null,
  allArticles: NewsArticle[]
): NewsArticle[] => {
  if (!article) {
    return [];
  }

  const relatedIds = new Set(article.relatedArticleIds);
  return allArticles.filter(item => relatedIds.has(item.id) && item.id !== article.id);
};
