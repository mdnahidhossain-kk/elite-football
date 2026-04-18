import { openRelatedArticle } from "../../../src/features/news/navigation/openRelatedArticle";
import { shareArticle } from "../../../src/features/news/services/shareArticle";

describe("News share + related integration", () => {
  it("shares article URL through the native share adapter", async () => {
    const share = jest.fn(async () => ({ action: "sharedAction" }));
    const result = await shareArticle(
      {
        title: "Arsenal Matchday Preview",
        url: "https://example.com/news/arsenal-preview",
      },
      { share }
    );

    expect(share).toHaveBeenCalledWith({
      message: "Arsenal Matchday Preview\nhttps://example.com/news/arsenal-preview",
      title: "Arsenal Matchday Preview",
      url: "https://example.com/news/arsenal-preview",
    });
    expect(result).toEqual({ ok: true });
  });

  it("navigates to selected related article", () => {
    const navigate = jest.fn();
    openRelatedArticle({ navigate }, "article-2");

    expect(navigate).toHaveBeenCalledWith("ArticleDetails", {
      articleId: "article-2",
      source: "related",
    });
  });
});
