import { mockNewsArticle, mockNewsArticles } from "../../../src/mocks/phase2";
import { buildNewsDetailsSnapshot } from "../../../src/features/news/screens/newsDetailsScreenModel";

describe("News details snapshot", () => {
  it("matches rich article details state", () => {
    const snapshot = buildNewsDetailsSnapshot({
      article: mockNewsArticle,
      relatedArticles: mockNewsArticles.filter(item => item.id !== mockNewsArticle.id),
    });

    expect(snapshot).toMatchSnapshot();
  });
});
