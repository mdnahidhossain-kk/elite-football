interface RelatedArticleNavigationLike {
  navigate: (routeName: string, params: { articleId: string; source: "related" }) => void;
}

export const openRelatedArticle = (
  navigation: RelatedArticleNavigationLike,
  articleId: string
): void => {
  navigation.navigate("ArticleDetails", { articleId, source: "related" });
};
