import { NewsContentBlock } from "../../../src/models/phase2";
import { mapNewsBlocksToRenderableItems } from "../../../src/features/news/components/newsRichContentMapper";

describe("News unsupported media integration", () => {
  it("maps unsupported embeds to safe fallback placeholders", () => {
    const blocks: NewsContentBlock[] = [
      { id: "b1", type: "paragraph", content: "Intro" },
      { id: "b2", type: "embed", content: "<iframe src='https://video.example.com/1'></iframe>" },
      { id: "b3", type: "image", content: "Hero image", mediaUri: "https://example.com/hero.png" },
      { id: "b4", type: "image", content: "Missing image media URI" },
    ];

    const mapped = mapNewsBlocksToRenderableItems(blocks);

    expect(mapped).toEqual([
      { id: "b1", kind: "text", text: "Intro", heading: false },
      {
        id: "b2",
        kind: "unsupported-media",
        label: "Embedded media is unavailable for this article.",
      },
      {
        id: "b3",
        kind: "image",
        uri: "https://example.com/hero.png",
        caption: "Hero image",
      },
      { id: "b4", kind: "unsupported-media", label: "Image is unavailable for this article." },
    ]);
  });
});
